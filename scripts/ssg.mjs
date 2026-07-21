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

// Vite loads .env.production for the browser build, but this postbuild step runs
// as a standalone Node process, so load it here too (e.g. for INDEXNOW_KEY).
// An existing env var still wins; a missing file just no-ops IndexNow.
if (!process.env.INDEXNOW_KEY) {
  try {
    process.loadEnvFile(path.join(ROOT, ".env.production"))
  } catch {
    // No .env.production present — IndexNow key/ping will be skipped.
  }
}

const INDEXNOW_KEY = process.env.INDEXNOW_KEY?.trim().replace(/^["']|["']$/g, "") || ""
const INDEXNOW_FILENAME = "indexnow.txt"
const INDEXNOW_URL = `${BASE_URL}/${INDEXNOW_FILENAME}`

function canonicalUrl(value) {
  const url = new URL(value, `${BASE_URL}/`)
  if (!url.pathname.endsWith("/") && !/\.[a-z0-9]+$/i.test(url.pathname)) {
    url.pathname += "/"
  }
  return url.toString()
}

function normalizeSchemaUrls(value) {
  if (typeof value === "string" && value.startsWith(BASE_URL)) return canonicalUrl(value)
  if (Array.isArray(value)) return value.map(normalizeSchemaUrls)
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, normalizeSchemaUrls(entry)]))
  }
  return value
}

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
  "Thomas A.": {
    name: "Thomas A.",
    role: "Contributing Author",
    bio: "Contributes developer-focused cleanup guides for Xcode, iOS Simulator storage, and safe macOS maintenance workflows.",
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

function suppressGlobalFaqPageSchema(html) {
  return html.replace(
    /(<script id="global-faqpage-jsonld" )type="application\/ld\+json"/,
    '$1type="text/plain"'
  )
}

function applySeo(html, seo) {
  const url = canonicalUrl(seo.url)
  let h = html
  h = replaceTitle(h, seo.title)
  h = replaceCanonical(h, url)
  h = replaceMetaById(h, "meta-desc", seo.description)
  h = replaceMetaById(h, "og-type", seo.ogType ?? "website")
  h = replaceMetaById(h, "og-url", url)
  h = replaceMetaById(h, "og-title", seo.title)
  h = replaceMetaById(h, "og-desc", seo.description)
  h = replaceMetaById(h, "og-image", seo.image)
  h = replaceMetaById(h, "og-image-secure", seo.image)
  h = replaceMetaById(h, "og-image-alt", seo.title)
  h = replaceMetaById(h, "tw-url", url)
  h = replaceMetaById(h, "tw-title", seo.title)
  h = replaceMetaById(h, "tw-desc", seo.description)
  h = replaceMetaById(h, "tw-image", seo.image)
  h = replaceJsonLd(h, "article-jsonld", normalizeSchemaUrls(seo.jsonLd))
  if (seo.suppressGlobalFaq) h = suppressGlobalFaqPageSchema(h)
  if (seo.noindex) h = setNoindex(h)
  return h
}

function writeIndexNowKey() {
  if (!INDEXNOW_KEY) {
    console.log("⚠️  INDEXNOW_KEY not set. Skipping IndexNow key file and ping.")
    return
  }

  writeFileSync(path.join(DIST, INDEXNOW_FILENAME), `${INDEXNOW_KEY}\n`, "utf8")
  console.log(`✅ Wrote ${INDEXNOW_FILENAME}`)
}

async function pingIndexNow(urls) {
  if (!INDEXNOW_KEY) return

  const uniqueUrls = Array.from(new Set(urls)).slice(0, 1000)
  if (uniqueUrls.length === 0) {
    console.log("⚠️  No URLs to ping to IndexNow")
    return
  }

  const payload = {
    host: new URL(BASE_URL).hostname,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_URL,
    urlList: uniqueUrls,
  }

  try {
    const resp = await fetch("https://api.indexnow.org/v1/ping", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const text = await resp.text()
    if (resp.ok) {
      console.log(`✅ IndexNow ping success (${uniqueUrls.length} URLs)`, text)
    } else {
      console.warn(`⚠️ IndexNow ping failed status=${resp.status}`, text)
    }
  } catch (err) {
    console.warn("⚠️ IndexNow ping error", err)
  }
}

function generateSitemap(staticPages, posts) {
  const entries = [
    {
      loc: `${BASE_URL}/`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "weekly",
      priority: 1.0,
    },
    ...staticPages
      .filter(page => page.route !== "/" && !page.noindex)
      .map(page => ({
        loc: canonicalUrl(`${BASE_URL}${page.route}`),
        lastmod: new Date().toISOString().split("T")[0],
        changefreq: "monthly",
        priority: 0.6,
      })),

    ...posts.map(post => ({
      loc: canonicalUrl(`${BASE_URL}/blog/${post.slug}`),
      lastmod: post.updatedAt || post.date,
      changefreq: "monthly",
      priority: 0.7,
    })),
  ]

  const sitemap = [`<?xml version="1.0" encoding="UTF-8"?>`, `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`]
  for (const entry of entries) {
    sitemap.push("  <url>")
    sitemap.push(`    <loc>${entry.loc}</loc>`)
    sitemap.push(`    <lastmod>${entry.lastmod}</lastmod>`)
    sitemap.push(`    <changefreq>${entry.changefreq}</changefreq>`)
    sitemap.push(`    <priority>${entry.priority.toFixed(1)}</priority>`)
    sitemap.push("  </url>")
  }
  sitemap.push("</urlset>")

  writeFileSync(path.join(DIST, "sitemap.xml"), sitemap.join("\n") + "\n")
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
    <a href="/blog/" style="display:inline-flex;align-items:center;gap:6px;font-size:14px;color:var(--muted,#6e6e73);text-decoration:none;margin-bottom:32px">&#8592; Back to Blog</a>
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

function buildTrustJsonLd(url) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "DiskCleaner Trust Center",
        url,
        description: "Evidence and methodology behind DiskCleaner's privacy, safety, notarization, and scan-performance claims.",
        dateModified: "2026-06-01",
        about: {
          "@type": "SoftwareApplication",
          "@id": `${BASE_URL}/#software`,
          name: "DiskCleaner",
          url: `${BASE_URL}/`,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How does DiskCleaner handle file removal?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "DiskCleaner is positioned as a Trash-first cleaner. The site describes cleanup as review-driven and recoverable rather than permanent deletion.",
            },
          },
          {
            "@type": "Question",
            name: "What privacy model does DiskCleaner claim?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "DiskCleaner is described as local-first, with no analytics or background telemetry during scanning and cleaning.",
            },
          },
          {
            "@type": "Question",
            name: "How can I verify the DiskCleaner download on macOS?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "After installing DiskCleaner in Applications, use codesign --verify, spctl --assess, and xcrun stapler validate to inspect its code signature, Gatekeeper assessment, and stapled notarization ticket.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Trust Center", item: url },
        ],
      },
    ],
  }
}

