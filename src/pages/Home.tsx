import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react"
import { Modal, SupportContent, ChangelogContent, WaitlistContent } from "../components/SiteModal"
import { modalTitle, type ModalKey } from "../components/modalConfig"
const appImage = "/DiskCleaner.webp"
const appImage_464 = "/DiskCleaner-464.webp"
const appImage_640 = "/DiskCleaner-640.webp"
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

const getMenuBarCodeSvg = (dark: boolean) => `<svg width="680" height="830" viewBox="0 0 680 830" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif">
  <defs>
    <linearGradient id="mb-accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#60A5FA"/>
      <stop offset="100%" stop-color="#2563EB"/>
    </linearGradient>
    <filter id="mb-shadow" x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy="28" stdDeviation="28" flood-color="${dark ? "rgba(0,0,0,0.45)" : "rgba(15,23,42,0.16)"}"/>
    </filter>
  </defs>

  <rect x="42" y="54" width="596" height="722" rx="28" fill="${dark ? "#1c1c1e" : "#FFFFFF"}" filter="url(#mb-shadow)"/>
  <rect x="42" y="54" width="596" height="54" rx="28" fill="${dark ? "#2c2c2e" : "#F5F5F7"}"/>
  <rect x="42" y="82" width="596" height="26" fill="${dark ? "#2c2c2e" : "#F5F5F7"}"/>
  <circle cx="78" cy="81" r="6.5" fill="#FF5F57"/>
  <circle cx="100" cy="81" r="6.5" fill="#FEBC2E"/>
  <circle cx="122" cy="81" r="6.5" fill="#28C840"/>
  <text x="340" y="86" text-anchor="middle" font-size="14" fill="${dark ? "#b2b2b8" : "#6E6E73"}">DiskStatusLabel.swift</text>

  <text x="84" y="158" font-size="26" font-weight="700" fill="${dark ? "#f5f5f7" : "#111827"}">Disk space, reflected in the menu bar.</text>
  <text x="84" y="186" font-size="14" fill="${dark ? "#9ca3af" : "#6B7280"}">A focused SwiftUI label that refreshes the visible free-space value.</text>

  <rect x="84" y="226" width="512" height="450" rx="24" fill="${dark ? "#232326" : "#F8FAFC"}" stroke="${dark ? "#3a3a3c" : "#E5E7EB"}"/>
  <text x="112" y="258" font-size="11" font-weight="700" letter-spacing="1.6" fill="${dark ? "#7E8A9C" : "#7A8798"}">EDITOR</text>
  <line x1="112" y1="276" x2="568" y2="276" stroke="${dark ? "#3a3a3c" : "#E5E7EB"}"/>

  <text x="112" y="318" font-size="12.5" fill="#C084FC">struct</text>
  <text x="158" y="318" font-size="12.5" fill="${dark ? "#60A5FA" : "#2563EB"}">DiskStatusLabel</text>
  <text x="253" y="318" font-size="12.5" fill="${dark ? "#E5EEF8" : "#111827"}">: View {</text>

  <text x="112" y="346" font-size="12.5" fill="${dark ? "#E5EEF8" : "#111827"}">let sampler: </text>
  <text x="186" y="346" font-size="12.5" fill="${dark ? "#60A5FA" : "#2563EB"}">StorageSampler</text>

  <text x="112" y="374" font-size="12.5" fill="${dark ? "#E5EEF8" : "#111827"}">let formatter: </text>
  <text x="200" y="374" font-size="12.5" fill="${dark ? "#60A5FA" : "#2563EB"}">ByteCountFormatter</text>

  <text x="112" y="416" font-size="12.5" fill="${dark ? "#9CA3AF" : "#6B7280"}">// State triggers a UI refresh when the value changes</text>
  <text x="112" y="444" font-size="12.5" fill="#F59E0B">@State</text>
  <text x="159" y="444" font-size="12.5" fill="${dark ? "#E5EEF8" : "#111827"}">private var</text>
  <text x="237" y="444" font-size="12.5" fill="${dark ? "#E879F9" : "#9333EA"}">freeSpace</text>
  <text x="299" y="444" font-size="12.5" fill="${dark ? "#E5EEF8" : "#111827"}">: String = </text>
  <text x="367" y="444" font-size="12.5" fill="#34D399">"Calculating..."</text>

  <text x="112" y="486" font-size="12.5" fill="${dark ? "#9CA3AF" : "#6B7280"}">// A timer simulates the "real-time" aspect</text>
  <text x="112" y="514" font-size="12.5" fill="${dark ? "#E5EEF8" : "#111827"}">let timer = </text>
  <text x="180" y="514" font-size="12.5" fill="${dark ? "#60A5FA" : "#2563EB"}">Timer.publish</text>
  <text x="266" y="514" font-size="12.5" fill="${dark ? "#E5EEF8" : "#111827"}">(every: 30, on: .main,</text>
  <text x="112" y="542" font-size="12.5" fill="${dark ? "#E5EEF8" : "#111827"}">in: .common).autoconnect()</text>

  <text x="112" y="584" font-size="12.5" fill="#C084FC">var</text>
  <text x="143" y="584" font-size="12.5" fill="${dark ? "#E5EEF8" : "#111827"}">body: some View {</text>
  <text x="112" y="612" font-size="12.5" fill="${dark ? "#60A5FA" : "#2563EB"}">HStack</text>
  <text x="157" y="612" font-size="12.5" fill="${dark ? "#E5EEF8" : "#111827"}">(spacing: 4) {</text>
  <text x="112" y="640" font-size="12.5" fill="${dark ? "#60A5FA" : "#2563EB"}">Image</text>
  <text x="152" y="640" font-size="12.5" fill="${dark ? "#E5EEF8" : "#111827"}">(systemName: </text>
  <text x="235" y="640" font-size="12.5" fill="#34D399">"internaldrive"</text>
  <text x="327" y="640" font-size="12.5" fill="${dark ? "#E5EEF8" : "#111827"}">)</text>

  <text x="360" y="612" font-size="12.5" fill="${dark ? "#60A5FA" : "#2563EB"}">Text</text>
  <text x="394" y="612" font-size="12.5" fill="${dark ? "#E5EEF8" : "#111827"}">(</text>
  <text x="403" y="612" font-size="12.5" fill="${dark ? "#E879F9" : "#9333EA"}">freeSpace</text>
  <text x="465" y="612" font-size="12.5" fill="${dark ? "#E5EEF8" : "#111827"}">)</text>
  <text x="360" y="640" font-size="12.5" fill="${dark ? "#E5EEF8" : "#111827"}">}</text>
  <text x="360" y="668" font-size="12.5" fill="${dark ? "#E5EEF8" : "#111827"}">.onAppear { updateSpace() }</text>
  <text x="360" y="696" font-size="12.5" fill="${dark ? "#E5EEF8" : "#111827"}">.onReceive(timer) { _ in</text>
  <text x="360" y="724" font-size="12.5" fill="${dark ? "#60A5FA" : "#2563EB"}">updateSpace</text>
  <text x="433" y="724" font-size="12.5" fill="${dark ? "#E5EEF8" : "#111827"}">() }</text>

  <rect x="84" y="688" width="512" height="68" rx="22" fill="${dark ? "#111827" : "#111827"}"/>
  <text x="112" y="718" font-size="13" font-weight="600" fill="#93C5FD">Disk status in the menu bar</text>
  <text x="112" y="738" font-size="12.5" fill="#E5E7EB">Disk space size is reflected in the menu bar in real time.</text>
</svg>`

