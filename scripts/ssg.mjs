/**
 * Static Site Generator
 *
 * Replaces react-snap + generate-static-routes.mjs.
 *
 * Pipeline:
 *  1. Build SSR bundle (Vite --ssr) → .ssg-server/
 *  2. For each non-article route: React renderToString → body HTML
 *  3. For each blog article: markdown → body HTML (Article.tsx has async deps)
 *  4. Inject body + meta into dist/index.html template
 *  5. Write final HTML files to dist/
 */

import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"
import { execSync } from "node:child_process"
import { marked } from "marked"

const ROOT    = process.cwd()
const DIST    = path.join(ROOT, "dist")
const SSR_DIR = path.join(ROOT, ".ssg-server")
const BLOG_DIR = path.join(ROOT, "src", "content", "blog")
const BASE_URL = "https://www.diskcleaner.pro"

// ── Authors (mirrors src/lib/authors.ts) ────────────────────────────────────

const AUTHORS = {
  "Jacques FLA": {
    name: "Jacques FLA",
    role: "Comparisons & Research",
    bio: "Writes comparison and buyer-guide content focused on transparent Mac maintenance tools, pricing, and cleanup safety.",
  },
  "PB CO": {
    name: "PB CO",
    role: "Product Commentary",
    bio: "Covers product direction, workflow design, and the practical tradeoffs behind modern Mac cleaner apps.",
  },
  "DiskCleaner Team": {
    name: "DiskCleaner Team",
    role: "Editorial Team",
    bio: "Publishes product explainers, help content, and update notes for DiskCleaner.",
  },
}

function getAuthor(name) {
  return AUTHORS[name] ?? { name, role: "Contributor", bio: "Contributes to DiskCleaner editorial content." }
}

// ── Utilities ────────────────────────────────────────────────────────────────

function ensureDir(p) {
  mkdirSync(p, { recursive: true })
}

function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

// ── File writing ─────────────────────────────────────────────────────────────

function writeRoute(route, html) {
  const clean = route.replace(/^\/+|\/+$/g, "")
  if (!clean) {
    writeFileSync(path.join(DIST, "index.html"), html)
    return
  }
  const dir = path.join(DIST, clean)
  ensureDir(dir)
  writeFileSync(path.join(dir, "index.html"), html)
  writeFileSync(path.join(DIST, `${clean}.html`), html)
}

// ── SEO helpers ──────────────────────────────────────────────────────────────

function replaceTitle(html, title) {
  return html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
}

