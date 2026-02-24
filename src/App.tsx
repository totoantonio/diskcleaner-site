import { useEffect, useState } from "react"

const useReveal = (theme: string) => {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal")
    els.forEach(el => el.classList.remove("revealed"))
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add("revealed"); observer.unobserve(e.target) }
        }),
        { threshold: 0.1 }
      )
      els.forEach(el => observer.observe(el))
    }, 50)
    return () => clearTimeout(timer)
  }, [theme])
}

const FEATURES = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:24,height:24}}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M8 11h6M11 8v6"/></svg>,
    tag: "SCAN ENGINE", title: "Quick & Deep Scan",
    desc: "Quick Scan sweeps common cache directories in seconds. Deep Scan performs a structured system-level inspection across app containers, logs, and temp files — giving you a complete picture before a single byte is deleted.",
    stat: "< 3s", statLabel: "Quick Scan",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:24,height:24}}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    tag: "SAFETY", title: "Trash-First Deletion",
    desc: "Every file passes through macOS Trash before anything is permanently removed. No silent deletions, no surprises. Restore anything in one click if you change your mind.",
    stat: "100%", statLabel: "Recoverable",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:24,height:24}}><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
    tag: "PERFORMANCE", title: "Cooling Mode",
    desc: "After a deep clean, DiskCleaner intelligently throttles follow-up activity to protect your drive's health. Smart pacing means your Mac stays fast — not just temporarily.",
    stat: "0%", statLabel: "Drive Stress",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:24,height:24}}><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
    tag: "PRIVACY", title: "Fully Local & Private",
    desc: "DiskCleaner runs entirely on your Mac. No telemetry, no analytics, no background processes phoning home. Your filesystem is yours — we never see it.",
    stat: "Zero", statLabel: "Data Sent",
  },
]

