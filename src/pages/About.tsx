import { useEffect } from "react"
import { Link } from "react-router-dom"
import { applyPageMetadata, restoreDefaultMetadata, setJsonLd } from "../lib/seo"

const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const principles = [
  "Show every file before anything moves.",
  "Use macOS Trash as the safety model, not permanent deletion.",
  "Keep the app local-first and lightweight.",
  "Focus on the cleanup jobs Mac users actually need.",
]

export default function About() {
  useEffect(() => {
    const url = "https://www.diskcleaner.pro/about"
    const description = "Learn what DiskCleaner is, how it approaches Mac cleanup safely, and how to contact the team behind the product."

    applyPageMetadata({
      title: "About DiskCleaner",
      description,
      url,
    })

    setJsonLd("article-jsonld", {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "AboutPage",
          "name": "About DiskCleaner",
          "url": url,
          "description": description,
          "about": {
            "@type": "SoftwareApplication",
            "name": "DiskCleaner",
            "operatingSystem": "macOS",
            "applicationCategory": "UtilityApplication",
            "url": "https://www.diskcleaner.pro/"
          }
        },
        {
          "@type": "Organization",
          "name": "DiskCleaner",
          "url": "https://www.diskcleaner.pro/",
          "logo": "https://www.diskcleaner.pro/favicon.png",
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "contactType": "customer support",
              "email": "customersupport@diskcleaner.pro",
              "url": "https://www.diskcleaner.pro/help"
            }
          ]
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.diskcleaner.pro/" },
            { "@type": "ListItem", "position": 2, "name": "About", "item": url }
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
            About
          </span>
          <h1 className="article-title text-balance">What DiskCleaner is trying to do.</h1>
          <p className="article-excerpt">
            DiskCleaner is a Mac cleanup utility built around one idea: users should be able to see exactly what will move before any cleanup happens.
          </p>
        </div>

        <article className="mx-auto mt-10 max-w-[860px] rounded-3xl bg-[var(--surface)] px-5 py-6 sm:px-12 sm:py-12">
          <div className="blog-content">
            <h2>Why DiskCleaner exists</h2>
            <p>
              Many Mac cleaner apps optimize for speed and automation first. DiskCleaner takes the opposite position: visibility and reversibility come first.
              The goal is to help people recover space without turning cleanup into a black box.
            </p>

            <h2>How the product is designed</h2>
            <ul>
              {principles.map(principle => (
                <li key={principle}>{principle}</li>
              ))}
            </ul>

            <h2>What DiskCleaner covers</h2>
            <p>
              DiskCleaner focuses on common Mac cleanup categories such as caches, logs, screenshots, Trash contents, developer data, and leftover files from removed apps.
              It also includes tools such as app uninstallation support and a menu bar disk-space view so users can act on storage pressure more quickly.
            </p>

            <h2>Privacy and safety stance</h2>
            <p>
              The site and product messaging consistently position DiskCleaner as local-first. Cleanup actions are reviewed before execution, and the primary safety model is to move items to Trash instead of permanently deleting them.
            </p>

            <h2>Contact</h2>
            <p>
              Support and product questions: <a href="mailto:customersupport@diskcleaner.pro">customersupport@diskcleaner.pro</a><br />
              Help center: <a href="/help">diskcleaner.pro/help</a>
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}