// ── Comparison article FAQ data (generates FAQPage rich snippets) ────────────

const COMPARISON_FAQS = {
  "cleanmymac-alternative": [
    {
      q: "What is the best CleanMyMac alternative for Mac?",
      a: "DiskCleaner is a focused Mac cleaner that shows every file before moving it and sends everything to Trash. It covers App Cache, Browser Cache, System Logs, Developer Data, App Leftovers, Large Files, Downloads, iOS Backups, and Mail Attachments. Free Core Cleaning is included; Premium is $9.99 one-time with no subscription.",
    },
    {
      q: "Is there a free CleanMyMac alternative?",
      a: "DiskCleaner includes Free Core Cleaning with no account required. A one-time $9.99 purchase unlocks the full app for up to 2 Macs — no annual subscription, unlike CleanMyMac.",
    },
    {
      q: "How is DiskCleaner different from CleanMyMac?",
      a: "CleanMyMac requires an annual subscription and moves files without explicit per-file confirmation. DiskCleaner is $9.99 one-time, shows every file in a checklist before anything moves, and sends cleaned items to Trash — not permanent deletion.",
    },
  ],
  "macpaw-alternative": [
    {
      q: "What is the best MacPaw alternative for Mac cleaning?",
      a: "DiskCleaner covers the core cleaning MacPaw's CleanMyMac offers — App Cache, Browser Cache, System Logs, Developer Data, and App Leftovers — plus Large Files, RAM Optimizer, and App Uninstaller. Free Core Cleaning is included; Premium is $9.99 one-time.",
    },
    {
      q: "Is DiskCleaner a good alternative to MacPaw's CleanMyMac?",
      a: "Yes. DiskCleaner covers all major Mac cleanup categories, shows every file before moving it, and sends cleaned items to Trash. It costs $9.99 one-time compared to MacPaw's recurring annual pricing.",
    },
  ],
  "best-mac-cleaner": [
    {
      q: "What is the best Mac cleaner app?",
      a: "The best Mac cleaner shows every file before removal, uses Trash instead of permanent deletion, covers major categories (App Cache, Browser Cache, System Logs, Developer Data, Large Files), and doesn't require a subscription. DiskCleaner meets all four criteria, includes Free Core Cleaning, and offers Premium for $9.99 one-time.",
    },
    {
      q: "What should I look for in a Mac cleaner?",
      a: "Look for transparency (files shown before removal), safety (Trash-first instead of permanent deletion), privacy (no network calls, no data collection), and honest pricing (one-time vs subscription). DiskCleaner prioritizes all four.",
    },
    {
      q: "Is a one-time Mac cleaner better than a subscription?",
      a: "For most users, yes. A one-time purchase avoids recurring costs and typically covers all future updates. DiskCleaner charges $9.99 once, covers up to 2 Macs, and includes every future update with no renewal.",
    },
  ],
  "appcleaner-vs-cleanmymac": [
    {
      q: "AppCleaner vs CleanMyMac — which is better?",
      a: "AppCleaner is free but limited to app uninstallation only. CleanMyMac covers more categories but requires an annual subscription. DiskCleaner covers both: full cleanup across App Cache, Browser Cache, System Logs, Developer Data, Large Files, plus an App Uninstaller with leftover detection — at $9.99 one-time.",
    },
    {
      q: "Does DiskCleaner replace both AppCleaner and CleanMyMac?",
      a: "Yes. DiskCleaner includes an App Uninstaller (like AppCleaner) plus full cleanup across all major cache and log categories, Large Files scanner, RAM Optimizer, and more — all in one app at a one-time price.",
    },
  ],
  "best-mac-cleaner-for-developers": [
    {
      q: "What is the best Mac cleaner for developers?",
      a: "DiskCleaner's Developer Data category targets Xcode derived data, iOS Simulators, CocoaPods caches, npm caches, and build artifacts — the largest sources of developer storage bloat on Mac. Deep Scan adds Downloads and Large Files. Free Core Cleaning is included.",
    },
    {
      q: "How much disk space can developers recover on Mac?",
      a: "Xcode derived data and iOS Simulators alone often total 20–80 GB on an active development machine. DiskCleaner surfaces all of this in one scan with per-file checkboxes so you review before removing.",
    },
    {
      q: "Does DiskCleaner clean npm and CocoaPods caches?",
      a: "Yes. DiskCleaner's Developer Data category covers Xcode derived data, iOS Simulators, CocoaPods caches, npm caches, and build artifacts. Each item is shown individually with its size before anything is moved.",
    },
  ],
  "one-time-purchase-mac-cleaner": [
    {
      q: "What is the best one-time purchase Mac cleaner?",
      a: "DiskCleaner offers a $9.99 one-time purchase covering up to 2 Macs and all future updates. Free Core Cleaning lets you verify the review-first workflow before spending anything.",
    },
    {
      q: "Which Mac cleaners don't require a subscription?",
      a: "DiskCleaner is $9.99 one-time with no subscription. AppCleaner is free but only handles app uninstallation. Most other full-featured Mac cleaners like CleanMyMac require annual subscriptions.",
    },
    {
      q: "Does a one-time Mac cleaner include future updates?",
      a: "DiskCleaner's $9.99 one-time purchase includes all future updates for up to 2 Macs. There are no upgrade fees, no annual renewals, and no subscription tiers.",
    },
  ],
}

