import { useEffect } from "react"
import { PrivacyContent } from "../components/SiteModal"
import { applyPageMetadata, restoreDefaultMetadata, setJsonLd } from "../lib/seo"

export default function PrivacyPolicy() {
  useEffect(() => {
    const url = "https://www.diskcleaner.pro/privacy-policy"
    const description = "DiskCleaner privacy policy covering personal information, support requests, and how the website and service handle data."

    // noindex — legal pages waste crawl budget and occupy indexed slots
    const robotsMeta = document.querySelector('meta[name="robots"]')
    if (robotsMeta) robotsMeta.setAttribute("content", "noindex, nofollow")

    applyPageMetadata({
      title: "DiskCleaner Privacy Policy",
      description,
      url,
    })

    setJsonLd("article-jsonld", {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "name": "DiskCleaner Privacy Policy",
          "url": url,
          "description": description
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.diskcleaner.pro/" },
            { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": url }
          ]
        }
      ]
    })

    return () => {
      const robotsMeta = document.querySelector('meta[name="robots"]')
      if (robotsMeta) robotsMeta.setAttribute("content", "index, follow, max-image-preview:large")
      restoreDefaultMetadata()
    }
  }, [])

  return (
    <section className="bg-[var(--bg)] py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <div className="mx-auto mb-8 flex max-w-[760px] flex-col items-center gap-4 text-center">
          <span className="rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-3 py-1 text-xs font-semibold tracking-[0.01em] text-[var(--blue)]">Legal</span>
          <h1 className="text-balance text-4xl font-bold tracking-[-0.04em] text-[var(--text)] sm:text-5xl">Privacy Policy</h1>
        </div>

        <article className="mx-auto max-w-[1040px]">
          <div className="px-2 text-[15px] leading-7 text-[var(--muted)] sm:px-4">
            <PrivacyContent />
          </div>
        </article>
      </div>
    </section>
  )
}
