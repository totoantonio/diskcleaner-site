import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getPostBySlug, getRelatedPosts, preloadPostBySlug, type BlogPost } from "../lib/blog"
import { getAuthorProfile } from "../lib/authors"
import { applyPageMetadata, restoreDefaultMetadata, setJsonLd, suppressFaqPageSchema, restoreFaqPageSchema } from "../lib/seo"

function extractHowToSteps(html: string): Array<{ "@type": string; name: string; text: string }> {
  const olMatch = html.match(/<ol>([\s\S]*?)<\/ol>/)
  if (!olMatch) return []
  const liMatches = olMatch[1].match(/<li>([\s\S]*?)<\/li>/g) || []
  return liMatches
    .map(li => li.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim())
    .filter(text => text.length > 10)
    .map(text => ({ "@type": "HowToStep", name: text.slice(0, 80), text }))
}

const COMPARISON_MENTIONS: Record<string, Array<{ "@type": string; name: string; url: string }>> = {
  "cleanmymac-alternative": [
    { "@type": "SoftwareApplication", "name": "CleanMyMac", "url": "https://cleanmymac.com" },
    { "@type": "SoftwareApplication", "name": "AppCleaner", "url": "https://freemacsoft.net/appcleaner/" },
    { "@type": "SoftwareApplication", "name": "Onyx", "url": "https://www.titanium-software.fr/en/onyx.html" },
    { "@type": "SoftwareApplication", "name": "DaisyDisk", "url": "https://daisydiskapp.com" },
  ],
  "macpaw-alternative": [
    { "@type": "SoftwareApplication", "name": "CleanMyMac", "url": "https://cleanmymac.com" },
    { "@type": "Organization", "name": "MacPaw", "url": "https://macpaw.com" },
  ],
  "appcleaner-vs-cleanmymac": [
    { "@type": "SoftwareApplication", "name": "AppCleaner", "url": "https://freemacsoft.net/appcleaner/" },
    { "@type": "SoftwareApplication", "name": "CleanMyMac", "url": "https://cleanmymac.com" },
  ],
  "best-mac-cleaner": [
    { "@type": "SoftwareApplication", "name": "CleanMyMac", "url": "https://cleanmymac.com" },
    { "@type": "SoftwareApplication", "name": "AppCleaner", "url": "https://freemacsoft.net/appcleaner/" },
    { "@type": "SoftwareApplication", "name": "DaisyDisk", "url": "https://daisydiskapp.com" },
    { "@type": "SoftwareApplication", "name": "Onyx", "url": "https://www.titanium-software.fr/en/onyx.html" },
  ],
  "best-mac-cleaner-for-developers": [
    { "@type": "SoftwareApplication", "name": "CleanMyMac", "url": "https://cleanmymac.com" },
    { "@type": "SoftwareApplication", "name": "AppCleaner", "url": "https://freemacsoft.net/appcleaner/" },
  ],
  "one-time-purchase-mac-cleaner": [
    { "@type": "SoftwareApplication", "name": "DaisyDisk", "url": "https://daisydiskapp.com" },
    { "@type": "SoftwareApplication", "name": "Onyx", "url": "https://www.titanium-software.fr/en/onyx.html" },
  ],
  "best-app-uninstaller-for-mac": [
    { "@type": "SoftwareApplication", "name": "AppCleaner", "url": "https://freemacsoft.net/appcleaner/" },
    { "@type": "SoftwareApplication", "name": "CleanMyMac", "url": "https://cleanmymac.com" },
  ],
  "best-one-time-purchase-mac-cleaner": [
    { "@type": "SoftwareApplication", "name": "DaisyDisk", "url": "https://daisydiskapp.com" },
    { "@type": "SoftwareApplication", "name": "Onyx", "url": "https://www.titanium-software.fr/en/onyx.html" },
    { "@type": "SoftwareApplication", "name": "AppCleaner", "url": "https://freemacsoft.net/appcleaner/" },
  ],
}

type ArticleVote = "up" | "down"
type ArticleFeedbackCounts = {
  thumbsUp: number
  thumbsDown: number
  total: number
}

const ARTICLE_FEEDBACK_STORAGE_KEY = "dc:article-feedback"
const ARTICLE_FEEDBACK_API_BASE =
  (import.meta.env.VITE_DISKCLEANER_FEEDBACK_API_BASE as string | undefined)?.replace(/\/$/, "") ||
  (import.meta.env.DEV ? "/api/feedback" : "https://diskcleaner-feedback-api.totoantonio.workers.dev")

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

const ThumbUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 10V5.5A2.5 2.5 0 0 0 11.5 3L8 10v11h9.24a2 2 0 0 0 1.97-1.63l1.1-6A2 2 0 0 0 18.34 11H16a2 2 0 0 1-2-2Z"/>
    <path d="M8 10H4a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h4"/>
  </svg>
)

const ThumbDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 14v4.5A2.5 2.5 0 0 0 12.5 21L16 14V3H6.76a2 2 0 0 0-1.97 1.63l-1.1 6A2 2 0 0 0 5.66 13H8a2 2 0 0 1 2 2Z"/>
    <path d="M16 14h4a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-4"/>
  </svg>
)

