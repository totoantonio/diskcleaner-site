import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const DIST_DIR = path.join(ROOT, "dist")
const BLOG_CONTENT_DIR = path.join(ROOT, "src", "content", "blog")
const BASE_URL = "https://www.diskcleaner.pro"
const BLOG_SOCIAL_IMAGE = `${BASE_URL}/DiskCleaner_blog.webp`
const LOGO_URL = `${BASE_URL}/macOS%2016pt%202x.png`

function ensureDir(dirPath) {
  mkdirSync(dirPath, { recursive: true })
}

function writeRouteHtml(route, html) {
  const cleanRoute = route.replace(/^\/+|\/+$/g, "")
  if (!cleanRoute) {
    writeFileSync(path.join(DIST_DIR, "index.html"), html)
    return
  }

  const routeDir = path.join(DIST_DIR, cleanRoute)
  ensureDir(routeDir)
  writeFileSync(path.join(routeDir, "index.html"), html)
  writeFileSync(path.join(DIST_DIR, `${cleanRoute}.html`), html)
}

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

function readBlogPosts() {
  return readdirSync(BLOG_CONTENT_DIR)
    .filter(file => file.endsWith(".md"))
    .map(file => {
      const raw = readFileSync(path.join(BLOG_CONTENT_DIR, file), "utf8")
      const data = parseFrontmatter(raw)
      return {
        title: data.title,
        description: data.description,
        excerpt: data.excerpt || data.description,
        date: data.date,
        updatedAt: data.updatedAt || data.updated_at || data.date,
        author: data.author || "DiskCleaner Team",
        category: data.category || "Guide",
        slug: data.slug,
      }
    })
    .filter(post => post.slug && post.title)
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("\"", "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
}

function replaceTitle(html, title) {
  return html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
}

function replaceMetaById(html, id, value) {
  const escaped = escapeHtml(value)
  const tagPattern = new RegExp(`<meta[^>]*id="${id}"[^>]*>`, "m")
  const tag = html.match(tagPattern)?.[0]
  if (!tag) return html

  const nextTag = tag.replace(/content="[^"]*"/, `content="${escaped}"`)
  return html.replace(tag, nextTag)
}

function replaceCanonical(html, url) {
  return html.replace(
    /(<link[^>]*id="canonical-link"[^>]*href=")[^"]*(".*?>)/,
    `$1${escapeHtml(url)}$2`
  )
}

function replaceJsonLd(html, scriptId, json) {
  return html.replace(
    new RegExp(`(<script id="${scriptId}" type="application/ld\\+json">)[\\s\\S]*?(</script>)`),
    `$1\n${JSON.stringify(json, null, 2)}\n    $2`
  )
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
        dateModified: post.updatedAt,
        mainEntityOfPage: url,
        author: {
          "@type": "Person",
          name: post.author,
        },
        publisher: {
          "@type": "Organization",
          name: "DiskCleaner",
          logo: {
            "@type": "ImageObject",
            url: LOGO_URL,
          },
        },
        image: BLOG_SOCIAL_IMAGE,
        articleSection: post.category,
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

function buildCollectionJsonLd(url) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "DiskCleaner Blog",
    description: "Guides, tips, and insights about Mac storage, cache cleaning, and getting the most out of your Mac.",
    url,
  }
}

function buildBreadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      },
    ],
  }
}

function setNoindex(html) {
  return html.replace(
    /<meta name="robots"[^>]*>/,
    `<meta name="robots" content="noindex, nofollow" />`
  )
}

