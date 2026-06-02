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
    const description = "DiskCleaner help center covering 16+ scan categories, free core cleaning, Premium tools, safety labels, and common Mac cleaning questions."

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
                "text": "DiskCleaner scans 16+ categories and targeted cleanup locations. Free core cleaning includes App Cache, System Logs, Screenshots, .DS_Store files, and macOS Trash. Premium adds browser cache, developer data, Homebrew downloads, Movies, Downloads, Large Files, iOS backups, Apple Mail attachments, App Leftovers, external storage, local Time Machine snapshots, and old installers."
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
              "name": "What is included for free and what does Premium unlock?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Free core cleaning covers App Cache, System Logs, Screenshots, .DS_Store files, and macOS Trash. Premium unlocks the full 16+ category scanner and advanced cleanup areas. Riskier findings such as iOS backups and local Time Machine snapshots are flagged for review and are never pre-selected."
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
                "text": "DiskCleaner includes free core cleaning with no scan limit. Premium unlocks all advanced scan categories with a one-time license of $9.99 for up to 2 Macs, with all future updates included. No subscription required."
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
          <p className="article-excerpt">Everything you need to get the most out of DiskCleaner — what the 16+ scan categories cover, how review labels work, and how to use the latest cleanup tools safely.</p>
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

            <h3>Free core cleaning</h3>
            <ul>
              <li><strong>App Cache</strong> — Temporary app cache files that rebuild as needed, including the regenerating QuickLook thumbnail cache.</li>
              <li><strong>Screenshots</strong> — Old screenshots that tend to accumulate unnoticed on long-used Macs.</li>
              <li><strong>System Logs</strong> — Diagnostic and crash logs that are useful temporarily but rarely worth keeping forever.</li>
              <li><strong>.DS_Store Files</strong> — Hidden Finder metadata files scattered across your home folder.</li>
              <li><strong>macOS Trash</strong> — Files you already threw away that are still consuming space.</li>
            </ul>

            <h3>Premium cleaning and expanded review areas</h3>
            <p>Premium unlocks the full scanner, including larger storage categories and areas that often need more deliberate review.</p>
            <ul>
              <li><strong>Browser Cache</strong> — Cache data from Chrome, Firefox, Edge, Brave, Arc, and Opera profiles. Passwords, bookmarks, and history stay untouched.</li>
              <li><strong>Developer Data</strong> — Xcode DerivedData, CoreSimulator files, and old iOS DeviceSupport files. If that category is the main culprit, start with <Link to="/blog/delete-xcode-derived-data">our Xcode DerivedData cleanup guide</Link>.</li>
              <li><strong>Homebrew Cache</strong> — Stale Homebrew downloads.</li>
              <li><strong>Movies</strong> — Offline downloads and other large files in your Movies folder.</li>
              <li><strong>Downloads</strong> — Useful for catching forgotten installers, archives, and exported files.</li>
              <li><strong>Large Files</strong> — Files over 50 MB hiding across your home folder.</li>
              <li><strong>iOS backups</strong> — Old device backups that can consume tens of gigabytes.</li>
              <li><strong>Mail Attachments</strong> — Apple Mail attachment cache.</li>
              <li><strong>App Leftovers</strong> — Support files and residue left behind after apps were removed. For broader comparisons, see <Link to="/blog/best-app-uninstaller-for-mac">our best app uninstaller for Mac guide</Link>.</li>
              <li><strong>External Storage</strong> — Junk on connected USB drives and external hard drives.</li>
              <li><strong>Time Machine Snapshots</strong> — Local APFS snapshots, always presented for careful review.</li>
              <li><strong>Old Installers</strong> — DMG and PKG installers in Downloads and Desktop.</li>
              <li><strong>Caution-labeled items</strong> — Results that deserve a second look before cleanup.</li>
            </ul>

            <h3>What DiskCleaner does not do for you automatically</h3>
            <ul>
              <li>It does not silently delete files in the background.</li>
              <li>It does not permanently delete as part of normal cleanup. Files go to macOS Trash.</li>
              <li>It does not clear personal content like passwords, bookmarks, or saved logins.</li>
            </ul>

            <h3>What DiskCleaner protects by default</h3>
            <ul>
              <li>System files, iCloud sync folders, and protected app data are blocked from deletion.</li>
              <li>Personal documents, photos, videos, and music are never automatically selected as junk. Large File Finder may surface files over 50 MB for your review.</li>
              <li>Keychain data or passwords</li>
              <li>Riskier findings such as iOS backups and local Time Machine snapshots are never pre-selected.</li>
            </ul>

            <blockquote>
              <strong>Tip:</strong> DiskCleaner shows every file before anything moves. Use the checkboxes and caution labels to keep high-confidence cleanup fast and everything else deliberate.
            </blockquote>

            <hr />

            {/* ── Section 2 ── */}
            <h2 id="how-to-use">How to Use DiskCleaner</h2>

            <h3>Running your first clean</h3>
            <ol>
              <li><strong>Open DiskCleaner</strong> and start a scan for the most common clutter categories.</li>
              <li>Review the results list. DiskCleaner shows categories, file sizes, and per-file checkboxes before anything moves.</li>
              <li>If you use Premium, review advanced areas such as Downloads, iOS backups, Mail attachments, external storage, and local Time Machine snapshots.</li>
              <li>Pay attention to notes, legends, and caution labels. Those are there to slow you down on categories where context matters.</li>
              <li>Click <strong>Clean</strong> when you are satisfied with the selection. Files move to Trash, not permanent deletion.</li>
            </ol>

            <h3>Understanding free core cleaning vs Premium</h3>
            <p><strong>Free core cleaning</strong> covers everyday clutter without a scan limit. <strong>Premium</strong> unlocks the full 16+ category scanner and advanced review areas. Riskier findings are flagged with an explanation and are never pre-selected.</p>

            <h3>Menu bar utilities</h3>
            <p>DiskCleaner includes menu bar utilities so disk state is always close at hand. The menu bar view is useful for quick visibility into available space and for returning to the app quickly when storage pressure starts building.</p>

            <h3>Using RAM Optimizer</h3>
            <p>The latest update adds a dedicated <strong>RAM Optimizer</strong> view with live metrics for Memory Pressure, Compressed Memory, Swap Used, and Page In/Out (Min). Use <strong>Optimize</strong> when memory pressure is elevated and you want a safe refresh without digging through Activity Monitor first.</p>

            <h3>Using the Uninstaller</h3>
            <p>Open <strong>App Uninstaller</strong> when dragging an app to Trash is not enough. DiskCleaner helps you review the app bundle plus leftover support files before removal, and the latest uninstaller update improves layout, drag-and-drop flow, and installed-app selection.</p>

            <h3>Free core cleaning and Premium unlock</h3>
            <p>DiskCleaner includes <strong>free core cleaning</strong> for App Cache, System Logs, Screenshots, .DS_Store files, and macOS Trash. Premium unlocks the full scanner with a <strong>$9.99 one-time license for up to 2 Macs</strong>, with future updates included.</p>

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
            <p>macOS does not always reflect reclaimed space instantly. Some recovery may appear as <em>purgeable</em> before it shows up as fully available. If the number looks slow to update, wait a moment and then recheck, or restart the Mac if storage reporting still looks stale. If you are working through the bigger picture, see our guides on <Link to="/blog/how-to-free-up-storage-on-mac">how to free up storage on Mac</Link> and <Link to="/blog/what-is-system-data-mac">what System Data on Mac means</Link>.</p>

            <h3>DiskCleaner can't be opened (Gatekeeper warning)</h3>
            <p>If macOS shows "DiskCleaner cannot be opened because it is from an unidentified developer," go to <strong>System Settings → Privacy &amp; Security</strong>, scroll down, and click <strong>Open Anyway</strong> next to the DiskCleaner entry.</p>

            <h3>The Uninstaller doesn't show what I expected</h3>
            <p>Use the improved installed-app picker first, then try the drag-and-drop uninstall flow if needed. Some apps may have fewer matchable leftovers than others, and App Store-distributed apps can behave differently because of macOS sandboxing.</p>

            <h3>The scan found categories I want to keep</h3>
            <p>That is exactly what the review model is for. Some categories are intentionally marked for second-look review. Uncheck anything you want to keep and clean only the categories you are confident about.</p>

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
