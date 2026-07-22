import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ChangelogContent } from "../components/SiteModal"
import { applyPageMetadata, restoreDefaultMetadata, setJsonLd } from "../lib/seo"

const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function Changelog() {
  useEffect(() => {
    const url = "https://www.diskcleaner.pro/changelog"
    const description = "DiskCleaner changelog with release notes for the latest Mac app updates, including version 26.1.1.4."

    applyPageMetadata({
      title: "DiskCleaner Changelog",
      description,
      url,
    })

    setJsonLd("article-jsonld", {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "name": "DiskCleaner Changelog",
          "url": url,
          "description": description,
          "about": {
            "@type": "SoftwareApplication",
            "name": "DiskCleaner",
            "operatingSystem": "macOS",
            "applicationCategory": "UtilityApplication"
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.diskcleaner.pro/" },
            { "@type": "ListItem", "position": 2, "name": "Changelog", "item": url }
          ]
        }
      ]
    })

    return () => restoreDefaultMetadata()
  }, [])

  return (
    <section className="bg-[var(--bg)] py-12 sm:py-20">
      <div className="mx-auto w-full max-w-[960px] px-4 md:px-12">
        <Link to="/" className="article-back">
          <ChevronLeft />
          Back to Home
        </Link>

        <div className="mx-auto mt-8 flex max-w-[760px] flex-col items-center gap-3 text-center">
          <span className="rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-3 py-1 text-xs font-semibold tracking-[0.01em] text-[var(--blue)]">
            Changelog
          </span>
          <h1 className="article-title text-balance">DiskCleaner release notes.</h1>
          <p className="article-excerpt">
            Latest product updates, release notes, installation notes, and notarization status for the direct Mac download.
          </p>
        </div>

        <article className="mx-auto mt-10 max-w-[760px]">
          <ChangelogContent />
        </article>
      </div>
    </section>
  )
}