function replaceMetaById(html, id, value) {
  const escaped = escapeHtml(value)
  const tagPattern = new RegExp(`<meta[^>]*id="${id}"[^>]*>`, "m")
  const tag = html.match(tagPattern)?.[0]
  if (!tag) return html
  return html.replace(tag, tag.replace(/content="[^"]*"/, `content="${escaped}"`))
}

function replaceCanonical(html, url) {
  return html.replace(
    /(<link[^>]*id="canonical-link"[^>]*href=")[^"]*(".*?>)/,
    `$1${escapeHtml(url)}$2`
  )
}

function replaceJsonLd(html, id, json) {
  return html.replace(
    new RegExp(`(<script id="${id}" type="application/ld\\+json">)[\\s\\S]*?(</script>)`),
    `$1\n${JSON.stringify(json, null, 2)}\n    $2`
  )
}

function setNoindex(html) {
  return html.replace(
    /<meta name="robots"[^>]*>/,
    `<meta name="robots" content="noindex, nofollow" />`
  )
}

function injectBody(html, body) {
  return html.replace('<div id="root"></div>', `<div id="root">${body}</div>`)
}

function applySeo(html, seo) {
  let h = html
  h = replaceTitle(h, seo.title)
  h = replaceCanonical(h, seo.url)
  h = replaceMetaById(h, "meta-desc", seo.description)
  h = replaceMetaById(h, "og-type", seo.ogType ?? "website")
  h = replaceMetaById(h, "og-url", seo.url)
  h = replaceMetaById(h, "og-title", seo.title)
  h = replaceMetaById(h, "og-desc", seo.description)
  h = replaceMetaById(h, "og-image", seo.image)
  h = replaceMetaById(h, "og-image-secure", seo.image)
  h = replaceMetaById(h, "og-image-alt", seo.title)
  h = replaceMetaById(h, "tw-url", seo.url)
  h = replaceMetaById(h, "tw-title", seo.title)
  h = replaceMetaById(h, "tw-desc", seo.description)
  h = replaceMetaById(h, "tw-image", seo.image)
  h = replaceJsonLd(h, "article-jsonld", seo.jsonLd)
  if (seo.noindex) h = setNoindex(h)
  return h
}

// ── Blog helpers ─────────────────────────────────────────────────────────────

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  const data = {}
  for (const line of match[1].split("\n")) {
    const [key, ...rest] = line.split(":")
    if (!key) continue
    data[key.trim()] = rest.join(":").trim().replace(/^"|"$/g, "")
  }
  return data
}

function stripMarkdown(md) {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/[#>*_~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function readBlogPosts() {
  return readdirSync(BLOG_DIR)
    .filter(f => f.endsWith(".md"))
    .map(f => {
      const raw = readFileSync(path.join(BLOG_DIR, f), "utf8")
      const fm = parseFrontmatter(raw)
      const body = raw.replace(/^---[\s\S]*?---/, "")
      const plain = stripMarkdown(body)
      const wordCount = plain ? plain.split(" ").length : 0
      return {
        slug: fm.slug,
        title: fm.title,
        description: fm.description,
        excerpt: fm.excerpt || fm.description,
        date: fm.date,
        updatedAt: fm.updatedAt || fm.updated_at,
        author: fm.author || "DiskCleaner Team",
        category: fm.category || "Guide",
        wordCount,
        readingTimeMinutes: Math.max(1, Math.ceil(wordCount / 220)),
        markdownBody: body,
      }
    })
    .filter(p => p.slug && p.title)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// ── Article body (markdown → HTML, bypasses React for async-data pages) ──────

function generateArticleBody(post) {
  const author = getAuthor(post.author)
  const fmt = d => new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
  const content = marked.parse(post.markdownBody)

  return `<section style="background:var(--bg,#f5f5f7);padding:48px 0 80px">
  <div style="max-width:1200px;margin:0 auto;padding:0 16px">
    <a href="/blog" style="display:inline-flex;align-items:center;gap:6px;font-size:14px;color:var(--muted,#6e6e73);text-decoration:none;margin-bottom:32px">&#8592; Back to Blog</a>
    <div style="max-width:860px;margin:0 auto;text-align:center">
      <span style="display:inline-block;padding:2px 12px;border-radius:999px;border:1px solid currentColor;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:#0071e3">${escapeHtml(post.category)}</span>
      <h1 style="font-size:clamp(28px,3.5vw,48px);font-weight:700;line-height:1.1;letter-spacing:-.04em;margin:16px 0 12px;color:var(--text,#1d1d1f)">${escapeHtml(post.title)}</h1>
      <p style="font-size:18px;line-height:1.6;color:var(--muted,#6e6e73);margin-bottom:16px">${escapeHtml(post.excerpt)}</p>
      <p style="font-size:13px;color:var(--muted2,#aeaeb2)">${fmt(post.date)}${post.updatedAt ? ` · Updated ${fmt(post.updatedAt)}` : ""} · ${post.readingTimeMinutes} min read · ${post.wordCount.toLocaleString()} words · By ${escapeHtml(author.name)}</p>
    </div>
    <section style="max-width:860px;margin:32px auto 0;padding:20px 24px;border-radius:20px;border:1px solid var(--border,rgba(0,0,0,.1));background:var(--surface,#fff)">
      <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:var(--muted2,#aeaeb2);margin:0 0 8px">About the Author</p>
      <h2 style="font-size:18px;font-weight:600;margin:0 0 4px;color:var(--text,#1d1d1f)">${escapeHtml(author.name)}</h2>
      <p style="font-size:13px;font-weight:500;color:#0071e3;margin:0 0 10px">${escapeHtml(author.role)}</p>
      <p style="font-size:15px;line-height:1.7;color:var(--muted,#6e6e73);margin:0">${escapeHtml(author.bio)}</p>
    </section>
    <article style="max-width:860px;margin:24px auto 0;border-radius:24px;background:var(--surface,#fff);padding:20px 20px 40px">
      <div class="blog-content" style="padding:24px 20px 0">
        ${content}
      </div>
    </article>
  </div>
</section>`
}

// ── Schema builders ───────────────────────────────────────────────────────────

function buildBreadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@graph": [{
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: item.url,
      })),
    }],
  }
}

