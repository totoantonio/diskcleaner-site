import { Suspense, lazy, useEffect, useState } from "react"
import { Modal, SupportContent, ChangelogContent, WaitlistContent } from "../components/SiteModal"
import { modalTitle, type ModalKey } from "../components/modalConfig"
import appImage from "../assets/DiskCleaner.webp"
import appImage2 from "../assets/DiskCleaner_ZeroDecision.webp"
import appImage3 from "../assets/DiskCleaner_Uninstaller.webp"
import appImage_464 from "../assets/DiskCleaner-464.webp"
import appImage_640 from "../assets/DiskCleaner-640.webp"
import appImage2_464 from "../assets/DiskCleaner_ZeroDecision-464.webp"
import appImage2_640 from "../assets/DiskCleaner_ZeroDecision-640.webp"
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
const Requirements = lazy(() => import("../components/home/Requirements"))
const CommunityWall = lazy(() => import("../components/home/CommunityWall"))

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
      els().forEach(el => {
        if (el.dataset.revealBound === "1") return
        el.dataset.revealBound = "1"
        observer.observe(el)
      })
    }
    const raf = window.requestAnimationFrame(refresh)
    const onRefresh = () => refresh()
    window.addEventListener("dc:reveal-refresh", onRefresh as EventListener)
    return () => {
      window.cancelAnimationFrame(raf)
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
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-[var(--blue)]">
          DiskCleaner for Mac
        </div>
        <h1 className="mx-auto max-w-[900px] text-[clamp(40px,10vw,96px)] font-bold leading-[0.97] tracking-[-0.055em]">
          <span className="text-[var(--text)]">Clean your Mac.</span><br />
          <em className="not-italic text-[var(--blue)]">Know exactly why.</em>
        </h1>
        <p className="mx-auto mt-5 max-w-[620px] text-[clamp(18px,2vw,22px)] leading-[1.55] tracking-[-0.01em] text-[var(--muted)]">
          Every other cleaner guesses. DiskCleaner shows you every file,
          every category, every byte — before anything moves.
        </p>
        {/* Trust signals row — above CTA */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5">
          <div className="flex items-center gap-1.5 text-[13px] text-[var(--muted2)]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>485+ developers &amp; Mac users on the waitlist</span>
          </div>
          <span className="hidden text-[var(--border)] sm:inline">·</span>
          <div className="flex items-center gap-1 text-[13px] text-[var(--muted2)]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            100% local · No network calls · No account
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <a href="#download" onClick={() => trackCTA("hero")} className="inline-flex items-center justify-center rounded-full bg-[var(--blue)] px-7 py-3.5 text-[17px] font-medium text-white no-underline transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.97] active:brightness-90">
            Get Early Access
          </a>
          <a href="#features" className="inline-flex items-center gap-2 px-2 py-3.5 text-[17px] font-medium text-[var(--muted)] no-underline transition-colors duration-150 hover:text-[var(--text)]">
            See how it works <span aria-hidden>›</span>
          </a>
        </div>
        <p className="mt-3 text-[12px] tracking-[-0.01em] text-[var(--muted2)]">
          Free at launch · 3 scans included · $9.99 one-time after · No subscription · Apple-notarized
        </p>
      </div>
    </section>
  )
}

