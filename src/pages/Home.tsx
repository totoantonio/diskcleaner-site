import { lazy, useCallback, useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Modal, SupportContent, WaitlistContent } from "../components/SiteModal"
import { modalTitle, type ModalKey } from "../components/modalConfig"
import appImage from "../assets/DiskCleaner.webp"
import appImage_464 from "../assets/DiskCleaner-464.webp"
import appImage_640 from "../assets/DiskCleaner-640.webp"
import appUninstallerImage from "../assets/App Uninstaller.webp"
import appUninstallerImage_464 from "../assets/App Uninstaller-464.webp"
import appUninstallerImage_640 from "../assets/App Uninstaller-640.webp"
import appUninstallerImage_1024 from "../assets/App Uninstaller-1024.webp"
import appUninstallerImage_1600 from "../assets/App Uninstaller-1600.webp"
import menuImage from "../assets/Menu.png"
import menuImage_464 from "../assets/Menu-464.png"
import menuImage_640 from "../assets/Menu-640.png"
import ramOptimizerImage from "../assets/RAM Optimizer.webp"
import ramOptimizerImage_464 from "../assets/RAM Optimizer-464.webp"
import ramOptimizerImage_640 from "../assets/RAM Optimizer-640.webp"
import ramOptimizerImage_1024 from "../assets/RAM Optimizer-1024.webp"
import ramOptimizerImage_1600 from "../assets/RAM Optimizer-1600.webp"
import sunBurstImage from "../assets/SunBurst.webp"
import "../App.css"

const appDownloadUrl = "/downloads/DiskCleaner-macOS.dmg"
const appVersion = "26.1.1.4"
const screenshotRevision = "20260531-v2"
const withScreenshotRevision = (url: string) => `${url}?v=${screenshotRevision}`

const preloadArticle = (slug: string) => {
  void import("./Article")
  void import("../lib/blog").then(({ preloadPostBySlug }) => preloadPostBySlug(slug))
}

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
  <text x="28" y="202" font-size="13" fill="${dark ? '#636366' : '#AEAEB2'}">Monterey 12 and Earlier</text>${cross(197)}
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
  <text x="28" y="446" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Apple-Notarized — Passes Gatekeeper</text>${check(441)}
  ${sep.replace('x2="464"', 'y1="458" y2="458" x2="464"')}
  <text x="28" y="474" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">License Covers Up to 2 Devices</text>${check(469)}
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
  <text x="28" y="88" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Smart Scan — 21 Cleanup Categories</text>
  <text x="452" y="88" font-size="13" font-weight="600" fill="#0071E3" text-anchor="end">&lt; 10s</text>
  <rect x="28" y="98" width="424" height="5" rx="2.5" fill="${dark ? '#3a3a3c' : '#F0F0F3'}"/>
  <rect x="28" y="98" width="403" height="5" rx="2.5" fill="#0071E3"/>
  ${sep(118)}
  <text x="28" y="138" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Premium Scan — Small DerivedData</text>
  <text x="452" y="138" font-size="13" font-weight="600" fill="#0071E3" text-anchor="end">10–20s</text>
  <rect x="28" y="148" width="424" height="5" rx="2.5" fill="${dark ? '#3a3a3c' : '#F0F0F3'}"/>
  <rect x="28" y="148" width="318" height="5" rx="2.5" fill="#0071E3"/>
  ${sep(168)}
  <text x="28" y="188" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Premium Scan — Large DerivedData (~20 GB)</text>
  <text x="452" y="188" font-size="13" font-weight="600" fill="#0071E3" text-anchor="end">20–45s</text>
  <rect x="28" y="198" width="424" height="5" rx="2.5" fill="${dark ? '#3a3a3c' : '#F0F0F3'}"/>
  <rect x="28" y="198" width="204" height="5" rx="2.5" fill="#0071E3"/>
  ${sep(218)}
  <text x="28" y="238" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Premium Scan — Very Large Caches (50 GB+)</text>
  <text x="452" y="238" font-size="13" font-weight="600" fill="#0071E3" text-anchor="end">45–90s</text>
  <rect x="28" y="248" width="424" height="5" rx="2.5" fill="${dark ? '#3a3a3c' : '#F0F0F3'}"/>
  <rect x="28" y="248" width="93" height="5" rx="2.5" fill="#0071E3"/>
  ${sectionBg(268)}
  <text x="28" y="284" font-size="11" font-weight="600" fill="${dark ? '#8e8e93' : '#6e6e73'}" letter-spacing="1">BUILT WITH</text>
  <text x="28" y="308" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">SwiftUI + Swift 6 — Full Concurrency</text>${check(303)}
  ${sep(320)}
  <text x="28" y="340" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">AppKit — Menu Bar, NSWorkspace</text>${check(335)}
  ${sep(352)}
  <text x="28" y="372" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">StoreKit 2 — License Management</text>${check(367)}
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
  <text x="88" y="28" font-size="13" fill="${dark ? '#b2b2b8' : '#6E6E73'}">Privacy by Design</text>
  <g transform="translate(0,12)">
  ${sectionBg(48)}
  <text x="28" y="64" font-size="11" font-weight="600" fill="${dark ? '#8e8e93' : '#6e6e73'}" letter-spacing="1">PRIVACY GUARANTEES</text>
  <text x="28" y="90" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Zero Network Activity During Scanning or Cleaning</text>${check(85)}
  ${sep(104)}
  <text x="28" y="124" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">No Analytics, No Telemetry, No Crash Reporting</text>${check(119)}
  ${sep(138)}
  <text x="28" y="158" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">No Account Required — Ever</text>${check(153)}
  ${sep(172)}
  <text x="28" y="192" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Sparkle Auto-Updates in the Background</text>${check(187)}
  ${sep(206)}
  <text x="28" y="226" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">No Background Scanning or Cleaning Processes</text>${check(221)}
  ${sep(240)}
  <text x="28" y="260" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Requires Full Disk Access — Explicitly Granted by You</text>${check(255)}
  ${sep(274)}
  <text x="28" y="294" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Reads File Names and Sizes Only — Never File Contents</text>${check(289)}
  ${sep(308)}
  <text x="28" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}"><tspan x="28" y="328">iCloud-safe scanning — skips placeholders</tspan><tspan x="28" dy="18">and sync daemon caches</tspan></text>${check(333)}
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
    body: "No background network activity while scanning or cleaning. No analytics. No account. iCloud placeholders and sync daemon caches stay out of the scan path.",
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
    <section ref={sectionRef} className="py-16 sm:py-24 lg:py-32" style={{ background: SURFACE }}>
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

