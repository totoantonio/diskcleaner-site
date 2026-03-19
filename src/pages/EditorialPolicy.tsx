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
            This page explains how bylines, updates, product claims, and comparison content are handled across DiskCleaner’s website.
          </p>
        </div>

        <article className="mx-auto mt-10 max-w-[860px] rounded-3xl bg-[var(--surface)] px-5 py-6 sm:px-12 sm:py-12">
          <div className="blog-content">
            <h2>Authorship</h2>
            <p>
              Each blog article is published with an explicit byline. Author profiles are shown on article pages so readers and crawlers can associate content with a named contributor rather than an anonymous brand page.
            </p>

            <h2>Updates</h2>
            <p>
              Articles should include publication dates and update dates when material changes are made. Comparison content and technical claims should be revisited when pricing, platform support, or product behavior changes.
            </p>

            <h2>Comparisons and product claims</h2>
            <p>
              Comparison articles should clearly separate measured behavior, public pricing, and editorial interpretation. Where claims are based on public product pages or documentation, they should be checked again before updates are published.
            </p>

            <h2>Corrections</h2>
            <p>
              If a factual error is found in pricing, support policy, compatibility, or feature coverage, the preferred correction path is to update the article and reflect the corrected date on the page.
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
