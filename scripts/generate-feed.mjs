/**
 * generate-feed.mjs
 * Reads all blog markdown files, parses frontmatter, and writes RSS 2.0
 * to dist/feed.xml (deployed) and public/feed.xml (local dev server).
 *
 * Runs automatically as part of postbuild: "node scripts/generate-feed.mjs && node scripts/ssg.mjs"
 */

import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, "..")
const BLOG_DIR = join(ROOT, "src", "content", "blog")
const SITE_URL = "https://www.diskcleaner.pro"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const raw = match[1]
  const result = {}
  for (const line of raw.split(/\r?\n/)) {
    const colon = line.indexOf(":")
    if (colon === -1) continue
    const key = line.slice(0, colon).trim()
    const val = line.slice(colon + 1).trim().replace(/^["']|["']$/g, "")
    result[key] = val
  }
  return result
}

function xmlEscape(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function toRfc822(dateStr) {
  const d = new Date(dateStr + "T12:00:00Z")
  return d.toUTCString().replace(/GMT$/, "+0000")
}

// ---------------------------------------------------------------------------
// Load and sort posts
// ---------------------------------------------------------------------------

const files = readdirSync(BLOG_DIR).filter(f => f.endsWith(".md"))

const posts = files
  .map(file => {
    const content = readFileSync(join(BLOG_DIR, file), "utf-8")
    return parseFrontmatter(content)
  })
  .filter(p => p.title && p.date && p.slug)
  .sort((a, b) => new Date(b.date) - new Date(a.date))

// ---------------------------------------------------------------------------
// Build XML
// ---------------------------------------------------------------------------

const now = new Date().toUTCString().replace(/GMT$/, "+0000")

const items = posts.map(p => `
    <item>
      <title>${xmlEscape(p.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${p.slug}</guid>
      <description>${xmlEscape(p.description || p.excerpt || "")}</description>
      <pubDate>${toRfc822(p.date)}</pubDate>
      <dc:creator>DiskCleaner</dc:creator>
      <category>${xmlEscape(p.category || "Mac Tips")}</category>
    </item>`).join("\n")

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>DiskCleaner Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Mac cleaner guides, CleanMyMac and MacPaw alternative comparisons, and practical help for reclaiming storage safely on Mac.</description>
    <language>en-us</language>
    <copyright>DiskCleaner</copyright>
    <managingEditor>customersupport@diskcleaner.pro (DiskCleaner)</managingEditor>
    <webMaster>customersupport@diskcleaner.pro (DiskCleaner)</webMaster>
    <lastBuildDate>${now}</lastBuildDate>
    <ttl>1440</ttl>
    <image>
      <url>${SITE_URL}/favicon.png</url>
      <title>DiskCleaner Blog</title>
      <link>${SITE_URL}/blog</link>
    </image>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />\n${items}
  </channel>
</rss>
`

// ---------------------------------------------------------------------------
// Write output
// ---------------------------------------------------------------------------

const distDir = join(ROOT, "dist")
if (existsSync(distDir)) {
  writeFileSync(join(distDir, "feed.xml"), xml, "utf-8")
  console.log("✓ dist/feed.xml written (" + posts.length + " posts)")
}

// Also keep public/feed.xml fresh for the dev server
writeFileSync(join(ROOT, "public", "feed.xml"), xml, "utf-8")
console.log("✓ public/feed.xml written (" + posts.length + " posts)")
