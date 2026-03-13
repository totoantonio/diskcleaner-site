import { useEffect } from "react"

/* ─────────────────────────────────────────────
   All styles scoped to .h2-root — no global CSS
   ───────────────────────────────────────────── */
const css = `
  .h2-root {
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  /* ── Animations ── */
  @keyframes h2-fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes h2-shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
  }

  .h2-anim { opacity: 0; animation: h2-fadeUp 0.8s forwards; }
  .h2-delay-1 { animation-delay: 0.10s; }
  .h2-delay-2 { animation-delay: 0.30s; }
  .h2-delay-3 { animation-delay: 0.50s; }
  .h2-delay-4 { animation-delay: 0.70s; }
  .h2-delay-5 { animation-delay: 0.85s; }
  .h2-delay-6 { animation-delay: 1.00s; }

  .h2-reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s cubic-bezier(0.25,0.1,0.25,1),
                transform 0.7s cubic-bezier(0.25,0.1,0.25,1);
  }
  .h2-reveal.h2-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── Nav ── */
  .h2-nav {
    position: fixed; top: 0; left: 0; right: 0;
    height: 48px;
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-bottom: 1px solid rgba(255,255,255,0.08);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 24px;
    z-index: 1000;
    box-sizing: border-box;
    transition: background 0.4s ease, border-color 0.4s ease;
  }

  /* Light nav — over white/light sections */
  .h2-nav[data-theme="light"] {
    background: rgba(251,251,253,0.8);
    border-bottom-color: rgba(0,0,0,0.06);
  }
  .h2-nav[data-theme="light"] .h2-nav-disk    { color: #1d1d1f; }
  .h2-nav[data-theme="light"] .h2-nav-cleaner { color: #0071e3; }
  .h2-nav[data-theme="light"] .h2-nav-links a { color: rgba(0,0,0,0.6); }
  .h2-nav[data-theme="light"] .h2-nav-links a:hover { color: #000; }

  .h2-nav-logo { font-size: 17px; font-weight: 600; letter-spacing: -0.3px; text-decoration: none; }
  .h2-nav-disk    { color: #fff; transition: color 0.4s ease; }
  .h2-nav-cleaner { color: #47a9ff; transition: color 0.4s ease; }
  .h2-nav-links { display: flex; gap: 32px; list-style: none; margin: 0; padding: 0; }
  .h2-nav-links a { font-size: 13px; color: rgba(255,255,255,0.7); text-decoration: none; transition: color 0.15s; }
  .h2-nav-links a:hover { color: #fff; }

  /* ── Buttons ── */
  .h2-btn-blue {
    background: #0071e3; color: #fff !important;
    border: none; border-radius: 980px; cursor: pointer;
    font-family: inherit; text-decoration: none !important;
    transition: background 0.15s; display: inline-block; text-align: center;
  }
  .h2-btn-blue:hover { background: #0077ed; }

  .h2-btn-outline {
    background: transparent; color: #0071e3 !important;
    border: 1.5px solid #0071e3; border-radius: 980px; cursor: pointer;
    font-family: inherit; text-decoration: none !important;
    transition: background 0.15s; display: inline-block; text-align: center;
  }
  .h2-btn-outline:hover { background: rgba(0,113,227,0.06); }

  /* ── Hero ── */
  .h2-hero {
    min-height: 100vh;
    background: radial-gradient(ellipse 80% 50% at 50% 30%, #001530 0%, #000 65%);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; padding: 88px 24px 64px; box-sizing: border-box;
  }

  /* ── Mac mockup shimmer ── */
  .h2-shimmer {
    height: 6px; border-radius: 3px;
    background: linear-gradient(90deg, rgba(0,113,227,0.3) 0%, #0071e3 40%, rgba(0,113,227,0.3) 80%);
    background-size: 200% 100%;
    animation: h2-shimmer 1.5s linear infinite;
  }

  /* ── SVG ring ── */
  .h2-ring-path {
    stroke-dasharray: 502;
    stroke-dashoffset: 502;
    transition: stroke-dashoffset 1.5s cubic-bezier(0.25,0.1,0.25,1) 0.2s;
  }
  .h2-ring-wrap.h2-visible .h2-ring-path { stroke-dashoffset: 126; }

  /* ── Feature grid ── */
  .h2-feature {
    max-width: 980px; margin: 0 auto; padding: 100px 24px;
    display: grid; grid-template-columns: 1fr 1fr;
    align-items: center; gap: 80px; box-sizing: border-box;
  }

  /* ── Pricing ── */
  .h2-card { transition: box-shadow 0.3s ease, transform 0.3s ease; box-sizing: border-box; }
  .h2-card-light:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.1); transform: translateY(-4px); }
  .h2-card-dark:hover  { box-shadow: 0 12px 40px rgba(0,113,227,0.25); transform: translateY(-4px); }

  /* ── Footer ── */
  .h2-footer a {
    color: #6e6e73; text-decoration: none; transition: color 0.2s;
    display: block; margin-bottom: 12px; font-size: 13px;
  }
  .h2-footer a:hover { color: #fff; }

  /* ── Reduced motion ── */
  @media (prefers-reduced-motion: reduce) {
    .h2-anim   { animation: none; opacity: 1; }
    .h2-reveal { transition: none; opacity: 1; transform: none; }
    .h2-ring-path { transition: none; }
    .h2-shimmer   { animation: none; }
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .h2-nav-links { display: none !important; }
    .h2-hero-h1   { font-size: 48px !important; }
    .h2-feature   { grid-template-columns: 1fr !important; gap: 40px !important; padding: 60px 24px !important; }
    .h2-stat-inner    { flex-direction: column !important; gap: 40px !important; }
    .h2-stat-divider  { display: none !important; }
    .h2-stat-num      { font-size: 48px !important; }
    .h2-pricing-cards { flex-direction: column-reverse !important; align-items: center !important; }
    .h2-pricing-cards > * { width: 100% !important; max-width: 400px !important; }
    .h2-footer-cols { flex-direction: column !important; gap: 40px !important; }
    .h2-final-h   { font-size: 40px !important; }
    .h2-social-h  { font-size: 32px !important; }
    .h2-pricing-h { font-size: 32px !important; }
    .h2-feat-h2   { font-size: 32px !important; }
  }
`