function applySeo(html, seo) {
  let next = html
  next = replaceTitle(next, seo.title)
  next = replaceCanonical(next, seo.url)
  next = replaceMetaById(next, "meta-desc", seo.description)
  next = replaceMetaById(next, "og-type", seo.ogType)
  next = replaceMetaById(next, "og-url", seo.url)
  next = replaceMetaById(next, "og-title", seo.title)
  next = replaceMetaById(next, "og-desc", seo.description)
  next = replaceMetaById(next, "og-image", seo.image)
  next = replaceMetaById(next, "og-image-secure", seo.image)
  next = replaceMetaById(next, "og-image-alt", seo.title)
  next = replaceMetaById(next, "tw-url", seo.url)
  next = replaceMetaById(next, "tw-title", seo.title)
  next = replaceMetaById(next, "tw-desc", seo.description)
  next = replaceMetaById(next, "tw-image", seo.image)
  next = replaceJsonLd(next, "article-jsonld", seo.jsonLd)
  if (seo.noindex) next = setNoindex(next)
  return next
}

if (!existsSync(path.join(DIST_DIR, "index.html"))) {
  throw new Error("dist/index.html not found. Run the Vite build before generating routes.")
}

const templateHtml = readFileSync(path.join(DIST_DIR, "index.html"), "utf8")
const posts = readBlogPosts()

cpSync(path.join(DIST_DIR, "index.html"), path.join(DIST_DIR, "404.html"))
const notFoundHtml = replaceTitle(templateHtml, "404 - Page Not Found | DiskCleaner")
writeFileSync(path.join(DIST_DIR, "404.html"), notFoundHtml)

const staticPages = [
  {
    route: "/about",
    title: "About DiskCleaner",
    description: "Learn what DiskCleaner is, how it approaches Mac cleanup safely, and how to contact the team behind the product.",
  },
  {
    route: "/trust",
    title: "DiskCleaner Trust Center",
    description: "Evidence and methodology behind DiskCleaner's privacy, safety, notarization, and scan-performance claims.",
  },
  {
    route: "/editorial-policy",
    title: "DiskCleaner Editorial Policy",
    description: "How DiskCleaner handles authorship, updates, comparisons, and editorial accuracy across its product and blog content.",
  },
  {
    route: "/help",
    title: "DiskCleaner Help Center",
    description: "DiskCleaner help center covering cleanup categories, troubleshooting, menu bar mode, and common Mac cleaning questions.",
  },
  {
    route: "/privacy-policy",
    title: "DiskCleaner Privacy Policy",
    description: "DiskCleaner privacy policy covering personal information, support requests, and how the website and service handle data.",
    noindex: true,
  },
  {
    route: "/terms-of-service",
    title: "DiskCleaner Terms of Service",
    description: "DiskCleaner terms of service covering website usage, software access, licenses, and support terms.",
    noindex: true,
  },
]

for (const page of staticPages) {
  const url = `${BASE_URL}${page.route}`
  const html = applySeo(templateHtml, {
    title: page.title,
    description: page.description,
    url,
    image: `${BASE_URL}/DiskCleaner_Social.webp`,
    ogType: "website",
    jsonLd: buildBreadcrumbJsonLd([
      { name: "Home", url: BASE_URL },
      { name: page.title.replace("DiskCleaner ", ""), url },
    ]),
  })
  writeRouteHtml(page.route, html)
}

const blogUrl = `${BASE_URL}/blog`
const blogHtml = applySeo(templateHtml, {
  title: "DiskCleaner Blog — Mac Cleaner Guides, Comparisons, and Alternatives",
  description: "Mac cleaner guides, CleanMyMac and MacPaw alternative comparisons, and practical help for reclaiming storage safely on Mac.",
  url: blogUrl,
  image: BLOG_SOCIAL_IMAGE,
  ogType: "website",
  jsonLd: buildCollectionJsonLd(blogUrl),
})
writeRouteHtml("/blog", blogHtml)

for (const post of posts) {
  const articleUrl = `${BASE_URL}/blog/${post.slug}`
  const articleHtml = applySeo(templateHtml, {
    title: post.title,
    description: post.description,
    url: articleUrl,
    image: BLOG_SOCIAL_IMAGE,
    ogType: "article",
    jsonLd: buildArticleJsonLd(post, articleUrl),
  })
  writeRouteHtml(`/blog/${post.slug}`, articleHtml)
}
