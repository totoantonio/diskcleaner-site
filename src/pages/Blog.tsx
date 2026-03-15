import { useEffect, useState, type ReactElement } from "react"
import { Link } from "react-router-dom"
import { getAllPosts, type BlogPost } from "../lib/blog"

// SF Symbol-style icons as SVG — matches Apple's Xcode "What's New" style
const postIcons: Record<string, ReactElement> = {
  "how-diskcleaner-works": (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M14 9v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "what-is-system-data-mac": (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="6" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M4 11h20" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M9 16h4M9 19h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  "become-diskcleaner-affiliate": (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
      <path d="M14 4l2.5 5 5.5.8-4 3.9.9 5.5L14 16.5l-4.9 2.7.9-5.5L6 9.8l5.5-.8L14 4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  "why-trash-first-cleanup-matters": (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
      <path d="M9 6h10l-1 14H10L9 6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M6 6h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M11 6V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M14 10v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="21" cy="21" r="4" fill="var(--blue)" stroke="none"/>
      <path d="M21 19.5v1.5l1 1" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

const defaultIcon: ReactElement = (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
    <path d="M6 8h16M6 14h10M6 20h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    getAllPosts().then(setPosts)
  }, [])

  return (
    <section className="bg-[var(--bg)] py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">

        <div className="mx-auto mb-14 flex max-w-[760px] flex-col items-center gap-4 text-center">
          <span className="rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-3 py-1 text-xs font-semibold tracking-[0.01em] text-[var(--blue)]">
            Blog
          </span>
          <h1 className="text-balance text-[clamp(36px,4vw,58px)] font-bold leading-[1.06] tracking-[-0.045em] text-[var(--text)]">
            Updates that matter.
          </h1>
          <p className="text-[clamp(16px,1.6vw,19px)] leading-[1.6] tracking-[-0.01em] text-[var(--muted)]">
            Guides, releases, and insights about building a cleaner macOS experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {posts.map((post, i) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="no-underline">
              <article
                className={`group flex gap-5 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-[rgba(0,113,227,.25)] hover:shadow-[0_16px_48px_var(--shadow-lg)] sm:gap-6 sm:p-7 d${Math.min(i + 1, 5)}`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] text-[var(--blue)]" style={{ marginTop: 3 }}>
                  {postIcons[post.slug] ?? defaultIcon}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--blue)]">
                      {post.category}
                    </span>
                    <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[var(--muted2)]">
                      {post.readingTimeMinutes} min read
                    </span>
                    <span className="text-[11px] text-[var(--muted2)] opacity-40">·</span>
                    <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[var(--muted2)]">
                      {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>

                  <h2 className="mt-2.5 text-[clamp(18px,1.8vw,22px)] font-bold leading-[1.22] tracking-[-0.03em] text-[var(--text)]">
                    {post.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-[15px] leading-[1.65] tracking-[-0.01em] text-[var(--muted)]">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold tracking-[-0.01em] text-[var(--blue)] transition-[gap] duration-150 group-hover:gap-2.5">
                    Read article
                    <ChevronRight />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
