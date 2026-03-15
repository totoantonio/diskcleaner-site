import { useEffect } from "react"

export default function Requirements({ SURFACE }: { SURFACE: string }) {
  useEffect(() => {
    window.dispatchEvent(new Event("dc:reveal-refresh"))
  }, [])

  return (
    <section id="requirements" className="py-20 sm:py-28" style={{ background: SURFACE }}>
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <div className="mb-8 text-center sm:mb-10">
            <span className="reveal rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-3 py-1 text-xs font-semibold tracking-[0.01em] text-[var(--blue)]">Technical Specs</span>
            <h2 className="reveal reveal-headline d1 mt-4 text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em] text-[var(--text)]">Built for every Mac.</h2>
            <p className="reveal d2 mx-auto mt-4 max-w-[520px] text-[17px] leading-7 text-[var(--muted)]">
              Universal binary. Apple Silicon native. Intel supported.
              From macOS Ventura to Tahoe 26.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

            <div className="reveal requirements-card rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] text-[var(--blue)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
                </svg>
              </div>
              <div className="text-xl font-semibold text-[var(--text)]">macOS &amp; Chip</div>
              <div className="mt-2 text-[15px] leading-6 text-[var(--muted)]">Requires macOS 13 Ventura or later. Fully tested through macOS 26 Tahoe. Universal binary runs natively on every Mac made since 2010.</div>
              <div className="mt-4 text-xs font-semibold tracking-[0.01em] text-[var(--muted)]">macOS Compatibility</div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-3 py-1 text-xs font-medium text-[var(--blue)]">Tahoe 26 ✓</span>
                <span className="rounded-full border border-[var(--border)] bg-[var(--surface2)] px-3 py-1 text-xs text-[var(--muted)]">Sequoia 15</span>
                <span className="rounded-full border border-[var(--border)] bg-[var(--surface2)] px-3 py-1 text-xs text-[var(--muted)]">Sonoma 14</span>
                <span className="rounded-full border border-[var(--border)] bg-[var(--surface2)] px-3 py-1 text-xs text-[var(--muted)]">Ventura 13</span>
              </div>
              <p className="mt-2 text-xs text-[var(--muted2)]">Monterey 12 and earlier — not supported (missing SwiftUI APIs)</p>
              <div className="mt-4 text-xs font-semibold tracking-[0.01em] text-[var(--muted)]">Chip — Universal Binary</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] text-[var(--text)]">
                {[
                  "Apple M4 (ARM 64-bit) — native",
                  "Apple M3 (ARM 64-bit) — native",
                  "Apple M2 (ARM 64-bit) — native",
                  "Apple M1 (ARM 64-bit) — native",
                  "Intel x86 64-bit — native",
                ].map(i => <li key={i}>{i}</li>)}
              </ul>
              <div className="mt-4 text-xs font-semibold tracking-[0.01em] text-[var(--muted)]">Distribution</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] text-[var(--text)]">
                {[
                  "~5 MB install size",
                  "Apple-notarized — passes Gatekeeper",
                  "Direct download · diskcleaner.pro",
                  "License covers up to 2 devices",
                ].map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>

            <div className="reveal requirements-card d1 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] text-[var(--blue)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <div className="text-xl font-semibold text-[var(--text)]">Scan Performance</div>
              <div className="mt-2 text-[15px] leading-6 text-[var(--muted)]">Scans targeted folder paths — not full-disk enumeration. Fast on every Mac regardless of storage size.</div>
              {[
                { lbl: "Quick Scan — all 7 categories, depth 3", t: "< 10s", p: 95 },
                { lbl: "Deep Scan — small DerivedData", t: "10–20s", p: 75 },
                { lbl: "Deep Scan — large DerivedData (~20 GB)", t: "20–45s", p: 48 },
                { lbl: "Deep Scan — very large caches (50 GB+)", t: "45–90s", p: 22 },
              ].map((b, i) => (
                <div className="mt-3" key={i}>
                  <div className="mb-1 flex items-baseline justify-between gap-2">
                    <span className="text-[13px] text-[var(--text)]">{b.lbl}</span>
                    <span className="text-[12px] font-semibold text-[var(--blue)]">{b.t}</span>
                  </div>
                  <div className="h-1 rounded bg-[var(--track)]">
                    <div className="h-1 rounded bg-[linear-gradient(90deg,var(--blue-dim),var(--blue))]" style={{ width: `${b.p}%` }} />
                  </div>
                </div>
              ))}
              <div className="mt-5 text-xs font-semibold tracking-[0.01em] text-[var(--muted)]">Built With</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] text-[var(--text)]">
                {[
                  "SwiftUI + Swift 6 — full concurrency",
                  "AppKit — menu bar, NSWorkspace",
                  "StoreKit 2 — license management",
                  "FileManager.trashItem() — never removeItem()",
                ].map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>

            <div className="reveal requirements-card d2 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] text-[var(--blue)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="text-xl font-semibold text-[var(--text)]">Privacy, by Design</div>
              <div className="mt-2 text-[15px] leading-6 text-[var(--muted)]">
                No network activity. No analytics. No account. Your files, your Mac, your data — it never leaves your device.
              </div>
              <ul className="mt-4 space-y-3">
                {[
                  "Zero network activity during scanning or cleaning",
                  "No analytics, no telemetry, no crash reporting",
                  "No account required — ever",
                  "License activation is the only outbound network call",
                  "No background processes when the app is closed",
                  "Requires Full Disk Access — explicitly granted by you",
                  "Reads file names and sizes only — never file contents",
                  "20+ protected folders — passwords, iCloud, system files never touched",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-[14px] text-[var(--text)]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] text-[var(--blue)]">
                      <svg viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
      </div>
    </section>
  )
}