function StatsBand({ SURFACE }: { SURFACE: string }) {
  return (
    <div className="border-y border-[var(--border)] py-12 sm:py-16" style={{ background: SURFACE }}>
      <div className="mx-auto w-full max-w-[1080px] px-6 md:px-12">
        <div className="grid grid-cols-2 gap-y-3 md:grid-cols-4 md:gap-y-0">
          {[
            { n: "485",  u: "+",   l: "On the early access waitlist" },
            { n: "7",    u: "",    l: "Junk categories, one pass" },
            { n: "<10",  u: "s",   l: "From launch to results" },
            { n: "$9",   u: ".99", l: "One time · yours forever" },
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
    <section id="features" className="py-20 sm:py-32" style={{ background: SURFACE }}>
      <div className="mx-auto w-full max-w-[1080px] px-6 md:px-12">
        <div className="mb-7 flex flex-col items-center text-center sm:mb-10">
          <span className="reveal rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--blue)]">Why DiskCleaner</span>
          <h2 className="reveal reveal-headline d1 mt-4 text-balance text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em]">
            <span className="inline-block text-left sm:contents">
              <span className="block text-[var(--text)] sm:inline">Other cleaners delete silently.</span>{" "}
              <span className="block text-[var(--blue)] sm:inline">You get to see everything.</span>
            </span>
          </h2>
          <p className="reveal d2 mt-4 max-w-[760px] text-[17px] leading-[1.55] tracking-[-0.01em] text-[var(--muted)]">
              DiskCleaner takes the opposite approach — show everything, delete nothing without your approval. Every file, every category, reviewed by you before anything moves.
            </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                tag: "TRANSPARENCY",

                ico: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 24, height: 24 }}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
                ttl: "See Every File. Approve Every Clean.",
                dsc: "Full confirmation screen with per-file checkboxes. Expand any category. Uncheck anything. You stay in control, always.",
              },
              {
                tag: "SAFETY",
                ico: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 24, height: 24 }}><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /></svg>,
                ttl: "Everything Goes to Trash. Always.",
                dsc: "We use macOS trashItem exclusively — never removeItem. Every file is recoverable, every time. Not a single permanent deletion.",
              },
              {
                tag: "SCANNING",
                ico: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 24, height: 24 }}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>,
                ttl: "7 Categories. One Pass.",
                dsc: "App Cache, Browser Cache, Screenshots, Trash, System Logs, Developer Data, App Leftovers — scanned simultaneously in under 10 seconds.",
              },
              {
                tag: "PERFORMANCE",
                ico: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 24, height: 24 }}><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
                ttl: "Built with Swift Concurrency.",
                dsc: "All file I/O runs on background threads. The interface never freezes. File sizes animate live as they're discovered.",
              },
              {
                tag: "BROWSERS",
                ico: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 24, height: 24 }}><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><line x1="2" y1="12" x2="22" y2="12" /></svg>,
                ttl: "Every Browser. Every Profile.",
                dsc: "Safari, Chrome, Firefox, Edge, Arc, Brave, Vivaldi, Chromium, Opera — all profiles cleaned. Passwords, bookmarks, and history never touched.",
              },
              {
                tag: "DEVELOPERS",
                ico: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 24, height: 24 }}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>,
                ttl: "Developers Recover the Most.",
                dsc: "Xcode DerivedData, Simulators, VS Code, JetBrains, CocoaPods, npm — gigabytes you forgot existed. One scan reveals them all.",
              },
            ].map((f, i) => (
              <div key={i} className="reveal rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[rgba(0,113,227,0.18)] hover:shadow-[0_8px_28px_var(--shadow-lg)]" style={{ transitionDelay: `${i * 65}ms` }}>
                <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--blue)]">{f.tag}</div>
                <div className="mt-3 flex h-9 w-9 items-center justify-center rounded-[10px] border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] text-[var(--blue)]">{f.ico}</div>
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
      <section className="overflow-hidden py-20 sm:py-32" style={{ background: BG }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-x-16">
            <div className="order-1 lg:order-1 lg:pt-4 lg:pr-8 reveal">
              <div className="lg:max-w-lg">
                <h2 className="inline-flex rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--blue)]">The Interface</h2>
                <p className="reveal reveal-headline mt-2 text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em]">
                  <span className="text-[var(--text)]">Don't clean what you can't see.</span> <span className="text-[var(--blue)]">Total clarity.</span>
                </p>
                <p className="mt-5 text-[15px] leading-[1.65] tracking-[-0.01em] text-[var(--muted)]">
                  See exactly what's taking up space before a single file moves.
                  Expand any category down to individual files. Uncheck anything you want to keep.
                  When you're ready - and only then - click Clean.
                </p>
                <dl className="mt-6 max-w-xl space-y-4 text-[15px] leading-[1.65] text-[var(--muted)] sm:mt-8 lg:max-w-none">
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
            <div className="order-2 lg:order-2 reveal d1">
              <img
                src={appImage}
                srcSet={`${appImage_464} 464w, ${appImage_640} 640w, ${appImage} 1376w`}
                sizes="(max-width: 1024px) 92vw, 50vw"
                width="1376" height="1464"
                alt="DiskCleaner interface showing scan results"
                loading="eager" decoding="async" fetchPriority="high"
                className="split-img mx-auto w-full lg:w-4/5 max-w-none rounded-[18px] border border-[var(--border)] shadow-[0_24px_80px_var(--shadow-xl),0_8px_24px_var(--shadow-lg),0_2px_6px_var(--shadow)]"
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
  return { default: Comp }
})

