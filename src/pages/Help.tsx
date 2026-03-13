import { Link } from "react-router-dom"

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
  return (
    <section className="bg-[var(--bg)] py-12 sm:py-20">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-12">

        <Link to="/" className="article-back">
          <ChevronLeft />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mx-auto mt-8 flex max-w-[860px] flex-col items-center gap-3 text-center">
          <span className="rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--blue)]">
            Help Center
          </span>
          <h1 className="article-title text-balance">DiskCleaner Help</h1>
          <p className="article-excerpt">Everything you need to get the most out of DiskCleaner — what it cleans, how to use it, and how to fix common issues.</p>
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
            <p>DiskCleaner targets only files that macOS generates automatically and regenerates on demand. Your documents, photos, and personal data are never touched.</p>

            <h3>Files DiskCleaner removes</h3>
            <ul>
              <li><strong>User caches</strong> — Temporary data stored by apps in <code>~/Library/Caches</code>. Apps rebuild these automatically; removing them is always safe.</li>
              <li><strong>System caches</strong> — macOS-level caches in <code>/Library/Caches</code> that accumulate over time. Removing them may prompt a brief rebuild on next boot.</li>
              <li><strong>Log files</strong> — Diagnostic logs written by apps and the OS (<code>~/Library/Logs</code>, <code>/var/log</code>). Logs are for diagnostics only and can safely be discarded.</li>
              <li><strong>Temporary files</strong> — Files in <code>/var/folders</code> and system temp directories that were never cleaned up by their parent process.</li>
              <li><strong>Trash contents</strong> — Files you've already moved to the Trash that are still consuming disk space.</li>
              <li><strong>Download quarantine metadata</strong> — Small <code>.DS_Store</code> and <code>__MACOSX</code> files created by macOS Finder.</li>
            </ul>

            <h3>What DiskCleaner never touches</h3>
            <ul>
              <li>Documents, spreadsheets, or any file in your home folder outside of <code>Library/</code></li>
              <li>Photos, videos, or music libraries</li>
              <li>App preferences and settings (<code>~/Library/Preferences</code>)</li>
              <li>Keychain data or passwords</li>
              <li>iCloud Drive files</li>
            </ul>

            <blockquote>
              <strong>Tip:</strong> Before cleaning, use the <em>Preview</em> mode to see exactly which files will be removed and their sizes — no surprises.
            </blockquote>

            <hr />

            {/* ── Section 2 ── */}
            <h2 id="how-to-use">How to Use DiskCleaner</h2>

            <h3>Running your first clean</h3>
            <ol>
              <li><strong>Open DiskCleaner</strong> from your Applications folder or the menu bar icon.</li>
              <li>Click <strong>Scan</strong>. DiskCleaner will analyse your Mac and display a categorised breakdown of junk files and their total size.</li>
              <li>Review each category. Toggle off any category you'd prefer to skip — your choices are remembered for next time.</li>
              <li>Click <strong>Clean</strong>. macOS may ask for your password to remove system-level files.</li>
              <li>A summary shows how much space was freed.</li>
            </ol>

            <h3>Menu Bar mode</h3>
            <p>Enable <strong>Menu Bar mode</strong> in Preferences (⌘,) to keep DiskCleaner in your menu bar. A small disk-usage indicator updates in real time. Click the icon to run a quick clean without opening the main window.</p>

            <h3>Scheduled cleaning</h3>
            <p>In Preferences, turn on <strong>Auto-Clean</strong> and choose a schedule — daily, weekly, or monthly. DiskCleaner will clean silently in the background and show a notification when it's done.</p>

            <h3>Using the Uninstaller</h3>
            <p>Switch to the <strong>Uninstaller</strong> tab to see every app on your Mac with its total footprint (app bundle + leftover support files). Select one or more apps, then click <strong>Uninstall</strong> to remove them completely — no orphaned files left behind.</p>

            <hr />

            {/* ── Section 3 ── */}
            <h2 id="troubleshooting">Troubleshooting Common Issues</h2>

            <h3>DiskCleaner shows 0 MB found</h3>
            <p>This is normal on a freshly cleaned or new Mac. macOS caches rebuild as you use your apps — try scanning again after a day of normal use.</p>

            <h3>macOS asks for my password — is that normal?</h3>
            <p>Yes. Removing files outside your user folder (system caches, certain logs) requires administrator permission. DiskCleaner uses macOS's standard authorisation dialog and does not store your password.</p>

            <h3>An app is slow after cleaning</h3>
            <p>Apps may feel slightly slower the first time they launch after their cache is removed — this is expected. Performance returns to normal within a minute as the cache rebuilds. If an app continues to behave oddly, restarting it or your Mac usually resolves it.</p>

            <h3>Disk space didn't change much after cleaning</h3>
            <p>macOS reports "available" storage differently from raw free space. Some reclaimed space may show as <em>purgeable</em> rather than immediately available. Restarting your Mac flushes purgeable space into the available pool.</p>

            <h3>DiskCleaner can't be opened (Gatekeeper warning)</h3>
            <p>If macOS shows "DiskCleaner cannot be opened because it is from an unidentified developer," go to <strong>System Settings → Privacy &amp; Security</strong>, scroll down, and click <strong>Open Anyway</strong> next to the DiskCleaner entry.</p>

            <h3>The Uninstaller doesn't show all my apps</h3>
            <p>Apps distributed exclusively through the Mac App Store are sandboxed and cannot be uninstalled by third-party tools — use the App Store's built-in purchase management to remove them. All other apps should appear in the list.</p>

            <h3>Still need help?</h3>
            <p>Reach out via the <strong>Support</strong> link in the footer — we typically respond within one business day.</p>

            <hr />

            {/* ── Section 4 ── */}
            <h2 id="keyboard-shortcuts">Keyboard Shortcuts</h2>
            <p>DiskCleaner supports standard macOS shortcuts throughout the app.</p>

            <h3>Main window</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "22px", fontSize: "14px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th style={{ textAlign: "left", padding: "8px 12px 8px 0", color: "var(--text)", fontWeight: 600 }}>Action</th>
                  <th style={{ textAlign: "left", padding: "8px 0", color: "var(--text)", fontWeight: 600 }}>Shortcut</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Scan for junk files",       "⌘ R"],
                  ["Start cleaning",             "⌘ ↩"],
                  ["Open Preferences",           "⌘ ,"],
                  ["Switch to Cleaner tab",      "⌘ 1"],
                  ["Switch to Uninstaller tab",  "⌘ 2"],
                  ["Hide DiskCleaner",           "⌘ H"],
                  ["Quit DiskCleaner",           "⌘ Q"],
                ].map(([action, key]) => (
                  <tr key={action} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "10px 12px 10px 0", color: "var(--muted)" }}>{action}</td>
                    <td style={{ padding: "10px 0" }}>
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

            <h3>Menu Bar mode</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "22px", fontSize: "14px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th style={{ textAlign: "left", padding: "8px 12px 8px 0", color: "var(--text)", fontWeight: 600 }}>Action</th>
                  <th style={{ textAlign: "left", padding: "8px 0", color: "var(--text)", fontWeight: 600 }}>Shortcut</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Open main window",          "Click menu bar icon"],
                  ["Quick clean (no window)",   "Option + Click icon"],
                ].map(([action, key]) => (
                  <tr key={action} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "10px 12px 10px 0", color: "var(--muted)" }}>{action}</td>
                    <td style={{ padding: "10px 0" }}>
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

            <blockquote>
              <strong>Pro tip:</strong> Most standard macOS text-editing shortcuts (⌘A, ⌘C, ⌘V, ⌘Z) work in any text field inside DiskCleaner.
            </blockquote>

          </div>
        </article>

      </div>
    </section>
  )
}
