import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react"
import { Modal, SupportContent, ChangelogContent, WaitlistContent } from "../components/SiteModal"
import { modalTitle, type ModalKey } from "../components/modalConfig"
const appImage = "/DiskCleaner.webp"
const appImage_464 = "/DiskCleaner-464.webp"
const appImage_640 = "/DiskCleaner-640.webp"
import appImage3 from "../assets/DiskCleaner_Uninstaller.webp"
import appImage3_464 from "../assets/DiskCleaner_Uninstaller-464.webp"
import appImage3_640 from "../assets/DiskCleaner_Uninstaller-640.webp"
import menubarImage from "../assets/DiskCleaner_MenuBar.webp"
import menubarImage_464 from "../assets/DiskCleaner_MenuBar-464.webp"
import menubarImage_640 from "../assets/DiskCleaner_MenuBar-640.webp"
import "../App.css"

// ─── Analytics ────────────────────────────────────────────────────────────────
declare global { function gtag(...args: unknown[]): void }

function trackCTA(label: string, isLead = false) {
  if (typeof gtag === "undefined") return
  gtag("event", isLead ? "generate_lead" : "download_intent", {
    event_category: "CTA",
    event_label: label,
  })
}

const CompareTable = lazy(() => import("../components/home/CompareTable"))
const CommunityWall = lazy(() => import("../components/home/CommunityWall"))

// ─── Highlights Carousel ──────────────────────────────────────────────────────

const getMacOsChipSvg = (dark: boolean) => {
  const sep = `<line x1="28" x2="464" stroke="${dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'}" stroke-width="0.5"/>`
  const sectionBg = (y: number) => `<rect x="0" y="${y}" width="480" height="22" fill="${dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.025)'}" />`
  const check = (cy: number) => `<circle cx="452" cy="${cy}" r="9" fill="${dark ? '#1c1c1e' : '#FFFFFF'}" stroke="${dark ? 'rgba(0,113,227,0.4)' : '#B9D4FF'}"/><path d="M448 ${cy}l3 3 6-7" stroke="#0071E3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`
  const cross = (cy: number) => `<circle cx="452" cy="${cy}" r="9" fill="${dark ? '#1c1c1e' : '#FFFFFF'}" stroke="${dark ? 'rgba(255,255,255,0.14)' : '#DFDFE4'}"/><path d="M448 ${cy-4}l8 8M456 ${cy-4}l-8 8" stroke="${dark ? '#636366' : '#C7C7CC'}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`
  return `<svg width="100%" viewBox="0 0 480 502" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans Variable', 'Plus Jakarta Sans', sans-serif">
  <rect x="0" y="0" width="480" height="502" fill="${dark ? '#1c1c1e' : '#FFFFFF'}"/>
  <rect x="0" y="0" width="480" height="44" fill="${dark ? '#2c2c2e' : '#F5F5F7'}"/>
  <line x1="0" y1="44.5" x2="480" y2="44.5" stroke="${dark ? 'rgba(255,255,255,0.12)' : '#D8DADF'}"/>
  <circle cx="26" cy="22" r="6" fill="#FF5F57"/>
  <circle cx="46" cy="22" r="6" fill="#FEBC2E"/>
  <circle cx="66" cy="22" r="6" fill="#28C840"/>
  <text x="88" y="28" font-size="13" fill="${dark ? '#b2b2b8' : '#6E6E73'}">macOS &amp; Chip Compatibility</text>
  <g transform="translate(0,12)">
  ${sectionBg(48)}
  <text x="28" y="64" font-size="11" font-weight="600" fill="${dark ? '#8e8e93' : '#6e6e73'}" letter-spacing="1">MACOS COMPATIBILITY</text>
  <text x="28" y="90" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">macOS 26 Tahoe</text>${check(85)}
  ${sep.replace('x2="464"', 'y1="102" y2="102" x2="464"')}
  <text x="28" y="118" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">macOS 15 Sequoia</text>${check(113)}
  ${sep.replace('x2="464"', 'y1="130" y2="130" x2="464"')}
  <text x="28" y="146" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">macOS 14 Sonoma</text>${check(141)}
  ${sep.replace('x2="464"', 'y1="158" y2="158" x2="464"')}
  <text x="28" y="174" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">macOS 13 Ventura</text>${check(169)}
  ${sep.replace('x2="464"', 'y1="186" y2="186" x2="464"')}
  <text x="28" y="202" font-size="13" fill="${dark ? '#636366' : '#AEAEB2'}">Monterey 12 and earlier</text>${cross(197)}
  ${sectionBg(212)}
  <text x="28" y="228" font-size="11" font-weight="600" fill="${dark ? '#8e8e93' : '#6e6e73'}" letter-spacing="1">CHIP — UNIVERSAL BINARY</text>
  <text x="28" y="254" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Apple M4 (ARM 64-bit)</text>${check(249)}
  ${sep.replace('x2="464"', 'y1="266" y2="266" x2="464"')}
  <text x="28" y="282" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Apple M3 (ARM 64-bit)</text>${check(277)}
  ${sep.replace('x2="464"', 'y1="294" y2="294" x2="464"')}
  <text x="28" y="310" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Apple M2 (ARM 64-bit)</text>${check(305)}
  ${sep.replace('x2="464"', 'y1="322" y2="322" x2="464"')}
  <text x="28" y="338" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Apple M1 (ARM 64-bit)</text>${check(333)}
  ${sep.replace('x2="464"', 'y1="350" y2="350" x2="464"')}
  <text x="28" y="366" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Intel x86 64-bit</text>${check(361)}
  ${sectionBg(376)}
  <text x="28" y="392" font-size="11" font-weight="600" fill="${dark ? '#8e8e93' : '#6e6e73'}" letter-spacing="1">DISTRIBUTION</text>
  <text x="28" y="418" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">~5 MB install size</text>${check(413)}
  ${sep.replace('x2="464"', 'y1="430" y2="430" x2="464"')}
  <text x="28" y="446" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Apple-notarized — passes Gatekeeper</text>${check(441)}
  ${sep.replace('x2="464"', 'y1="458" y2="458" x2="464"')}
  <text x="28" y="474" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">License covers up to 2 devices</text>${check(469)}
  </g>
</svg>`
}