function buildCollectionJsonLd(url) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "DiskCleaner Blog",
        description: "Mac cleaner guides, CleanMyMac and MacPaw alternative comparisons, and practical help for reclaiming storage safely on Mac.",
        url,
        inLanguage: "en-US",
        publisher: { "@type": "Organization", name: "DiskCleaner", url: BASE_URL },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: url },
        ],
      },
    ],
  }
}

function buildArticleJsonLd(post, url) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updatedAt || post.date,
        mainEntityOfPage: url,
        author: { "@type": "Person", name: getAuthor(post.author).name },
        publisher: {
          "@type": "Organization",
          name: "DiskCleaner",
          logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.png` },
        },
        image: `${BASE_URL}/DiskCleaner_blog.webp`,
        articleSection: post.category,
        wordCount: post.wordCount,
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  }
}

// ── Static page definitions ───────────────────────────────────────────────────

const IMG_DEFAULT = `${BASE_URL}/DiskCleaner_Social.webp`
const IMG_BLOG    = `${BASE_URL}/DiskCleaner_blog.webp`

const STATIC_PAGES = [
  {
    route: "/",
    title: "DiskCleaner for Mac – Secure, Fast, Minimal Cache Cleaner",
    description: "DiskCleaner is a focused macOS cleaner that scans cache and clutter safely, shows every file before it moves, and sends everything to Trash. Private, fast, and beautifully simple.",
    image: IMG_DEFAULT,
    jsonLd: buildBreadcrumbJsonLd([{ name: "Home", url: `${BASE_URL}/` }]),
  },
  {
    route: "/blog",
    title: "DiskCleaner Blog — Mac Cleaner Guides, Comparisons, and Alternatives",
    description: "Mac cleaner guides, CleanMyMac and MacPaw alternative comparisons, and practical help for reclaiming storage safely on Mac.",
    image: IMG_BLOG,
    jsonLd: buildCollectionJsonLd(`${BASE_URL}/blog`),
  },
  {
    route: "/about",
    title: "About DiskCleaner",
    description: "Learn what DiskCleaner is, how it approaches Mac cleanup safely, and how to contact the team behind the product.",
    image: IMG_DEFAULT,
    jsonLd: buildBreadcrumbJsonLd([
      { name: "Home", url: `${BASE_URL}/` },
      { name: "About", url: `${BASE_URL}/about` },
    ]),
  },
  {
    route: "/trust",
    title: "DiskCleaner Trust Center",
    description: "Evidence and methodology behind DiskCleaner's privacy, safety, notarization, and scan-performance claims.",
    image: IMG_DEFAULT,
    jsonLd: buildBreadcrumbJsonLd([
      { name: "Home", url: `${BASE_URL}/` },
      { name: "Trust Center", url: `${BASE_URL}/trust` },
    ]),
  },
  {
    route: "/editorial-policy",
    title: "DiskCleaner Editorial Policy",
    description: "How DiskCleaner handles authorship, updates, comparisons, and editorial accuracy across its product and blog content.",
    image: IMG_DEFAULT,
    jsonLd: buildBreadcrumbJsonLd([
      { name: "Home", url: `${BASE_URL}/` },
      { name: "Editorial Policy", url: `${BASE_URL}/editorial-policy` },
    ]),
  },
  {
    route: "/help",
    title: "DiskCleaner Help Center",
    description: "DiskCleaner help center covering cleanup categories, troubleshooting, menu bar mode, and common Mac cleaning questions.",
    image: IMG_DEFAULT,
    jsonLd: buildBreadcrumbJsonLd([
      { name: "Home", url: `${BASE_URL}/` },
      { name: "Help Center", url: `${BASE_URL}/help` },
    ]),
  },
  {
    route: "/privacy-policy",
    title: "DiskCleaner Privacy Policy",
    description: "DiskCleaner privacy policy covering personal information, support requests, and how the website and service handle data.",
    image: IMG_DEFAULT,
    noindex: true,
    jsonLd: buildBreadcrumbJsonLd([
      { name: "Home", url: `${BASE_URL}/` },
      { name: "Privacy Policy", url: `${BASE_URL}/privacy-policy` },
    ]),
  },
  {
    route: "/terms-of-service",
    title: "DiskCleaner Terms of Service",
    description: "DiskCleaner terms of service covering website usage, software access, licenses, and support terms.",
    image: IMG_DEFAULT,
    noindex: true,
    jsonLd: buildBreadcrumbJsonLd([
      { name: "Home", url: `${BASE_URL}/` },
      { name: "Terms of Service", url: `${BASE_URL}/terms-of-service` },
    ]),
  },
]

// ── Main ──────────────────────────────────────────────────────────────────────

if (!existsSync(path.join(DIST, "index.html"))) {
  throw new Error("dist/index.html not found — run `npm run build` first")
}

const template = readFileSync(path.join(DIST, "index.html"), "utf8")
const posts = readBlogPosts()

// 404 page
writeFileSync(
  path.join(DIST, "404.html"),
  replaceTitle(template, "404 — Page Not Found | DiskCleaner")
)

// ── Step 1: Build SSR bundle ─────────────────────────────────────────────────

console.log("⚙  Building SSR bundle...")
execSync(
  `node node_modules/.bin/vite build --ssr src/entry-server.tsx --outDir .ssg-server --mode production`,
  { stdio: "inherit", cwd: ROOT }
)

// Locate the SSR entry file (handles path differences across Vite versions)
function findSsrEntry(dir, name) {
  for (const f of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name)
    if (f.isDirectory()) {
      const found = findSsrEntry(full, name)
      if (found) return found
    } else if (f.name === name) {
      return full
    }
  }
  return null
}

const ssrEntryFile = findSsrEntry(SSR_DIR, "entry-server.js")
if (!ssrEntryFile) throw new Error("SSR entry file not found in .ssg-server/")

const { render } = await import(pathToFileURL(ssrEntryFile).href)

// ── Step 2: Render non-article routes via React SSR ──────────────────────────

console.log(`\n📄 Rendering ${STATIC_PAGES.length} pages...`)
for (const page of STATIC_PAGES) {
  const url = `${BASE_URL}${page.route}`
  process.stdout.write(`   ${page.route} `)

  const body = render(page.route)
  let html = injectBody(template, body)
  html = applySeo(html, {
    title: page.title,
    description: page.description,
    url,
    image: page.image ?? IMG_DEFAULT,
    ogType: "website",
    jsonLd: page.jsonLd,
    noindex: page.noindex ?? false,
  })
  writeRoute(page.route, html)
  process.stdout.write("✓\n")
}

// ── Step 3: Render blog articles from markdown ───────────────────────────────

console.log(`\n📝 Rendering ${posts.length} blog articles...`)
for (const post of posts) {
  const url = `${BASE_URL}/blog/${post.slug}`
  process.stdout.write(`   /blog/${post.slug} `)

  const body = generateArticleBody(post)
  let html = injectBody(template, body)
  html = applySeo(html, {
    title: `${post.title} — DiskCleaner`,
    description: post.description,
    url,
    image: IMG_BLOG,
    ogType: "article",
    jsonLd: buildArticleJsonLd(post, url),
  })
  writeRoute(`/blog/${post.slug}`, html)
  process.stdout.write("✓\n")
}

console.log(`\n✅ SSG complete — ${STATIC_PAGES.length} pages + ${posts.length} articles\n`)
