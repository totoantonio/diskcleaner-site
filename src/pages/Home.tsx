import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react"
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
import "../App.css"

const appDownloadUrl = "/downloads/DiskCleaner-macOS.dmg"
const screenshotRevision = "20260531-v2"
const withScreenshotRevision = (url: string) => `${url}?v=${screenshotRevision}`

const preloadArticle = (slug: string) => {
  void import("./Article")
  void import("../lib/blog").then(({ preloadPostBySlug }) => preloadPostBySlug(slug))
}

const CompareTable = lazy(() => import("../components/home/CompareTable"))

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
  <text x="28" y="88" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Smart Scan — 16+ cleanup categories</text>
  <text x="452" y="88" font-size="13" font-weight="600" fill="#0071E3" text-anchor="end">&lt; 10s</text>
  <rect x="28" y="98" width="424" height="5" rx="2.5" fill="${dark ? '#3a3a3c' : '#F0F0F3'}"/>
  <rect x="28" y="98" width="403" height="5" rx="2.5" fill="#0071E3"/>
  ${sep(118)}
  <text x="28" y="138" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Premium scan — small DerivedData</text>
  <text x="452" y="138" font-size="13" font-weight="600" fill="#0071E3" text-anchor="end">10–20s</text>
  <rect x="28" y="148" width="424" height="5" rx="2.5" fill="${dark ? '#3a3a3c' : '#F0F0F3'}"/>
  <rect x="28" y="148" width="318" height="5" rx="2.5" fill="#0071E3"/>
  ${sep(168)}
  <text x="28" y="188" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Premium scan — large DerivedData (~20 GB)</text>
  <text x="452" y="188" font-size="13" font-weight="600" fill="#0071E3" text-anchor="end">20–45s</text>
  <rect x="28" y="198" width="424" height="5" rx="2.5" fill="${dark ? '#3a3a3c' : '#F0F0F3'}"/>
  <rect x="28" y="198" width="204" height="5" rx="2.5" fill="#0071E3"/>
  ${sep(218)}
  <text x="28" y="238" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Premium scan — very large caches (50 GB+)</text>
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
  <text x="28" y="192" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Sparkle auto-updates in the background</text>${check(187)}
  ${sep(206)}
  <text x="28" y="226" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">No background scanning or cleaning processes</text>${check(221)}
  ${sep(240)}
  <text x="28" y="260" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Requires Full Disk Access — explicitly granted by you</text>${check(255)}
  ${sep(274)}
  <text x="28" y="294" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}">Reads file names and sizes only — never file contents</text>${check(289)}
  ${sep(308)}
  <text x="28" font-size="13" fill="${dark ? '#f5f5f7' : '#1D1D1F'}"><tspan x="28" y="328">Protected paths — passwords, iCloud,</tspan><tspan x="28" dy="18">system files blocked from deletion</tspan></text>${check(333)}
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
    body: "No background network activity while scanning or cleaning. No analytics. No account. Your files, your Mac, your data — it never leaves your device.",
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
    <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20" style={{ background: SURFACE }}>
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

// ─── Above-fold Sections ──────────────────────────────────────────────────────