const getScanPerfSvg = (dark: boolean) => {
  const sep = (y: number) => `<line x1="28" y1="${y}" x2="464" y2="${y}" stroke="${dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'}" stroke-width="0.5"/>`
  const sectionBg = (y: number) => `<rect x="0" y="${y}" width="480" height="22" fill="${dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.025)'}" />`
  const check = (cy: number) => `<circle cx="452" cy="${cy}" r="9" fill="${dark ? '#1c1c1e' : '#FFFFFF'}" stroke="${dark ? 'rgba(0,113,227,0.4)' : '#B9D4FF'}"/><path d="M448 ${cy}l3 3 6-7" stroke="#0071E3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`
  return `<svg width="100%" viewBox="0 0 480 432" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans Variable', 'Plus Jakarta Sans', sans-serif">
  <rect x="0" y="0" width="480" height="432" fill="${dark ? '#1c1c1e' : '#FFFFFF'}"/>
  <rect x="0" y="0" width="480" height="44" fill="${dark ? '#2c2c2e' : '#F5F5F7'}"/>
  <line x1="0" y1="44.5" x2="480" y2="44.5" stroke="${dark ? 'rgba(255,255,255,0.12)' : '#D8DADF'}"/>
  <circle cx="26" cy="22" r="6" fill="#FF5F57"/>
  <circle cx="46" cy="22" r="6" fill="#FEBC2E"/>
  <circle cx="66" cy="22" r="6" fill="#28C840"/>
  <text x="88" y="28" font-size="13" fill="${dark ? '#b2b2b8' : '#6E6E73'}">Scan Performance</text>
  <g transform="translate(0,12)">
  ${sectionBg(48)}
  <text x="28" y="64" font-size="11" font-weight="600" fill="${dark ? '#8e8e93' : '#6e6e73'}" letter-spacing="1">SCAN TIMES</text>
  <text x="28" y="88" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Quick Scan — all 7 categories</text>
  <text x="452" y="88" font-size="13" font-weight="600" fill="#0071E3" text-anchor="end">&lt; 10s</text>
  <rect x="28" y="98" width="424" height="5" rx="2.5" fill="${dark ? '#3a3a3c' : '#F0F0F3'}"/>
  <rect x="28" y="98" width="403" height="5" rx="2.5" fill="#0071E3"/>
  ${sep(118)}
  <text x="28" y="138" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Deep Scan — small DerivedData</text>
  <text x="452" y="138" font-size="13" font-weight="600" fill="#0071E3" text-anchor="end">10–20s</text>
  <rect x="28" y="148" width="424" height="5" rx="2.5" fill="${dark ? '#3a3a3c' : '#F0F0F3'}"/>
  <rect x="28" y="148" width="318" height="5" rx="2.5" fill="#0071E3"/>
  ${sep(168)}
  <text x="28" y="188" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Deep Scan — large DerivedData (~20 GB)</text>
  <text x="452" y="188" font-size="13" font-weight="600" fill="#0071E3" text-anchor="end">20–45s</text>
  <rect x="28" y="198" width="424" height="5" rx="2.5" fill="${dark ? '#3a3a3c' : '#F0F0F3'}"/>
  <rect x="28" y="198" width="204" height="5" rx="2.5" fill="#0071E3"/>
  ${sep(218)}
  <text x="28" y="238" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Deep Scan — very large caches (50 GB+)</text>
  <text x="452" y="238" font-size="13" font-weight="600" fill="#0071E3" text-anchor="end">45–90s</text>
  <rect x="28" y="248" width="424" height="5" rx="2.5" fill="${dark ? '#3a3a3c' : '#F0F0F3'}"/>
  <rect x="28" y="248" width="93" height="5" rx="2.5" fill="#0071E3"/>
  ${sectionBg(268)}
  <text x="28" y="284" font-size="11" font-weight="600" fill="${dark ? '#8e8e93' : '#6e6e73'}" letter-spacing="1">BUILT WITH</text>
  <text x="28" y="308" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">SwiftUI + Swift 6 — full concurrency</text>${check(303)}
  ${sep(320)}
  <text x="28" y="340" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">AppKit — menu bar, NSWorkspace</text>${check(335)}
  ${sep(352)}
  <text x="28" y="372" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">StoreKit 2 — license management</text>${check(367)}
  ${sep(384)}
  <text x="28" y="404" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">FileManager.trashItem() — no removeItem()</text>${check(399)}
  </g>
</svg>`
}

const getPrivacySvg = (dark: boolean) => {
  const sep = (y: number) => `<line x1="28" y1="${y}" x2="464" y2="${y}" stroke="${dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'}" stroke-width="0.5"/>`
  const sectionBg = (y: number) => `<rect x="0" y="${y}" width="480" height="22" fill="${dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.025)'}" />`
  const check = (cy: number) => `<circle cx="452" cy="${cy}" r="9" fill="${dark ? '#1c1c1e' : '#FFFFFF'}" stroke="${dark ? 'rgba(0,113,227,0.4)' : '#B9D4FF'}"/><path d="M448 ${cy}l3 3 6-7" stroke="#0071E3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`
  return `<svg width="100%" viewBox="0 0 480 378" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans Variable', 'Plus Jakarta Sans', sans-serif">
  <rect x="0" y="0" width="480" height="378" fill="${dark ? '#1c1c1e' : '#FFFFFF'}"/>
  <rect x="0" y="0" width="480" height="44" fill="${dark ? '#2c2c2e' : '#F5F5F7'}"/>
  <line x1="0" y1="44.5" x2="480" y2="44.5" stroke="${dark ? 'rgba(255,255,255,0.12)' : '#D8DADF'}"/>
  <circle cx="26" cy="22" r="6" fill="#FF5F57"/>
  <circle cx="46" cy="22" r="6" fill="#FEBC2E"/>
  <circle cx="66" cy="22" r="6" fill="#28C840"/>
  <text x="88" y="28" font-size="13" fill="${dark ? '#b2b2b8' : '#6E6E73'}">Privacy, by Design</text>
  <g transform="translate(0,12)">
  ${sectionBg(48)}
  <text x="28" y="64" font-size="11" font-weight="600" fill="${dark ? '#8e8e93' : '#6e6e73'}" letter-spacing="1">PRIVACY GUARANTEES</text>
  <text x="28" y="90" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Zero network activity during scanning or cleaning</text>${check(85)}
  ${sep(104)}
  <text x="28" y="124" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">No analytics, no telemetry, no crash reporting</text>${check(119)}
  ${sep(138)}
  <text x="28" y="158" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">No account required — ever</text>${check(153)}
  ${sep(172)}
  <text x="28" y="192" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">License activation is the only outbound network call</text>${check(187)}
  ${sep(206)}
  <text x="28" y="226" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">No background processes when the app is closed</text>${check(221)}
  ${sep(240)}
  <text x="28" y="260" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Requires Full Disk Access — explicitly granted by you</text>${check(255)}
  ${sep(274)}
  <text x="28" y="294" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Reads file names and sizes only — never file contents</text>${check(289)}
  ${sep(308)}
  <text x="28" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}"><tspan x="28" y="328">20+ protected folders — passwords, iCloud,</tspan><tspan x="28" dy="18">system files never touched</tspan></text>${check(333)}
  </g>
</svg>`
}

