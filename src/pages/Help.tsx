import { useEffect } from "react"
import { Link } from "react-router-dom"
import { applyPageMetadata, restoreDefaultMetadata, restoreFaqPageSchema, setJsonLd, suppressFaqPageSchema } from "../lib/seo"

const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const sections = [
  { id: "what-gets-cleaned", label: "What Gets Cleaned" },
  { id: "how-to-use",        label: "How to Use" },
  { id: "troubleshooting",   label: "Troubleshooting" },
  { id: "keyboard-shortcuts", label: "Keyboard Shortcuts" },
]

export default function Help() {
  useEffect(() => {
    const url = "https://www.diskcleaner.pro/help"
    const description = "DiskCleaner help center covering Quick Scan, Deep Scan, RAM Optimizer, App Uninstaller, safety labels, and common Mac cleaning questions."

    suppressFaqPageSchema()

    applyPageMetadata({
      title: "DiskCleaner Help Center",
      description,
      url,
    })

    setJsonLd("article-jsonld", {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What does DiskCleaner clean?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "DiskCleaner scans seven categories in Quick Scan: App Cache, Browser Cache (9 browsers, all profiles), Screenshots, Trash Contents, System Logs, Developer Data (Xcode, Simulators, CocoaPods, npm), and App Leftovers from uninstalled apps. Deep Scan adds Downloads, iOS backups, Mail attachments, and external drive review."
              }
            },
            {
              "@type": "Question",
              "name": "Does DiskCleaner require Full Disk Access or administrator permission?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Some categories may require Full Disk Access or standard macOS administrator approval, depending on what you choose to review and move to Trash. DiskCleaner uses the normal macOS permission flow and does not ask you to bypass it."
              }
            },
            {
              "@type": "Question",
              "name": "What is the difference between Quick Scan and Deep Scan?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Quick Scan is the fast everyday pass covering the most common clutter categories. Deep Scan expands into larger, more review-sensitive storage areas including Downloads, iOS backups, Mail attachments, and external drives. The best workflow is to run Quick Scan regularly and use Deep Scan when storage pressure is real or you need a broader audit."
              }
            },
            {
              "@type": "Question",
              "name": "Does DiskCleaner delete files permanently?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. DiskCleaner never permanently deletes files as part of normal cleanup. Every file moves to macOS Trash, where you can review or restore it at any time. DiskCleaner also shows you every file before anything moves."
              }
            },
            {
              "@type": "Question",
              "name": "Why does DiskCleaner show 0 MB found?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "This is normal on a freshly cleaned or new Mac. macOS caches rebuild as you use your apps — try scanning again after a day of normal use."
              }
            },
            {
              "@type": "Question",
              "name": "An app is slow after cleaning. What should I do?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Apps may feel slightly slower the first time they launch after their cache is removed — this is expected. Performance returns to normal within a minute as the cache rebuilds. If an app continues to behave oddly, restarting it or your Mac usually resolves it."
              }
            },
            {
              "@type": "Question",
              "name": "How much does DiskCleaner cost?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "DiskCleaner includes 3 free scans. After that, Pro unlocks with a one-time license of $9.99 for up to 2 Macs, with all future updates included. No subscription required."
              }
            },
            {
              "@type": "Question",
              "name": "Can I get a Gatekeeper warning when opening DiskCleaner?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "If macOS shows DiskCleaner cannot be opened because it is from an unidentified developer, go to System Settings → Privacy & Security, scroll down, and click Open Anyway next to the DiskCleaner entry."
              }
            }
          ]
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.diskcleaner.pro/" },
            { "@type": "ListItem", "position": 2, "name": "Help Center", "item": url }
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

        {/* Header */}
        <div className="mx-auto mt-8 flex max-w-[860px] flex-col items-center gap-3 text-center">
          <span className="rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-3 py-1 text-xs font-semibold tracking-[0.01em] text-[var(--blue)]">
            Help Center
          </span>
          <h1 className="article-title text-balance">DiskCleaner Help</h1>
          <p className="article-excerpt">Everything you need to get the most out of DiskCleaner — what Quick Scan and Deep Scan cover, how review labels work, and how to use the latest cleanup tools safely.</p>
        </div>

        {/* Table of Contents */}
        <nav aria-label="Help sections" className="mx-auto mt-8 max-w-[860px] rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--muted2)]">On this page</p>
          <ol className="flex flex-col gap-2 pl-0 list-none">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="flex items-center gap-2.5 text-[14px] text-[var(--blue)] no-underline hover:underline"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--blue-tint)] text-[11px] font-semibold text-[var(--blue)]">{i + 1}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Article body */}
        <article className="mx-auto mt-6 max-w-[860px] rounded-3xl bg-[var(--surface)]">
          <div className="blog-content p-5 sm:p-12">

            {/* ── Section 1 ── */}
            <h2 id="what-gets-cleaned">What Gets Cleaned — and What's Safe</h2>
            <p>DiskCleaner is built around a review-first, Trash-first workflow. It focuses on clutter macOS and apps regenerate automatically, then marks larger or riskier areas for closer review before anything moves.</p>

            <h3>Quick Scan coverage</h3>
            <ul>
              <li><strong>App Cache</strong> — Temporary app cache files that rebuild as needed.</li>
              <li><strong>Browser Cache</strong> — Cache data from supported browsers and profiles. Safari cache is measured but not cleared. Passwords, bookmarks, and history stay untouched.</li>
              <li><strong>Screenshots</strong> — Old screenshots that tend to accumulate unnoticed on long-used Macs.</li>
              <li><strong>Trash</strong> — Files you already threw away that are still consuming space.</li>
              <li><strong>System Logs</strong> — Diagnostic and crash logs that are useful temporarily but rarely worth keeping forever.</li>
              <li><strong>Developer Data</strong> — Xcode DerivedData, Archives, Device Support, simulators, SwiftPM, CocoaPods, npm, JetBrains, and VS Code caches.</li>
              <li><strong>App Leftovers</strong> — Support files and residue left behind after apps were removed.</li>
            </ul>

            <h3>Deep Scan and expanded review areas</h3>
            <p>Deep Scan goes beyond the everyday clutter pass and surfaces larger storage categories that often need more deliberate review.</p>
            <ul>
              <li><strong>Downloads</strong> — Useful for catching forgotten installers, archives, and exported files.</li>
              <li><strong>iOS backups</strong> — Old device backups that can consume tens of gigabytes.</li>
              <li><strong>Mail Attachments</strong> — Attachment caches, including expanded support for Outlook, Spark, and Canary locations.</li>
              <li><strong>External drive review</strong> — Additional clutter visibility beyond the startup disk.</li>
              <li><strong>Caution-labeled items</strong> — Results that deserve a second look before cleanup.</li>
            </ul>

            <h3>What DiskCleaner does not do for you automatically</h3>
            <ul>
              <li>It does not silently delete files in the background.</li>
              <li>It does not permanently delete as part of normal cleanup. Files go to macOS Trash.</li>
              <li>It does not clear personal content like passwords, bookmarks, or saved logins.</li>
            </ul>

            <h3>What DiskCleaner never targets as cleanup junk</h3>
            <ul>
              <li>Documents, spreadsheets, or any file in your home folder outside of <code>Library/</code></li>
              <li>Photos, videos, or music libraries</li>
              <li>App preferences and settings (<code>~/Library/Preferences</code>)</li>
              <li>Keychain data or passwords</li>
              <li>iCloud Drive files</li>
            </ul>

            <blockquote>
              <strong>Tip:</strong> DiskCleaner shows every file before anything moves. Use the checkboxes and caution labels to keep high-confidence cleanup fast and everything else deliberate.
            </blockquote>

            <hr />

            {/* ── Section 2 ── */}
            <h2 id="how-to-use">How to Use DiskCleaner</h2>

            <h3>Running your first clean</h3>
            <ol>
              <li><strong>Open DiskCleaner</strong> and start with <strong>Quick Scan</strong> for the most common clutter categories.</li>
              <li>Review the results list. DiskCleaner shows categories, file sizes, and per-file checkboxes before anything moves.</li>
              <li>If you want deeper coverage, switch to <strong>Deep Scan</strong> to include larger review areas such as Downloads, iOS backups, Mail attachments, and external-drive findings.</li>
              <li>Pay attention to notes, legends, and caution labels. Those are there to slow you down on categories where context matters.</li>
              <li>Click <strong>Clean</strong> when you are satisfied with the selection. Files move to Trash, not permanent deletion.</li>
            </ol>

            <h3>Understanding Quick Scan vs Deep Scan</h3>
            <p><strong>Quick Scan</strong> is the fast everyday pass. <strong>Deep Scan</strong> expands into larger, more review-sensitive storage areas. The best default workflow is to run Quick Scan regularly and use Deep Scan when storage pressure is real or you need a broader audit.</p>

            <h3>Menu bar utilities</h3>
            <p>DiskCleaner includes menu bar utilities so disk state is always close at hand. The menu bar view is useful for quick visibility into available space and for returning to the app quickly when storage pressure starts building.</p>

            <h3>Using RAM Optimizer</h3>
            <p>The latest update adds a dedicated <strong>RAM Optimizer</strong> view with live metrics for Memory Pressure, Compressed Memory, Swap Used, and Page In/Out (Min). Use <strong>Optimize</strong> when memory pressure is elevated and you want a safe refresh without digging through Activity Monitor first.</p>

            <h3>Using the Uninstaller</h3>
            <p>Open <strong>App Uninstaller</strong> when dragging an app to Trash is not enough. DiskCleaner helps you review the app bundle plus leftover support files before removal, and the latest uninstaller update improves layout, drag-and-drop flow, and installed-app selection.</p>

            <h3>Free scans and Pro unlock</h3>
            <p>DiskCleaner includes <strong>3 free scans</strong>. After that, Pro unlocks with a license key. The current direct-license messaging in the app and site is <strong>$9.99 one-time for up to 2 Macs</strong>, with future updates included.</p>

            <hr />

            {/* ── Section 3 ── */}
            <h2 id="troubleshooting">Troubleshooting Common Issues</h2>

            <h3>DiskCleaner shows 0 MB found</h3>
            <p>This is normal on a freshly cleaned or new Mac. macOS caches rebuild as you use your apps — try scanning again after a day of normal use.</p>

            <h3>macOS asks for Full Disk Access or my password — is that normal?</h3>
            <p>Yes. Some categories involve locations macOS protects more aggressively. Depending on what you review and choose to clean, macOS may require Full Disk Access or standard administrator approval. DiskCleaner uses the normal macOS permission flow and does not ask you to bypass it.</p>

            <h3>An app is slow after cleaning</h3>
            <p>Apps may feel slightly slower the first time they launch after their cache is removed — this is expected. Performance returns to normal within a minute as the cache rebuilds. If an app continues to behave oddly, restarting it or your Mac usually resolves it.</p>

            <h3>Disk space didn't change much after cleaning</h3>
            <p>macOS does not always reflect reclaimed space instantly. Some recovery may appear as <em>purgeable</em> before it shows up as fully available. If the number looks slow to update, wait a moment and then recheck, or restart the Mac if storage reporting still looks stale.</p>

            <h3>DiskCleaner can't be opened (Gatekeeper warning)</h3>
            <p>If macOS shows "DiskCleaner cannot be opened because it is from an unidentified developer," go to <strong>System Settings → Privacy &amp; Security</strong>, scroll down, and click <strong>Open Anyway</strong> next to the DiskCleaner entry.</p>

            <h3>The Uninstaller doesn't show what I expected</h3>
            <p>Use the improved installed-app picker first, then try the drag-and-drop uninstall flow if needed. Some apps may have fewer matchable leftovers than others, and App Store-distributed apps can behave differently because of macOS sandboxing.</p>

            <h3>Deep Scan found categories I want to keep</h3>
            <p>That is exactly what the review model is for. Deep Scan is broader by design, and some categories are intentionally marked for second-look review. Uncheck anything you want to keep and clean only the categories you are confident about.</p>

            <h3>Still need help?</h3>
            <p>Reach out via the <strong>Support</strong> link in the footer — we typically respond within one business day.</p>

            <hr />

            {/* ── Section 4 ── */}
            <h2 id="keyboard-shortcuts">Keyboard Shortcuts</h2>
            <p>
              DiskCleaner supports core macOS app shortcuts such as closing windows, hiding the app, quitting the app,
              and standard text-editing shortcuts in text fields. The table below stays intentionally focused on reliable, app-wide shortcuts.
            </p>

            <h3>Common macOS shortcuts</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "22px", fontSize: "14px", tableLayout: "fixed" }}>
              <colgroup>
                <col style={{ width: "64%" }} />
                <col style={{ width: "36%" }} />
              </colgroup>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th style={{ textAlign: "left", padding: "8px 16px", color: "var(--text)", fontWeight: 600 }}>Action</th>
                  <th style={{ textAlign: "right", padding: "8px 16px", color: "var(--text)", fontWeight: 600 }}>Shortcut</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Hide DiskCleaner", "⌘ H"],
                  ["Quit DiskCleaner", "⌘ Q"],
                  ["Close the current window", "⌘ W"],
                ].map(([action, key]) => (
                  <tr key={action} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "10px 16px", color: "var(--muted)" }}>{action}</td>
                    <td style={{ padding: "10px 16px", textAlign: "right" }}>
                      <kbd style={{
                        display: "inline-block",
                        padding: "2px 8px",
                        borderRadius: "6px",
                        border: "1px solid var(--border)",
                        background: "var(--surface2)",
                        fontFamily: "inherit",
                        fontSize: "13px",
                        color: "var(--text)",
                        letterSpacing: "0.02em",
                      }}>{key}</kbd>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>Text fields</h3>
            <p>
              Standard macOS text-editing shortcuts such as <strong>⌘A</strong>, <strong>⌘C</strong>, <strong>⌘V</strong>,
              and <strong>⌘Z</strong> work anywhere DiskCleaner provides a normal text field.
            </p>

            <blockquote>
              <strong>Note:</strong> If a shortcut is not shown in the app’s menus, do not rely on it as part of your workflow yet.
            </blockquote>

          </div>
        </article>

      </div>
    </section>
  )
}