function readStoredVotes(): Record<string, ArticleVote> {
  if (typeof window === "undefined") return {}

  try {
    const raw = localStorage.getItem(ARTICLE_FEEDBACK_STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Record<string, ArticleVote>
    return parsed && typeof parsed === "object" ? parsed : {}
  } catch {
    return {}
  }
}

function writeStoredVote(slug: string, vote: ArticleVote) {
  const next = { ...readStoredVotes(), [slug]: vote }
  localStorage.setItem(ARTICLE_FEEDBACK_STORAGE_KEY, JSON.stringify(next))
}

async function sendArticleFeedback({
  slug,
  title,
  vote,
}: {
  slug: string
  title: string
  vote: ArticleVote
}) {
  try {
    await fetch(`${ARTICLE_FEEDBACK_API_BASE}/article-feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        title,
        vote,
        pathname: window.location.pathname,
        url: window.location.href,
        votedAt: new Date().toISOString(),
      }),
    })
  } catch {
    // Local persistence is the baseline. Remote collection is optional.
  }
}

async function fetchArticleFeedbackCounts(slug: string): Promise<ArticleFeedbackCounts | null> {
  try {
    const res = await fetch(`${ARTICLE_FEEDBACK_API_BASE}/article-feedback/${encodeURIComponent(slug)}`)
    if (!res.ok) return null
    const data = await res.json() as Partial<ArticleFeedbackCounts>
    return {
      thumbsUp: Number(data.thumbsUp || 0),
      thumbsDown: Number(data.thumbsDown || 0),
      total: Number(data.total || 0),
    }
  } catch {
    return null
  }
}

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

function ArticleFeedback({ slug, title }: { slug: string; title: string }) {
  const [vote, setVote] = useState<ArticleVote | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [counts, setCounts] = useState<ArticleFeedbackCounts | null>(null)

  useEffect(() => {
    setVote(readStoredVotes()[slug] ?? null)
  }, [slug])

  useEffect(() => {
    let cancelled = false

    void fetchArticleFeedbackCounts(slug).then(data => {
      if (!cancelled && data) setCounts(data)
    })

    return () => {
      cancelled = true
    }
  }, [slug])

  const submitVote = async (nextVote: ArticleVote) => {
    if (vote === nextVote) return

    setVote(nextVote)
    writeStoredVote(slug, nextVote)
    setIsSubmitting(true)

    try {
      await sendArticleFeedback({ slug, title, vote: nextVote })
      const nextCounts = await fetchArticleFeedbackCounts(slug)
      if (nextCounts) setCounts(nextCounts)
    } finally {
      setIsSubmitting(false)
    }
  }

  const buttonClass = (kind: ArticleVote) =>
    `inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[14px] font-medium transition-colors duration-150 ${
      vote === kind
        ? "border-[var(--blue)] bg-[var(--blue-tint)] text-[var(--blue)]"
        : "border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--blue-tint-border)] hover:text-[var(--blue)]"
    }`

  return (
    <section className="mx-auto mt-8 max-w-[860px] rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-6 py-5 sm:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--muted2)]">Article Feedback</p>
          <h2 className="mt-2 text-[20px] font-semibold tracking-[-0.03em] text-[var(--text)]">Was This Article Helpful?</h2>
          <p className="mt-1 text-[14px] leading-6 text-[var(--muted)]">
            Give it a quick thumbs up or down. We save your vote and use it to improve future articles.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => void submitVote("up")} className={buttonClass("up")} disabled={isSubmitting}>
            <ThumbUpIcon />
            Helpful
          </button>
          <button type="button" onClick={() => void submitVote("down")} className={buttonClass("down")} disabled={isSubmitting}>
            <ThumbDownIcon />
            Not Helpful
          </button>
        </div>
      </div>
      {vote && (
        <p className="mt-4 text-[13px] text-[var(--muted)]">
          {vote === "up" ? "Thanks. This article was marked helpful." : "Thanks. This article was marked not helpful."}
        </p>
      )}
      {counts && (
        <p className="mt-2 text-[13px] text-[var(--muted)]">
          {counts.thumbsUp > 0
            ? `${counts.thumbsUp} ${counts.thumbsUp === 1 ? "reader finds" : "readers find"} this helpful`
            : "No helpful votes yet"}
          {counts.thumbsDown > 0 ? ` · ${counts.thumbsDown} not helpful` : ""}
        </p>
      )}
    </section>
  )
}

export default function Article() {
  const { slug } = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const author = post ? getAuthorProfile(post.author) : null

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    let relatedPostsTimer: ReturnType<typeof setTimeout> | undefined

    getPostBySlug(slug).then(p => {
      if (!p || cancelled) return
      setPost(p)
      relatedPostsTimer = setTimeout(() => {
        void getRelatedPosts(p.slug).then(posts => {
          if (!cancelled) setRelatedPosts(posts)
        })
      }, 250)

      const url = `https://www.diskcleaner.pro/blog/${p.slug}/`
      const desc = p.description || p.excerpt
      const image = "https://www.diskcleaner.pro/DiskCleaner_blog.webp"
      const authorProfile = getAuthorProfile(p.author)

      applyPageMetadata({
        title: `${p.title} — DiskCleaner`,
        description: desc,
        url,
        ogType: "article",
        image,
      })

      suppressFaqPageSchema()

      const isHowTo = /^how-to-|^delete-/.test(p.slug)
      const howToSteps = isHowTo ? extractHowToSteps(p.content) : []
      const mentions = COMPARISON_MENTIONS[p.slug]

      const blogPosting: Record<string, unknown> = {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        "headline": p.title,
        "description": desc,
        "abstract": desc,
        "datePublished": p.date,
        "dateModified": p.updatedAt || p.date,
        "url": url,
        "wordCount": p.wordCount,
        "timeRequired": `PT${p.readingTimeMinutes}M`,
        "keywords": [p.category, "DiskCleaner", "Mac cleaner", "macOS storage"],
        "isPartOf": { "@type": "Blog", "@id": "https://www.diskcleaner.pro/blog/#blog" },
        "author": {
          "@type": "Person",
          "name": authorProfile.name,
          "description": authorProfile.role
        },
        "publisher": {
          "@type": "Organization",
          "@id": "https://www.diskcleaner.pro/#organization",
          "name": "DiskCleaner",
          "url": "https://www.diskcleaner.pro/",
          "logo": { "@type": "ImageObject", "url": "https://www.diskcleaner.pro/favicon.png" }
        },
        "mainEntityOfPage": { "@type": "WebPage", "@id": url },
        "articleSection": p.category,
        "inLanguage": "en-US",
        "image": {
          "@type": "ImageObject",
          "url": image,
          "width": 1200,
          "height": 630
        },
        "about": [
          { "@type": "SoftwareApplication", "@id": "https://www.diskcleaner.pro/#software", "name": "DiskCleaner", "url": "https://www.diskcleaner.pro/" },
          { "@type": "Thing", "name": p.category }
        ],
      }
      if (mentions) blogPosting["mentions"] = mentions

      const graph: unknown[] = [
        blogPosting,
        {
          "@type": "BreadcrumbList",
          "@id": `${url}#breadcrumb`,
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.diskcleaner.pro/" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.diskcleaner.pro/blog/" },
            { "@type": "ListItem", "position": 3, "name": p.title, "item": url }
          ]
        }
      ]

      if (isHowTo && howToSteps.length >= 2) {
        graph.push({
          "@type": "HowTo",
          "name": p.title,
          "description": desc,
          "inLanguage": "en-US",
          "step": howToSteps,
        })
      }

      setJsonLd("article-jsonld", { "@context": "https://schema.org", "@graph": graph })
    })

    return () => {
      cancelled = true
      if (relatedPostsTimer) clearTimeout(relatedPostsTimer)
      restoreDefaultMetadata()
      restoreFaqPageSchema()
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

        <Link to="/blog/" className="article-back">
          <ChevronLeft />
          Back to Blog
        </Link>

        <div className="mx-auto mt-8 flex max-w-[960px] flex-col items-center gap-3 text-center">
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
            <span>By {author?.name || post.author}</span>
          </div>
          <ShareButton title={post.title} excerpt={post.excerpt} />
        </div>

        <section className="mx-auto mt-8 max-w-[920px] rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-6 py-5 sm:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--muted2)]">About the Author</p>
          <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[var(--text)]">{author?.name || post.author}</h2>
          <p className="mt-1 text-sm font-medium text-[var(--blue)]">{author?.role || "Contributor"}</p>
          <p className="mt-3 text-[15px] leading-7 text-[var(--muted)]">{author?.bio || "Contributes to DiskCleaner editorial content."}</p>
        </section>

        <article className="mx-auto mt-10 max-w-[920px] rounded-3xl bg-[var(--surface)]">
          <div
            className="blog-content p-5 sm:p-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <ArticleFeedback slug={post.slug} title={post.title} />

        {relatedPosts.length > 0 && (
          <section className="mx-auto mt-10 max-w-[920px] rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-6 py-6 sm:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--muted2)]">Keep Reading</p>
            <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.03em] text-[var(--text)]">Related Mac Cleaner Guides</h2>
            <div className="mt-5 grid gap-3">
              {relatedPosts.map(relatedPost => (
                <Link
                  key={relatedPost.slug}
                  to={`/blog/${relatedPost.slug}/`}
                  onMouseEnter={() => preloadPostBySlug(relatedPost.slug)}
                  onFocus={() => preloadPostBySlug(relatedPost.slug)}
                  onTouchStart={() => preloadPostBySlug(relatedPost.slug)}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface2)] px-4 py-4 no-underline transition-colors hover:border-[var(--blue-tint-border)]"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--blue)]">
                      {relatedPost.category}
                    </span>
                    <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[var(--muted2)]">
                      {relatedPost.readingTimeMinutes} min read
                    </span>
                  </div>
                  <h3 className="mt-2 text-[18px] font-semibold tracking-[-0.02em] text-[var(--text)]">
                    {relatedPost.title}
                  </h3>
                  <p className="mt-1 text-[14px] leading-6 text-[var(--muted)]">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </section>
  )
}