const getHighlightSlides = (dark: boolean) => [
  {
    eyebrow: "Technical Specs",
    title: "macOS & Chip\nCompatibility.",
    body: "Requires macOS 13 Ventura or later. Fully tested through macOS 26 Tahoe. Universal binary runs natively on every Mac made since 2010.",
    svgHtml: getMacOsChipSvg(dark) as string,
    accent: dark ? "#0a1628" : "#eef5ff",
  },
  {
    eyebrow: "Performance",
    title: "Scan Performance.",
    body: "Scans targeted folder paths — not full-disk enumeration. Fast on every Mac regardless of storage size.",
    svgHtml: getScanPerfSvg(dark) as string,
    accent: dark ? "#1a1a1c" : "#f6f6f8",
  },
  {
    eyebrow: "Privacy",
    title: "Privacy, by Design.",
    body: "No network activity. No analytics. No account. Your files, your Mac, your data — it never leaves your device.",
    svgHtml: getPrivacySvg(dark) as string,
    accent: dark ? "#0a1a0e" : "#f3f8f4",
  },
]

function HighlightsCarousel({ SURFACE, theme }: { SURFACE: string; theme: string }) {
  const isDark = theme === "dark"
  const [page, setPage] = useState(0)
  const slideWidth = "min(1104px, calc(100vw - 48px))"
  const slideGap = 20
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const SLIDES = getHighlightSlides(isDark)
  const total = SLIDES.length

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setPage(p => (p + 1) % total)
    }, 4000)
  }, [total])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { startTimer(); observer.disconnect() } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => { observer.disconnect(); if (timerRef.current) clearInterval(timerRef.current) }
  }, [startTimer])

  const go = (i: number) => { setPage(i); startTimer() }
  const next = () => go((page + 1) % total)

  const svgBorder = isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid #D8DADF"
  const trackBg = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"
  const btnStyle: React.CSSProperties = {
    width: 44, height: 44, borderRadius: "50%", border: "none",
    background: trackBg, color: "var(--text)", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  }

  return (
    <section ref={sectionRef} style={{ background: SURFACE, padding: "80px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, marginBottom: 40, flexWrap: "wrap" }}>
          <h2 className="section-h2" style={{ margin: 0 }}>
            Built for every Mac.
          </h2>
          
        </div>
      </div>

      <div
        className="reveal"
        style={{
          overflow: "hidden",
          width: "calc(100vw - max(24px, (100vw - 1200px) / 2))",
          marginLeft: "max(24px, calc((100vw - 1200px) / 2))",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: slideGap,
            width: "max-content",
            paddingRight: slideGap,
            transform: `translateX(calc(-${page} * (${slideWidth} + ${slideGap}px)))`,
            transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            willChange: "transform",
          }}
        >
          {SLIDES.map((slide) => (
            <article
              key={slide.title}
              className="highlights-card"
              style={{
                flex: `0 0 ${slideWidth}`,
                borderRadius: 32,
                background: "var(--surface)",
                padding: "45px 42px",
              }}
            >
              <div style={{ maxWidth: 390 }}>
                <div className="carousel-eyebrow">{slide.eyebrow}</div>
                <h3 className="carousel-h3">{slide.title}</h3>
                <p className="carousel-body">{slide.body}</p>
              </div>
              <div style={{ lineHeight: 0, borderRadius: 20, overflow: "hidden", border: svgBorder, boxShadow: isDark ? "0 12px 40px rgba(0,0,0,0.4)" : "0 12px 40px rgba(0,0,0,0.10)" }} dangerouslySetInnerHTML={{ __html: slide.svgHtml }} />
            </article>
          ))}
        </div>
      </div>

      {/* Controls: dots · play */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div className="reveal" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 18, marginTop: 28 }}>

          {/* Dots */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: trackBg, borderRadius: 999, padding: "10px 18px" }}>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: i === page ? 28 : 8,
                  height: 8,
                  borderRadius: 999,
                  border: "none",
                  background: i === page ? (isDark ? "#8e8e93" : "#6e6e73") : "rgba(110,110,115,0.4)",
                  cursor: "pointer",
                  transition: "width 0.3s cubic-bezier(0.22,1,0.36,1), background 0.2s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* Play / next */}
          <button onClick={next} aria-label="Next slide" style={btnStyle}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
          </button>

        </div>
      </div>
    </section>
  )
}

// ─── Reveal System ───────────────────────────────────────────────────────────

const useRevealOnce = () => {
  useEffect(() => {
    const els = () => Array.from(document.querySelectorAll<HTMLElement>(".reveal"))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            ;(e.target as HTMLElement).classList.add("revealed")
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.06 }
    )
    const refresh = () => {
      const vh = window.innerHeight
      els().forEach(el => {
        if (el.dataset.revealBound === "1") return
        el.dataset.revealBound = "1"
        // Immediately reveal elements already in the viewport so there's no flash
        // when .js-loaded activates the opacity:0 rule
        if (el.getBoundingClientRect().top < vh * 1.1) {
          el.classList.add("revealed")
        }
        observer.observe(el)
      })
    }
    // Pre-reveal above-fold elements and observe all, then activate animations
    refresh()
    document.documentElement.classList.add("js-loaded")
    const onRefresh = () => refresh()
    window.addEventListener("dc:reveal-refresh", onRefresh as EventListener)
    return () => {
      window.removeEventListener("dc:reveal-refresh", onRefresh as EventListener)
      observer.disconnect()
    }
  }, [])
}

const dispatchRevealRefresh = () => {
  window.dispatchEvent(new Event("dc:reveal-refresh"))
}

// ─── Icons ───────────────────────────────────────────────────────────────────

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

// ─── Above-fold Sections ──────────────────────────────────────────────────────