void HighlightsCarousel

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

const APP_ICON_SRC = "/macOS_newAppicon.png?v=20260608b"

// ─── Above-fold Sections ──────────────────────────────────────────────────────

function Hero({ BG }: { BG: string }) {
  return (
    <section
      className="authored-hero relative overflow-hidden pb-14 pt-16 sm:pb-20 sm:pt-24"
      style={{ background: BG }}
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <div className="authored-hero-copy">
          <div className="authored-product-lockup">
            <div className="authored-app-icon">
              <img
                src={APP_ICON_SRC}
                alt=""
                width="52"
                height="52"
              />
            </div>
            <div>
              <strong>DiskCleaner for Mac</strong>
              <span>Review-First Cleanup · v{appVersion}</span>
            </div>
          </div>
          <h1 className="authored-major-headline">
            <span className="authored-hero-line">A Mac cleaner that</span>
            <span className="authored-hero-line">
              <span>asks </span>
              <span className="authored-headline-blue">before it cleans.</span>
            </span>
          </h1>
          <p>
            Scan the clutter, open every category, and remove only the files you recognize.
            DiskCleaner moves unwanted items to macOS Trash, so cleanup stays visible and recoverable.
          </p>
          <div className="authored-hero-actions">
            <a href={appDownloadUrl} download data-analytics-location="hero" className="authored-primary-button">
              Download Free for macOS
            </a>
            <a href="#review-first" className="authored-text-link">
              See the Review Flow <span aria-hidden>↓</span>
            </a>
          </div>
          <div className="authored-hero-meta" aria-label="Product details">
            <span>Free Download</span>
            <span>$9.99 One-Time Premium</span>
            <span>macOS 13–26</span>
            <span>Apple-Notarized</span>
          </div>
        </div>

        <div className="authored-product-proof reveal">
          <div className="authored-proof-ambient" aria-hidden="true">
            <span />
            <span />
          </div>
          <img
            src={sunBurstImage}
            width="1200"
            height="1200"
            alt=""
            loading="eager"
            decoding="async"
            className="authored-proof-sunburst"
            aria-hidden="true"
          />
          <div className="authored-proof-floor" aria-hidden="true" />
          <div className="authored-proof-scanlines" aria-hidden="true">
            <span />
          </div>
          <div className="authored-proof-status" aria-hidden="true">
            <span />
            Review Mode
          </div>
          <div className="authored-proof-note authored-proof-note-review">
            <strong>Review First</strong>
            <span>Open categories and inspect individual files.</span>
          </div>
          <div className="authored-proof-note authored-proof-note-trash">
            <strong>Trash, Not Permanent Deletion</strong>
            <span>Anything moved remains recoverable.</span>
          </div>
          <div className="authored-proof-float authored-proof-float-files" aria-hidden="true">
            <span className="authored-proof-float-icon">✓</span>
            <span>
              <strong>Per-File Control</strong>
              <small>Keep anything you recognize</small>
            </span>
          </div>
          <div className="authored-proof-float authored-proof-float-safety" aria-hidden="true">
            <span className="authored-proof-float-icon">↩</span>
            <span>
              <strong>Recoverable Cleanup</strong>
              <small>Moved to macOS Trash</small>
            </span>
          </div>
          <img
            src={appImage}
            srcSet={`${appImage_464} 464w, ${appImage_640} 640w, ${appImage} 1376w`}
            sizes="(max-width: 1024px) 94vw, 1050px"
            width="1376"
            height="1464"
            alt="DiskCleaner showing storage categories and files available for review before cleanup"
            fetchPriority="high"
            decoding="async"
            className="authored-proof-product-image"
          />
        </div>
      </div>
    </section>
  )
}