function Hero({ BG }: { BG: string }) {
  return (
    <section
      className="relative overflow-hidden pb-16 pt-20 sm:pb-20 sm:pt-28 lg:pb-24"
      style={{ background: BG }}
    >
      <div className="hero-glow h-[800px] w-[1100px] bg-[radial-gradient(ellipse,var(--blue-glow)_0%,transparent_60%)]" />
      <div className="hero-ambient hero-ambient-a" />
      <div className="hero-ambient hero-ambient-b" />
      <div className="mx-auto w-full max-w-[1200px] px-6 text-center md:px-12">
        <div className="mx-auto mb-5 flex h-[124px] w-[124px] items-center justify-center rounded-[32px] border border-[rgba(15,23,42,0.06)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,250,252,0.96)_100%)] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_24px_48px_rgba(15,23,42,0.12),0_44px_88px_rgba(148,163,184,0.18)] sm:h-[148px] sm:w-[148px] sm:rounded-[38px]">
          <img
            src="/macOS 512@2.png"
            alt="DiskCleaner app icon"
            width="112"
            height="112"
            className="h-24 w-24 object-cover drop-shadow-[0_12px_20px_rgba(59,130,246,0.16)] sm:h-28 sm:w-28"
          />
        </div>
        <h1 className="mx-auto max-w-[1080px] text-[clamp(40px,7vw,80px)] font-bold leading-[0.97] tracking-[-0.055em]">
          <span className="text-[var(--text)] block sm:hidden">DiskCleaner is a Mac cleaner and</span>
          <span className="text-[var(--text)] block sm:hidden">disk cleanup app for macOS.</span>
          <span className="hidden text-[var(--text)] sm:block">DiskCleaner is a Mac cleaner</span>
          <span className="hidden text-[var(--text)] sm:block">and disk cleanup app for macOS.</span>
          <em className="not-italic text-[var(--blue)] block">Every file, your call.</em>
        </h1>
        <p className="mx-auto mt-5 max-w-[760px] text-[clamp(18px,2vw,22px)] leading-[1.55] tracking-[-0.01em] text-[var(--muted)]">
          DiskCleaner scans 16+ categories across your Mac, then shows every file before it moves to Trash. Start with our guides to{" "}
          <Link to="/blog/how-to-free-up-storage-on-mac" onMouseEnter={() => preloadArticle("how-to-free-up-storage-on-mac")} onFocus={() => preloadArticle("how-to-free-up-storage-on-mac")} onTouchStart={() => preloadArticle("how-to-free-up-storage-on-mac")} className="font-semibold text-[var(--blue)] no-underline">
            free up storage on your Mac
          </Link>{" "}
          or understand{" "}
          <Link to="/blog/what-is-system-data-mac" onMouseEnter={() => preloadArticle("what-is-system-data-mac")} onFocus={() => preloadArticle("what-is-system-data-mac")} onTouchStart={() => preloadArticle("what-is-system-data-mac")} className="font-semibold text-[var(--blue)] no-underline">
            what System Data on Mac means
          </Link>
          . No silent cleanup. <span className="font-semibold text-[var(--blue)]">No subscription.</span> No guesswork.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href={appDownloadUrl} download data-analytics-location="hero" className="inline-flex items-center justify-center rounded-full bg-[var(--blue)] px-7 py-3.5 text-[17px] font-medium text-white no-underline transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.97] active:brightness-90">
            Download for macOS
          </a>
          <a href="#features" className="inline-flex items-center gap-2 px-2 py-3.5 text-[17px] font-medium text-[var(--muted)] no-underline transition-colors duration-150 hover:text-[var(--text)]">
            See how it works <span aria-hidden>›</span>
          </a>
        </div>
      </div>
    </section>
  )
}