function buildArticleJsonLd(post, url) {
  const articleType = post.category === "Industry" ? "NewsArticle" : "BlogPosting"
  const author = getAuthor(post.author)
  const image = `${BASE_URL}/DiskCleaner_blog.webp`

  const graph = [
    {
      "@type": articleType,
      "@id": `${url}#article`,
      headline: post.title,
      description: post.description,
      abstract: post.excerpt || post.description,
      datePublished: post.date,
      dateModified: post.updatedAt || post.date,
      url,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      isPartOf: { "@type": "Blog", "@id": `${BASE_URL}/blog#blog` },
      author: {
        "@type": "Person",
        name: author.name,
        description: author.role,
      },
      publisher: {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "DiskCleaner",
        url: BASE_URL,
        logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.png` },
      },
      image: {
        "@type": "ImageObject",
        url: image,
        width: 1200,
        height: 630,
      },
      articleSection: post.category,
      keywords: [post.category, "DiskCleaner", "Mac cleaner", "macOS storage"],
      wordCount: post.wordCount,
      timeRequired: `PT${post.readingTimeMinutes}M`,
      inLanguage: "en-US",
      about: [
        { "@type": "SoftwareApplication", "@id": `${BASE_URL}/#software`, name: "DiskCleaner", url: BASE_URL },
        { "@type": "Thing", name: post.category },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ]

  // Keep FAQPage schema only in the global template (index.html) to avoid duplicate FAQPage items.
  return {
    "@context": "https://schema.org",
    "@graph": graph,
  }
}

// ── Static page definitions ───────────────────────────────────────────────────

const IMG_DEFAULT = `${BASE_URL}/DiskCleaner_Social.webp`
const IMG_BLOG    = `${BASE_URL}/DiskCleaner_blog.webp`

const STATIC_PAGES = [
  {
    route: "/",
    title: "DiskCleaner for Mac | Review-First, Trash-First Cleaner",
    description: "DiskCleaner is a review-first Mac cleaner. See every cache, log, leftover, and large file before cleanup. Everything moves to Trash. Free Core Cleaning.",
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
    route: "/disk-clean-pro-alternative",
    title: "Disk Clean Pro Alternative for Mac | DiskCleaner",
    description: "A factual DiskCleaner vs Disk Clean Pro comparison for Mac users who want a one-time purchase cleaner with review-first, Trash-first cleanup.",
    image: IMG_DEFAULT,
    jsonLd: buildBreadcrumbJsonLd([
      { name: "Home", url: `${BASE_URL}/` },
      { name: "Disk Clean Pro Alternative", url: `${BASE_URL}/disk-clean-pro-alternative` },
    ]),
  },
  {
    route: "/trust",
    title: "DiskCleaner Trust Center",
    description: "Evidence and methodology behind DiskCleaner's privacy, safety, notarization, and scan-performance claims.",
    image: IMG_DEFAULT,
    jsonLd: buildTrustJsonLd(`${BASE_URL}/trust`),
  },
  {
    route: "/security",
    title: "DiskCleaner Security",
    description: "DiskCleaner security posture, local-first cleanup model, permissions, data handling, and vulnerability reporting channel.",
    image: IMG_DEFAULT,
    jsonLd: buildBreadcrumbJsonLd([
      { name: "Home", url: `${BASE_URL}/` },
      { name: "Trust Center", url: `${BASE_URL}/trust` },
      { name: "Security", url: `${BASE_URL}/security` },
    ]),
  },
  {
    route: "/changelog",
    title: "DiskCleaner Changelog",
    description: "DiskCleaner changelog with release notes for the latest Mac app updates, including version 26.1.1.0.",
    image: IMG_DEFAULT,
    jsonLd: buildBreadcrumbJsonLd([
      { name: "Home", url: `${BASE_URL}/` },
      { name: "Changelog", url: `${BASE_URL}/changelog` },
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
  const url = canonicalUrl(`${BASE_URL}${page.route}`)
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
    suppressGlobalFaq: page.route !== "/",
    noindex: page.noindex ?? false,
  })
  writeRoute(page.route, html)
  process.stdout.write("✓\n")
}

// ── Step 3: Render blog articles from markdown ───────────────────────────────

console.log(`\n📝 Rendering ${posts.length} blog articles...`)
for (const post of posts) {
  const url = canonicalUrl(`${BASE_URL}/blog/${post.slug}`)
  process.stdout.write(`   /blog/${post.slug} `)

  const body = generateArticleBody(post)
  let html = injectBody(template, body)
  html = applySeo(html, {
    title: `${post.title} — DiskCleaner`,
    description: post.description || post.excerpt || "Learn how DiskCleaner protects your Mac disk space with safe, manual cleanup.",
    url,
    image: IMG_BLOG,
    ogType: "article",
    jsonLd: buildArticleJsonLd(post, url),
    suppressGlobalFaq: true,
  })
  writeRoute(`/blog/${post.slug}`, html)
  process.stdout.write("✓\n")
}

generateSitemap(STATIC_PAGES, posts)

writeIndexNowKey()

const indexNowUrls = [
  `${BASE_URL}/`,
  ...STATIC_PAGES.filter((page) => page.route !== "/" && !page.noindex).map((page) => canonicalUrl(`${BASE_URL}${page.route}`)),
  ...posts.map((post) => canonicalUrl(`${BASE_URL}/blog/${post.slug}`)),
]
await pingIndexNow(indexNowUrls)

console.log(`\n✅ SSG complete — ${STATIC_PAGES.length} pages + ${posts.length} articles (sitemap updated, indexnow attempted)\n`)