function MenuBarIllustration({ dark }: { dark: boolean }) {
  return (
    <div
      style={{ lineHeight: 0, borderRadius: 28, overflow: "hidden" }}
      dangerouslySetInnerHTML={{ __html: getMenuBarCodeSvg(dark) }}
    />
  )
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
    <section className="relative overflow-hidden pb-14 pt-20 sm:pb-20 sm:pt-28" style={{ background: BG }}>
      <div className="hero-glow h-[800px] w-[1100px] bg-[radial-gradient(ellipse,var(--blue-glow)_0%,transparent_60%)]" />
      <div className="mx-auto w-full max-w-[1200px] px-6 text-center md:px-12">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-4 py-1.5 text-[13px] font-semibold tracking-[0.01em] text-[var(--blue)]">
          Free trial · No subscription · Apple-notarized
        </div>
        <h1 className="mx-auto max-w-[900px] text-[clamp(44px,10vw,96px)] font-bold leading-[0.97] tracking-[-0.055em]">
          <span className="text-[var(--text)]">Clean your Mac.</span><br />
          <em className="not-italic text-[var(--blue)]">Every file, your call.</em>
        </h1>
        <p className="mx-auto mt-5 max-w-[620px] text-[clamp(18px,2vw,22px)] leading-[1.55] tracking-[-0.01em] text-[var(--muted)]">
          Most Mac cleaners delete first — and tell you later, if at all.
          DiskCleaner shows you every file, every category, every byte before a single thing moves.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="#download" onClick={() => trackCTA("hero")} className="inline-flex items-center justify-center rounded-full bg-[var(--blue)] px-7 py-3.5 text-[17px] font-medium text-white no-underline transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.97] active:brightness-90">
            Get Early Access
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
    <div className="border-y border-[var(--border)] py-6 sm:py-10" style={{ background: SURFACE }}>
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <div className="grid grid-cols-2 gap-y-3 md:grid-cols-4 md:gap-y-0">
          {[
            { n: "7",   u: "",   l: "Categories in one scan" },
            { n: "<10", u: "s",  l: "Time to first results" },
            { n: "9",   u: "",   l: "Browsers cleaned" },
            { n: "~5",  u: "MB", l: "Total install size" },
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
    <section id="features" className="py-20 sm:py-28" style={{ background: SURFACE }}>
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <div className="mb-7 flex flex-col items-center text-center sm:mb-10">
          <h2 className="reveal reveal-headline d1 text-balance text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em]">
            <span className="inline-block text-left sm:contents">
              <span className="block text-[var(--text)] sm:inline">You see it first.</span>{" "}
              <span className="block text-[var(--blue)] sm:inline">You decide.</span>
            </span>
          </h2>
          <p className="reveal d2 mt-4 max-w-[760px] text-[17px] leading-[1.55] tracking-[-0.01em] text-[var(--muted)]">
              DiskCleaner shows every file, labels caution items, and moves nothing until you approve it. Cleanup with proof, not promises.
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
                ttl: "Under 10 seconds. Every category.",
                dsc: "Run a fast scan from the app or menu bar, then switch to Deep Scan for additional locations, caution items, and broader review.",
              },
              {
                tag: "Performance",
                ico: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 24, height: 24 }}><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
                ttl: "The interface never freezes.",
                dsc: "All file I/O runs on background threads. Scans large caches without a stall. File sizes animate live as they're discovered.",
              },
              {
                tag: "Browsers",
                ico: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 24, height: 24 }}><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><line x1="2" y1="12" x2="22" y2="12" /></svg>,
                ttl: "Every Browser. Every Profile.",
                dsc: "Chrome, Firefox, Edge, Arc, Brave, Vivaldi, Chromium, and Opera caches are cleaned across profiles. Safari cache is measured but not cleared. Passwords, bookmarks, and history stay untouched.",
              },
              {
                tag: "Developers",
                ico: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 24, height: 24 }}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>,
                ttl: "Developers save the most.",
                dsc: "Xcode DerivedData, Archives, Device Support, simulators, SwiftPM, CocoaPods, npm, JetBrains, and VS Code caches. Usually the biggest hidden recovery on a developer Mac.",
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
          <p className="text-[12px] text-[var(--muted2)]">Free trial · $9.99 one-time after · No subscription</p>
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
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-stretch lg:gap-x-16">
            <div className="order-1 lg:order-1 lg:pt-4 lg:pr-8 reveal">
              <div className="lg:max-w-lg">
                <p className="reveal reveal-headline text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em]">
                  <span className="text-[var(--text)]">The full picture.</span> <span className="text-[var(--blue)]">Before anything moves.</span>
                </p>
                <p className="mt-4 text-[17px] leading-[1.65] tracking-[-0.01em] text-[var(--muted)]">
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
                      Per-file checkboxes across Quick Scan and Deep Scan results.
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
            <div className="order-2 lg:order-2 reveal d1 lg:flex lg:items-center -mb-20 lg:mb-0">
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