function Hero({ BG }: { BG: string }) {
  return (
    <section className="relative overflow-hidden pb-0 pt-20 sm:pt-28" style={{ background: BG }}>
      <div className="hero-glow h-[800px] w-[1100px] bg-[radial-gradient(ellipse,var(--blue-glow)_0%,transparent_60%)]" />
      <div className="mx-auto w-full max-w-[1200px] px-6 text-center md:px-12">
        <h1 className="mx-auto max-w-[900px] text-[clamp(40px,10vw,96px)] font-bold leading-[0.97] tracking-[-0.055em]">
          <span className="text-[var(--text)]">Clean your Mac.</span><br />
          <em className="not-italic text-[var(--blue)]">Know exactly why.</em>
        </h1>
        <p className="mx-auto mt-5 max-w-[620px] text-[clamp(18px,2vw,22px)] leading-[1.55] tracking-[-0.01em] text-[var(--muted)]">
          Every other cleaner guesses. DiskCleaner shows you every file,
          every category, every byte — before anything moves.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a href="#download" onClick={() => trackCTA("hero")} className="inline-flex items-center justify-center rounded-full bg-[var(--blue)] px-7 py-3.5 text-[17px] font-medium text-white no-underline transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.97] active:brightness-90">
            Get Early Access
          </a>
          <a href="#features" className="inline-flex items-center gap-2 px-2 py-3.5 text-[17px] font-medium text-[var(--muted)] no-underline transition-colors duration-150 hover:text-[var(--text)]">
            See how it works <span aria-hidden>›</span>
          </a>
        </div>
      </div>
      <div className="relative mx-auto mt-12 max-w-[860px] px-6 md:px-12">
        <img
          src={appImage}
          srcSet={`${appImage_464} 464w, ${appImage_640} 640w, ${appImage} 1376w`}
          sizes="(max-width: 768px) 92vw, 860px"
          width="1376" height="1464"
          alt="DiskCleaner app interface"
          loading="eager" decoding="async" fetchPriority="high"
          className="w-full rounded-2xl shadow-[0_32px_80px_var(--shadow-xl)]"
          style={{ border: "1px solid var(--border)" }}
        />
        <div className="pointer-events-none absolute bottom-0 left-6 right-6 h-40 rounded-b-2xl bg-gradient-to-t from-[var(--bg)] to-transparent md:left-12 md:right-12" />
      </div>
    </section>
  )
}

function StatsBand({ SURFACE }: { SURFACE: string }) {
  return (
    <div className="border-y border-[var(--border)] py-12 sm:py-16" style={{ background: SURFACE }}>
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <div className="grid grid-cols-2 gap-y-3 md:grid-cols-4 md:gap-y-0">
          {[
            { n: "7",   u: "",   l: "Junk categories, one scan" },
            { n: "<10", u: "s",  l: "From launch to results" },
            { n: "9",   u: "",   l: "Browsers supported" },
            { n: "~5",  u: "MB", l: "Install size" },
          ].map((s, i) => (
            <div className={`reveal d${i + 1} px-3 text-center md:border-r md:border-[var(--border)] md:last:border-r-0 ${i < 2 ? "border-b border-[var(--border)] pb-6 md:border-b-0 md:pb-0" : ""}`} key={i}>
              <div className="text-[34px] font-bold leading-none tracking-[-0.04em] text-[var(--text)] md:text-[44px]">{s.n}<span className="text-[var(--blue)]">{s.u}</span></div>
              <div className="mt-2 text-[14px] font-medium text-[var(--muted)]">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Features({ SURFACE }: { SURFACE: string }) {
  return (
    <section id="features" className="py-14 sm:py-20" style={{ background: SURFACE }}>
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <div className="mb-7 flex flex-col items-center text-center sm:mb-10">
          <span className="reveal rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-3 py-1 text-xs font-semibold tracking-[0.01em] text-[var(--blue)]">See the difference</span>
          <h2 className="reveal reveal-headline d1 mt-4 text-balance text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em]">
            <span className="inline-block text-left sm:contents">
              <span className="block text-[var(--text)] sm:inline">Others clean blind.</span>{" "}
              <span className="block text-[var(--blue)] sm:inline">You see every file.</span>
            </span>
          </h2>
          <p className="reveal d2 mt-4 max-w-[760px] text-[17px] leading-[1.55] tracking-[-0.01em] text-[var(--muted)]">
              DiskCleaner takes the opposite approach — show everything, delete nothing without your approval. Every file, every category, reviewed by you before anything moves.
            </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                tag: "Transparency",

                ico: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 24, height: 24 }}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
                ttl: "See Every File. Approve Every Clean.",
                dsc: "Full confirmation screen with per-file checkboxes. Expand any category. Uncheck anything. You stay in control, always.",
              },
              {
                tag: "Safety",
                ico: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 24, height: 24 }}><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /></svg>,
                ttl: "Everything Goes to Trash. Always.",
                dsc: "We use macOS trashItem exclusively — never removeItem. Every file is recoverable, every time. Not a single permanent deletion.",
              },
              {
                tag: "Scanning",
                ico: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 24, height: 24 }}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>,
                ttl: "7 Categories. One Pass.",
                dsc: "App Cache, Browser Cache, Screenshots, Trash, System Logs, Developer Data, App Leftovers — scanned simultaneously in under 10 seconds.",
              },
              {
                tag: "Performance",
                ico: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 24, height: 24 }}><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
                ttl: "Built with Swift Concurrency.",
                dsc: "All file I/O runs on background threads. The interface never freezes. File sizes animate live as they're discovered.",
              },
              {
                tag: "Browsers",
                ico: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 24, height: 24 }}><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><line x1="2" y1="12" x2="22" y2="12" /></svg>,
                ttl: "Every Browser. Every Profile.",
                dsc: "Safari, Chrome, Firefox, Edge, Arc, Brave, Vivaldi, Chromium, Opera — all profiles cleaned. Passwords, bookmarks, and history never touched.",
              },
              {
                tag: "Developers",
                ico: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 24, height: 24 }}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>,
                ttl: "Developers Recover the Most.",
                dsc: "Xcode DerivedData, Simulators, VS Code, JetBrains, CocoaPods, npm — gigabytes you forgot existed. One scan reveals them all.",
              },
            ].map((f, i) => (
              <div key={i} className="reveal rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[rgba(0,113,227,0.18)] hover:shadow-[0_8px_28px_var(--shadow-lg)]" style={{ transitionDelay: `${i * 65}ms` }}>
                <div className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] text-[var(--blue)]">{f.ico}</div>
                <div className="mt-4 text-[19px] font-semibold leading-snug tracking-[-0.025em] text-[var(--text)]">{f.ttl}</div>
                <div className="mt-2 text-[14px] leading-[1.65] text-[var(--muted)]">{f.dsc}</div>
              </div>
            ))}
        </div>
        {/* Inline CTA after features grid */}
        <div className="reveal mt-10 flex flex-col items-center gap-3 text-center">
          <a href="#download" onClick={() => trackCTA("features-cta")} className="inline-flex items-center justify-center rounded-full bg-[var(--blue)] px-7 py-3.5 text-[17px] font-medium text-white no-underline transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.97] active:brightness-90">
            Get Early Access
          </a>
          <p className="text-[12px] text-[var(--muted2)]">$9.99 one-time · No subscription · Apple-notarized</p>
        </div>
      </div>
    </section>
  )
}

