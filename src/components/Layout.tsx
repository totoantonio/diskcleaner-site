import { useState } from "react"
import { Outlet } from "react-router-dom"
import { modalTitle, type ModalKey } from "./modalConfig"
import { Modal, SupportContent } from "./SiteModal"
import "../App.css"

const appDownloadUrl = "/downloads/DiskCleaner-macOS.dmg"

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

export default function Layout() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light"
    const saved = localStorage.getItem("dc-theme")
    if (saved === "light" || saved === "dark") return saved
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  })
  const [modal, setModal] = useState<ModalKey>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div data-theme={theme}>

      <nav className="site-top-nav fixed left-0 top-0 z-[200] w-full border-b border-[var(--border)] bg-[var(--nav-bg)] backdrop-blur-2xl backdrop-saturate-150">
        <div className="mx-auto flex h-[52px] w-full max-w-[1200px] items-center justify-between px-6 md:px-12">
          <a href="/" className="text-[17px] font-semibold tracking-[-0.02em] text-[var(--text)] no-underline">Disk<em className="not-italic text-[var(--blue)]">Cleaner</em></a>
          <ul className="hidden list-none items-center gap-7 md:flex">
            <li><a className="text-[13px] text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]" href="/#features">Features</a></li>
            <li><a className="text-[13px] text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]" href="/#download">Pricing</a></li>
            <li><a className="text-[13px] text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]" href="/blog">Blog</a></li>
            <li><a className="text-[13px] text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]" href="/about">About</a></li>
            <li><a className="text-[13px] text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]" href="/help">Help</a></li>
          </ul>
          <div className="flex items-center gap-2.5">
            <button
              className="flex h-[44px] w-[44px] items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface2)] text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--text)] md:hidden"
              onClick={() => setMobileMenuOpen(open => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-site-menu"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                {mobileMenuOpen ? (
                  <>
                    <path d="M6 6l12 12" />
                    <path d="M18 6 6 18" />
                  </>
                ) : (
                  <>
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </>
                )}
              </svg>
            </button>
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
            <a href={appDownloadUrl} download data-analytics-location="top-nav" className="hidden rounded-full bg-[var(--blue)] px-4 py-[7px] text-[13px] font-medium text-white no-underline transition hover:brightness-110 md:inline-block">Download</a>
          </div>
        </div>
        {mobileMenuOpen && (
          <div id="mobile-site-menu" className="border-t border-[var(--border)] bg-[var(--surface)] px-6 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {[
                { href: "/#features", label: "Features" },
                { href: "/#download", label: "Pricing" },
                { href: "/blog", label: "Blog" },
                { href: "/about", label: "About" },
                { href: "/help", label: "Help" },
              ].map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface2)] px-4 py-3 text-[15px] font-medium text-[var(--text)] no-underline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={appDownloadUrl}
                download
                data-analytics-location="mobile-nav"
                className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--blue)] px-5 py-3 text-[15px] font-medium text-white no-underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Download for macOS
              </a>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-[52px] page-enter">
        <Outlet />
      </main>

      <footer className="site-footer" style={{ marginTop: 0 }}>
        <div className="site-footer-cols">
          <div className="site-footer-brand">
            <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.3px", marginBottom: 12 }}>
              <span style={{ color: "var(--text)" }}>Disk</span><span style={{ color: "var(--blue)" }}>Cleaner</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
              The Mac cleaner built for people<br />who actually use their Mac.
            </p>
          </div>
          <div className="site-footer-col">
            <div className="site-footer-col-hd">Product</div>
            <a href="/#features" className="site-footer-link">Features</a>
            <a href="/#download" className="site-footer-link">Download</a>
            <a href="/changelog" className="site-footer-link">Changelog</a>
            <a href="/about" className="site-footer-link">About</a>
            <a href="/trust" className="site-footer-link">Trust Center</a>
          </div>
          <div className="site-footer-col">
            <div className="site-footer-col-hd">Support</div>
            <a href="/help" className="site-footer-link">Help</a>
            <button type="button" onClick={() => setModal("support")} className="site-footer-link">FAQ</button>
            <button type="button" onClick={() => setModal("support")} className="site-footer-link">Contact</button>
            <a href="/privacy-policy" className="site-footer-link">Privacy Policy</a>
            <a href="/terms-of-service" className="site-footer-link">Terms of Use</a>
            <a href="/editorial-policy" className="site-footer-link">Editorial Policy</a>
          </div>
          <div className="site-footer-col">
            <div className="site-footer-col-hd">Connect</div>
            <a href="https://x.com/diskcleanerpro" target="_blank" rel="noopener noreferrer" className="site-footer-link">Twitter / X</a>
            <a href="https://www.threads.net/@diskcleanerpro" target="_blank" rel="noopener noreferrer" className="site-footer-link">Threads</a>
            <a href="mailto:customersupport@diskcleaner.pro" className="site-footer-link">Email Us</a>
          </div>
        </div>
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>© {new Date().getFullYear()} 22 Software Publishing. All rights reserved.</span>
          <span style={{ fontSize: 12, color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: 5 }}>
            <span aria-hidden="true" style={{ fontSize: 13, lineHeight: 1 }}></span>
            Made for Mac.
          </span>
        </div>
      </footer>

      <Modal openKey={modal} onClose={() => setModal(null)} title={modalTitle(modal)}>
        {modal === "support" && <SupportContent />}
      </Modal>

    </div>
  )
}