const STEPS = [
  { n: "01", title: "Scan", body: "Pick Quick or Deep Scan. Results appear in real time as DiskCleaner maps your cache and junk files." },
  { n: "02", title: "Review", body: "Browse every file before it's touched. Deselect anything you want to keep — full control, always." },
  { n: "03", title: "Clean", body: "Confirm and clean. Files go to Trash first — permanent removal is always your call." },
]

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)
const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  useReveal(theme)

  return (
    <div data-theme={theme}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body, [data-theme] {
          font-family: -apple-system, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        :root { --blue: #0071e3; --blue-dim: #0051a2; }

        [data-theme="light"] {
          --bg: #f5f5f7;
          --surface: #ffffff;
          --surface2: #f0f0f2;
          --border: rgba(0,0,0,0.09);
          --text: #1d1d1f;
          --muted: #6e6e73;
          --muted2: #aeaeb2;
          --nav-bg: rgba(245,245,247,0.82);
          --shadow: rgba(0,0,0,0.07);
          --shadow-lg: rgba(0,0,0,0.14);
          --blue-tint: rgba(0,113,227,0.06);
          --blue-tint-border: rgba(0,113,227,0.18);
          --blue-glow: rgba(0,113,227,0.12);
          --progress-track: #e5e5ea;
          --mockup-file-1: #dde3ec;
          --mockup-file-2: #e5e9f0;
          --mockup-file-3: #eaeef5;
          --mockup-file-4: #f0f3f8;
        }
        [data-theme="dark"] {
          --bg: #000000;
          --surface: #1c1c1e;
          --surface2: #2c2c2e;
          --border: rgba(255,255,255,0.1);
          --text: #f5f5f7;
          --muted: #98989d;
          --muted2: #48484a;
          --nav-bg: rgba(0,0,0,0.78);
          --shadow: rgba(0,0,0,0.4);
          --shadow-lg: rgba(0,0,0,0.65);
          --blue-tint: rgba(0,113,227,0.12);
          --blue-tint-border: rgba(0,113,227,0.3);
          --blue-glow: rgba(0,113,227,0.18);
          --progress-track: #3a3a3c;
          --mockup-file-1: #2c3a52;
          --mockup-file-2: #2c3345;
          --mockup-file-3: #252c3a;
          --mockup-file-4: #20262f;
        }

        html { scroll-behavior: smooth; }
        [data-theme] { background: var(--bg); color: var(--text); font-size: 17px; line-height: 1.47; min-height: 100vh; transition: background 0.3s, color 0.3s; }

        .container { max-width: 1080px; margin: 0 auto; padding: 0 24px; }

        .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1); }
        .reveal.revealed { opacity: 1; transform: none; }
        .d1 { transition-delay: 0.08s; } .d2 { transition-delay: 0.16s; } .d3 { transition-delay: 0.24s; } .d4 { transition-delay: 0.32s; }

        /* NAV */
        nav {
          position: fixed; top: 0; left: 0; width: 100%; z-index: 100;
          background: var(--nav-bg); backdrop-filter: saturate(180%) blur(20px);
          border-bottom: 1px solid var(--border); transition: background 0.3s;
        }
        .nav-inner { display: flex; align-items: center; justify-content: space-between; height: 52px; }
        .logo { font-size: 19px; font-weight: 600; letter-spacing: -0.022em; color: var(--text); text-decoration: none; }
        .logo em { font-style: normal; color: var(--blue); }
        .nav-links { display: flex; gap: 28px; list-style: none; }
        .nav-links a { color: var(--muted); text-decoration: none; font-size: 14px; font-weight: 400; transition: color 0.15s; }
        .nav-links a:hover { color: var(--text); }
        .nav-right { display: flex; align-items: center; gap: 10px; }
        .theme-btn {
          width: 34px; height: 34px; border-radius: 50%;
          background: var(--surface2); border: 1px solid var(--border);
          color: var(--muted); cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, color 0.2s; outline: none;
        }
        .theme-btn:hover { color: var(--text); }
        .nav-cta {
          padding: 7px 16px; background: var(--blue); color: #fff;
          border-radius: 980px; font-size: 13px; font-weight: 500; text-decoration: none;
          transition: filter 0.15s;
        }
        .nav-cta:hover { filter: brightness(1.1); }

        /* HERO */
        .hero {
          min-height: 100vh; display: flex; flex-direction: column;
          align-items: center; justify-content: center; text-align: center;
          padding: 120px 24px 80px; position: relative; overflow: hidden;
        }
        .hero-glow {
          position: absolute; width: 900px; height: 600px;
          background: radial-gradient(ellipse, var(--blue-glow) 0%, transparent 65%);
          top: 45%; left: 50%; transform: translate(-50%, -50%); pointer-events: none;
        }
        .eyebrow {
          font-size: 13px; font-weight: 500; color: var(--blue);
          display: flex; align-items: center; gap: 8px; margin-bottom: 16px;
        }
        .eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--blue); animation: blink 2s infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

        h1 { font-size: clamp(48px, 7.5vw, 88px); font-weight: 700; letter-spacing: -0.045em; line-height: 1.04; margin-bottom: 18px; }
        h1 em { font-style: normal; color: var(--blue); }
        .hero-sub { font-size: clamp(17px, 2vw, 21px); color: var(--muted); max-width: 500px; margin-bottom: 36px; font-weight: 400; line-height: 1.5; letter-spacing: -0.01em; }
        .cta-row { display: flex; gap: 12px; align-items: center; justify-content: center; flex-wrap: wrap; }
        .btn-fill {
          padding: 14px 26px; background: var(--blue); color: #fff;
          border-radius: 980px; font-size: 17px; font-weight: 500; text-decoration: none;
          transition: filter 0.2s, transform 0.2s; letter-spacing: -0.01em;
        }
        .btn-fill:hover { filter: brightness(1.1); transform: scale(1.02); }
        .btn-text {
          padding: 14px 20px; color: var(--blue); font-size: 17px;
          font-weight: 400; text-decoration: none; letter-spacing: -0.01em;
          display: inline-flex; align-items: center; gap: 4px; transition: gap 0.2s;
        }
        .btn-text:hover { gap: 8px; }
        .hero-note { font-size: 13px; color: var(--muted2); margin-top: 20px; }

        /* STATS */
        .stats-band { background: var(--surface); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 36px 0; }
        .stats-grid { display: grid; grid-template-columns: repeat(4,1fr); }
        .stat-item { text-align: center; padding: 0 16px; border-right: 1px solid var(--border); }
        .stat-item:last-child { border-right: none; }
        .stat-n { font-size: 36px; font-weight: 700; letter-spacing: -0.04em; line-height: 1; }
        .stat-n span { color: var(--blue); }
        .stat-l { font-size: 12px; color: var(--muted); margin-top: 6px; }

        /* MOCKUP SECTION */
        .mockup-sec { padding: 100px 0; }
        .split { display: grid; grid-template-columns: 1fr 1.35fr; gap: 80px; align-items: center; }
        .sec-label { font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--blue); margin-bottom: 12px; }
        .sec-title { font-size: clamp(28px, 3.5vw, 44px); font-weight: 700; letter-spacing: -0.035em; line-height: 1.1; margin-bottom: 12px; }
        .sec-sub { font-size: 17px; color: var(--muted); line-height: 1.55; letter-spacing: -0.01em; }
        .check-list { margin-top: 26px; display: flex; flex-direction: column; gap: 11px; }
        .check-row { display: flex; align-items: center; gap: 10px; font-size: 15px; color: var(--muted); }
        .check-circle { width: 20px; height: 20px; border-radius: 50%; background: var(--blue-tint); border: 1px solid var(--blue-tint-border); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

        .app-win { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; box-shadow: 0 30px 80px var(--shadow-lg); }
        .win-bar { height: 40px; background: var(--surface2); border-bottom: 1px solid var(--border); display: flex; align-items: center; padding: 0 16px; gap: 8px; }
        .dot { width: 12px; height: 12px; border-radius: 50%; }
        .dr{background:#ff5f57} .dy{background:#febc2e} .dg{background:#28c840}
        .win-label { flex: 1; text-align: center; font-size: 12px; color: var(--muted); font-weight: 500; }
        .win-body { padding: 24px; }
        .scan-hd { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .found-lbl { font-size: 12px; color: var(--muted); margin-bottom: 2px; }
        .found-n { font-size: 28px; font-weight: 700; letter-spacing: -0.04em; }
        .found-n span { color: var(--blue); }
        .clean-btn-ui { padding: 8px 18px; background: var(--blue); color: white; border-radius: 980px; font-size: 13px; font-weight: 500; }
        .file-row { display: flex; align-items: center; gap: 12px; padding: 11px 0; border-bottom: 1px solid var(--border); }
        .file-row:last-of-type { border-bottom: none; }
        .file-ico { width: 30px; height: 30px; border-radius: 7px; flex-shrink: 0; }
        .file-inf { flex: 1; min-width: 0; }
        .file-nm { font-size: 13px; font-weight: 500; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .file-pt { font-size: 11px; color: var(--muted); margin-top: 1px; }
        .file-sz { font-size: 13px; color: var(--muted); flex-shrink: 0; }
        .file-cb { width: 18px; height: 18px; border-radius: 5px; background: var(--blue); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .prog-area { margin-top: 16px; }
        .prog-labels { display: flex; justify-content: space-between; font-size: 12px; color: var(--muted); margin-bottom: 6px; }
        .prog-track { height: 4px; background: var(--progress-track); border-radius: 10px; overflow: hidden; }
        .prog-fill { height: 100%; width: 73%; background: linear-gradient(90deg, var(--blue-dim), var(--blue)); border-radius: 10px; }

        /* FEATURES */
        .feat-sec { padding: 100px 0; background: var(--surface); }
        .feat-grid { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid var(--border); border-radius: 16px; overflow: hidden; margin-top: 56px; }
        .feat-card { padding: 44px; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); background: var(--surface); transition: background 0.2s; cursor: pointer; }
        .feat-card:nth-child(2n) { border-right: none; }
        .feat-card:nth-child(3), .feat-card:nth-child(4) { border-bottom: none; }
        .feat-card:hover { background: var(--surface2); }
        .feat-tag { font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--blue); margin-bottom: 18px; }
        .feat-ico { color: var(--blue); margin-bottom: 14px; }
        .feat-ttl { font-size: 21px; font-weight: 700; letter-spacing: -0.025em; margin-bottom: 10px; }
        .feat-dsc { font-size: 15px; color: var(--muted); line-height: 1.6; margin-bottom: 24px; }
        .feat-stat { font-size: 36px; font-weight: 700; letter-spacing: -0.04em; line-height: 1; }
        .feat-stat-l { font-size: 12px; color: var(--muted2); margin-top: 4px; }

        /* HOW */
        .how-sec { padding: 100px 0; }
        .steps-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; margin-top: 56px; }
        .step-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 40px 32px; transition: border-color 0.2s, transform 0.25s, box-shadow 0.25s; }
        .step-card:hover { border-color: rgba(0,113,227,0.4); transform: translateY(-4px); box-shadow: 0 20px 40px var(--shadow); }
        .step-n { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 10px; background: var(--blue-tint); border: 1px solid var(--blue-tint-border); font-size: 14px; font-weight: 700; color: var(--blue); margin-bottom: 22px; }
        .step-ttl { font-size: 24px; font-weight: 700; letter-spacing: -0.03em; margin-bottom: 10px; }
        .step-bdy { font-size: 15px; color: var(--muted); line-height: 1.6; }

        /* CTA */
        .cta-sec { padding: 120px 0; background: var(--surface); border-top: 1px solid var(--border); text-align: center; position: relative; overflow: hidden; }
        .cta-glow { position: absolute; width: 700px; height: 400px; background: radial-gradient(ellipse, var(--blue-glow), transparent 65%); top: 50%; left: 50%; transform: translate(-50%,-50%); pointer-events: none; }
        .cta-inner { max-width: 600px; margin: 0 auto; position: relative; }
        .cta-ttl { font-size: clamp(36px, 5.5vw, 60px); font-weight: 700; letter-spacing: -0.04em; margin-bottom: 16px; }
        .cta-sub { font-size: 19px; color: var(--muted); margin-bottom: 32px; line-height: 1.5; letter-spacing: -0.01em; }
        .price-row { display: inline-flex; align-items: center; gap: 10px; background: var(--blue-tint); border: 1px solid var(--blue-tint-border); border-radius: 980px; padding: 8px 20px; margin-bottom: 28px; }
        .price-n { font-size: 22px; font-weight: 700; letter-spacing: -0.03em; }
        .price-d { font-size: 14px; color: var(--muted); }
        .trust-row { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; margin-top: 22px; }
        .trust-item { font-size: 13px; color: var(--muted); display: flex; align-items: center; gap: 6px; }
        .trust-dot { width: 4px; height: 4px; background: var(--blue); border-radius: 50%; }

        footer { padding: 28px 0; background: var(--bg); border-top: 1px solid var(--border); }
        .footer-in { display: flex; justify-content: space-between; align-items: center; }
        .footer-copy { font-size: 13px; color: var(--muted2); }
        .footer-links { display: flex; gap: 22px; }
        .footer-links a { font-size: 13px; color: var(--muted2); text-decoration: none; transition: color 0.15s; }
        .footer-links a:hover { color: var(--muted); }


        /* ZERO-DECISION */
        .zd-sec { padding: 100px 0; background: var(--surface); border-top: 1px solid var(--border); }
        .zd-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .zd-badge { display: inline-flex; align-items: center; gap: 7px; background: var(--blue-tint); border: 1px solid var(--blue-tint-border); border-radius: 980px; padding: 5px 13px; margin-bottom: 20px; font-size: 11px; font-weight: 600; color: var(--blue); letter-spacing: 0.06em; text-transform: uppercase; }
        .zd-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--blue); animation: blink 2s infinite; }
        .zd-title { font-size: clamp(30px, 3.8vw, 48px); font-weight: 700; letter-spacing: -0.04em; line-height: 1.08; margin-bottom: 16px; }
        .zd-title em { font-style: normal; color: var(--blue); }
        .zd-sub { font-size: 17px; color: var(--muted); line-height: 1.6; margin-bottom: 32px; letter-spacing: -0.01em; }
        .zd-btn { display: inline-flex; align-items: center; gap: 10px; padding: 15px 26px; background: var(--blue); color: #fff; border-radius: 980px; font-size: 17px; font-weight: 500; text-decoration: none; transition: filter 0.2s, transform 0.2s; letter-spacing: -0.01em; }
        .zd-btn:hover { filter: brightness(1.1); transform: scale(1.02); }
        .zd-note { margin-top: 14px; font-size: 13px; color: var(--muted2); }
        .zd-card { background: var(--bg); border: 1px solid var(--border); border-radius: 20px; padding: 28px; box-shadow: 0 24px 60px var(--shadow-lg); }
        .zd-card-hd { font-size: 11px; font-weight: 600; color: var(--muted); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 18px; }
        .zd-cat-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
        .zd-cat { display: flex; align-items: center; gap: 12px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 11px 14px; }
        .zd-cat-dot { width: 28px; height: 28px; border-radius: 7px; flex-shrink: 0; }
        .zd-cat-info { flex: 1; }
        .zd-cat-name { font-size: 13px; font-weight: 500; color: var(--text); }
        .zd-cat-desc { font-size: 11px; color: var(--muted); margin-top: 1px; }
        .zd-cat-size { font-size: 12px; font-weight: 500; color: var(--muted); flex-shrink: 0; }
        .zd-cat-chk { width: 16px; height: 16px; border-radius: 50%; background: var(--blue); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .zd-total { display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; background: var(--blue-tint); border: 1px solid var(--blue-tint-border); border-radius: 12px; margin-bottom: 14px; }
        .zd-total-lbl { font-size: 13px; color: var(--muted); }
        .zd-total-n { font-size: 20px; font-weight: 700; letter-spacing: -0.03em; }
        .zd-total-n span { color: var(--blue); }
        .zd-action { width: 100%; padding: 12px; background: var(--blue); color: white; border-radius: 980px; border: none; font-size: 15px; font-weight: 600; cursor: default; font-family: inherit; display: flex; align-items: center; justify-content: center; gap: 8px; }
        @media (max-width: 768px) { .zd-inner { grid-template-columns: 1fr; gap: 40px; } }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .stats-grid { grid-template-columns: 1fr 1fr; }
          .stat-item:nth-child(2) { border-right: none; }
          .stat-item:nth-child(3) { border-right: 1px solid var(--border); }
          .split { grid-template-columns: 1fr; gap: 40px; }
          .feat-grid { grid-template-columns: 1fr; }
          .feat-card { border-right: none !important; }
          .feat-card:nth-child(3) { border-bottom: 1px solid var(--border) !important; }
          .steps-grid { grid-template-columns: 1fr; }
          .footer-in { flex-direction: column; gap: 14px; text-align: center; }
        }
      `}</style>

      {/* NAV */}
      <nav>
        <div className="container">
          <div className="nav-inner">
            <a href="#" className="logo">Disk<em>Cleaner</em></a>
            <ul className="nav-links">
              <li><a href="#zero-decision">Zero-Decision</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#how">How it works</a></li>
              <li><a href="#download">Pricing</a></li>
            </ul>
            <div className="nav-right">
              <button className="theme-btn" onClick={() => setTheme(t => t === "light" ? "dark" : "light")} aria-label="Toggle theme">
                {theme === "light" ? <MoonIcon /> : <SunIcon />}
              </button>
              <a href="#download" className="nav-cta">Download</a>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="eyebrow reveal">
          <span className="eyebrow-dot" />
          macOS 13 Ventura and later · Apple Silicon Native
        </div>
        <h1 className="reveal d1">Clean your Mac.<br /><em>Keep what matters.</em></h1>
        <p className="hero-sub reveal d2">
          DiskCleaner safely removes hidden cache, logs, and junk — recovering gigabytes you didn't know you'd lost.
        </p>
        <div className="cta-row reveal d3">
          <a href="#download" className="btn-fill">Download for macOS</a>
          <a href="#zero-decision" className="btn-text">Just clean my Mac →</a>
        </div>
        <p className="hero-note reveal d4">Free trial · $19 one-time · 3 Macs included</p>
      </section>

      {/* STATS */}
      <div className="stats-band">
        <div className="container">
          <div className="stats-grid">
            {[{n:"12",u:"GB+",l:"Avg. space recovered"},{n:"<3",u:"s",l:"Quick scan speed"},{n:"100",u:"%",l:"Files recoverable"},{n:"0",u:"",l:"Data sent remotely"}].map((s,i)=>(
              <div className={`stat-item reveal d${i+1}`} key={i}>
                <div className="stat-n">{s.n}<span>{s.u}</span></div>
                <div className="stat-l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ZERO-DECISION SECTION */}
      <section id="zero-decision" className="zd-sec">
        <div className="container">
          <div className="zd-inner">
            <div>
              <div className="zd-badge reveal"><span className="zd-badge-dot"/>New Feature</div>
              <h2 className="zd-title reveal d1">Zero-Decision<br /><em>Cleaning.</em></h2>
              <p className="zd-sub reveal d2">
                Don't want to think about it? One tap. DiskCleaner instantly removes only the universally safe categories — cache, logs, derived data, temp files — nothing personal, nothing that matters. No review screen. No decisions.
              </p>
              <a href="#download" className="zd-btn reveal d3">
                Just Clean My Mac
              </a>
              <p className="zd-note reveal d4">Safe categories only · Everything goes to Trash first</p>
            </div>
            <div className="reveal d2">
              <div className="zd-card">
                <div className="zd-card-hd">Auto-selected safe categories</div>
                <div className="zd-cat-list">
                  {[
                    {label:"App Cache",desc:"~/Library/Caches",size:"2.3 GB",color:"#1a4fa8"},
                    {label:"Xcode Derived Data",desc:"~/Developer/Xcode",size:"4.1 GB",color:"#0f3d8a"},
                    {label:"System Logs",desc:"/var/log/",size:"1.1 GB",color:"#0a2f6e"},
                    {label:"Temp Files",desc:"/private/var/tmp/",size:"0.6 GB",color:"#072455"},
                    {label:"Browser Cache",desc:"~/Library/Caches/Safari",size:"0.9 GB",color:"#051c40"},
                  ].map((c,i)=>(
                    <div className="zd-cat" key={i}>
                      <div className="zd-cat-dot" style={{background:c.color}}/>
                      <div className="zd-cat-info">
                        <div className="zd-cat-name">{c.label}</div>
                        <div className="zd-cat-desc">{c.desc}</div>
                      </div>
                      <div className="zd-cat-size">{c.size}</div>
                      <div className="zd-cat-chk">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l1.5 1.5 3.5-3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="zd-total">
                  <span className="zd-total-lbl">Total recoverable</span>
                  <span className="zd-total-n"><span>9.0</span> GB</span>
                </div>
                <div className="zd-action">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  Just Clean My Mac
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOCKUP */}
      <section className="mockup-sec">
        <div className="container">
          <div className="split">
            <div>
              <p className="sec-label reveal">The Interface</p>
              <h2 className="sec-title reveal d1">Designed to be obvious.</h2>
              <p className="sec-sub reveal d2">No confusing toggles. No mystery settings. You see exactly what was found, where it lives, and how much space you'll recover.</p>
              <div className="check-list reveal d3">
                {["Scan results appear in real time","Full file path visibility","Selective clean — keep what you want","One-click Trash restore"].map(f=>(
                  <div className="check-row" key={f}>
                    <div className="check-circle">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal d1">
              <div className="app-win">
                <div className="win-bar">
                  <div className="dot dr"/><div className="dot dy"/><div className="dot dg"/>
                  <div className="win-label">DiskCleaner — Scan Results</div>
                </div>
                <div className="win-body">
                  <div className="scan-hd">
                    <div>
                      <div className="found-lbl">Found</div>
                      <div className="found-n"><span>8.4</span> GB</div>
                    </div>
                    <div className="clean-btn-ui">Clean Selected</div>
                  </div>
                  {[
                    {name:"Xcode Derived Data",path:"~/Library/Developer/Xcode/DerivedData",size:"4.1 GB",c:"mockup-file-1"},
                    {name:"App Cache",path:"~/Library/Caches",size:"2.3 GB",c:"mockup-file-2"},
                    {name:"System Logs",path:"/var/log/",size:"1.1 GB",c:"mockup-file-3"},
                    {name:"Browser Cache",path:"~/Library/Caches/Safari",size:"0.9 GB",c:"mockup-file-4"},
                  ].map((f,i)=>(
                    <div className="file-row" key={i}>
                      <div className="file-ico" style={{background:`var(--${f.c})`}}/>
                      <div className="file-inf">
                        <div className="file-nm">{f.name}</div>
                        <div className="file-pt">{f.path}</div>
                      </div>
                      <div className="file-sz">{f.size}</div>
                      <div className="file-cb">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    </div>
                  ))}
                  <div className="prog-area">
                    <div className="prog-labels"><span>Scanning system libraries…</span><span>73%</span></div>
                    <div className="prog-track"><div className="prog-fill"/></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="feat-sec">
        <div className="container">
          <div className="reveal" style={{maxWidth:540}}>
            <p className="sec-label">Features</p>
            <h2 className="sec-title">Built with intention.</h2>
            <p className="sec-sub">Every feature exists for a reason. Nothing bloated, nothing hidden.</p>
          </div>
          <div className="feat-grid">
            {FEATURES.map((f,i)=>(
              <div key={i} className={`feat-card reveal d${(i%2)+1}`}>
                <div className="feat-tag">{f.tag}</div>
                <div className="feat-ico">{f.icon}</div>
                <div className="feat-ttl">{f.title}</div>
                <div className="feat-dsc">{f.desc}</div>
                <div className="feat-stat">{f.stat}</div>
                <div className="feat-stat-l">{f.statLabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="how-sec">
        <div className="container">
          <div className="reveal" style={{textAlign:"center"}}>
            <p className="sec-label">Process</p>
            <h2 className="sec-title">Simple by design.</h2>
            <p className="sec-sub" style={{maxWidth:400,margin:"0 auto"}}>Three steps. No configuration required.</p>
          </div>
          <div className="steps-grid">
            {STEPS.map((s,i)=>(
              <div key={i} className={`step-card reveal d${i+1}`}>
                <div className="step-n">{s.n}</div>
                <div className="step-ttl">{s.title}</div>
                <div className="step-bdy">{s.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="download" className="cta-sec">
        <div className="cta-glow"/>
        <div className="container">
          <div className="cta-inner reveal">
            <p className="sec-label">Get Started</p>
            <h2 className="cta-ttl">Your Mac deserves better.</h2>
            <p className="cta-sub">One purchase. Runs entirely on your Mac. No subscription, ever.</p>
            <div style={{marginBottom:28}}>
              <div className="price-row">
                <span className="price-n">$19</span>
                <span className="price-d">one-time · up to 3 Macs</span>
              </div>
            </div>
            <a href="#" className="btn-fill" style={{fontSize:17,padding:"15px 32px"}}>
              Download DiskCleaner
            </a>
            <div className="trust-row">
              {["Free trial","30-day refund","No subscription","macOS 13+","Apple Silicon native"].map(f=>(
                <div key={f} className="trust-item"><div className="trust-dot"/>{f}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-in">
            <span className="footer-copy">© {new Date().getFullYear()} DiskCleaner. All rights reserved.</span>
            <div className="footer-links">
              <a href="#">Privacy</a>
              <a href="#">Support</a>
              <a href="#">Changelog</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}