function StatsBand({ SURFACE }: { SURFACE: string }) {
  return (
    <div className="border-y border-[var(--border)] py-8 sm:py-10 lg:py-12" style={{ background: SURFACE }}>
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <div className="grid grid-cols-2 gap-y-3 md:grid-cols-4 md:gap-y-0">
          {[
            { n: "16",  u: "+",  l: "Cleanup categories" },
            { n: "<10", u: "s",  l: "Time to first results" },
            { n: "6",   u: "",   l: "Browser caches cleaned" },
            { n: "~5",  u: "MB", l: "Total install size" },
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

function Features({ SURFACE }: { SURFACE: string }) {
  return (
    <section id="features" className="pb-12 pt-6 sm:py-16 lg:py-20" style={{ background: SURFACE }}>
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <div className="-mt-10 mb-7 flex flex-col items-center text-center sm:mt-0 sm:mb-10">
          <h2 className="reveal reveal-headline d1 w-full max-w-[920px] whitespace-nowrap text-[clamp(24px,6.6vw,56px)] font-bold leading-[1.04] tracking-[-0.04em]">
            <span className="inline-block text-center sm:contents">
              <span className="text-[var(--text)]">You see it first.</span>{" "}
              <span className="text-[var(--blue)]">You decide.</span>
            </span>
          </h2>
          <p className="reveal d2 mt-4 max-w-[700px] text-[16px] leading-[1.6] tracking-[-0.01em] text-[var(--muted)]">
            DiskCleaner shows every file, labels caution items, and moves nothing until you approve it. Built for people who want clarity before cleanup.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                tag: "Transparency",

                ico: <svg viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 36s9.5-18 26-18 26 18 26 18-9.5 18-26 18-26-18-26-18Z" /><circle cx="36" cy="36" r="7.5" /></svg>,
                ttl: "See Every File. Approve Every Clean.",
                dsc: "Full confirmation screen with per-file checkboxes. Expand any category. Uncheck anything. You stay in control, always.",
              },
              {
                tag: "Safety",
                ico: <svg viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 24h44" /><path d="M25 24v-7h22v7" /><path d="M20 31h32" /><path d="M21 31l3 26a6 6 0 0 0 6 4h12a6 6 0 0 0 6-4l3-26" /><path d="M32 39v12" /><path d="M40 39v12" /></svg>,
                ttl: "Everything Goes to Trash. Always.",
                dsc: "Every file moves to Trash, never permanent deletion. Risky items such as iOS backups and Time Machine snapshots are flagged and never pre-selected.",
              },
              {
                tag: "Scanning",
                ico: <svg viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="32" cy="32" r="20" /><path d="m47 47 13 13" /><path d="M24 32h16" /><path d="M32 24v16" /></svg>,
                ttl: "16+ categories. One clear review.",
                dsc: "Scan from the app or menu bar, review caution warnings, and filter cache files by age before you clean.",
              },
              {
                tag: "Performance",
                ico: <svg viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="36" cy="36" r="25" /><path d="M38 18 24 40h13l-3 14 15-24H36l2-12Z" /></svg>,
                ttl: "The interface never freezes.",
                dsc: "All file I/O runs on background threads. Scans large caches without a stall. File sizes animate live as they're discovered.",
              },
              {
                tag: "Browsers",
                ico: <svg viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="36" cy="36" r="25" /><path d="M36 11c7 7 10 15 10 25S43 54 36 61" /><path d="M36 11c-7 7-10 15-10 25s3 18 10 25" /><path d="M13 36h46" /></svg>,
                ttl: "Every Browser. Every Profile.",
                dsc: "Chrome, Firefox, Edge, Brave, Arc, and Opera caches are cleaned across profiles. Passwords, bookmarks, and history stay untouched.",
              },
              {
                tag: "Developers",
                ico: <svg viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m28 23-13 13 13 13" /><path d="m44 23 13 13-13 13" /><path d="m39 16-7 40" /></svg>,
                ttl: "Developers save the most.",
                dsc: "Clear Xcode DerivedData, CoreSimulator files, old iOS DeviceSupport files, and stale Homebrew downloads.",
              },
            ].map((f, i) => (
              <div key={i} className="reveal feature-premium-card rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-7 text-center transition duration-200 hover:-translate-y-0.5 hover:border-[rgba(0,113,227,0.18)]" style={{ transitionDelay: `${i * 65}ms` }}>
                <div className="mx-auto flex h-20 w-20 items-center justify-center text-[var(--blue)]">{f.ico}</div>
                <div className="mt-5 text-[19px] font-semibold leading-snug tracking-[-0.025em] text-[var(--text)]">{f.ttl}</div>
                <div className="mt-2 text-[14px] leading-[1.65] text-[var(--muted)]">{f.dsc}</div>
              </div>
            ))}
        </div>
        {/* Inline CTA after features grid */}
        <div className="reveal mt-10 flex flex-col items-center gap-3 text-center">
          <a href={appDownloadUrl} download data-analytics-location="features-cta" className="inline-flex items-center justify-center rounded-full bg-[var(--blue)] px-7 py-3.5 text-[17px] font-medium text-white no-underline transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.97] active:brightness-90">
            Download for macOS
          </a>
          <p className="text-[12px] text-[var(--muted2)]">Free core cleaning · $9.99 one-time Premium unlock · No subscription</p>
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
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20" style={{ background: "var(--surface2)" }}>
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
                <dl className="mt-6 max-w-xl space-y-2 text-[16px] leading-[1.7] text-[var(--muted)] sm:mt-8 sm:space-y-4 lg:max-w-none">
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


const UninstallerSplit = lazy(async () => {
  const Comp = ({ SURFACE }: { SURFACE: string }) => {
    useEffect(() => { const raf = requestAnimationFrame(dispatchRevealRefresh); return () => cancelAnimationFrame(raf) }, [])
    return (
      <section id="uninstaller" className="overflow-hidden py-12 sm:py-16 lg:py-20" style={{ background: SURFACE }}>
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-x-16">
            <div className="order-1 lg:order-1 lg:pr-8 reveal">
              <div className="lg:max-w-[40rem]">
                <p className="reveal reveal-headline text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em]">
                  <span className="text-[var(--text)]">Apps leave more behind than you know.</span> <span className="text-[var(--blue)]">See it all. Remove it completely.</span>
                </p>
                <p className="mt-4 text-[17px] leading-[1.65] tracking-[-0.01em] text-[var(--muted)]">
                  Dragging an app to Trash only removes the app itself. The rest hides quietly in Library folders: caches, preferences, logs, containers, and support files.
                  DiskCleaner shows the full footprint first — then lets you remove everything cleanly, with the same file-by-file review you get everywhere. For a broader comparison of removal workflows, see our{" "}
                  <Link to="/blog/best-app-uninstaller-for-mac" onMouseEnter={() => preloadArticle("best-app-uninstaller-for-mac")} onFocus={() => preloadArticle("best-app-uninstaller-for-mac")} onTouchStart={() => preloadArticle("best-app-uninstaller-for-mac")} className="text-[var(--blue)] no-underline">
                    best app uninstaller for Mac guide
                  </Link>.
                </p>
                <dl className="mt-6 max-w-xl space-y-2 text-[17px] leading-[1.65] text-[var(--muted)] sm:mt-8 sm:space-y-4 lg:max-w-none">
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

const RamOptimizerSplit = lazy(async () => {
  const Comp = ({ BG }: { BG: string }) => {
    useEffect(() => { const raf = requestAnimationFrame(dispatchRevealRefresh); return () => cancelAnimationFrame(raf) }, [])
    return (
      <section className="overflow-hidden py-12 sm:py-16 lg:py-20" style={{ background: BG }}>
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
                  <Link to="/blog/how-to-free-up-storage-on-mac" onMouseEnter={() => preloadArticle("how-to-free-up-storage-on-mac")} onFocus={() => preloadArticle("how-to-free-up-storage-on-mac")} onTouchStart={() => preloadArticle("how-to-free-up-storage-on-mac")} className="text-[var(--blue)] no-underline">
                    how to free up storage on Mac
                  </Link>.
                </p>
                <dl className="mt-6 max-w-xl space-y-2 text-[17px] leading-[1.65] text-[var(--muted)] sm:mt-8 sm:space-y-4 lg:max-w-none">
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

const MenuBarSplit = lazy(async () => {
  const Comp = ({ BG }: { BG: string }) => {
    useEffect(() => { const raf = requestAnimationFrame(dispatchRevealRefresh); return () => cancelAnimationFrame(raf) }, [])
    return (
      <section className="py-12 sm:py-16 lg:py-20" style={{ background: BG }}>
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
                <span className="text-[var(--text)]">Disk space.</span> <span className="text-[var(--blue)]">Always one glance away.</span>
              </h2>
              <p className="mt-4 text-[17px] leading-[1.65] tracking-[-0.01em] text-[var(--muted)]">
                Your free space, always visible — no app to open.
                Trigger a scan, see update badges, or check full disk stats from a single click.
                Lightweight. Always on. Never in the way.
              </p>
              <ul className="mt-6 list-none space-y-2 pl-0 text-[17px] leading-[1.65] text-[var(--text-dim)] sm:mt-8 sm:space-y-4">
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
  return { default: Comp }
})


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
      <section className="py-12 sm:py-16 lg:py-20" style={{ background: SURFACE }}>
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
          <div className="mb-8 flex flex-col items-center text-center sm:mb-12">
            <h2 className="reveal reveal-headline d1 text-balance text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em]">
              <span className="text-[var(--text)]">16+ categories.</span> <span className="text-[var(--blue)]">One scan. You decide what goes.</span>
            </h2>
            <p className="reveal d2 mt-4 max-w-[560px] text-[16px] leading-[1.6] text-[var(--muted)]">
              Free core cleaning covers everyday clutter. Premium adds browser cache, developer files, large downloads, backups, external storage, and more. If Xcode storage keeps ballooning, read our guide on{" "}
              <Link to="/blog/delete-xcode-derived-data" onMouseEnter={() => preloadArticle("delete-xcode-derived-data")} onFocus={() => preloadArticle("delete-xcode-derived-data")} onTouchStart={() => preloadArticle("delete-xcode-derived-data")} className="text-[var(--blue)] no-underline">
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
                <div className="text-[17px] font-bold text-[var(--blue)]">Always safe</div>
                <div className="mt-1 text-[14px] leading-[1.6] text-[var(--muted)]">Protected paths stay blocked. Risky and personal findings are never pre-selected. Every removal goes to Trash, not permanent deletion.</div>
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
        a: "DiskCleaner runs locally on your Mac. Scanning and cleaning stay on-device, the app includes no analytics or tracking, and no account is required. Sparkle keeps the app up to date in the background without sending your scan results or file data anywhere.",
      },
      {
        q: "What exactly does DiskCleaner scan?",
        a: "DiskCleaner scans 16+ categories and targeted cleanup locations, including app cache, browser cache, logs, screenshots, .DS_Store files, Trash, developer data, Homebrew downloads, large files, iOS backups, Mail attachments, app leftovers, external storage, local Time Machine snapshots, and old installers. Caution categories are clearly flagged before cleanup.",
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
            <Link to="/disk-clean-pro-alternative" className="text-[var(--blue)] no-underline">
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
        a: "No account and no subscription. Core cleaning for App Cache, System Logs, Screenshots, .DS_Store files, and macOS Trash is available without upgrading. A $9.99 one-time Premium purchase unlocks the full scanner for up to 2 Macs and includes future updates.",
      },
    ]
    return (
      <section id="faq" className="py-12 sm:py-16 lg:py-20 faq-premium" style={{ background: BG }}>
        <div className="mx-auto w-full max-w-[860px] px-4 sm:px-6 md:px-12">
          <div className="mb-8 flex flex-col items-center text-center sm:mb-12">
            <h2 className="reveal reveal-headline d1 text-balance text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em] text-[var(--text)]">
              <span className="text-[var(--text)]">Questions</span>{" "}
              <span className="text-[var(--blue)]">Answered.</span>
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
  return { default: Comp }
})

const CTA = lazy(async () => {
  const Comp = ({ BG }: { BG: string }) => {
    useEffect(() => { const raf = requestAnimationFrame(dispatchRevealRefresh); return () => cancelAnimationFrame(raf) }, [])
    return (
      <section id="download" className="relative overflow-hidden py-12 sm:py-16 lg:py-20" style={{ background: BG }}>
        <div className="hero-glow h-[600px] w-[1000px] bg-[radial-gradient(ellipse,var(--blue-glow),transparent_65%)]" />
        <div className="hero-ambient hero-ambient-c" />
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
            <a
              href={appDownloadUrl}
              download
              data-analytics-location="download-section"
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[var(--blue)] px-7 py-3.5 text-[17px] font-medium text-white no-underline transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.97] active:brightness-90 sm:w-auto"
            >
              Download for macOS
            </a>
          </div>
          <div className="reveal d5 mt-7 flex flex-wrap justify-center gap-x-2 gap-y-1.5 sm:gap-5">
            {[
              "Free core cleaning included",
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

const TrustBand = lazy(async () => {
  const Comp = ({ BG }: { BG: string }) => {
    useEffect(() => { const raf = requestAnimationFrame(dispatchRevealRefresh); return () => cancelAnimationFrame(raf) }, [])
    return (
      <section className="py-12 sm:py-16 lg:py-20" style={{ background: BG }}>
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
          <div className="reveal rounded-[36px] border border-[var(--border)] bg-[var(--surface)] px-6 py-12 text-center shadow-[0_18px_40px_rgba(0,0,0,0.06)] sm:px-10">
            <h2 className="reveal reveal-headline d1 text-balance text-[clamp(30px,3.6vw,48px)] font-bold leading-[1.06] tracking-[-0.04em] text-[var(--text)]">
              Clean with proof.
            </h2>
            <p className="reveal d2 mx-auto mt-4 max-w-[760px] text-[17px] leading-[1.6] text-[var(--muted)]">
              DiskCleaner shows exactly what it found, marks what needs a second look, leaves your personal files untouched, and sends everything to Trash. No black-box cleaning. No permanent deletion. No guesswork.
            </p>
          </div>
        </div>
      </section>
    )
  }
  return { default: Comp }
})

void TrustBand

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
            <a href="/changelog" className="site-footer-link">Changelog</a>
            <a href="/about" className="site-footer-link">About</a>
            <a href="/trust" className="site-footer-link">Trust Center</a>
          </div>
          {/* Support */}
          <div className="site-footer-col">
            <div className="site-footer-col-hd">Support</div>
            <a href="/help" className="site-footer-link">Help</a>
            <button type="button" onClick={() => openModal("support")} className="site-footer-link">FAQ</button>
            <button type="button" onClick={() => openModal("support")} className="site-footer-link">Contact</button>
            <a href="/privacy-policy" className="site-footer-link">Privacy Policy</a>
            <a href="/terms-of-service" className="site-footer-link">Terms of Use</a>
            <a href="/editorial-policy" className="site-footer-link">Editorial Policy</a>
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
          <span style={{ fontSize: 12, color: "var(--muted)" }}>© {new Date().getFullYear()} 22 Software Publishing. All rights reserved.</span>
          <span style={{ fontSize: 12, color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: 5 }}>
            <span aria-hidden="true" style={{ fontSize: 13, lineHeight: 1 }}></span>
            Made for Mac.
          </span>
        </div>
      </footer>
    )
  }
  return { default: Comp }
})

// ─── Home Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const location = useLocation()
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
      {/* FLOATING NAV — outside .page-enter to avoid CSS transform containing-block trap */}
      <nav style={{
        position: "fixed", top: 12, left: "50%",
        width: "calc(100% - 40px)", maxWidth: 760, height: 52,
        background: theme === "dark" ? "rgba(28,28,30,0.9)" : "rgba(255,255,255,0.92)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
        borderRadius: 999, boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 14px 0 18px", boxSizing: "border-box",
        zIndex: 300,
        opacity: scrolled ? 1 : 0,
        pointerEvents: scrolled ? "auto" : "none",
        transform: scrolled ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-6px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <a href="/" style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.02em", textDecoration: "none", color: theme === "dark" ? "#f5f5f7" : "#1d1d1f", whiteSpace: "nowrap" }}>
            Disk<em style={{ fontStyle: "normal", color: "#0071e3" }}>Cleaner</em>
          </a>
          <span style={{ fontSize: 12, color: theme === "dark" ? "#8e8e93" : "#6e6e73", whiteSpace: "nowrap" }}>
            One-time purchase
          </span>
        </div>
        <a href={appDownloadUrl} download data-analytics-location="floating-nav" style={{ fontSize: 12, fontWeight: 600, background: "#0071e3", color: "#fff", borderRadius: 999, padding: "7px 14px", textDecoration: "none", whiteSpace: "nowrap" }}>
          Download
        </a>
      </nav>

      <div data-theme={theme} className="page-enter">

      {/* NAV */}
      <nav className="site-top-nav fixed left-0 top-0 z-[200] w-full border-b border-[var(--border)] bg-[var(--nav-bg)] backdrop-blur-2xl backdrop-saturate-150"
        style={{ opacity: scrolled ? 0 : 1, pointerEvents: scrolled ? "none" : "auto", transition: "opacity 0.3s ease" }}>
        <div className="mx-auto flex h-[52px] w-full max-w-[1200px] items-center justify-between px-6 md:px-12">
          <div aria-hidden="true" className="h-[44px] w-[44px]" />
          <div className="flex items-center gap-4">
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
            <a
              href="/blog"
              className="text-[15px] font-medium text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]"
            >
              Blog <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-[52px]">
        <Hero BG="var(--bg)" />
        <StatsBand SURFACE={STRIPE_WHITE} />

        <Suspense fallback={null}>
          <InterfaceSplit />
          <Features SURFACE={STRIPE_GRAY} />
          <UninstallerSplit SURFACE={STRIPE_WHITE} />
          <RamOptimizerSplit BG={STRIPE_GRAY} />
          <MenuBarSplit BG={STRIPE_WHITE} />
          <CompareTable BG={STRIPE_GRAY} theme={theme} />
          <CTA BG={STRIPE_WHITE} />
          <FAQ BG={STRIPE_WHITE} />
          <SiteFooter openModal={k => setModal(k)} />
        </Suspense>
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