function StatsBand({ SURFACE }: { SURFACE: string }) {
  return (
    <div className="border-y border-[var(--border)] py-8 sm:py-10 lg:py-12" style={{ background: SURFACE }}>
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <div className="grid grid-cols-2 gap-y-3 md:grid-cols-3 md:gap-y-0">
          {[
            { n: "21",  u: "",   l: "Cleanup Categories" },
            { n: "<10", u: "s",  l: "Time to First Results" },
            { n: "6",   u: "",   l: "Browser Caches Cleaned" },
          ].map((s, i) => (
            <div className={`px-3 text-center md:border-r md:border-[var(--border)] md:last:border-r-0 ${i < 2 ? "border-b border-[var(--border)] pb-6 md:border-b-0 md:pb-0" : ""}`} key={i}>
              <div className="text-[34px] font-bold leading-none tracking-[-0.04em] text-[var(--text)] md:text-[44px]">{s.n}<span className="text-[var(--blue)]">{s.u}</span></div>
              <div className="mt-2 text-[14px] font-medium text-[var(--muted)]">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

void StatsBand

function Features({ SURFACE }: { SURFACE: string }) {
  const decisions = [
    {
      number: "01",
      title: "You see the files, not just a reclaimed-space number.",
      body: "Every scan ends with a review. Expand a category, inspect paths and sizes, then uncheck anything you want to keep.",
      detail: "Every File Visible",
      tone: "review",
    },
    {
      number: "02",
      title: "Cleanup uses the Mac safety net already built in.",
      body: "Normal cleanup moves files to macOS Trash instead of erasing them permanently. If you change your mind, restore them.",
      detail: "Recoverable from Trash",
      tone: "trash",
    },
    {
      number: "03",
      title: "Risky findings are treated differently.",
      body: "Personal files, backups, snapshots, and caution items are never presented as mindless one-click cleanup.",
      detail: "Never Pre-Selected",
      tone: "caution",
    },
  ]

  return (
    <section id="review-first" className="authored-decisions" style={{ background: SURFACE }}>
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <div className="authored-section-intro reveal">
          <span>Three Product Decisions</span>
          <h2>
            <span>Cleanup should be </span>
            <span className="authored-headline-blue">easy to understand.</span>
          </h2>
          <p>
            DiskCleaner is deliberately less automatic than many cleaner apps. That is the point:
            storage cleanup is safer when the person using the Mac can see what is about to happen.
          </p>
        </div>
        <div className="authored-decision-list">
          {decisions.map((decision) => (
            <article key={decision.number} className="authored-decision reveal">
              <span className="authored-decision-number">{decision.number}</span>
              <div className={`authored-decision-card authored-decision-card-${decision.tone}`}>
                <div className="authored-decision-icon" aria-hidden="true">
                  {decision.number === "01" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h7L20 9.5v9A2.5 2.5 0 0 1 17.5 21h-11A2.5 2.5 0 0 1 4 18.5z" />
                      <path d="M13 3v7h7M8 14h8M8 17.5h5" />
                    </svg>
                  )}
                  {decision.number === "02" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5" />
                    </svg>
                  )}
                  {decision.number === "03" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3 4.5 6v5.5c0 4.6 3.1 7.8 7.5 9.5 4.4-1.7 7.5-4.9 7.5-9.5V6z" />
                      <path d="m8.5 12 2.2 2.2 4.8-5" />
                    </svg>
                  )}
                </div>
                <h3>{decision.title}</h3>
                <p>{decision.body}</p>
                <div className="authored-decision-app-row" aria-hidden="true">
                  <span className="authored-decision-checkbox">
                    {decision.tone !== "caution" && "✓"}
                  </span>
                  <span className="authored-decision-app-label">
                    {decision.tone === "review" && "App Cache"}
                    {decision.tone === "trash" && "Trash Items"}
                    {decision.tone === "caution" && "Developer"}
                  </span>
                  <strong>
                    {decision.tone === "review" && "165.1 MB"}
                    {decision.tone === "trash" && "Recoverable"}
                    {decision.tone === "caution" && "27.1 GB"}
                  </strong>
                  {decision.tone === "caution" && <span className="authored-decision-warning">!</span>}
                  <span className="authored-decision-chevron">›</span>
                </div>
                <span className="authored-decision-status"><i />{decision.detail}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const problemPaths = [
  {
    id: "system-data",
    label: "System Data keeps growing",
    title: "Start by finding what macOS groups together.",
    body: "System Data can include caches, logs, local snapshots, developer files, and old support data. DiskCleaner separates those categories so you can review the real files instead of guessing.",
    detail: "Best First Scan: App Cache + System Logs + Developer Data",
    href: "/blog/what-is-system-data-mac/",
    link: "Understand System Data",
  },
  {
    id: "developer",
    label: "Xcode is eating my storage",
    title: "Find build files without touching active work.",
    body: "Review DerivedData, simulator files, DeviceSupport, and other developer storage separately. Caution items stay visible and nothing is silently selected for removal.",
    detail: "Best First Scan: Developer Data + Large Files",
    href: "/blog/which-xcode-folders-are-safe-to-delete/",
    link: "See which Xcode folders are safe",
  },
  {
    id: "apps",
    label: "Deleted apps left files behind",
    title: "See the rest of an app before removing it.",
    body: "Dragging an app to Trash often leaves caches, preferences, containers, logs, and support files behind. The App Uninstaller shows that footprint before anything moves.",
    detail: "Best First Scan: App Uninstaller + App Leftovers",
    href: "/blog/best-app-uninstaller-for-mac/",
    link: "See the app uninstaller guide",
  },
  {
    id: "unsure",
    label: "I just need space back",
    title: "Begin with the obvious clutter, then decide.",
    body: "Run Free Core Cleaning first. Review app caches, logs, screenshots, .DS_Store files, and Trash, then upgrade only if the deeper categories are useful on your Mac.",
    detail: "Best First Scan: Free Core Cleaning",
    href: "/blog/how-to-free-up-storage-on-mac/",
    link: "Read the practical storage guide",
  },
]

function ProblemFinder({ BG }: { BG: string }) {
  const [activeId, setActiveId] = useState(problemPaths[0].id)
  const active = problemPaths.find(problem => problem.id === activeId) ?? problemPaths[0]

  return (
    <section className="authored-problem-finder" style={{ background: BG }}>
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <div className="authored-problem-heading reveal">
          <span>Find Your Starting Point</span>
          <h2 className="authored-single-line-headline">
            <span>What is taking up space </span>
            <span className="authored-headline-blue">on your Mac?</span>
          </h2>
          <p>Choose the problem that sounds familiar. We will show you the safest place to begin.</p>
        </div>
        <div className="authored-problem-layout reveal">
          <div className="authored-problem-tabs" role="tablist" aria-label="Common Mac storage problems">
            {problemPaths.map(problem => (
              <button
                key={problem.id}
                type="button"
                role="tab"
                aria-selected={active.id === problem.id}
                className={active.id === problem.id ? "is-active" : ""}
                onClick={() => setActiveId(problem.id)}
              >
                <span>{problem.label}</span>
                <span aria-hidden="true">→</span>
              </button>
            ))}
          </div>
          <article className="authored-problem-answer" key={active.id} role="tabpanel">
            <span className="authored-problem-answer-label">Recommended Path</span>
            <h3>{active.title}</h3>
            <p>{active.body}</p>
            <code>{active.detail}</code>
            <div className="authored-problem-actions">
              <a href={appDownloadUrl} download data-analytics-location={`problem-${active.id}`} className="authored-primary-button">
                Download Free for macOS
              </a>
              <Link to={active.href} className="authored-text-link">
                {active.link} <span aria-hidden>→</span>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function LatestGuides({ BG }: { BG: string }) {
  const guides = [
      {
        eyebrow: "Practical guide",
        title: "How to free up storage on Mac",
        body: "A useful order of operations, from obvious clutter to the storage categories macOS makes harder to understand.",
        href: "/blog/how-to-free-up-storage-on-mac/",
      },
      {
        eyebrow: "Explainer",
        title: "What is System Data on Mac?",
        body: "Learn what macOS puts in the System Data bucket and which parts are reasonable to review.",
        href: "/blog/what-is-system-data-mac/",
      },
      {
        eyebrow: "Product philosophy",
        title: "Why Trash-first cleanup matters",
        body: "Why recoverable cleanup is a better default than silently deleting files forever.",
        href: "/blog/why-trash-first-cleanup-matters/",
      },
  ]
  return (
    <section className="authored-guides" style={{ background: BG }}>
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
          <div className="authored-guides-heading reveal">
            <div>
              <span>Useful Before You Download</span>
              <h2 className="authored-single-line-headline"><span>Learn what is taking space. </span><span className="authored-headline-blue">Then decide.</span></h2>
            </div>
            <a href="/blog/" className="authored-text-link">Browse Every Guide <span aria-hidden>↗</span></a>
          </div>
          <div className="authored-guide-grid">
            {guides.map(guide => (
              <Link key={guide.href} to={guide.href} className="authored-guide-card reveal">
                <span>{guide.eyebrow}</span>
                <h3>{guide.title}</h3>
                <p>{guide.body}</p>
                <strong>Read Guide <span aria-hidden>→</span></strong>
              </Link>
            ))}
          </div>
        </div>
    </section>
  )
}

function FollowBuild({ BG }: { BG: string }) {
  return (
    <section className="authored-follow" style={{ background: BG }}>
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
          <div className="authored-follow-card reveal">
            <div>
              <span>Follow the Build</span>
              <h2><span>A small Mac app, </span><span className="authored-headline-blue">built in public.</span></h2>
              <p>Product decisions, release notes, and practical Mac storage guides. No Daily Noise.</p>
            </div>
            <div className="authored-follow-actions">
              <a href="https://x.com/diskcleanerpro" target="_blank" rel="noopener noreferrer">Follow on X <span aria-hidden>↗</span></a>
              <a href="https://www.threads.net/@diskcleanerpro" target="_blank" rel="noopener noreferrer">Follow on Threads <span aria-hidden>↗</span></a>
              <a href="/changelog/">Read the Changelog <span aria-hidden>→</span></a>
            </div>
          </div>
        </div>
    </section>
  )
}

// ─── Lazy Sections ────────────────────────────────────────────────────────────

const InterfaceSplit = lazy(async () => {
  const Comp = () => {
    useEffect(() => { const raf = requestAnimationFrame(dispatchRevealRefresh); return () => cancelAnimationFrame(raf) }, [])
    return (
      <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32" style={{ background: "var(--surface2)" }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 hidden h-full w-[30%] lg:block"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.28) 1.25px, transparent 1.25px)",
            backgroundSize: "22px 22px",
            maskImage: "linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.72) 52%, rgba(0,0,0,0.12) 86%, transparent 100%), linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.48) 38%, rgba(0,0,0,0.3) 72%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.72) 52%, rgba(0,0,0,0.12) 86%, transparent 100%), linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.48) 38%, rgba(0,0,0,0.3) 72%, transparent 100%)",
            transform: "translateX(-8%)",
          }}
        />
        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-10 gap-y-14 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-x-20">
            <div className="order-1 lg:order-1 lg:pr-8 reveal">
              <div className="lg:max-w-[26rem]">
                <p className="reveal reveal-headline text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em]">
                  <span className="text-[var(--text)]">The full picture.</span> <span className="text-[var(--blue)]">Before anything moves.</span>
                </p>
                <p className="mt-4 text-[16px] leading-[1.7] tracking-[-0.01em] text-[var(--muted)]">
                  See exactly what's taking up space before a single file moves.
                  Expand any category down to individual files. Uncheck anything you want to keep.
                  When you're ready - and only then - click Clean.
                </p>
                <dl className="feature-bullet-list mt-6 max-w-xl space-y-2 text-[16px] leading-[1.7] text-[var(--muted)] sm:mt-8 sm:space-y-4 lg:max-w-none">
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
                      Per-file checkboxes across every scan result.
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
            <div className="order-2 lg:order-2 reveal d1 lg:flex lg:items-center lg:justify-end">
              <img
                src={appImage}
                srcSet={`${appImage_464} 464w, ${appImage_640} 640w, ${appImage} 1376w`}
                sizes="(max-width: 1024px) 92vw, 50vw"
                width="1376" height="1464"
                alt="DiskCleaner Mac cleaner interface showing disk cleanup scan results, file sizes, categories, and per-file review before moving items to Trash"
                loading="eager" decoding="async" fetchPriority="high"
                className="split-img mx-auto w-full max-w-none object-contain object-center lg:max-h-[520px]"
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
  return { default: Comp }
})

void InterfaceSplit


function UninstallerSplit({ SURFACE }: { SURFACE: string }) {
  return (
      <section id="uninstaller" className="authored-uninstaller-section overflow-hidden py-16 sm:py-24 lg:py-32" style={{ background: SURFACE }}>
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="authored-uninstaller-layout mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-x-16">
            <div className="order-1 lg:order-1 lg:pr-8 reveal">
              <div className="lg:max-w-[40rem]">
                <p className="reveal reveal-headline text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em]">
                  <span className="text-[var(--text)]">Removing the app is only </span>
                  <span className="text-[var(--blue)]">half the job.</span>
                </p>
                <p className="mt-4 text-[17px] leading-[1.65] tracking-[-0.01em] text-[var(--muted)]">
                  Dragging an app to Trash only removes the app itself. The rest hides quietly in Library folders: caches, preferences, logs, containers, and support files.
                  Drop an app into DiskCleaner to see its full footprint, then choose which leftovers should go.
                </p>
                <dl className="feature-bullet-list mt-6 max-w-xl space-y-2 text-[17px] leading-[1.65] text-[var(--muted)] sm:mt-8 sm:space-y-4 lg:max-w-none">
                  <div className="relative pl-9">
                    <dt className="inline text-[var(--text-dim)]">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="absolute top-1 left-1 size-5 text-[var(--blue)]">
                        <path d="M4 10h12" />
                        <path d="M10 4v12" />
                      </svg>
                      Drag any app from /Applications to scan its full footprint.
                    </dt>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline text-[var(--text-dim)]">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="absolute top-1 left-1 size-5 text-[var(--blue)]">
                        <rect x="3" y="3" width="14" height="14" rx="3" />
                        <path d="m6.5 10 2 2 5-5" />
                      </svg>
                      Finds caches, preferences, containers, logs, and support files across Library locations.
                    </dt>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline text-[var(--text-dim)]">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="absolute top-1 left-1 size-5 text-[var(--blue)]">
                        <path d="M5 6h10" />
                        <path d="M7 6V4h6v2" />
                        <path d="M6 6v10h8V6" />
                      </svg>
                      Review every leftover file before removal with the same per-file control as cleanup scans.
                    </dt>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline text-[var(--text-dim)]">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="absolute top-1 left-1 size-5 text-[var(--blue)]">
                        <path d="M4 10h12" />
                        <path d="M10 4v12" />
                      </svg>
                      App removal and leftover cleanup both go to Trash - fully recoverable.
                    </dt>
                  </div>
                </dl>
              </div>
            </div>
            <div className="order-2 lg:order-2 reveal d1 lg:flex lg:items-center">
              <img
                src={withScreenshotRevision(appUninstallerImage)}
                srcSet={`${withScreenshotRevision(appUninstallerImage_464)} 464w, ${withScreenshotRevision(appUninstallerImage_640)} 640w, ${withScreenshotRevision(appUninstallerImage_1024)} 1024w, ${withScreenshotRevision(appUninstallerImage_1600)} 1600w, ${withScreenshotRevision(appUninstallerImage)} 2024w`}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 88vw, 46vw"
                width="2024"
                height="1848"
                alt="DiskCleaner App Uninstaller for Mac showing leftover files, caches, preferences, containers, and app removal review before cleanup"
                loading="lazy"
                decoding="async"
                className="authored-uninstaller-visual split-img mx-auto w-full max-w-[760px] object-contain object-center lg:max-w-[820px]"
              />
            </div>
          </div>
        </div>
      </section>
  )
}

const RamOptimizerSplit = lazy(async () => {
  const Comp = ({ BG }: { BG: string }) => {
    useEffect(() => { const raf = requestAnimationFrame(dispatchRevealRefresh); return () => cancelAnimationFrame(raf) }, [])
    return (
      <section className="overflow-hidden py-16 sm:py-24 lg:py-32" style={{ background: BG }}>
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-x-16">
            <div className="order-2 lg:order-1 lg:pr-8 reveal">
              <div className="lg:max-w-lg">
                <p className="reveal reveal-headline text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em]">
                  <span className="text-[var(--text)]">Memory pressure.</span> <span className="text-[var(--blue)]">Finally explained.</span>
                </p>
                <p className="mt-4 text-[17px] leading-[1.65] tracking-[-0.01em] text-[var(--muted)]">
                  No fake RAM gains. No risky background tricks. DiskCleaner shows the memory signals that actually matter: pressure, compressed memory, and swap usage.
                  When your Mac feels heavy, you get a clear picture of why — and a safe refresh action that works with macOS, not against it. If storage pressure is part of the problem, start with our guide on{" "}
                  <Link to="/blog/how-to-free-up-storage-on-mac/" onMouseEnter={() => preloadArticle("how-to-free-up-storage-on-mac")} onFocus={() => preloadArticle("how-to-free-up-storage-on-mac")} onTouchStart={() => preloadArticle("how-to-free-up-storage-on-mac")} className="text-[var(--blue)] no-underline">
                    how to free up storage on Mac
                  </Link>.
                </p>
                <dl className="feature-bullet-list mt-6 max-w-xl space-y-2 text-[17px] leading-[1.65] text-[var(--muted)] sm:mt-8 sm:space-y-4 lg:max-w-none">
                  <div className="relative pl-9">
                    <dt className="inline text-[var(--text-dim)]">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="absolute top-1 left-1 size-5 text-[var(--blue)]">
                        <path d="M4 12h3l2-5 3 8 2-5h2" />
                      </svg>
                      Live memory pressure, compressed memory, and swap telemetry.
                    </dt>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline text-[var(--text-dim)]">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="absolute top-1 left-1 size-5 text-[var(--blue)]">
                        <path d="M10 3v3" />
                        <path d="M10 14v3" />
                        <path d="M3 10h3" />
                        <path d="M14 10h3" />
                        <circle cx="10" cy="10" r="4" />
                      </svg>
                      See whether slowdown is cache clutter, memory compression, or swap pressure.
                    </dt>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline text-[var(--text-dim)]">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="absolute top-1 left-1 size-5 text-[var(--blue)]">
                        <path d="M16 10a6 6 0 1 1-1.76-4.24" />
                        <path d="M16 4v4h-4" />
                      </svg>
                      Use a safe refresh action instead of aggressive “RAM cleaning” claims.
                    </dt>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline text-[var(--text-dim)]">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="absolute top-1 left-1 size-5 text-[var(--blue)]">
                        <rect x="3" y="3" width="14" height="14" rx="3" />
                        <path d="m6.5 10 2 2 5-5" />
                      </svg>
                      Built to explain what your Mac is doing, not hide it behind a single button.
                    </dt>
                  </div>
                </dl>
              </div>
            </div>
            <div className="order-2 lg:order-2 reveal d1 lg:flex lg:items-center">
              <img
                src={withScreenshotRevision(ramOptimizerImage)}
                srcSet={`${withScreenshotRevision(ramOptimizerImage_464)} 464w, ${withScreenshotRevision(ramOptimizerImage_640)} 640w, ${withScreenshotRevision(ramOptimizerImage_1024)} 1024w, ${withScreenshotRevision(ramOptimizerImage_1600)} 1600w, ${withScreenshotRevision(ramOptimizerImage)} 2024w`}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 88vw, 46vw"
                width="2024"
                height="1848"
                alt="DiskCleaner RAM Optimizer for Mac showing memory pressure, compressed memory, swap usage, and safe memory refresh insights"
                loading="lazy"
                decoding="async"
                className="split-img mx-auto w-full max-w-[760px] object-contain object-center lg:max-w-[820px]"
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
  return { default: Comp }
})

void RamOptimizerSplit

function MenuBarSplit({ BG }: { BG: string }) {
  return (
      <section className="py-16 sm:py-24 lg:py-32" style={{ background: BG }}>
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-x-16">
            <div className="order-2 lg:order-1 reveal flex justify-center py-1 sm:py-0 lg:items-center">
              <img
                src={menuImage}
                srcSet={`${menuImage_464} 464w, ${menuImage_640} 640w, ${menuImage} 650w`}
                sizes="(max-width: 1024px) 92vw, 42vw"
                width="650"
                height="686"
                alt="DiskCleaner Mac menu bar cleaner showing free disk space, quick scan controls, and storage status from the menu bar"
                loading="lazy"
                decoding="async"
                className="split-img mx-auto w-full max-w-[230px] rounded-[18px] object-contain object-center sm:max-w-[250px] lg:max-w-[260px]"
              />
            </div>
            <div className="order-1 lg:order-2 lg:pt-4 lg:pr-8 reveal d1">
              <div className="lg:max-w-lg">
              <h2 className="reveal reveal-headline text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em] text-inherit">
                <span className="text-[var(--text)]">Check free space </span>
                <span className="text-[var(--blue)]">without stopping your work.</span>
              </h2>
              <p className="mt-4 text-[17px] leading-[1.65] tracking-[-0.01em] text-[var(--muted)]">
                The menu bar view keeps the useful number close: how much space is left.
                Open DiskCleaner or start a scan when the number begins to look uncomfortable.
              </p>
              <ul className="feature-bullet-list mt-6 list-none space-y-2 pl-0 text-[17px] leading-[1.65] text-[var(--text-dim)] sm:mt-8 sm:space-y-4">
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
                  Scan and clean from the menu bar
                </li>
                <li className="flex items-center gap-3">
                  <svg className="h-5 w-5 shrink-0 text-[var(--blue)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="7" y="7" width="10" height="10" rx="2" />
                    <path d="M9 4v2M15 4v2M9 18v2M15 18v2M4 9h2M4 15h2M18 9h2M18 15h2" />
                  </svg>
                  Update badge and lightweight utilities
                </li>
              </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}


const WhatItFinds = lazy(async () => {
  const Comp = ({ SURFACE }: { SURFACE: string }) => {
    useEffect(() => { const raf = requestAnimationFrame(dispatchRevealRefresh); return () => cancelAnimationFrame(raf) }, [])
    const categories = [
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 22, height: 22 }}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>, name: "App Cache", desc: "Safe third-party app caches that grow quietly over time." },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 22, height: 22 }}><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><line x1="2" y1="12" x2="22" y2="12"/></svg>, name: "Browser Cache", desc: "Chrome, Firefox, Edge, Brave, Arc, and Opera cache folders." },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 22, height: 22 }}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>, name: "Screenshots", desc: "Screenshot-named files in the actual macOS screenshots folder." },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 22, height: 22 }}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>, name: "macOS Trash", desc: "Files still consuming space in your Mac's Trash." },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 22, height: 22 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>, name: "System Logs", desc: "App logs, crash reports, and diagnostic logs that are safe to review and remove." },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 22, height: 22 }}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>, name: "Developer Data", desc: "Xcode DerivedData, CoreSimulator files, and old iOS DeviceSupport files." },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 22, height: 22 }}><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>, name: "App Leftovers", desc: "Orphaned support files, caches, and preferences with risk labels and review before cleanup." },
    ]
    return (
      <section className="py-16 sm:py-24 lg:py-32" style={{ background: SURFACE }}>
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
          <div className="mb-8 flex flex-col items-center text-center sm:mb-12">
            <h2 className="reveal reveal-headline d1 text-balance text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em]">
              <span className="text-[var(--text)]">21 categories.</span> <span className="text-[var(--blue)]">One scan. You decide what goes.</span>
            </h2>
            <p className="reveal d2 mt-4 max-w-[560px] text-[16px] leading-[1.6] text-[var(--muted)]">
              Free Core Cleaning covers everyday clutter. Premium adds browser cache, developer files, large downloads, backups, external storage, and more. If Xcode storage keeps ballooning, read our guide on{" "}
              <Link to="/blog/delete-xcode-derived-data/" onMouseEnter={() => preloadArticle("delete-xcode-derived-data")} onFocus={() => preloadArticle("delete-xcode-derived-data")} onTouchStart={() => preloadArticle("delete-xcode-derived-data")} className="text-[var(--blue)] no-underline">
                deleting Xcode DerivedData
              </Link>. You see exactly what was found before anything moves.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <div key={i} className="flex items-start gap-3 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] text-[var(--blue)]">{c.icon}</div>
                <div>
                  <div className="text-[14px] font-semibold text-[var(--text)]">{c.name}</div>
                  <div className="mt-0.5 text-[13px] leading-[1.55] text-[var(--muted)]">{c.desc}</div>
                </div>
              </div>
            ))}
            {/* Always safe — spans 2 cols on lg for bento effect */}
            <div className="sm:col-span-2 lg:col-span-2 flex items-center gap-5 rounded-3xl border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] p-6 shadow-[0_2px_16px_rgba(0,113,227,0.10)]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-[var(--blue-tint-border)] bg-[rgba(0,113,227,0.12)] text-[var(--blue)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 24, height: 24 }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <div>
                <div className="text-[17px] font-bold text-[var(--blue)]">Always Safe</div>
                <div className="mt-1 text-[14px] leading-[1.6] text-[var(--muted)]">Protected paths stay blocked. iCloud placeholder files and sync daemon caches are skipped. Risky and personal findings are never pre-selected. Every removal goes to Trash, not permanent deletion.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  return { default: Comp }
})

