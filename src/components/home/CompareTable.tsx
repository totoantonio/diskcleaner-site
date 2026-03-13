import { useEffect } from "react"

function Chk() {
  return (
    <svg viewBox="0 0 12 12" fill="none" width="12" height="12">
      <path d="M2 6l2.5 2.5L10 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Ex() {
  return (
    <svg viewBox="0 0 12 12" fill="none" width="12" height="12">
      <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function Dash() {
  return (
    <svg viewBox="0 0 12 12" fill="none" width="12" height="12">
      <line x1="3" y1="6" x2="9" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export default function CompareTable({ BG }: { BG: string }) {
  useEffect(() => {
    window.dispatchEvent(new Event("dc:reveal-refresh"))
  }, [])

  return (
    <section id="compare" className="py-12 sm:py-20" style={{ background: BG }}>
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <div className="mb-8 flex flex-col items-center text-center sm:mb-10">
          <span className="reveal rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--blue)]">Comparison</span>
          <h2 className="reveal reveal-headline d1 mt-4 text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em] text-[var(--text)]">
            Why DiskCleaner <span>is different.</span>
          </h2>
          <p className="reveal d2 mt-4 max-w-[480px] text-[17px] leading-7 text-[var(--muted)]">
              Other apps clean in the dark.<br />
              DiskCleaner puts you in the light — every file, every time.
            </p>
        </div>
        <div className="reveal overflow-x-auto rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
          <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--surface2)]">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text)]" style={{ width: "34%" }}>Feature</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-[var(--blue)]">DiskCleaner</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-[var(--text)]">Subscription Cleaner</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-[var(--text)]">Free Cleaner</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Full file preview before cleaning", true, false, false],
                  ["Per-file checkboxes — keep what you want", true, false, false],
                  ["Files go to Trash — never permanent", true, false, false],
                  ["App Uninstaller with leftover scan", true, true, true],
                  ["One-time purchase — no subscription", true, false, true],
                  ["Native SwiftUI — no Electron", true, false, true],
                  ["Menu bar live disk monitor", true, true, false],
                  ["9 browsers — all profiles", true, false, false],
                  ["Developer data cleaning (Xcode, npm)", true, true, false],
                  ["macOS 26 Tahoe support", true, true, false],
                  ["No account required — ever", true, false, true],
                  ["Zero analytics or tracking", true, false, true],
                  ["Price", "$9.99", "$30–40/yr", "Free"],
                ].map((row, i) => {
                  const isPrice = row[0] === "Price"
                  return (
                    <tr key={i} className="border-b border-[var(--border)] last:border-b-0">
                      <td className="align-middle px-4 py-3 text-sm text-[var(--text)]">{row[0] as string}</td>
                      {[1, 2, 3].map(c => (
                        <td key={c} className={`align-middle px-4 py-3 text-center ${c === 1 ? "bg-[var(--blue-tint)]" : ""}`}>
                          {isPrice ? (
                            <span style={{ fontSize: 13, fontWeight: 600, color: c === 1 ? "var(--blue)" : "var(--muted)" }}>
                              {row[c] as string}
                            </span>
                          ) : row[c] === true ? (
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] text-[var(--blue)]"><Chk /></span>
                          ) : row[c] === false ? (
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface2)] text-[var(--muted)]"><Ex /></span>
                          ) : (
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface2)] text-[var(--muted)]"><Dash /></span>
                          )}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
        </div>
      </div>
    </section>
  )
}
