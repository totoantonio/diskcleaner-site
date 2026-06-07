import { useEffect } from "react"
import { Link } from "react-router-dom"
import { applyPageMetadata, restoreDefaultMetadata, restoreFaqPageSchema, setJsonLd, suppressFaqPageSchema } from "../lib/seo"

const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function Trust() {
  useEffect(() => {
    const url = "https://www.diskcleaner.pro/trust"
    const description = "Evidence and methodology behind DiskCleaner's privacy, safety, notarization, and scan-performance claims."

    suppressFaqPageSchema()

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
          "description": description,
          "dateModified": "2026-06-02",
          "about": {
            "@type": "SoftwareApplication",
            "@id": "https://www.diskcleaner.pro/#software",
            "name": "DiskCleaner",
            "url": "https://www.diskcleaner.pro/"
          }
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
            },
            {
              "@type": "Question",
              "name": "How can I verify the DiskCleaner download on macOS?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "After installing DiskCleaner in Applications, use codesign --verify, spctl --assess, and xcrun stapler validate to inspect its code signature, Gatekeeper assessment, and stapled notarization ticket."
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

    return () => {
      restoreDefaultMetadata()
      restoreFaqPageSchema()
    }
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
            A clear look at how DiskCleaner approaches safety, privacy, Apple notarization, and performance claims.
          </p>
        </div>

        <article className="mx-auto mt-10 max-w-[860px] rounded-3xl bg-[var(--surface)] px-5 py-6 sm:px-12 sm:py-12">
          <div className="blog-content">
            <h2>Verification Summary</h2>
            <p>
              DiskCleaner is distributed as a signed, Apple-Notarized macOS app. Its cleanup model is review-first and Trash-first: users inspect files before cleanup, and removed items remain recoverable from macOS Trash.
              Scanning and cleaning run locally on the Mac. The current direct-download release supports macOS 13 Ventura through macOS 26 Tahoe on Apple Silicon and Intel Macs.
            </p>
            <p>
              Last reviewed: June 1, 2026. Current release details are listed in the <Link to="/changelog/">DiskCleaner changelog</Link>.
            </p>

            <h2>1. Trash-First Safety</h2>
            <p>
              DiskCleaner is built around a review-first workflow. You see what was found before anything moves, and cleanup actions are designed to go through macOS Trash instead of permanent deletion.
              That means removed items remain recoverable and cleanup stays visible rather than hidden behind a one-click black box.
            </p>

            <h2>2. Privacy and Network Behavior</h2>
            <p>
              DiskCleaner is positioned as a local-first utility. Cleanup does not depend on creating an account, and the product messaging is built around keeping scanning and cleaning on your Mac rather than turning storage cleanup into a cloud service.
              Privacy matters most when a utility can inspect thousands of files, so the standard here is simple: explain what the app reads, explain what it avoids, and keep that scope narrow.
            </p>

            <h2>3. Apple Notarization and Gatekeeper</h2>
            <p>
              DiskCleaner is presented as Apple-Notarized software that passes Gatekeeper. For Mac users, that matters because notarization is one of the clearest trust signals available for independent software distribution.
              As new builds ship, this page will continue to be the place where release and trust-related status is kept clear and easy to verify.
            </p>

            <h2>4. How to Verify the Downloaded App</h2>
            <p>
              macOS includes command-line tools that let you independently inspect the downloaded app after dragging it to Applications. These checks read the installed app signature, Gatekeeper assessment, and stapled notarization ticket:
            </p>
            <pre><code>{`codesign --verify --deep --strict --verbose=2 /Applications/DiskCleaner.app
spctl --assess --type execute --verbose=2 /Applications/DiskCleaner.app
xcrun stapler validate /Applications/DiskCleaner.app`}</code></pre>
            <p>
              Download the current build from the <a href="/downloads/DiskCleaner-macOS.dmg">official DiskCleaner DMG</a>.
            </p>

            <h2>5. Scan-Performance Methodology</h2>
            <p>
              Performance claims are most useful when they are repeatable. Scan timing depends on the Mac model, macOS version, storage condition, and the amount of cache or developer data on disk.
              When DiskCleaner publishes scan-speed guidance, the goal is to describe the kind of workload behind the number so users understand what “fast” means in practice. For practical storage scenarios, see our guides on{" "}
              <Link to="/blog/how-to-free-up-storage-on-mac/">how to free up storage on Mac</Link>,{" "}
              <Link to="/blog/what-is-system-data-mac/">what System Data on Mac means</Link>, and{" "}
              <Link to="/blog/which-xcode-folders-are-safe-to-delete/">which Xcode folders are safe to delete</Link>.
            </p>

            <h2>6. What DiskCleaner Does Not Touch</h2>
            <p>
              Trust is not only about what a cleaner removes. It is also about what it refuses to touch.
              DiskCleaner blocks protected paths from deletion, never pre-selects risky or personal findings, and keeps passwords and protected system locations out of the cleanup flow. Its iCloud-safe scanning also skips iCloud placeholder files and sync daemon caches so iCloud Drive can keep syncing normally while a scan runs. That boundary matters just as much as the cleanup features themselves.
            </p>

            <h2>7. Technical Security Documentation</h2>
            <p>
              For readers who want a more technical summary of DiskCleaner&apos;s security posture and disclosure path, the repository also includes a dedicated
              {" "}
              <Link to="/security/">SECURITY.md</Link>
              {" "}
              document.
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}
