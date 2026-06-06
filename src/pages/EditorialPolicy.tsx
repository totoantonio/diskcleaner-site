import { useEffect } from "react"
import { Link } from "react-router-dom"
import { applyPageMetadata, restoreDefaultMetadata, setJsonLd } from "../lib/seo"

const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function EditorialPolicy() {
  useEffect(() => {
    const url = "https://www.diskcleaner.pro/editorial-policy"
    const description = "How DiskCleaner handles authorship, updates, comparisons, and editorial accuracy across its product and blog content."

    applyPageMetadata({
      title: "DiskCleaner Editorial Policy",
      description,
      url,
    })

    setJsonLd("article-jsonld", {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "name": "DiskCleaner Editorial Policy",
          "url": url,
          "description": description
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.diskcleaner.pro/" },
            { "@type": "ListItem", "position": 2, "name": "Editorial Policy", "item": url }
          ]
        }
      ]
    })

    return () => restoreDefaultMetadata()
  }, [])

  return (
    <section className="bg-[var(--bg)] py-12 sm:py-20">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-12">
        <Link to="/" className="article-back">
          <ChevronLeft />
          Back to Home
        </Link>

        <div className="mx-auto mt-8 flex max-w-[860px] flex-col items-center gap-3 text-center">
          <span className="rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-3 py-1 text-xs font-semibold tracking-[0.01em] text-[var(--blue)]">
            Editorial Policy
          </span>
          <h1 className="article-title text-balance">How DiskCleaner publishes product and comparison content.</h1>
          <p className="article-excerpt">
            A simple overview of how DiskCleaner handles bylines, updates, product claims, and comparison content across the site.
          </p>
        </div>

        <article className="mx-auto mt-10 max-w-[860px] rounded-3xl bg-[var(--surface)] px-5 py-6 sm:px-12 sm:py-12">
          <div className="blog-content">
            <h2>Authorship</h2>
            <p>
              Every article on the site is published with a byline. Where relevant, article pages also include author context so readers can see who wrote the piece and what kind of content they focus on.
            </p>

            <h2>Updates</h2>
            <p>
              Articles include publication dates, and pages may also note updates when meaningful changes are made. Comparison pages and technical claims are intended to stay current as pricing, platform support, and product behavior change over time.
            </p>

            <h2>Comparisons and Product Claims</h2>
            <p>
              DiskCleaner’s comparison content aims to separate observable product behavior, public pricing, and editorial opinion as clearly as possible. When claims rely on public documentation or vendor pages, they should reflect the most current information available at the time of publication or update.
            </p>

            <h2>Corrections</h2>
            <p>
              If a factual error is found in pricing, compatibility, support policy, or feature coverage, the goal is to correct the page promptly and keep the published information accurate.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about content accuracy or corrections can be sent to <a href="mailto:customersupport@diskcleaner.pro">customersupport@diskcleaner.pro</a>.
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}
