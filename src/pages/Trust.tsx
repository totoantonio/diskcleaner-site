import { useEffect } from "react"
import { Link } from "react-router-dom"
import { applyPageMetadata, restoreDefaultMetadata, setJsonLd } from "../lib/seo"

const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function Trust() {
  useEffect(() => {
    const url = "https://www.diskcleaner.pro/trust"
    const description = "Evidence and methodology behind DiskCleaner's privacy, safety, notarization, and scan-performance claims."

    applyPageMetadata({
      title: "DiskCleaner Trust Center",
      description,
      url,
    })

    setJsonLd("article-jsonld", {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "name": "DiskCleaner Trust Center",
          "url": url,
          "description": description
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How does DiskCleaner handle file removal?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "DiskCleaner is positioned as a Trash-first cleaner. The site describes cleanup as review-driven and recoverable rather than permanent deletion."
              }
            },
            {
              "@type": "Question",
              "name": "What privacy model does DiskCleaner claim?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "DiskCleaner is described as local-first, with no analytics or background telemetry during scanning and cleaning."
              }
            }
          ]
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.diskcleaner.pro/" },
            { "@type": "ListItem", "position": 2, "name": "Trust Center", "item": url }
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
            Trust Center
          </span>
          <h1 className="article-title text-balance">How DiskCleaner backs up its claims.</h1>
          <p className="article-excerpt">
            This page explains the evidence model behind DiskCleaner’s safety, privacy, notarization, and performance messaging.
          </p>
        </div>

        <article className="mx-auto mt-10 max-w-[860px] rounded-3xl bg-[var(--surface)] px-5 py-6 sm:px-12 sm:py-12">
          <div className="blog-content">
            <h2>1. Trash-first safety</h2>
            <p>
              DiskCleaner’s public product position is that users review files before cleanup and that removed items go through macOS Trash instead of permanent deletion. That reduces the risk of silent, irreversible cleanup actions.
            </p>

            <h2>2. Privacy and network behavior</h2>
            <p>
              The site states that DiskCleaner is local-first, requires no account for cleanup, and does not run analytics or telemetry during scanning and cleaning. If you publish future product documentation, this should be paired with a versioned privacy and network behavior note.
            </p>

            <h2>3. Apple notarization and Gatekeeper</h2>
            <p>
              The site currently claims Apple notarization and Gatekeeper compliance. The next trust step is to publish a lightweight release status note whenever the shipping build changes so users and reviewers can verify what build was notarized.
            </p>

            <h2>4. Scan-performance methodology</h2>
            <p>
              Performance claims such as quick scan time should be tied to repeatable test conditions: hardware class, macOS version, sample cache sizes, and whether the run was cold or warm. This page is the right place to keep that methodology current.
            </p>

            <h2>5. What DiskCleaner does not touch</h2>
            <p>
              Strong trust comes from negative scope as much as positive scope. DiskCleaner should keep publishing exactly which file classes it avoids, including personal documents, passwords, and protected system locations.
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}