void WhatItFinds

function FAQ({ BG }: { BG: string }) {
  const [open, setOpen] = useState<number | null>(null)
  const items = [
      {
        q: "Is DiskCleaner safe? Does it delete files permanently?",
        a: "No file is ever permanently deleted. DiskCleaner uses macOS's native Trash system exclusively — every file moved is recoverable from your Trash. You also review every file before anything moves.",
      },
      {
        q: "Does DiskCleaner connect to the internet or collect my data?",
        a: "DiskCleaner runs locally on your Mac. Scanning and cleaning stay on-device, the app includes no analytics or tracking, and no account is required. Sparkle keeps the app up to date in the background without sending your scan results or file data anywhere.",
      },
      {
        q: "What exactly does DiskCleaner scan?",
        a: "DiskCleaner covers 21 cleanup categories and tools, including app cache, browser cache, system logs, screenshots, .DS_Store files, Trash, developer data, Homebrew cache, movies, downloads, large files, iOS backups, Mail attachments, app leftovers, external storage, local Time Machine snapshots, purgeable space, and old installers — plus dedicated RAM Optimizer, App Uninstaller, and WiFi & DNS Optimizer tools. Caution and Review items are clearly flagged and never pre-selected.",
      },
      {
        q: "Which macOS versions are supported?",
        a: "macOS 13 Ventura through macOS 26 Tahoe. DiskCleaner is built as a native Universal Binary — full Apple Silicon and Intel support.",
      },
      {
        q: "How is DiskCleaner different from other Mac cleaners?",
        a: "Most cleaners delete files silently and show you a number. You never know what moved. DiskCleaner works the opposite way: you see every file — with its path and size — before anything happens. Per-file checkboxes. Nothing permanent. Everything recoverable from Trash.",
      },
      {
        q: "Is DiskCleaner the same as Disk Clean Pro?",
        a: (
          <>
            No. DiskCleaner is a separate product with its own review-first, Trash-first workflow. If you are comparing similarly named Mac cleaners, see our{" "}
            <Link to="/disk-clean-pro-alternative/" className="text-[var(--blue)] no-underline">
              Disk Clean Pro alternative guide
            </Link>.
          </>
        ),
      },
      {
        q: "Can I get a refund?",
        a: "Yes. If you purchase through the Mac App Store, Apple's standard 14-day refund policy applies. For direct purchases, contact us at customersupport@diskcleaner.pro and we'll sort it out.",
      },
      {
        q: "Do I need an account or subscription?",
        a: "No account and no subscription. Free Core Cleaning for App Cache, System Logs, Screenshots, .DS_Store files, and macOS Trash is available without upgrading. A $9.99 One-Time Premium purchase unlocks the full scanner for up to 2 Macs and includes future updates.",
      },
  ]
  return (
      <section id="faq" className="py-16 sm:py-24 lg:py-32 faq-premium" style={{ background: BG }}>
        <div className="mx-auto w-full max-w-[860px] px-4 sm:px-6 md:px-12">
          <div className="mb-8 flex flex-col items-center text-center sm:mb-12">
            <h2 className="reveal reveal-headline d1 text-balance text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em] text-[var(--text)]">
              <span className="text-[var(--text)]">Questions, </span>
              <span className="text-[var(--blue)]">answered.</span>
            </h2>
          </div>
          <div className="reveal space-y-2">
            {items.map((item, i) => (
              <div key={i} className="rounded-[26px] border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
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
                  className={`faq-answer-wrap ${open === i ? "is-open" : ""}`}
                  style={{
                    maxHeight: open === i ? "240px" : "0px",
                    opacity: open === i ? 1 : 0,
                    transition: "max-height 0.24s ease, opacity 0.18s ease",
                  }}
                >
                  <div className="faq-answer-inner" style={{ overflow: "hidden" }}>
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

function CTA({ BG }: { BG: string }) {
  return (
      <section id="download" className="authored-download-section" style={{ background: BG }}>
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
          <div className="authored-download-panel">
            <div className="authored-download-orb authored-download-orb-left" aria-hidden="true" />
            <div className="authored-download-orb authored-download-orb-right" aria-hidden="true" />
            <div className="authored-download-float authored-download-float-free" aria-hidden="true">
              <span>✓</span>
              <div>
                <strong>Free Core Cleaning</strong>
                <small>Start without upgrading</small>
              </div>
            </div>
            <div className="authored-download-float authored-download-float-license" aria-hidden="true">
              <span>$</span>
              <div>
                <strong>One-Time Purchase</strong>
                <small>Yours forever · Up to 2 Macs</small>
              </div>
            </div>
            <img
              src={sunBurstImage}
              width="1200"
              height="1200"
              alt=""
              loading="lazy"
              decoding="async"
              className="authored-download-sunburst"
              aria-hidden="true"
            />

            <div className="authored-download-content">
              <div className="authored-download-kicker reveal">
                <span />
                Ready When Your Mac Needs Space
              </div>
              <h2 className="reveal reveal-headline d1">
                Download the cleaner free.<br />
                Upgrade only if you need the rest.
              </h2>
              <p className="reveal d2">
                Free Core Cleaning is included. A $9.99 one-time purchase unlocks every scan category
                for up to two Macs, including future updates.
              </p>
              <div className="authored-download-price reveal d3">
                <strong>$9.99</strong>
                <span>One-Time · Yours Forever · Up to 2 Macs</span>
              </div>
              <div className="authored-download-actions reveal d4">
            <a
              href={appDownloadUrl}
              download
              data-analytics-location="download-section"
                  className="authored-download-button"
            >
                  Download Free for macOS <span aria-hidden>↓</span>
            </a>
                <a href="/trust/" className="authored-download-secondary">Review Security</a>
          </div>
              <p className="authored-download-install-note reveal d5">
                Opens as a standard Mac DMG. No account or payment details are required to start Free Core Cleaning.
              </p>
              <div className="authored-download-trust reveal d5">
                {[
                  "No Subscription",
                  "macOS 13 → 26 Tahoe",
                  "Apple Silicon Native",
                  "Apple-Notarized",
                  "No Account Needed",
                  "Zero Data Collected",
                  "Coming to the Mac App Store",
                ].map(item => <span key={item}>{item}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

function TrustBand({ BG }: { BG: string }) {
  return (
      <section className="py-16 sm:py-24 lg:py-32" style={{ background: BG }}>
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
          <div className="authored-trust-note reveal">
            <span className="authored-trust-eyebrow">Trust Before You Clean</span>
            <div className="authored-trust-heading">
              <h2 className="reveal reveal-headline d1 text-balance text-[clamp(30px,3.6vw,48px)] font-bold leading-[1.06] tracking-[-0.04em] text-[var(--text)]">
                <span className="text-[var(--text)]">What DiskCleaner refuses to do </span>
                <span className="text-[var(--blue)]">matters too.</span>
              </h2>
              <a href="/trust/" className="authored-text-link">Read the Trust Center <span aria-hidden>→</span></a>
            </div>
            <div className="authored-trust-details">
              <p className="reveal d2 max-w-[760px] text-[17px] leading-[1.6] text-[var(--muted)]">
                It does not silently clean in the background, permanently erase normal cleanup results,
                upload scan results, or pre-select personal and caution-labeled files.
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

function SiteFooter({ openModal }: { openModal: (k: "support" | "changelog") => void }) {
  return (
      <footer className="site-footer" style={{ marginTop: 0 }}>
        {/* Columns */}
        <div className="site-footer-cols">
          {/* Brand */}
          <div className="site-footer-brand">
            <div className="type-ttl">
              <span style={{ color: "var(--text)" }}>Disk</span><span style={{ color: "var(--blue)" }}>Cleaner</span>
            </div>
            <p className="type-copy-muted" style={{ margin: 0 }}>
              The Mac cleaner built for people<br />who actually use their Mac.
            </p>
          </div>
          {/* Product */}
          <div className="site-footer-col">
            <div className="site-footer-col-hd">Product</div>
            <a href="#features" className="site-footer-link">Features</a>
            <a href="#download" className="site-footer-link">Download</a>
            <a href="/changelog/" className="site-footer-link">Changelog</a>
            <a href="/about/" className="site-footer-link">About</a>
            <a href="/trust/" className="site-footer-link">Trust Center</a>
          </div>
          {/* Support */}
          <div className="site-footer-col">
            <div className="site-footer-col-hd">Support</div>
            <a href="/help/" className="site-footer-link">Help</a>
            <button type="button" onClick={() => openModal("support")} className="site-footer-link">FAQ</button>
            <button type="button" onClick={() => openModal("support")} className="site-footer-link">Contact</button>
            <a href="/privacy-policy/" className="site-footer-link">Privacy Policy</a>
            <a href="/terms-of-service/" className="site-footer-link">Terms of Use</a>
            <a href="/editorial-policy/" className="site-footer-link">Editorial Policy</a>
          </div>
          {/* Connect */}
          <div className="site-footer-col">
            <div className="site-footer-col-hd">Connect</div>
            <a href="https://x.com/diskcleanerpro" target="_blank" rel="noopener noreferrer" className="site-footer-link">Twitter / X</a>
            <a href="https://www.threads.net/@diskcleanerpro" target="_blank" rel="noopener noreferrer" className="site-footer-link">Threads</a>
            <a href="mailto:customersupport@diskcleaner.pro" className="site-footer-link">Email Us</a>
          </div>
        </div>
        {/* Bottom strip */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <span className="type-caption">© {new Date().getFullYear()} 22 Software Publishing. All rights reserved.</span>
          <span className="type-caption" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <span aria-hidden="true" className="type-caption"></span>
            Made for Mac.
          </span>
        </div>
      </footer>
  )
}

// ─── Home Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const location = useLocation()
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark"
    const saved = localStorage.getItem("dc-theme")
    if (saved === "light" || saved === "dark") return saved
    return "dark"
  })
  const [modal, setModal] = useState<ModalKey>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const viewport = window.visualViewport
    const root = document.documentElement
    let frame = 0

    const updateViewportTop = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const offsetTop = Math.max(0, viewport?.offsetTop ?? 0)
        root.style.setProperty("--dc-visual-viewport-top", `${offsetTop}px`)
      })
    }

    updateViewportTop()
    window.addEventListener("resize", updateViewportTop, { passive: true })
    viewport?.addEventListener("resize", updateViewportTop, { passive: true })
    viewport?.addEventListener("scroll", updateViewportTop, { passive: true })

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("resize", updateViewportTop)
      viewport?.removeEventListener("resize", updateViewportTop)
      viewport?.removeEventListener("scroll", updateViewportTop)
      root.style.removeProperty("--dc-visual-viewport-top")
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 520)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!location.hash) return

    const scrollToHash = () => {
      const target = document.querySelector(location.hash)
      if (!(target instanceof HTMLElement)) return
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    const raf = window.requestAnimationFrame(() => {
      window.setTimeout(scrollToHash, 80)
    })

    return () => window.cancelAnimationFrame(raf)
  }, [location.hash])

  useRevealOnce()
  const waitlistFormAction = import.meta.env.VITE_WAITLIST_FORM_ACTION as string | undefined

  const STRIPE_WHITE = "var(--surface)"
  const STRIPE_GRAY = "var(--surface2)"

  return (
    <>
      <div data-theme={theme}>

      {/* NAV */}
      <nav className={`site-top-nav authored-nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="authored-nav-inner">
          <a href="/" className="authored-nav-logo">
            <img src={APP_ICON_SRC} width="28" height="28" alt="" />
            <span className="authored-brand-wordmark">Disk<strong>Cleaner</strong></span>
          </a>
          <div className="authored-nav-links" aria-label="Primary navigation">
            <a href="#review-first">How It Works</a>
            <a href="#uninstaller">Features</a>
            <a href="/trust/">Safety</a>
            <a href="#download">Pricing</a>
            <a href="/blog/">Blog</a>
          </div>
          <div className="authored-nav-actions">
            <button
              className="authored-theme-button"
              onClick={() => setTheme(t => {
                const next = t === "light" ? "dark" : "light"
                localStorage.setItem("dc-theme", next)
                return next
              })}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </button>
            <button
              type="button"
              className={`authored-menu-button ${mobileMenuOpen ? "is-open" : ""}`}
              onClick={() => setMobileMenuOpen(open => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls="home-mobile-menu"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <span /><span />
            </button>
            <a href={appDownloadUrl} download data-analytics-location="top-nav" className="authored-nav-download">
              Download Free
            </a>
          </div>
          {mobileMenuOpen && (
            <div id="home-mobile-menu" className="authored-mobile-menu">
              {[
                { href: "#review-first", label: "How It Works" },
                { href: "#uninstaller", label: "Features" },
                { href: "/trust/", label: "Safety" },
                { href: "#download", label: "Pricing" },
                { href: "/blog/", label: "Blog" },
              ].map(link => (
                <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>{link.label}</a>
              ))}
              <a href={appDownloadUrl} download data-analytics-location="mobile-nav" className="authored-mobile-download" onClick={() => setMobileMenuOpen(false)}>
                Download Free for macOS
              </a>
            </div>
          )}
        </div>
      </nav>

      <div className="page-enter pt-[52px]">
        <Hero BG="var(--bg)" />
        <Features SURFACE={STRIPE_GRAY} />
        <ProblemFinder BG={STRIPE_WHITE} />
        <LatestGuides BG={STRIPE_WHITE} />

        <UninstallerSplit SURFACE={STRIPE_WHITE} />
        <MenuBarSplit BG={STRIPE_GRAY} />
        <TrustBand BG={STRIPE_WHITE} />
        <CTA BG={STRIPE_WHITE} />

        <FollowBuild BG={STRIPE_GRAY} />

        <FAQ BG={STRIPE_WHITE} />
        <SiteFooter openModal={k => setModal(k)} />
      </div>


      <Modal
        openKey={modal}
        onClose={() => setModal(null)}
        title={modalTitle(modal)}
      >
        {modal === "support" && <SupportContent />}
        {modal === "waitlist" && <WaitlistContent formAction={waitlistFormAction} />}
      </Modal>

    </div>
    </>
  )
}