const getAppUninstallerSvg = (dark: boolean) => `<svg width="680" height="830" viewBox="0 0 680 830" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif">
  <defs>
    <linearGradient id="un-accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#B9D4FF"/>
      <stop offset="100%" stop-color="#3B82F6"/>
    </linearGradient>
    <filter id="un-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="28" stdDeviation="28" flood-color="${dark ? "rgba(0,0,0,0.45)" : "rgba(15,23,42,0.16)"}"/>
    </filter>
  </defs>
  <rect x="42" y="54" width="596" height="722" rx="28" fill="${dark ? "#1c1c1e" : "#FFFFFF"}" filter="url(#un-shadow)"/>
  <rect x="42" y="54" width="596" height="54" rx="28" fill="${dark ? "#2c2c2e" : "#F5F5F7"}"/>
  <rect x="42" y="82" width="596" height="26" fill="${dark ? "#2c2c2e" : "#F5F5F7"}"/>
  <circle cx="78" cy="81" r="6.5" fill="#FF5F57"/>
  <circle cx="100" cy="81" r="6.5" fill="#FEBC2E"/>
  <circle cx="122" cy="81" r="6.5" fill="#28C840"/>
  <text x="340" y="86" text-anchor="middle" font-size="14" fill="${dark ? "#b2b2b8" : "#6E6E73"}">App Uninstaller</text>

  <text x="84" y="156" font-size="26" font-weight="700" fill="${dark ? "#f5f5f7" : "#111827"}">Shows the app and what it leaves behind.</text>
  <text x="84" y="184" font-size="14" fill="${dark ? "#9ca3af" : "#6B7280"}">Generic view of leftovers, review, and Trash-first removal.</text>

  <rect x="84" y="222" width="214" height="438" rx="24" fill="${dark ? "#232326" : "#F8FAFC"}" stroke="${dark ? "#3a3a3c" : "#E5E7EB"}"/>
  <text x="112" y="260" font-size="15" font-weight="600" fill="${dark ? "#f5f5f7" : "#111827"}">Selected App</text>
  <rect x="112" y="286" width="158" height="78" rx="18" fill="${dark ? "#1c1c1e" : "#FFFFFF"}" stroke="${dark ? "#3a3a3c" : "#E5E7EB"}"/>
  <rect x="132" y="306" width="38" height="38" rx="10" fill="url(#un-accent)"/>
  <path d="M144 325h14" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M151 318v14" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
  <text x="182" y="322" font-size="14" font-weight="600" fill="${dark ? "#f5f5f7" : "#111827"}">Example</text>
  <text x="182" y="341" font-size="11" fill="${dark ? "#9ca3af" : "#6B7280"}">Review</text>

  <text x="112" y="404" font-size="12" font-weight="600" fill="${dark ? "#9ca3af" : "#6B7280"}">FOUND IN LIBRARY</text>
  <rect x="112" y="422" width="158" height="48" rx="14" fill="${dark ? "#1c1c1e" : "#FFFFFF"}" stroke="${dark ? "#3a3a3c" : "#E5E7EB"}"/>
  <circle cx="132" cy="446" r="8" fill="#EAF2FF" stroke="#B9D4FF"/>
  <path d="M128.5 446l2.5 2.5 4.5-5" stroke="#0071E3" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="148" y="442" font-size="13" font-weight="600" fill="${dark ? "#f5f5f7" : "#111827"}">Caches</text>
  <text x="148" y="457" font-size="11" fill="${dark ? "#9ca3af" : "#6B7280"}">2.8 GB</text>

  <rect x="112" y="480" width="158" height="48" rx="14" fill="${dark ? "#1c1c1e" : "#FFFFFF"}" stroke="${dark ? "#3a3a3c" : "#E5E7EB"}"/>
  <circle cx="132" cy="504" r="8" fill="#EAF2FF" stroke="#B9D4FF"/>
  <path d="M128.5 504l2.5 2.5 4.5-5" stroke="#0071E3" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="148" y="500" font-size="13" font-weight="600" fill="${dark ? "#f5f5f7" : "#111827"}">Preferences</text>
  <text x="148" y="515" font-size="11" fill="${dark ? "#9ca3af" : "#6B7280"}">164 MB</text>

  <rect x="112" y="538" width="158" height="48" rx="14" fill="${dark ? "#1c1c1e" : "#FFFFFF"}" stroke="${dark ? "#3a3a3c" : "#E5E7EB"}"/>
  <circle cx="132" cy="562" r="8" fill="#EAF2FF" stroke="#B9D4FF"/>
  <path d="M128.5 562l2.5 2.5 4.5-5" stroke="#0071E3" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="148" y="558" font-size="13" font-weight="600" fill="${dark ? "#f5f5f7" : "#111827"}">Containers</text>
  <text x="148" y="573" font-size="11" fill="${dark ? "#9ca3af" : "#6B7280"}">912 MB</text>

  <rect x="314" y="222" width="282" height="438" rx="24" fill="${dark ? "#232326" : "#F8FAFC"}" stroke="${dark ? "#3a3a3c" : "#E5E7EB"}"/>
  <text x="352" y="260" font-size="15" font-weight="600" fill="${dark ? "#f5f5f7" : "#111827"}">Review Before Removal</text>
  <rect x="342" y="286" width="226" height="92" rx="16" fill="${dark ? "#1c1c1e" : "#FFFFFF"}" stroke="${dark ? "#3a3a3c" : "#E5E7EB"}"/>
  <text x="376" y="312" font-size="12" font-weight="600" fill="${dark ? "#f5f5f7" : "#111827"}">~/Library/Caches/</text>
  <text x="376" y="330" font-size="12" font-weight="600" fill="${dark ? "#f5f5f7" : "#111827"}">com.example.app</text>
  <text x="376" y="350" font-size="11.5" fill="${dark ? "#9ca3af" : "#6B7280"}">Rebuilt cache data</text>
  <text x="376" y="366" font-size="11.5" font-weight="600" fill="#0071E3">2.8 GB</text>

  <rect x="342" y="390" width="226" height="92" rx="16" fill="${dark ? "#1c1c1e" : "#FFFFFF"}" stroke="${dark ? "#3a3a3c" : "#E5E7EB"}"/>
  <text x="376" y="416" font-size="12" font-weight="600" fill="${dark ? "#f5f5f7" : "#111827"}">~/Library/Preferences/</text>
  <text x="376" y="434" font-size="12" font-weight="600" fill="${dark ? "#f5f5f7" : "#111827"}">com.example.app.plist</text>
  <text x="376" y="454" font-size="11.5" fill="${dark ? "#9ca3af" : "#6B7280"}">Saved settings and state</text>
  <text x="376" y="470" font-size="11.5" font-weight="600" fill="#0071E3">164 MB</text>

  <rect x="342" y="494" width="226" height="92" rx="16" fill="${dark ? "#1c1c1e" : "#FFFFFF"}" stroke="${dark ? "#3a3a3c" : "#E5E7EB"}"/>
  <text x="376" y="520" font-size="12" font-weight="600" fill="${dark ? "#f5f5f7" : "#111827"}">~/Library/Containers/</text>
  <text x="376" y="538" font-size="12" font-weight="600" fill="${dark ? "#f5f5f7" : "#111827"}">com.example.app</text>
  <text x="376" y="558" font-size="11.5" fill="${dark ? "#9ca3af" : "#6B7280"}">Container data and support files</text>
  <text x="376" y="574" font-size="11.5" font-weight="600" fill="#0071E3">912 MB</text>

  <rect x="342" y="606" width="170" height="40" rx="20" fill="#EAF2FF"/>
  <text x="427" y="631" text-anchor="middle" font-size="12.5" font-weight="600" fill="#0071E3">Move to Trash</text>

  <rect x="84" y="686" width="512" height="54" rx="20" fill="${dark ? "#111827" : "#111827"}"/>
  <text x="112" y="706" font-size="12.5" fill="${dark ? "#E5E7EB" : "#E5E7EB"}">
    <tspan x="112" dy="0">Finder removes the app.</tspan>
    <tspan x="112" dy="18">DiskCleaner reviews the rest first.</tspan>
  </text>
</svg>`