// ─── Lazy Sections ────────────────────────────────────────────────────────────

const InterfaceSplit = lazy(async () => {
  const Comp = ({ BG }: { BG: string }) => {
    useEffect(() => { const raf = requestAnimationFrame(dispatchRevealRefresh); return () => cancelAnimationFrame(raf) }, [])
    return (
      <section className="overflow-hidden py-10 sm:py-14" style={{ background: BG }}>
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="lg:hidden mb-4">
            <span className="inline-flex rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-3 py-1 text-xs font-semibold tracking-[0.01em] text-[var(--blue)]">See it in action</span>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-0 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-stretch lg:gap-x-16">
            <div className="order-2 lg:order-1 lg:pt-4 lg:pr-8 reveal">
              <div className="lg:max-w-lg">
                <h2 className="hidden lg:inline-flex rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-3 py-1 text-xs font-semibold tracking-[0.01em] text-[var(--blue)]">See it in action</h2>
                <p className="reveal reveal-headline mt-4 text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em]">
                  <span className="text-[var(--text)]">Don't clean what you can't see.</span> <span className="text-[var(--blue)]">Total clarity.</span>
                </p>
                <p className="mt-5 text-[17px] leading-[1.65] tracking-[-0.01em] text-[var(--muted)]">
                  See exactly what's taking up space before a single file moves.
                  Expand any category down to individual files. Uncheck anything you want to keep.
                  When you're ready - and only then - click Clean.
                </p>
                <dl className="mt-6 max-w-xl space-y-2 text-[15px] leading-[1.65] text-[var(--muted)] sm:mt-8 sm:space-y-4 lg:max-w-none">
                  <div className="relative pl-9">
                    <dt className="inline text-[var(--text-dim)]">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="absolute top-1 left-1 size-5 text-[var(--blue)]">
                        <circle cx="9" cy="9" r="6" />
                        <path d="m17 17-3-3" />
                      </svg>
                      Live file sizes animate as the scan runs.
                    </dt>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline text-[var(--text-dim)]">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="absolute top-1 left-1 size-5 text-[var(--blue)]">
                        <rect x="3" y="3" width="14" height="14" rx="3" />
                        <path d="m6.5 10 2 2 5-5" />
                      </svg>
                      Per-file checkboxes across all 7 categories.
                    </dt>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline text-[var(--text-dim)]">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="absolute top-1 left-1 size-5 text-[var(--blue)]">
                        <path d="M5 6h10" />
                        <path d="M7 6V4h6v2" />
                        <path d="M6 6v10h8V6" />
                      </svg>
                      Every removal goes to Trash - never permanent.
                    </dt>
                  </div>
                </dl>
              </div>
            </div>
            <div className="order-1 lg:order-2 reveal d1 lg:flex lg:items-center -mb-20 lg:mb-0">
              <img
                src={appImage}
                srcSet={`${appImage_464} 464w, ${appImage_640} 640w, ${appImage} 1376w`}
                sizes="(max-width: 1024px) 92vw, 50vw"
                width="1376" height="1464"
                alt="DiskCleaner interface showing scan results"
                loading="eager" decoding="async" fetchPriority="high"
                className="split-img mx-auto w-full max-w-none lg:max-h-[520px] object-contain object-center"
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
  return { default: Comp }
})


const UninstallerSplit = lazy(async () => {
  const Comp = ({ SURFACE }: { SURFACE: string }) => {
    useEffect(() => { const raf = requestAnimationFrame(dispatchRevealRefresh); return () => cancelAnimationFrame(raf) }, [])
    return (
      <section id="uninstaller" className="overflow-hidden py-14 sm:py-20" style={{ background: SURFACE }}>
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="lg:hidden mb-4">
            <span className="inline-flex rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-3 py-1 text-xs font-semibold tracking-[0.01em] text-[var(--blue)]">Complete removal</span>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-0 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-stretch lg:gap-x-16">
            <div className="order-2 lg:order-1 lg:pt-4 lg:pr-8 reveal">
              <div className="lg:max-w-lg">
                <h2 className="hidden lg:inline-flex rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-3 py-1 text-xs font-semibold tracking-[0.01em] text-[var(--blue)]">Complete removal</h2>
                <p className="reveal reveal-headline mt-4 text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em]">
                  <span className="text-[var(--text)]">Dragging to Trash isn't enough.</span> <span className="text-[var(--blue)]">Leave no trace.</span>
                </p>
                <p className="mt-5 text-[17px] leading-[1.65] tracking-[-0.01em] text-[var(--muted)]">
                  Dragging an app to Trash leaves behind gigabytes of caches,
                  preferences, and support files spread across 9 Library locations.
                  DiskCleaner finds every leftover - the files Finder never shows you.
                </p>
                <dl className="mt-6 max-w-xl space-y-2 text-[15px] leading-[1.65] text-[var(--muted)] sm:mt-8 sm:space-y-4 lg:max-w-none">
                  <div className="relative pl-9">
                    <dt className="inline text-[var(--text-dim)]">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="absolute top-1 left-1 size-5 text-[var(--blue)]">
                        <path d="M4 10h12" />
                        <path d="M10 4v12" />
                      </svg>
                      Drag any app from /Applications to scan.
                    </dt>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline text-[var(--text-dim)]">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="absolute top-1 left-1 size-5 text-[var(--blue)]">
                        <rect x="3" y="3" width="14" height="14" rx="3" />
                        <path d="m6.5 10 2 2 5-5" />
                      </svg>
                      Finds leftovers across 9 Library locations.
                    </dt>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline text-[var(--text-dim)]">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="absolute top-1 left-1 size-5 text-[var(--blue)]">
                        <path d="M5 6h10" />
                        <path d="M7 6V4h6v2" />
                        <path d="M6 6v10h8V6" />
                      </svg>
                      Preview every file before removing.
                    </dt>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline text-[var(--text-dim)]">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="absolute top-1 left-1 size-5 text-[var(--blue)]">
                        <path d="M4 10h12" />
                        <path d="M10 4v12" />
                      </svg>
                      All removals go to Trash - fully recoverable.
                    </dt>
                  </div>
                </dl>
              </div>
            </div>
            <div className="order-1 lg:order-2 reveal d1 lg:flex lg:items-center -mb-20 lg:mb-0">
              <img
                src={appImage3}
                srcSet={`${appImage3_464} 464w, ${appImage3_640} 640w, ${appImage3} 1376w`}
                sizes="(max-width: 1024px) 92vw, 50vw"
                width="1376" height="1464"
                alt="DiskCleaner app uninstaller"
                loading="lazy" decoding="async"
                className="split-img mx-auto w-full max-w-none"
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
  return { default: Comp }
})

const MenuBarSplit = lazy(async () => {
  const Comp = ({ BG }: { BG: string }) => {
    useEffect(() => { const raf = requestAnimationFrame(dispatchRevealRefresh); return () => cancelAnimationFrame(raf) }, [])
    return (
      <section className="py-20 sm:py-28" style={{ background: BG }}>
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-x-16">
            <div className="order-2 lg:order-1 reveal flex justify-center">
              <img
                src={menubarImage}
                srcSet={`${menubarImage_464} 464w, ${menubarImage_640} 640w`}
                sizes="(max-width: 1024px) 60vw, 340px"
                width="426" height="568"
                alt="DiskCleaner menu bar popup showing disk usage"
                className="split-img w-3/5 lg:w-auto lg:max-w-[340px] rounded-2xl border border-[var(--border)] shadow-2xl"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="order-1 lg:order-2 lg:pt-4 lg:pr-8 reveal d1">
              <div className="lg:max-w-lg">
              <span className="inline-flex rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-3 py-1 text-xs font-semibold tracking-[0.01em] text-[var(--blue)]">Always on</span>
              <h2 className="reveal reveal-headline mt-4 text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em] text-inherit">
                <span className="text-[var(--text)]">Your disk space,</span> <span className="text-[var(--blue)]">always visible.</span>
              </h2>
              <p className="mt-5 text-[17px] leading-[1.65] tracking-[-0.01em] text-[var(--muted)]">
                Live free space lives in your menu bar — always one glance away.
                Trigger a Quick Scan or check full disk stats without ever opening the app.
                Lightweight. Always on. Never in the way.
              </p>
              <ul className="mt-6 list-none space-y-2 pl-0 text-[15px] leading-[1.65] text-[var(--text-dim)] sm:mt-8 sm:space-y-4">
                <li className="flex items-center gap-3">
                  <svg className="h-5 w-5 shrink-0 text-[var(--blue)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="8" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  Live free space updated in real time
                </li>
                <li className="flex items-center gap-3">
                  <svg className="h-5 w-5 shrink-0 text-[var(--blue)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                  Quick Scan from the menu bar
                </li>
                <li className="flex items-center gap-3">
                  <svg className="h-5 w-5 shrink-0 text-[var(--blue)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="7" y="7" width="10" height="10" rx="2" />
                    <path d="M9 4v2M15 4v2M9 18v2M15 18v2M4 9h2M4 15h2M18 9h2M18 15h2" />
                  </svg>
                  Zero CPU when idle
                </li>
              </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  return { default: Comp }
})


const WhatItFinds = lazy(async () => {
  const Comp = ({ SURFACE }: { SURFACE: string }) => {
    useEffect(() => { const raf = requestAnimationFrame(dispatchRevealRefresh); return () => cancelAnimationFrame(raf) }, [])
    const categories = [
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 22, height: 22 }}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>, name: "App Cache", desc: "Bloated cache files left by every app you've ever opened." },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 22, height: 22 }}><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><line x1="2" y1="12" x2="22" y2="12"/></svg>, name: "Browser Cache", desc: "All 9 browsers: cached pages, images, sessions, cookies." },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 22, height: 22 }}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>, name: "Screenshots", desc: "Desktop and Downloads screenshots piling up for months." },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 22, height: 22 }}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>, name: "Trash Contents", desc: "Files sitting in Trash taking space you think is already freed." },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 22, height: 22 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>, name: "System Logs", desc: "Diagnostic logs, crash reports, and system traces." },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 22, height: 22 }}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>, name: "Developer Data", desc: "Xcode DerivedData, Simulators, CocoaPods, npm, JetBrains." },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 22, height: 22 }}><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>, name: "App Leftovers", desc: "Preferences, support files, and caches from deleted apps." },
    ]
    return (
      <section className="py-20 sm:py-28" style={{ background: SURFACE }}>
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
          <div className="mb-8 flex flex-col items-center text-center sm:mb-12">
            <span className="reveal rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-3 py-1 text-xs font-semibold tracking-[0.01em] text-[var(--blue)]">Seven categories</span>
            <h2 className="reveal reveal-headline d1 mt-4 text-balance text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em]">
              <span className="text-[var(--text)]">More is hiding than you think.</span> <span className="text-[var(--blue)]">One scan finds it all.</span>
            </h2>
            <p className="reveal d2 mt-4 max-w-[600px] text-[17px] leading-[1.55] text-[var(--muted)]">
              Every category runs in parallel. You see exactly what's found — nothing is removed until you say so.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((c, i) => (
              <div key={i} className="reveal flex items-start gap-3 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5" style={{ transitionDelay: `${i * 50}ms` }}>
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] text-[var(--blue)]">{c.icon}</div>
                <div>
                  <div className="text-[14px] font-semibold text-[var(--text)]">{c.name}</div>
                  <div className="mt-0.5 text-[13px] leading-[1.55] text-[var(--muted)]">{c.desc}</div>
                </div>
              </div>
            ))}
            {/* 8th card: "All safe" callout */}
            <div className="reveal d1 flex items-start gap-3 rounded-3xl border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] p-5">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-[var(--blue-tint-border)] bg-[rgba(0,113,227,0.12)] text-[var(--blue)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 22, height: 22 }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <div>
                <div className="text-[14px] font-semibold text-[var(--blue)]">Always safe</div>
                <div className="mt-0.5 text-[13px] leading-[1.55] text-[var(--muted)]">Passwords, documents, and personal files are never touched — ever.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  return { default: Comp }
})