export default function Home2() {
  useEffect(() => {
    // Scroll-reveal
    const revealEls = document.querySelectorAll(".h2-reveal")
    const revealObs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("h2-visible"); revealObs.unobserve(e.target) }
      }),
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    )
    revealEls.forEach(el => revealObs.observe(el))

    // Animated counters
    function animateCounter(el: Element, target: number, isDecimal: boolean, suffix: string) {
      let t0: number | null = null
      const dur = 1200
      const step = (ts: number) => {
        if (!t0) t0 = ts
        const p = Math.min((ts - t0) / dur, 1)
        el.textContent = (isDecimal ? (p * target).toFixed(1) : Math.floor(p * target)) + suffix
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }
    const statBar = document.querySelector(".h2-stat-bar")
    const statObs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const gb  = document.querySelector('[data-stat="gb"]')
          const sec = document.querySelector('[data-stat="sec"]')
          const cat = document.querySelector('[data-stat="cat"]')
          if (gb)  animateCounter(gb,  2.3, true,  " GB")
          if (sec) animateCounter(sec, 11,  false, " sec")
          if (cat) animateCounter(cat, 10,  false, "+")
          statObs.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (statBar) statObs.observe(statBar)

    // Adaptive nav theme — light over white sections, dark over black sections
    const nav = document.getElementById("h2-nav")
    const updateNavTheme = () => {
      if (!nav) return
      const sections = document.querySelectorAll<HTMLElement>("[data-nav-theme]")
      let theme = "dark"
      sections.forEach(s => {
        const top = s.getBoundingClientRect().top
        if (top <= 48) theme = s.dataset.navTheme ?? "dark"
      })
      nav.dataset.theme = theme
    }
    updateNavTheme()
    window.addEventListener("scroll", updateNavTheme, { passive: true })

    return () => {
      revealObs.disconnect()
      statObs.disconnect()
      window.removeEventListener("scroll", updateNavTheme)
    }
  }, [])

  return (
    <div className="h2-root">
      <style>{css}</style>

      {/* ════════════════════════════════
          NAV
          ════════════════════════════════ */}
      <nav id="h2-nav" className="h2-nav" data-theme="dark">
        <a href="#" className="h2-nav-logo">
          <span className="h2-nav-disk">Disk</span>
          <span className="h2-nav-cleaner">Cleaner</span>
        </a>
        <ul className="h2-nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/help">Support</a></li>
        </ul>
        <a href="#download" className="h2-btn-blue" style={{ fontSize: 13, fontWeight: 500, padding: "7px 16px" }}>
          Download Free
        </a>
      </nav>

      {/* ════════════════════════════════
          HERO
          ════════════════════════════════ */}
      <section className="h2-hero" data-nav-theme="dark">
        <p className="h2-anim h2-delay-1" style={{ fontSize: 12, textTransform: "uppercase", color: "#47a9ff", letterSpacing: 2, fontWeight: 600, margin: "0 0 20px" }}>
          For Mac
        </p>

        <h1 className="h2-anim h2-delay-2 h2-hero-h1" style={{ fontSize: 80, fontWeight: 700, color: "#fff", letterSpacing: "-0.022em", lineHeight: 1.05, margin: "0 0 24px" }}>
          Your Mac.<br />Finally breathing.
        </h1>

        <p className="h2-anim h2-delay-3" style={{ fontSize: 21, fontWeight: 300, color: "rgba(255,255,255,0.6)", maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
          macOS quietly collects gigabytes of junk it never cleans up.
          DiskCleaner finds it all — and clears it in seconds.
        </p>

        <div className="h2-anim h2-delay-4" style={{ display: "flex", gap: 16, justifyContent: "center", alignItems: "center", flexWrap: "wrap", marginTop: 40 }}>
          <a href="#download" className="h2-btn-blue" style={{ fontSize: 17, fontWeight: 500, padding: "14px 28px" }}>
            Download Free
          </a>
          <a href="#features" style={{ fontSize: 17, color: "#47a9ff", textDecoration: "none" }}>
            See What It Cleans ›
          </a>
        </div>

        <p className="h2-anim h2-delay-5" style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 16 }}>
          Free download. macOS 13 or later. No account needed.
        </p>

        {/* Mac window mockup */}
        <div className="h2-anim h2-delay-6" style={{ marginTop: 64, width: "100%", maxWidth: 640, borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)", background: "#111", boxShadow: "0 40px 80px rgba(0,0,0,0.6)", overflow: "hidden" }}>
          {/* Title bar */}
          <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 6, borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#161616" }}>
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginLeft: 8 }}>DiskCleaner</span>
          </div>
          {/* Content */}
          <div style={{ padding: "24px 24px 32px" }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: "0 0 12px" }}>Scanning system caches...</p>
            <div className="h2-shimmer" style={{ width: "72%" }} />
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column" }}>
              {[
                { name: "App Cache",      status: "Scanning…" },
                { name: "Browser Cache",  status: "Scanning…" },
                { name: "System Logs",    status: "Scanning…" },
                { name: "Developer Data", status: "Scanning…" },
              ].map((item, i, arr) => (
                <div key={item.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{item.name}</span>
                  <span style={{ fontSize: 12, color: "#47a9ff" }}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          STAT BAR
          ════════════════════════════════ */}
      <section className="h2-stat-bar" data-nav-theme="dark" style={{ background: "#111", padding: "64px 24px" }}>
        <div className="h2-stat-inner" style={{ display: "flex", justifyContent: "center", alignItems: "center", maxWidth: 900, margin: "0 auto" }}>

          <div className="h2-reveal" style={{ flex: 1, textAlign: "center", padding: "0 40px" }}>
            <div className="h2-stat-num" data-stat="gb" style={{ fontSize: 56, fontWeight: 700, color: "#fff" }}>2.3 GB</div>
            <div style={{ fontSize: 14, color: "#6e6e73", marginTop: 8 }}>Average junk found per scan</div>
          </div>

          <div className="h2-stat-divider" style={{ width: 1, height: 64, background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />

          <div className="h2-reveal" style={{ flex: 1, textAlign: "center", padding: "0 40px" }}>
            <div className="h2-stat-num" data-stat="sec" style={{ fontSize: 56, fontWeight: 700, color: "#fff" }}>11 sec</div>
            <div style={{ fontSize: 14, color: "#6e6e73", marginTop: 8 }}>Average time for a full scan</div>
          </div>

          <div className="h2-stat-divider" style={{ width: 1, height: 64, background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />

          <div className="h2-reveal" style={{ flex: 1, textAlign: "center", padding: "0 40px" }}>
            <div className="h2-stat-num" data-stat="cat" style={{ fontSize: 56, fontWeight: 700, color: "#fff" }}>10+</div>
            <div style={{ fontSize: 14, color: "#6e6e73", marginTop: 8 }}>Categories of clutter detected</div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════
          FEATURE STORYTELLING
          ════════════════════════════════ */}
      <section id="features" data-nav-theme="light" style={{ background: "#f5f5f7" }}>

        {/* A — Smart Scan: visual LEFT, text RIGHT */}
        <div className="h2-feature h2-ring-wrap h2-reveal">
          {/* Visual */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <svg width="160" height="160" viewBox="0 0 200 200" aria-hidden="true">
              <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(0,113,227,0.15)" strokeWidth="14" />
              <circle
                className="h2-ring-path"
                cx="100" cy="100" r="80"
                fill="none" stroke="#0071e3" strokeWidth="14" strokeLinecap="round"
                transform="rotate(-90 100 100)"
              />
              <text x="100" y="108" textAnchor="middle" fontSize="28" fontWeight="700" fill="#0071e3" fontFamily="-apple-system,sans-serif">75%</text>
            </svg>
          </div>
          {/* Text */}
          <div>
            <p style={{ fontSize: 12, textTransform: "uppercase", color: "#0071e3", letterSpacing: 2, fontWeight: 600, margin: "0 0 12px" }}>Smart Scan</p>
            <h2 className="h2-feat-h2" style={{ fontSize: 48, fontWeight: 700, color: "#1d1d1f", letterSpacing: "-0.022em", lineHeight: 1.05, margin: "0 0 20px" }}>
              Scans 10 categories.<br />In seconds.
            </h2>
            <p style={{ fontSize: 17, fontWeight: 300, color: "#6e6e73", lineHeight: 1.6, maxWidth: 400, margin: 0 }}>
              DiskCleaner looks everywhere macOS doesn't —
              system caches, app logs, old downloads, leftover
              app data, and more. One scan. Nothing missed.
            </p>
          </div>
        </div>

        {/* B — Safe by Design: text LEFT, visual RIGHT */}
        <div className="h2-feature h2-reveal" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          {/* Text */}
          <div>
            <p style={{ fontSize: 12, textTransform: "uppercase", color: "#0071e3", letterSpacing: 2, fontWeight: 600, margin: "0 0 12px" }}>Safe Clean</p>
            <h2 className="h2-feat-h2" style={{ fontSize: 48, fontWeight: 700, color: "#1d1d1f", letterSpacing: "-0.022em", lineHeight: 1.05, margin: "0 0 20px" }}>
              Cleans the junk.<br />Keeps what matters.
            </h2>
            <p style={{ fontSize: 17, fontWeight: 300, color: "#6e6e73", lineHeight: 1.6, maxWidth: 400, margin: 0 }}>
              Every file is shown before it's removed.
              System files are never touched. You review,
              you decide, you clean. Always in control.
            </p>
          </div>
          {/* Visual */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
        </div>

        {/* C — Pro Features: visual LEFT, text RIGHT */}
        <div className="h2-feature h2-reveal" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          {/* Visual */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ background: "#1d1d1f", borderRadius: 12, padding: 24, minWidth: 240 }}>
              {[
                "App Leftovers Detection",
                "Downloads Cleanup",
                "Developer Cache Scan",
                "Priority Scan Mode",
              ].map((item, i) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                  <span style={{ color: "#0071e3", fontWeight: 700, fontSize: 16 }}>✓</span>
                  <span style={{ fontSize: 15, color: "#fff" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Text */}
          <div>
            <p style={{ fontSize: 12, textTransform: "uppercase", color: "#0071e3", letterSpacing: 2, fontWeight: 600, margin: "0 0 12px" }}>DiskCleaner Pro</p>
            <h2 className="h2-feat-h2" style={{ fontSize: 48, fontWeight: 700, color: "#1d1d1f", letterSpacing: "-0.022em", lineHeight: 1.05, margin: "0 0 20px" }}>
              Go deeper.<br />Find more.
            </h2>
            <p style={{ fontSize: 17, fontWeight: 300, color: "#6e6e73", lineHeight: 1.6, maxWidth: 400, margin: 0 }}>
              Pro unlocks advanced scan categories including
              App Leftovers — orphaned data from deleted apps
              that macOS leaves behind. Built for users who
              want complete control of their storage.
            </p>
          </div>
        </div>

      </section>

      {/* ════════════════════════════════
          SOCIAL PROOF
          ════════════════════════════════ */}
      <section className="h2-reveal" data-nav-theme="dark" style={{ background: "#000", padding: "80px 24px", textAlign: "center" }}>
        <h2 className="h2-social-h" style={{ fontSize: 48, fontWeight: 700, color: "#fff", letterSpacing: "-0.022em", lineHeight: 1.1, margin: "0 0 16px" }}>
          Trusted by Mac users<br />who hate wasted space.
        </h2>
        <p style={{ fontSize: 17, fontWeight: 300, color: "#6e6e73", margin: 0 }}>
          Simple enough for anyone. Thorough enough for power users.
        </p>
      </section>

      {/* ════════════════════════════════
          PRICING
          ════════════════════════════════ */}
      <section id="pricing" data-nav-theme="light" style={{ background: "#f5f5f7", padding: "100px 24px" }}>
        <div className="h2-reveal" style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 12, textTransform: "uppercase", color: "#0071e3", letterSpacing: 2, fontWeight: 600, margin: "0 0 12px" }}>Pricing</p>
          <h2 className="h2-pricing-h" style={{ fontSize: 48, fontWeight: 700, color: "#1d1d1f", letterSpacing: "-0.022em", lineHeight: 1.05, margin: "0 0 12px" }}>
            Simple, honest pricing.
          </h2>
          <p style={{ fontSize: 17, color: "#6e6e73", fontWeight: 300, margin: 0 }}>Start free. Upgrade when you're ready.</p>
        </div>

        <div className="h2-pricing-cards" style={{ display: "flex", gap: 24, justifyContent: "center", alignItems: "stretch", flexWrap: "wrap" }}>

          {/* Free card */}
          <div className="h2-card h2-card-light h2-reveal" style={{ background: "#fff", border: "1px solid #d2d2d7", borderRadius: 18, padding: 40, maxWidth: 400, flex: "1 1 300px" }}>
            <div style={{ fontSize: 21, fontWeight: 600, color: "#1d1d1f", marginBottom: 16 }}>DiskCleaner</div>
            <div style={{ fontSize: 56, fontWeight: 700, color: "#1d1d1f", lineHeight: 1, marginBottom: 8 }}>Free</div>
            <div style={{ fontSize: 14, color: "#6e6e73", marginBottom: 32 }}>Always free. No trial, no expiry.</div>
            <hr style={{ border: "none", borderTop: "1px solid #d2d2d7", margin: "0 0 24px" }} />
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px" }}>
              {["System Cache Cleaning", "App Cache Cleaning", "Log File Removal", "Trash & Downloads Cleanup", "System Logs Scan"].map(f => (
                <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: "#1d1d1f", padding: "6px 0" }}>
                  <span style={{ color: "#0071e3", fontWeight: 700 }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <a href="#download" className="h2-btn-outline" style={{ fontSize: 15, padding: 12, width: "100%", boxSizing: "border-box" }}>
              Download Free
            </a>
          </div>

          {/* Pro card */}
          <div className="h2-card h2-card-dark h2-reveal" style={{ background: "#000", borderRadius: 18, padding: 40, maxWidth: 400, flex: "1 1 300px" }}>
            <div style={{ display: "inline-block", background: "#0071e3", color: "#fff", fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 980, marginBottom: 16, letterSpacing: "0.5px" }}>
              MOST POPULAR
            </div>
            <div style={{ fontSize: 21, fontWeight: 600, color: "#fff", marginBottom: 16 }}>DiskCleaner Pro</div>
            <div style={{ fontSize: 56, fontWeight: 700, color: "#fff", lineHeight: 1, marginBottom: 8 }}>$9.99</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 32 }}>per year — less than $1 a month</div>
            <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "0 0 24px" }} />
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px" }}>
              {["Everything in Free", "App Leftovers Detection", "Downloads & Installer Cleanup", "Developer Cache Scan", "Priority Scan Mode", "Future Pro Features Included"].map(f => (
                <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: "#fff", padding: "6px 0" }}>
                  <span style={{ color: "#0071e3", fontWeight: 700 }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <a href="#download" className="h2-btn-blue" style={{ fontSize: 15, padding: 12, width: "100%", boxSizing: "border-box" }}>
              Get DiskCleaner Pro
            </a>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════
          FINAL CTA
          ════════════════════════════════ */}
      <section id="download" className="h2-reveal" data-nav-theme="dark" style={{ background: "#000", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 24px", boxSizing: "border-box" }}>
        <div>
          <p style={{ fontSize: 12, textTransform: "uppercase", color: "#47a9ff", letterSpacing: 2, fontWeight: 600, margin: "0 0 16px" }}>Free Download</p>
          <h2 className="h2-final-h" style={{ fontSize: 64, fontWeight: 700, color: "#fff", letterSpacing: "-0.022em", lineHeight: 1.05, margin: "0 auto", maxWidth: 700 }}>
            Your Mac is ready<br />for a fresh start.
          </h2>
          <p style={{ fontSize: 19, fontWeight: 300, color: "rgba(255,255,255,0.6)", maxWidth: 480, margin: "16px auto 0", lineHeight: 1.6 }}>
            DiskCleaner is free to download and free to use.<br />
            No subscription needed to get started.
          </p>
          <a href="#" className="h2-btn-blue" style={{ fontSize: 19, fontWeight: 500, padding: "16px 36px", marginTop: 40, display: "inline-block" }}>
            Download DiskCleaner — It's Free
          </a>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 16 }}>
            For macOS 13 Ventura or later. Apple Silicon &amp; Intel.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════
          FOOTER
          ════════════════════════════════ */}
      <footer className="h2-footer" data-nav-theme="dark" style={{ background: "#111", padding: "60px 24px 40px" }}>
        <div className="h2-footer-cols" style={{ display: "flex", gap: 60, maxWidth: 1200, margin: "0 auto", flexWrap: "wrap" }}>

          {/* Brand */}
          <div style={{ flex: "2 1 200px", maxWidth: 260 }}>
            <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.3px", marginBottom: 12 }}>
              <span style={{ color: "#fff" }}>Disk</span>
              <span style={{ color: "#47a9ff" }}>Cleaner</span>
            </div>
            <p style={{ fontSize: 13, color: "#6e6e73", lineHeight: 1.6, margin: 0 }}>
              The Mac cleaner built for people<br />who actually use their Mac.
            </p>
          </div>

          {/* Product */}
          <div style={{ flex: "1 1 120px" }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "1.5px", color: "rgba(255,255,255,0.3)", marginBottom: 16, fontWeight: 600 }}>Product</div>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#download">Download</a>
            <a href="#">What's New</a>
          </div>

          {/* Support */}
          <div style={{ flex: "1 1 120px" }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "1.5px", color: "rgba(255,255,255,0.3)", marginBottom: 16, fontWeight: 600 }}>Support</div>
            <a href="/help">FAQ</a>
            <a href="/help">Contact</a>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Use</a>
          </div>

          {/* Connect */}
          <div style={{ flex: "1 1 120px" }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "1.5px", color: "rgba(255,255,255,0.3)", marginBottom: 16, fontWeight: 600 }}>Connect</div>
            <a href="#">Twitter / X</a>
            <a href="#">GitHub</a>
            <a href="mailto:adminsupport@diskcleaner.pro">Email Us</a>
          </div>

        </div>

        {/* Bottom strip */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, maxWidth: 1200, margin: "40px auto 0" }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>© 2025 DiskCleaner. All rights reserved.</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>Made for Mac.</span>
        </div>
      </footer>

    </div>
  )
}