const UninstallerSplit = lazy(async () => {
  const Comp = ({ SURFACE, theme }: { SURFACE: string; theme: string }) => {
    useEffect(() => { const raf = requestAnimationFrame(dispatchRevealRefresh); return () => cancelAnimationFrame(raf) }, [])
    return (
      <section id="uninstaller" className="overflow-hidden py-16 sm:py-24" style={{ background: SURFACE }}>
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-stretch lg:gap-x-16">
            <div className="order-1 lg:order-1 lg:pt-4 lg:pr-8 reveal">
              <div className="lg:max-w-lg">
                <p className="reveal reveal-headline text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em]">
                  <span className="text-[var(--text)]">Apps leave more behind than you know.</span> <span className="text-[var(--blue)]">See it all. Remove it completely.</span>
                </p>
                <p className="mt-4 text-[17px] leading-[1.65] tracking-[-0.01em] text-[var(--muted)]">
                  Dragging an app to Trash only removes the app itself. The rest hides quietly in Library folders: caches, preferences, logs, containers, and support files.
                  DiskCleaner shows the full footprint first — then lets you remove everything cleanly, with the same file-by-file review you get everywhere.
                </p>
                <dl className="mt-6 max-w-xl space-y-2 text-[15px] leading-[1.65] text-[var(--muted)] sm:mt-8 sm:space-y-4 lg:max-w-none">
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
            <div className="order-2 lg:order-2 reveal d1 lg:flex lg:items-center -mb-6 sm:-mb-14 lg:mb-0">
              <div
                className="split-img split-hero-visual split-hero-visual-lg mobile-bleed-visual mx-auto w-full max-w-[560px]"
                style={{ lineHeight: 0 }}
                aria-label="Illustration of DiskCleaner app uninstaller review flow"
                role="img"
                dangerouslySetInnerHTML={{ __html: getAppUninstallerSvg(theme === "dark") }}
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
  return { default: Comp }
})

const getRamOptimizerSvg = (dark: boolean) => `<svg width="680" height="830" viewBox="0 0 680 830" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif">
  <defs>
    <linearGradient id="ram-accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#93C5FD"/>
      <stop offset="100%" stop-color="#3B82F6"/>
    </linearGradient>
    <linearGradient id="ram-graph" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(59,130,246,0.24)"/>
      <stop offset="100%" stop-color="rgba(59,130,246,0.02)"/>
    </linearGradient>
    <filter id="ram-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="28" stdDeviation="28" flood-color="${dark ? "rgba(0,0,0,0.45)" : "rgba(15,23,42,0.16)"}"/>
    </filter>
  </defs>
  <rect x="42" y="54" width="596" height="722" rx="28" fill="${dark ? "#1c1c1e" : "#FFFFFF"}" filter="url(#ram-shadow)"/>
  <rect x="42" y="54" width="596" height="54" rx="28" fill="${dark ? "#2c2c2e" : "#F5F5F7"}"/>
  <rect x="42" y="82" width="596" height="26" fill="${dark ? "#2c2c2e" : "#F5F5F7"}"/>
  <circle cx="78" cy="81" r="6.5" fill="#FF5F57"/>
  <circle cx="100" cy="81" r="6.5" fill="#FEBC2E"/>
  <circle cx="122" cy="81" r="6.5" fill="#28C840"/>
  <text x="340" y="86" text-anchor="middle" font-size="14" fill="${dark ? "#b2b2b8" : "#6E6E73"}">RAM Optimizer</text>

  <text x="84" y="158" font-size="26" font-weight="700" fill="${dark ? "#f5f5f7" : "#111827"}">Memory status, clearly shown.</text>
  <text x="84" y="186" font-size="14" fill="${dark ? "#9ca3af" : "#6B7280"}">Live telemetry for pressure, compression, and swap.</text>

  <rect x="84" y="226" width="334" height="254" rx="24" fill="${dark ? "#232326" : "#F8FAFC"}" stroke="${dark ? "#3a3a3c" : "#E5E7EB"}"/>
  <text x="112" y="264" font-size="15" font-weight="600" fill="${dark ? "#f5f5f7" : "#111827"}">Memory Pressure</text>
  <text x="360" y="264" font-size="13" font-weight="600" fill="#2563EB" text-anchor="end">Normal</text>
  <line x1="112" y1="420" x2="390" y2="420" stroke="${dark ? "#4b5563" : "#D1D5DB"}"/>
  <line x1="112" y1="304" x2="390" y2="304" stroke="${dark ? "#374151" : "#E5E7EB"}"/>
  <line x1="112" y1="362" x2="390" y2="362" stroke="${dark ? "#374151" : "#E5E7EB"}"/>
  <path d="M112 394 C148 390, 178 352, 214 350 C250 348, 274 334, 308 326 C334 319, 350 322, 390 286 L390 420 L112 420 Z" fill="url(#ram-graph)"/>
  <path d="M112 394 C148 390, 178 352, 214 350 C250 348, 274 334, 308 326 C334 319, 350 322, 390 286" fill="none" stroke="url(#ram-accent)" stroke-width="4" stroke-linecap="round"/>
  <circle cx="390" cy="286" r="6" fill="#3B82F6"/>
  <rect x="112" y="438" width="88" height="10" rx="5" fill="#22C55E"/>
  <rect x="204" y="438" width="88" height="10" rx="5" fill="#FACC15"/>
  <rect x="296" y="438" width="72" height="10" rx="5" fill="#F97316"/>
  <text x="112" y="465" font-size="12" fill="${dark ? "#9ca3af" : "#6B7280"}">Low pressure</text>
  <text x="238" y="465" font-size="12" fill="${dark ? "#9ca3af" : "#6B7280"}" text-anchor="middle">Compressed</text>
  <text x="368" y="465" font-size="12" fill="${dark ? "#9ca3af" : "#6B7280"}" text-anchor="end">Heavy swap</text>

  <rect x="440" y="226" width="156" height="116" rx="22" fill="${dark ? "#232326" : "#F8FAFC"}" stroke="${dark ? "#3a3a3c" : "#E5E7EB"}"/>
  <text x="464" y="258" font-size="13" font-weight="600" fill="${dark ? "#9ca3af" : "#6B7280"}">Compressed</text>
  <text x="464" y="302" font-size="32" font-weight="700" fill="${dark ? "#f5f5f7" : "#111827"}">5.2 GB</text>
  <text x="464" y="324" font-size="11.5" fill="${dark ? "#9ca3af" : "#6B7280"}">Memory compression</text>

  <rect x="440" y="364" width="156" height="116" rx="22" fill="${dark ? "#232326" : "#F8FAFC"}" stroke="${dark ? "#3a3a3c" : "#E5E7EB"}"/>
  <text x="464" y="396" font-size="13" font-weight="600" fill="${dark ? "#9ca3af" : "#6B7280"}">Swap Used</text>
  <text x="464" y="440" font-size="32" font-weight="700" fill="${dark ? "#f5f5f7" : "#111827"}">512 MB</text>
  <text x="464" y="462" font-size="11.5" fill="${dark ? "#9ca3af" : "#6B7280"}">Disk-backed memory</text>

  <rect x="84" y="516" width="512" height="160" rx="24" fill="${dark ? "#232326" : "#F8FAFC"}" stroke="${dark ? "#3a3a3c" : "#E5E7EB"}"/>
  <text x="112" y="552" font-size="15" font-weight="600" fill="${dark ? "#f5f5f7" : "#111827"}">The Apple-approved way to handle memory</text>
  <text x="112" y="579" font-size="12.5" fill="${dark ? "#9ca3af" : "#6B7280"}">
    <tspan x="112" dy="0">DiskCleaner reads real system signals: memory pressure, compressed</tspan>
    <tspan x="112" dy="18">memory, swap used, and page in/out. That is safer than fake “RAM</tspan>
    <tspan x="112" dy="18">cleaning” because it explains what macOS is doing instead of forcing</tspan>
    <tspan x="112" dy="18">risky behavior that works against how Apple devices manage memory.</tspan>
  </text>

  <rect x="84" y="688" width="512" height="68" rx="22" fill="${dark ? "#111827" : "#111827"}"/>
  <text x="112" y="718" font-size="13" font-weight="600" fill="#93C5FD">How DiskCleaner approaches RAM</text>
  <text x="112" y="738" font-size="12.5" fill="#E5E7EB">Shows memory pressure clearly and avoids fake RAM-cleaning claims.</text>
</svg>`

const RamOptimizerSplit = lazy(async () => {
  const Comp = ({ BG, theme }: { BG: string; theme: string }) => {
    useEffect(() => { const raf = requestAnimationFrame(dispatchRevealRefresh); return () => cancelAnimationFrame(raf) }, [])
    return (
      <section className="overflow-hidden py-16 sm:py-24" style={{ background: BG }}>
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-stretch lg:gap-x-16">
            <div className="order-2 lg:order-1 lg:pt-4 lg:pr-8 reveal">
              <div className="lg:max-w-lg">
                <p className="reveal reveal-headline text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em]">
                  <span className="text-[var(--text)]">Memory pressure.</span> <span className="text-[var(--blue)]">Finally explained.</span>
                </p>
                <p className="mt-4 text-[17px] leading-[1.65] tracking-[-0.01em] text-[var(--muted)]">
                  No fake RAM gains. No risky background tricks. DiskCleaner shows the memory signals that actually matter: pressure, compressed memory, and swap usage.
                  When your Mac feels heavy, you get a clear picture of why — and a safe refresh action that works with macOS, not against it.
                </p>
                <dl className="mt-6 max-w-xl space-y-2 text-[15px] leading-[1.65] text-[var(--muted)] sm:mt-8 sm:space-y-4 lg:max-w-none">
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
            <div className="order-2 lg:order-2 reveal d1 lg:flex lg:items-center -mb-6 sm:-mb-14 lg:mb-0">
              <div
                className="split-img split-hero-visual split-hero-visual-lg mobile-bleed-visual mx-auto w-full max-w-[560px]"
                style={{ lineHeight: 0 }}
                aria-label="Illustration of DiskCleaner RAM optimizer telemetry"
                role="img"
                dangerouslySetInnerHTML={{ __html: getRamOptimizerSvg(theme === "dark") }}
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
  const Comp = ({ BG, theme }: { BG: string; theme: string }) => {
    useEffect(() => { const raf = requestAnimationFrame(dispatchRevealRefresh); return () => cancelAnimationFrame(raf) }, [])
    return (
      <section className="py-16 sm:py-20" style={{ background: BG }}>
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-x-16">
            <div className="order-2 lg:order-1 reveal flex justify-center py-1 sm:py-0">
              <div
                className="split-img split-hero-visual split-hero-visual-lg mobile-bleed-visual mx-auto w-full max-w-[560px]"
                style={{ lineHeight: 0 }}
                aria-label="Illustration of DiskCleaner free space shown in the macOS menu bar with annotated design notes"
                role="img"
              >
                <MenuBarIllustration dark={theme === "dark"} />
              </div>
            </div>
            <div className="order-1 lg:order-2 lg:pt-4 lg:pr-8 reveal d1">
              <div className="lg:max-w-lg">
              <h2 className="reveal reveal-headline text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em] text-inherit">
                <span className="text-[var(--text)]">Disk space.</span> <span className="text-[var(--blue)]">Always one glance away.</span>
              </h2>
              <p className="mt-4 text-[17px] leading-[1.65] tracking-[-0.01em] text-[var(--muted)]">
                Your free space, always visible — no app to open.
                Trigger a Quick Scan, see update badges, or check full disk stats from a single click.
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
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 22, height: 22 }}><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><line x1="2" y1="12" x2="22" y2="12"/></svg>, name: "Browser Cache", desc: "Chrome, Edge, Firefox, Brave, and Arc caches, plus Safari cache measurement." },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 22, height: 22 }}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>, name: "Screenshots", desc: "Screenshot-named files in the actual macOS screenshots folder." },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 22, height: 22 }}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>, name: "Trash Contents", desc: "Trash measured across users and mounted volumes so hidden waste still shows up." },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 22, height: 22 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>, name: "System Logs", desc: "App logs, crash reports, and diagnostic logs that are safe to review and remove." },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 22, height: 22 }}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>, name: "Developer Data", desc: "DerivedData, Archives, Device Support, simulators, SwiftPM, CocoaPods, npm, JetBrains, and VS Code caches." },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 22, height: 22 }}><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>, name: "App Leftovers", desc: "Orphaned support files, caches, and preferences with risk labels and review before cleanup." },
    ]
    return (
      <section className="pt-14 sm:pt-20 pb-8 sm:pb-12" style={{ background: SURFACE }}>
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
          <div className="mb-8 flex flex-col items-center text-center sm:mb-12">
            <h2 className="reveal reveal-headline d1 text-balance text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em]">
              <span className="text-[var(--text)]">Seven categories.</span> <span className="text-[var(--blue)]">One scan. You decide what goes.</span>
            </h2>
            <p className="reveal d2 mt-4 max-w-[600px] text-[17px] leading-[1.55] text-[var(--muted)]">
              Quick Scan covers what every Mac accumulates quietly over time. Deep Scan goes deeper — developer files, large downloads, and more. You see exactly what was found before anything moves.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <div key={i} className="flex items-start gap-3 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
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
                <div className="mt-1 text-[14px] leading-[1.6] text-[var(--muted)]">Passwords, documents, and personal files are never touched — ever. Every removal goes to Trash, not permanent deletion.</div>
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
        a: "DiskCleaner runs locally on your Mac. Scanning and cleaning stay on-device, the app includes no analytics or tracking, and no account is required. License activation and update checks are the only outbound network activity.",
      },
      {
        q: "What exactly does DiskCleaner scan?",
        a: "Quick Scan covers App Cache, Browser Cache, Screenshots, Trash, System Logs, Developer Data, and App Leftovers. Deep Scan expands into additional locations such as Downloads, iOS backups, Mail attachments, and external drives. Caution categories are marked for review before cleanup.",
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
        q: "Can I get a refund?",
        a: "Yes. If you purchase through the Mac App Store, Apple's standard 14-day refund policy applies. For direct purchases, contact us at customersupport@diskcleaner.pro and we'll sort it out.",
      },
      {
        q: "Do I need an account or subscription?",
        a: "No account and no subscription. DiskCleaner includes 3 free scans, then unlocks Pro with a license key. The current direct license is $9.99 one-time for up to 2 Macs and includes future updates.",
      },
    ]
    return (
      <section id="faq" className="py-16 sm:py-20" style={{ background: BG }}>
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
              Get Early Access — Launching April 2026
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

const TrustBand = lazy(async () => {
  const Comp = ({ BG }: { BG: string }) => {
    useEffect(() => { const raf = requestAnimationFrame(dispatchRevealRefresh); return () => cancelAnimationFrame(raf) }, [])
    return (
      <section className="py-16 sm:py-20" style={{ background: BG }}>
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
          <div className="reveal rounded-[32px] border border-[var(--border)] bg-[var(--surface)] px-6 py-10 text-center shadow-sm sm:px-10">
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
            <button type="button" onClick={() => openModal("changelog")} className="site-footer-link">Changelog</button>
            <a href="/about" className="site-footer-link">About</a>
            <a href="/trust" className="site-footer-link">Trust Center</a>
          </div>
          {/* Support */}
          <div className="site-footer-col">
            <div className="site-footer-col-hd">Support</div>
            <a href="/help" className="site-footer-link">Help Center</a>
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
          <UninstallerSplit SURFACE={STRIPE_WHITE} theme={theme} />
          <RamOptimizerSplit BG={STRIPE_GRAY} theme={theme} />
          <MenuBarSplit BG={STRIPE_WHITE} theme={theme} />
          <FAQ BG={STRIPE_WHITE} />
          <CompareTable BG={STRIPE_GRAY} theme={theme} />
          <HighlightsCarousel SURFACE={STRIPE_WHITE} theme={theme} />
          <CommunityWall SURFACE={STRIPE_GRAY} />
          <TrustBand BG={STRIPE_GRAY} />
          <CTA BG={STRIPE_WHITE} openWaitlist={() => setModal("waitlist")} />
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