const FAQ = lazy(async () => {
  const Comp = ({ BG }: { BG: string }) => {
    useEffect(() => { const raf = requestAnimationFrame(dispatchRevealRefresh); return () => cancelAnimationFrame(raf) }, [])
    const [open, setOpen] = useState<number | null>(null)
    const items = [
      {
        q: "Is DiskCleaner safe? Does it delete files permanently?",
        a: "No file is ever permanently deleted. DiskCleaner uses macOS's native Trash system exclusively — every file moved is recoverable from your Trash. You also review every file before anything moves.",
      },
      {
        q: "Does DiskCleaner connect to the internet or collect my data?",
        a: "Never. DiskCleaner runs 100% locally on your Mac. It makes no network calls, collects no data, and requires no account. Your file names and disk contents never leave your machine.",
      },
      {
        q: "What exactly does DiskCleaner scan?",
        a: "Seven categories: App Cache, Browser Cache (9 browsers, all profiles), Screenshots, Trash Contents, System Logs, Developer Data (Xcode, Simulators, CocoaPods, npm), and App Leftovers from uninstalled apps. Personal files, passwords, and documents are never touched.",
      },
      {
        q: "Which macOS versions are supported?",
        a: "macOS 13 Ventura through macOS 26 Tahoe. DiskCleaner is built as a native Universal Binary — full Apple Silicon and Intel support.",
      },
      {
        q: "How is DiskCleaner different from other Mac cleaners?",
        a: "Most cleaners delete files silently and show you a number after the fact. DiskCleaner shows you every single file before anything moves, with per-file checkboxes so you stay in control. It also never permanently deletes — everything goes through Trash.",
      },
      {
        q: "Can I get a refund?",
        a: "Yes. If you purchase through the Mac App Store, Apple's standard 14-day refund policy applies. For direct purchases, contact us at adminsupport@diskcleaner.pro and we'll sort it out.",
      },
      {
        q: "Do I need an account or subscription?",
        a: "No account and no subscription. $9.99 one-time covers you for up to 2 Macs and includes every future update.",
      },
    ]
    return (
      <section id="faq" className="py-20 sm:py-28" style={{ background: BG }}>
        <div className="mx-auto w-full max-w-[860px] px-4 sm:px-6 md:px-12">
          <div className="mb-8 flex flex-col items-center text-center sm:mb-12">
            <h2 className="reveal reveal-headline d1 text-balance text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em] text-[var(--text)]">
              Questions answered.
            </h2>
          </div>
          <div className="reveal space-y-2">
            {items.map((item, i) => (
              <div key={i} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-semibold text-[var(--text)] transition-colors hover:text-[var(--blue)]"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span>{item.q}</span>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className={`shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: open === i ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.32s cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <div className="px-5 pb-5 text-[14px] leading-[1.7] text-[var(--muted)]">
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  return { default: Comp }
})

const CTA = lazy(async () => {
  const Comp = ({ BG, openWaitlist }: { BG: string; openWaitlist: () => void }) => {
    useEffect(() => { const raf = requestAnimationFrame(dispatchRevealRefresh); return () => cancelAnimationFrame(raf) }, [])
    const openWaitlistFromCTA = () => {
      try {
        trackCTA("cta-notify", true)
      } catch {
        // no-op
      }
      openWaitlist()
    }
    const onNotifyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()
      openWaitlistFromCTA()
    }
    const onNotifyTouchEnd = (e: React.TouchEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()
      openWaitlistFromCTA()
    }
    return (
      <section id="download" className="relative overflow-hidden py-12 sm:py-16" style={{ background: BG }}>
        <div className="hero-glow h-[600px] w-[1000px] bg-[radial-gradient(ellipse,var(--blue-glow),transparent_65%)]" />
        <div className="relative mx-auto w-full max-w-[1200px] px-6 text-center md:px-12">
          <h2 className="reveal reveal-headline d1 mt-4 text-[clamp(42px,5.5vw,76px)] font-bold leading-[0.98] tracking-[-0.045em] text-[var(--text)]">
            <span className="inline-block text-left sm:contents">
              <span className="block sm:inline">Pay once.</span>{" "}
              <span className="block text-[var(--blue)] sm:inline">Own it forever.</span>
            </span>
          </h2>
          <p className="reveal d2 mx-auto mt-4 max-w-[480px] text-[17px] leading-[1.55] text-[var(--muted)]">
            No subscription. No renewal. No upsells.
            One purchase covers macOS 13 through Tahoe 26 and every update in between.
          </p>
          <div className="reveal d3 mt-8 flex flex-col items-center gap-1 rounded-2xl border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-6 py-3 sm:inline-flex sm:flex-row sm:rounded-full sm:gap-3 sm:px-7">
            <span className="text-[26px] font-bold tracking-[-0.03em] text-[var(--text)] sm:text-[28px]">$9.99</span>
            <span className="text-center text-sm text-[var(--muted)]">one-time · yours forever · up to 2 Macs</span>
          </div>
          <div className="reveal d4">
            <button
              type="button"
              onClick={onNotifyClick}
              onTouchEnd={onNotifyTouchEnd}
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[var(--blue)] px-7 py-3.5 text-[17px] font-medium text-white no-underline transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.97] active:brightness-90 sm:w-auto"
            >
              Get Early Access
            </button>
          </div>
          <div className="reveal d5 mt-7 flex flex-wrap justify-center gap-x-2 gap-y-1.5 sm:gap-5">
            {[
              "3 free scans included",
              "No subscription",
              "macOS 13 → 26 Tahoe",
              "Apple Silicon native",
              "Apple-notarized",
              "No account needed",
            ].map(f => (
              <div key={f} className="flex items-center gap-2 text-[13px] text-[var(--muted)]">
                <div className="h-1 w-1 rounded-full bg-[var(--blue)]" />
                {f}
              </div>
            ))}
          </div>
          {/* Trust signals inline row */}
          <div className="reveal d5 mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-6">
            <span className="flex items-center gap-1.5 text-[13px] text-[var(--muted)]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[var(--blue)]" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              Coming to Mac App Store
            </span>
            <span className="hidden text-[var(--border)] sm:inline">·</span>
            <span className="flex items-center gap-1.5 text-[13px] text-[var(--muted)]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[var(--blue)]" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              Apple-Notarized
            </span>
            <span className="hidden text-[var(--border)] sm:inline">·</span>
            <span className="flex items-center gap-1.5 text-[13px] text-[var(--muted)]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[var(--blue)]" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Zero data collected
            </span>
          </div>
        </div>
      </section>
    )
  }
  return { default: Comp }
})

const SiteFooter = lazy(async () => {
  const Comp = ({ openModal }: { openModal: (k: "support" | "changelog") => void }) => {
    useEffect(() => { const raf = requestAnimationFrame(dispatchRevealRefresh); return () => cancelAnimationFrame(raf) }, [])
    return (
      <footer className="site-footer" style={{ marginTop: 0 }}>
        {/* Columns */}
        <div className="site-footer-cols">
          {/* Brand */}
          <div className="site-footer-brand">
            <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.3px", marginBottom: 12 }}>
              <span style={{ color: "var(--text)" }}>Disk</span><span style={{ color: "var(--blue)" }}>Cleaner</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
              The Mac cleaner built for people<br />who actually use their Mac.
            </p>
          </div>
          {/* Product */}
          <div className="site-footer-col">
            <div className="site-footer-col-hd">Product</div>
            <a href="#features" className="site-footer-link">Features</a>
            <a href="#download" className="site-footer-link">Download</a>
            <button type="button" onClick={() => openModal("changelog")} className="site-footer-link">What's New</button>
          </div>
          {/* Support */}
          <div className="site-footer-col">
            <div className="site-footer-col-hd">Support</div>
            <a href="/help" className="site-footer-link">Help Center</a>
            <button type="button" onClick={() => openModal("support")} className="site-footer-link">FAQ</button>
            <button type="button" onClick={() => openModal("support")} className="site-footer-link">Contact</button>
            <a href="/privacy-policy" className="site-footer-link">Privacy Policy</a>
            <a href="/terms-of-service" className="site-footer-link">Terms of Use</a>
          </div>
          {/* Connect */}
          <div className="site-footer-col">
            <div className="site-footer-col-hd">Connect</div>
            <a href="https://x.com/diskcleanerpro" target="_blank" rel="noopener noreferrer" className="site-footer-link">Twitter / X</a>
            <a href="https://www.threads.net/@diskcleanerpro" target="_blank" rel="noopener noreferrer" className="site-footer-link">Threads</a>
            <a href="mailto:adminsupport@diskcleaner.pro" className="site-footer-link">Email Us</a>
          </div>
        </div>
        {/* Bottom strip */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>© {new Date().getFullYear()} DiskCleaner. All rights reserved.</span>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>Made for Mac.</span>
        </div>
      </footer>
    )
  }
  return { default: Comp }
})

// ─── Home Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light"
    const saved = localStorage.getItem("dc-theme")
    if (saved === "light" || saved === "dark") return saved
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  })
  const [modal, setModal] = useState<ModalKey>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 420)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useRevealOnce()
  const waitlistFormAction = import.meta.env.VITE_WAITLIST_FORM_ACTION as string | undefined

  const STRIPE_WHITE = "var(--surface)"
  const STRIPE_GRAY = "var(--surface2)"

  return (
    <>
      {/* FLOATING NAV — outside .page-enter to avoid CSS transform containing-block trap */}
      <nav style={{
        position: "fixed", top: 12, left: "50%",
        width: "calc(100% - 48px)", maxWidth: 1000, height: 59,
        background: theme === "dark" ? "rgba(28,28,30,0.88)" : "rgba(255,255,255,0.88)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
        borderRadius: 980, boxShadow: "0 2px 20px rgba(0,0,0,0.10)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 20px", boxSizing: "border-box",
        zIndex: 300,
        opacity: scrolled ? 1 : 0,
        pointerEvents: scrolled ? "auto" : "none",
        transform: scrolled ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-6px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}>
        <a href="/" style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.02em", textDecoration: "none", color: theme === "dark" ? "#f5f5f7" : "#1d1d1f" }}>
          Disk<em style={{ fontStyle: "normal", color: "#0071e3" }}>Cleaner</em>
        </a>
        <a href="#download" onClick={() => trackCTA("floating-nav")} style={{ fontSize: 13, fontWeight: 500, background: "#0071e3", color: "#fff", borderRadius: 980, padding: "8px 18px", textDecoration: "none" }}>
          Get Early Access
        </a>
      </nav>

      <div data-theme={theme} className="page-enter">

      {/* NAV */}
      <nav className="site-top-nav fixed left-0 top-0 z-[200] w-full border-b border-[var(--border)] bg-[var(--nav-bg)] backdrop-blur-2xl backdrop-saturate-150"
        style={{ opacity: scrolled ? 0 : 1, pointerEvents: scrolled ? "none" : "auto", transition: "opacity 0.3s ease" }}>
        <div className="mx-auto flex h-[52px] w-full max-w-[1200px] items-center justify-between px-6 md:px-12">
          <a href="/" className="text-[17px] font-semibold tracking-[-0.02em] text-[var(--text)] no-underline">Disk<em className="not-italic text-[var(--blue)]">Cleaner</em></a>
          <ul className="hidden list-none items-center gap-7 md:flex">
            <li><a className="text-[13px] text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]" href="#features">Features</a></li>
            <li><a className="text-[13px] text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]" href="#download">Pricing</a></li>
            <li><a className="text-[13px] text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]" href="/blog">Blog</a></li>
            <li><a className="text-[13px] text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]" href="/help">Help</a></li>
          </ul>
          <div className="flex items-center gap-2.5">
            <button
              className="flex h-[44px] w-[44px] items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface2)] text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--text)]"
              onClick={() => setTheme(t => {
                const next = t === "light" ? "dark" : "light"
                localStorage.setItem("dc-theme", next)
                return next
              })}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </button>
            <a href="#download" onClick={() => trackCTA("nav")} className="rounded-full bg-[var(--blue)] px-4 py-[7px] text-[13px] font-medium text-white no-underline transition hover:brightness-110">Get Early Access</a>
          </div>
        </div>
      </nav>

      <div className="pt-[52px]">
        <Hero BG="var(--bg)" />
        <StatsBand SURFACE={STRIPE_WHITE} />

        <Suspense fallback={null}>
          <InterfaceSplit BG={STRIPE_GRAY} />
          <WhatItFinds SURFACE={STRIPE_WHITE} />
          <Features SURFACE={STRIPE_GRAY} />
          <UninstallerSplit SURFACE={STRIPE_GRAY} />
          <MenuBarSplit BG={STRIPE_WHITE} />
          <FAQ BG={STRIPE_WHITE} />
          <CompareTable BG={STRIPE_GRAY} />
          <HighlightsCarousel SURFACE={STRIPE_GRAY} theme={theme} />
          <CommunityWall SURFACE={STRIPE_WHITE} />
          <CTA BG={STRIPE_GRAY} openWaitlist={() => setModal("waitlist")} />
          <SiteFooter openModal={k => setModal(k)} />
        </Suspense>
      </div>


      <Modal
        openKey={modal}
        onClose={() => setModal(null)}
        title={modalTitle(modal)}
      >
        {modal === "support" && <SupportContent />}
        {modal === "changelog" && <ChangelogContent />}
        {modal === "waitlist" && <WaitlistContent formAction={waitlistFormAction} />}
      </Modal>

    </div>
    </>
  )
}