const HowItWorks = lazy(async () => {
  const Comp = ({ BG }: { BG: string }) => {
    useEffect(() => { const raf = requestAnimationFrame(dispatchRevealRefresh); return () => cancelAnimationFrame(raf) }, [])
    return (
      <section className="py-20 sm:py-32" style={{ background: BG }}>
        <div className="mx-auto w-full max-w-[1080px] px-6 md:px-12">
          <div className="text-center">
            <h2 className="reveal reveal-headline d1 text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em] text-[var(--text)]">
              <span className="inline-block text-left sm:contents">
                <span className="block sm:inline">Most cleaners are black boxes.</span>{" "}
                <span className="block sm:inline"><em className="not-italic text-[var(--blue)]">Not this one.</em></span>
              </span>
            </h2>
            <p className="reveal d2 mt-4 text-[17px] leading-[1.55] text-[var(--muted)]">
              Scan, review, clean — you see every file at every step. No surprises, ever.
            </p>
          </div>
          <div className="mt-7 grid grid-cols-1 gap-4 sm:mt-10 lg:grid-cols-3">
            {[
              {
                n: "01",
                ttl: "Scan",
                bdy: "Choose Quick or Deep. All 7 categories run in parallel. File sizes appear live as they're found — no waiting for a final number.",
              },
              {
                n: "02",
                ttl: "Review",
                bdy: "Every file is shown before anything moves. Expand categories, check individual items, uncheck what you want to keep. Full control.",
              },
              {
                n: "03",
                ttl: "Clean",
                bdy: "Files move to macOS Trash — not deleted, not gone. A live log shows every file moved in real time. Restore anything, any time.",
              },
            ].map((s, i) => (
              <div key={i} className={`reveal d${i + 1} rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 transition duration-200 hover:-translate-y-0.5 hover:border-[rgba(0,113,227,0.2)] hover:shadow-[0_14px_32px_var(--shadow-lg)]`}>
                <div className="font-mono text-xs font-semibold tracking-[0.08em] text-[var(--blue)] opacity-60">{s.n}</div>
                <div className="mt-2 text-[22px] font-semibold tracking-[-0.025em] text-[var(--text)]">{s.ttl}</div>
                <div className="mt-2 text-[14px] leading-[1.65] text-[var(--muted)]">{s.bdy}</div>
              </div>
            ))}
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
      <section id="uninstaller" className="overflow-hidden py-20 sm:py-32" style={{ background: SURFACE }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-x-16">
            <div className="order-1 lg:order-1 lg:pt-4 lg:pr-8 reveal">
              <div className="lg:max-w-lg">
                <h2 className="inline-flex rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--blue)]">App Uninstaller</h2>
                <p className="reveal reveal-headline mt-2 text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em]">
                  <span className="text-[var(--text)]">Dragging to Trash isn't enough.</span> <span className="text-[var(--blue)]">Leave no trace.</span>
                </p>
                <p className="mt-5 text-[15px] leading-[1.65] tracking-[-0.01em] text-[var(--muted)]">
                  Dragging an app to Trash leaves behind gigabytes of caches,
                  preferences, and support files spread across 9 Library locations.
                  DiskCleaner finds every leftover - the files Finder never shows you.
                </p>
                <dl className="mt-6 max-w-xl space-y-4 text-[15px] leading-[1.65] text-[var(--muted)] sm:mt-8 lg:max-w-none">
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
            <div className="order-2 lg:order-2 reveal d1">
              <img
                src={appImage3}
                srcSet={`${appImage3_464} 464w, ${appImage3_640} 640w, ${appImage3} 1376w`}
                sizes="(max-width: 1024px) 92vw, 50vw"
                width="1376" height="1464"
                alt="DiskCleaner app uninstaller"
                loading="lazy" decoding="async"
                className="split-img mx-auto w-full lg:w-4/5 max-w-none rounded-[18px] border border-[var(--border)] shadow-[0_24px_80px_var(--shadow-xl),0_8px_24px_var(--shadow-lg),0_2px_6px_var(--shadow)]"
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
      <section className="py-20 sm:py-32" style={{ background: BG }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
              <span className="inline-flex rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--blue)]">Menu Bar</span>
              <h2 className="reveal reveal-headline mt-2 text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em] text-inherit">
                <span className="text-[var(--text)]">Your disk space,</span> <span className="text-[var(--blue)]">always visible.</span>
              </h2>
              <p className="mt-5 text-[15px] leading-[1.65] tracking-[-0.01em] text-[var(--muted)]">
                Live free space lives in your menu bar — always one glance away.
                Trigger a Quick Scan or check full disk stats without ever opening the app.
                Lightweight. Always on. Never in the way.
              </p>
              <ul className="mt-6 list-none space-y-4 pl-0 text-[15px] leading-[1.65] text-[var(--text-dim)] sm:mt-8">
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

const ZeroDecisionSplit = lazy(async () => {
  const Comp = ({ SURFACE }: { SURFACE: string }) => {
    useEffect(() => { const raf = requestAnimationFrame(dispatchRevealRefresh); return () => cancelAnimationFrame(raf) }, [])
    return (
      <section className="overflow-hidden py-20 sm:py-32" style={{ background: SURFACE }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-x-16">
            <div className="order-1 lg:order-1 lg:pt-4 lg:pr-8 reveal">
              <div className="lg:max-w-lg">
                <h2 className="inline-flex rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--blue)]">Zero-Decision Mode</h2>
                <p className="reveal reveal-headline mt-2 text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em]">
                  <span className="inline-block text-left sm:contents">
                    <span className="block text-[var(--text)] sm:inline">Don't want to review?</span>{" "}
                    <span className="block text-[var(--blue)] sm:inline">One tap. Done.</span>
                  </span>
                </p>
                <p className="mt-5 text-[15px] leading-[1.65] tracking-[-0.01em] text-[var(--muted)]">
                  Skip the review screen entirely. Zero-Decision Mode removes only the
                  universally safe categories - caches, logs, temp files - nothing personal,
                  nothing irreplaceable. Everything still goes to Trash first.
                </p>
                <a href="#download" onClick={() => trackCTA("zero-decision")} className="mt-7 inline-flex items-center justify-center rounded-full bg-[var(--blue)] px-7 py-3.5 text-[17px] font-medium text-white no-underline transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.97] active:brightness-90">
                  Just Clean My Mac
                </a>
              </div>
            </div>
            <div className="order-2 lg:order-2 reveal d1">
              <img
                src={appImage2}
                srcSet={`${appImage2_464} 464w, ${appImage2_640} 640w, ${appImage2} 1376w`}
                sizes="(max-width: 1024px) 92vw, 50vw"
                width="1376" height="1464"
                alt="DiskCleaner zero-decision clean result"
                loading="lazy" decoding="async"
                className="split-img img-transparent-bg mx-auto w-full lg:w-4/5 max-w-none rounded-[18px] border border-[var(--border)] shadow-[0_24px_80px_var(--shadow-xl),0_8px_24px_var(--shadow-lg),0_2px_6px_var(--shadow)]"
              />
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
      <section className="py-20 sm:py-32" style={{ background: SURFACE }}>
        <div className="mx-auto w-full max-w-[1080px] px-6 md:px-12">
          <div className="mb-8 flex flex-col items-center text-center sm:mb-12">
            <h2 className="reveal reveal-headline d1 text-balance text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em]">
              <span className="text-[var(--text)]">More is hiding than you think.</span> <span className="text-[var(--blue)]">One scan finds it all.</span>
            </h2>
            <p className="reveal d2 mt-4 max-w-[600px] text-[17px] leading-[1.55] text-[var(--muted)]">
              Every category runs in parallel. You see exactly what's found — nothing is removed until you say so.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((c, i) => (
              <div key={i} className="reveal flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4" style={{ transitionDelay: `${i * 50}ms` }}>
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] text-[var(--blue)]">{c.icon}</div>
                <div>
                  <div className="text-[14px] font-semibold text-[var(--text)]">{c.name}</div>
                  <div className="mt-0.5 text-[13px] leading-[1.55] text-[var(--muted)]">{c.desc}</div>
                </div>
              </div>
            ))}
            {/* 8th card: "All safe" callout */}
            <div className="reveal d1 flex items-start gap-3 rounded-2xl border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] p-4">
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
        a: "No account and no subscription. $9.99 one-time covers you for up to 3 Macs and includes every future update.",
      },
    ]
    return (
      <section id="faq" className="py-20 sm:py-32" style={{ background: BG }}>
        <div className="mx-auto w-full max-w-[860px] px-6 md:px-12">
          <div className="mb-8 flex flex-col items-center text-center sm:mb-12">
            <h2 className="reveal reveal-headline d1 text-balance text-[clamp(30px,4vw,52px)] font-bold leading-[1.04] tracking-[-0.04em] text-[var(--text)]">
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
                    maxHeight: open === i ? "400px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.3s cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  <div className="px-5 pb-5 text-[14px] leading-[1.7] text-[var(--muted)]">
                    {item.a}
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
      <section id="download" className="relative overflow-hidden py-20 sm:py-32" style={{ background: BG }}>
        <div className="hero-glow h-[600px] w-[1000px] bg-[radial-gradient(ellipse,var(--blue-glow),transparent_65%)]" />
        <div className="relative mx-auto w-full max-w-[1080px] px-6 text-center md:px-12">
          <span className="reveal rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--blue)]">Get DiskCleaner</span>
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
          <div className="reveal d3 mt-8 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-6 py-3 sm:gap-3 sm:px-7">
            <span className="text-[26px] font-bold tracking-[-0.03em] text-[var(--text)] sm:text-[28px]">$9.99</span>
            <span className="text-sm text-[var(--muted)]">one-time · yours forever · up to 3 Macs</span>
          </div>
          <div className="reveal d4">
            <button
              type="button"
              onClick={onNotifyClick}
              onTouchEnd={onNotifyTouchEnd}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[var(--blue)] px-7 py-3.5 text-[17px] font-medium text-white no-underline transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.97] active:brightness-90"
            >
              Get Free Early Access · Launching April 2026
            </button>
          </div>
          <div className="reveal d5 mt-7 flex flex-wrap justify-center gap-x-3 gap-y-2 sm:gap-5">
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
  const Comp = ({ BG, openModal }: { BG: string; openModal: (k: "support" | "changelog") => void }) => {
    useEffect(() => { const raf = requestAnimationFrame(dispatchRevealRefresh); return () => cancelAnimationFrame(raf) }, [])
    return (
      <footer className="border-t border-[var(--border)] py-6" style={{ background: BG }}>
        <div className="mx-auto w-full max-w-[1080px] px-6 md:px-12">
          {/* Mobile: two rows. Desktop: single row */}
          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between md:gap-4">
            {/* Left: copyright */}
            <span className="order-1 text-xs font-normal text-[var(--muted2)]">Copyright © {new Date().getFullYear()} DiskCleaner. All rights reserved.</span>
            {/* Middle: social icons — own row on mobile, inline on desktop */}
            <div className="order-3 flex items-center gap-2 md:order-2">
              <a href="mailto:adminsupport@diskcleaner.pro" aria-label="Email" className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted2)] transition-colors hover:text-[var(--muted)]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
              </a>
              <a href="https://x.com/diskcleanerpro" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted2)] transition-colors hover:text-[var(--muted)]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.threads.net/@diskcleanerpro" target="_blank" rel="noopener noreferrer" aria-label="Threads" className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted2)] transition-colors hover:text-[var(--muted)]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.068v-.04c.024-7.67 4.76-11.895 10.69-11.995 2.934-.033 5.364.994 7.01 3.024 1.458 1.791 2.3 4.262 2.3 7.91v1h-9.45v-2h7.395c-.15-2.695-.898-4.733-2.21-6.076-1.162-1.19-2.784-1.79-4.819-1.79-4.248 0-8.108 2.891-8.108 9.94v.04c0 3.005.69 5.39 2.054 7.082 1.44 1.784 3.646 2.716 6.553 2.736 2.44.016 4.254-.58 5.59-1.82 1.248-1.16 2.012-2.9 2.27-5.17H12.82v-2h9.454v.93c0 2.958-.778 5.424-2.25 7.144C18.54 22.95 15.77 24 12.186 24z"/></svg>
              </a>
            </div>
            {/* Right: nav links */}
            <div className="order-2 flex items-center gap-5 md:order-3">
              <a href="/privacy-policy" className="bg-transparent p-0 text-[13px] text-[var(--muted2)] no-underline transition-colors hover:text-[var(--muted)]">Privacy</a>
              <a href="/terms-of-service" className="bg-transparent p-0 text-[13px] text-[var(--muted2)] no-underline transition-colors hover:text-[var(--muted)]">Terms</a>
              <button type="button" className="bg-transparent p-0 text-[13px] text-[var(--muted2)] transition-colors hover:text-[var(--muted)]" onClick={() => openModal("support")}>Support</button>
              <button type="button" className="bg-transparent p-0 text-[13px] text-[var(--muted2)] transition-colors hover:text-[var(--muted)]" onClick={() => openModal("changelog")}>Changelog</button>
            </div>
          </div>
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

  useRevealOnce()
  const waitlistFormAction = import.meta.env.VITE_WAITLIST_FORM_ACTION as string | undefined

  const STRIPE_WHITE = "var(--surface)"
  const STRIPE_GRAY = "var(--surface2)"

  return (
    <div data-theme={theme} className="page-enter">

      {/* NAV */}
      <nav className="site-top-nav fixed left-0 top-0 z-[200] w-full border-b border-[var(--border)] bg-[var(--nav-bg)] backdrop-blur-2xl backdrop-saturate-150">
        <div className="mx-auto flex h-[52px] w-full max-w-[1200px] items-center justify-between px-6 md:px-12">
          <a href="/" className="text-[17px] font-semibold tracking-[-0.02em] text-[var(--text)] no-underline">Disk<em className="not-italic text-[var(--blue)]">Cleaner</em></a>
          <ul className="hidden list-none items-center gap-7 md:flex">
            <li><a className="text-[13px] text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]" href="#features">Features</a></li>
            <li><a className="text-[13px] text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]" href="#uninstaller">Uninstaller</a></li>
            <li><a className="text-[13px] text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]" href="#compare">Compare</a></li>
            <li><a className="text-[13px] text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]" href="#community">Community</a></li>
            <li><a className="text-[13px] text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]" href="#faq">FAQ</a></li>
            <li><a className="text-[13px] text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]" href="#download">Pricing</a></li>
            <li><a className="text-[13px] text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]" href="/blog">Blog</a></li>
            <li><a className="text-[13px] text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]" href="/help">Help</a></li>
          </ul>
          <div className="flex items-center gap-2.5">
            <button
              className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface2)] text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--text)]"
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

      <div className="pb-16 pt-[52px] md:pb-0">
        <Hero BG="var(--bg)" />
        <StatsBand SURFACE={STRIPE_WHITE} />

        <Suspense fallback={null}>
          <InterfaceSplit BG={STRIPE_GRAY} />
          <WhatItFinds SURFACE={STRIPE_WHITE} />
          <Features SURFACE={STRIPE_GRAY} />
          <HowItWorks BG={STRIPE_WHITE} />
          <UninstallerSplit SURFACE={STRIPE_GRAY} />
          <MenuBarSplit BG={STRIPE_WHITE} />
          <ZeroDecisionSplit SURFACE={STRIPE_GRAY} />
          <FAQ BG={STRIPE_WHITE} />
          <CompareTable BG={STRIPE_GRAY} />
          <Requirements SURFACE={STRIPE_WHITE} />
          <CommunityWall SURFACE={STRIPE_GRAY} />
          <CTA BG={STRIPE_WHITE} openWaitlist={() => setModal("waitlist")} />
          <SiteFooter BG={STRIPE_GRAY} openModal={k => setModal(k)} />
        </Suspense>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-[210] border-t border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 md:hidden">
        <div className="mx-auto flex max-w-[520px] items-center justify-between gap-2 text-[13px] font-medium">
          <a href="#features" className="flex-1 text-center text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]">Features</a>
          <a href="#download" onClick={() => trackCTA("mobile-nav")} className="flex-1 rounded-full bg-[var(--blue)] py-3 text-center text-[13px] font-semibold text-white no-underline transition hover:brightness-110 active:scale-[0.97]">
            Get Early Access
          </a>
          <a href="/help" className="flex-1 text-center text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]">Help</a>
        </div>
      </nav>

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
  )
}
