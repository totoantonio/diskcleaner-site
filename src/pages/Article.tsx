import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getPostBySlug, type BlogPost } from "../lib/blog"

const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ShareIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
    <polyline points="16 6 12 2 8 6"/>
    <line x1="12" y1="2" x2="12" y2="15"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

function ShareButton({ title, excerpt }: { title: string; excerpt: string }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try { await navigator.share({ title, text: excerpt, url }) } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-[13px] font-medium text-[var(--text)] transition-colors duration-150 hover:border-[var(--blue)] hover:text-[var(--blue)]"
    >
      {copied ? <CheckIcon /> : <ShareIcon />}
      {copied ? "Link Copied" : "Share"}
    </button>
  )
}

export default function Article() {
  const { slug } = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    if (!slug) return
    getPostBySlug(slug).then(p => {
      if (!p) return
      setPost(p)

      const url = `https://www.diskcleaner.pro/blog/${p.slug}`
      const desc = p.description || p.excerpt
      const image = "https://www.diskcleaner.pro/DiskCleaner_blog.webp"

      // Title + meta description
      document.title = `${p.title} — DiskCleaner`
      const setContent = (id: string, value: string) => {
        const el = document.getElementById(id)
        if (el) el.setAttribute("content", value)
      }
      const setHref = (id: string, value: string) => {
        const el = document.getElementById(id)
        if (el) el.setAttribute("href", value)
      }
      setContent("meta-desc", desc)
      setHref("canonical-link", url)

      // Open Graph
      setContent("og-type", "article")
      setContent("og-url", url)
      setContent("og-title", p.title)
      setContent("og-desc", desc)
      setContent("og-image", image)
      setContent("og-image-secure", image)
      setContent("og-image-alt", p.title)

      // Twitter
      setContent("tw-url", url)
      setContent("tw-title", p.title)
      setContent("tw-desc", desc)
      setContent("tw-image", image)

      // JSON-LD
      const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": p.title,
        "description": desc,
        "datePublished": p.date,
        "dateModified": p.updatedAt || p.date,
        "author": { "@type": "Organization", "name": "DiskCleaner", "url": "https://www.diskcleaner.pro/" },
        "publisher": {
          "@type": "Organization",
          "name": "DiskCleaner",
          "url": "https://www.diskcleaner.pro/",
          "logo": { "@type": "ImageObject", "url": "https://www.diskcleaner.pro/favicon.png" }
        },
        "url": url,
        "mainEntityOfPage": { "@type": "WebPage", "@id": url },
        "articleSection": p.category,
        "inLanguage": "en-US",
        "image": image
      }
      const el = document.getElementById("article-jsonld")
      if (el) el.textContent = JSON.stringify(schema)
    })

    return () => {
      // Restore homepage defaults when navigating away
      document.title = "DiskCleaner for Mac – Secure, Fast, Minimal Cache Cleaner"
      const setContent = (id: string, value: string) => {
        const el = document.getElementById(id)
        if (el) el.setAttribute("content", value)
      }
      const setHref = (id: string, value: string) => {
        const el = document.getElementById(id)
        if (el) el.setAttribute("href", value)
      }
      setContent("meta-desc", "DiskCleaner is a focused macOS cleaner that scans cache and clutter safely, shows every file before it moves, and sends everything to Trash. Private, fast, and beautifully simple.")
      setHref("canonical-link", "https://www.diskcleaner.pro/")
      setContent("og-type", "website")
      setContent("og-url", "https://www.diskcleaner.pro/")
      setContent("og-title", "DiskCleaner for Mac – Secure. Fast. Minimal.")
      setContent("og-desc", "See every file before it moves. Clean only what you approve. Everything goes to Trash, never permanent.")
      setContent("og-image", "https://www.diskcleaner.pro/DiskCleaner_Social.webp")
      setContent("og-image-secure", "https://www.diskcleaner.pro/DiskCleaner_Social.webp")
      setContent("og-image-alt", "DiskCleaner for Mac – Secure. Fast. Minimal.")
      setContent("tw-url", "https://www.diskcleaner.pro/")
      setContent("tw-title", "DiskCleaner for Mac – Secure. Fast. Minimal.")
      setContent("tw-desc", "A private, local-first macOS cleaner that shows every file before it moves. Everything goes to Trash.")
      setContent("tw-image", "https://www.diskcleaner.pro/DiskCleaner_Social.webp")
    }
  }, [slug])

  if (!post) {
    return (
      <section className="bg-[var(--bg)] py-16 sm:py-24">
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
          <p className="text-center text-sm text-[var(--muted)]">Loading article...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[var(--bg)] py-12 sm:py-20">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-12">

        <Link to="/blog" className="article-back">
          <ChevronLeft />
          Back to Blog
        </Link>

        <div className="mx-auto mt-8 flex max-w-[860px] flex-col items-center gap-3 text-center">
          <span className="rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-3 py-1 text-xs font-semibold tracking-[0.01em] text-[var(--blue)]">
            {post.category}
          </span>
          <h1 className="article-title text-balance">{post.title}</h1>
          <p className="article-excerpt">{post.excerpt}</p>
          <div className="article-meta">
            <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            {post.updatedAt && (
              <>
                <span className="article-meta-sep">·</span>
                <span>Updated {new Date(post.updatedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              </>
            )}
            <span className="article-meta-sep">·</span>
            <span>{post.readingTimeMinutes} min read</span>
            <span className="article-meta-sep">·</span>
            <span>{post.wordCount.toLocaleString()} words</span>
            <span className="article-meta-sep">·</span>
            <span>By {post.author}</span>
          </div>
          <ShareButton title={post.title} excerpt={post.excerpt} />
        </div>

        <article className="mx-auto mt-10 max-w-[860px] rounded-3xl bg-[var(--surface)]">
          <div
            className="blog-content p-5 sm:p-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

      </div>
    </section>
  )
}
