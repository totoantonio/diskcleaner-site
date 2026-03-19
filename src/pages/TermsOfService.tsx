import { useEffect } from "react"
import { TosContent } from "../components/SiteModal"
import { applyPageMetadata, restoreDefaultMetadata, setJsonLd } from "../lib/seo"

export default function TermsOfService() {
  useEffect(() => {
    const url = "https://www.diskcleaner.pro/terms-of-service"
    const description = "DiskCleaner terms of service covering website usage, software access, licenses, and support terms."

    applyPageMetadata({
      title: "DiskCleaner Terms of Service",
      description,
      url,
    })

    setJsonLd("article-jsonld", {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "name": "DiskCleaner Terms of Service",
          "url": url,
          "description": description
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.diskcleaner.pro/" },
            { "@type": "ListItem", "position": 2, "name": "Terms of Service", "item": url }
          ]
        }
      ]
    })

    return () => restoreDefaultMetadata()
  }, [])

  return (
    <section className="bg-[var(--bg)] py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <div className="mx-auto mb-8 flex max-w-[760px] flex-col items-center gap-4 text-center">
          <span className="rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-3 py-1 text-xs font-semibold tracking-[0.01em] text-[var(--blue)]">Legal</span>
          <h1 className="text-balance text-4xl font-bold tracking-[-0.04em] text-[var(--text)] sm:text-5xl">Terms of Service</h1>
        </div>

        <article className="mx-auto max-w-[1040px]">
          <div className="px-2 text-[15px] leading-7 text-[var(--muted)] sm:px-4">
            <TosContent />
          </div>
        </article>
      </div>
    </section>
  )
}
