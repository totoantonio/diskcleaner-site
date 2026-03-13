import { useState } from "react"
import { Outlet } from "react-router-dom"
import { modalTitle, type ModalKey } from "./modalConfig"
import {
  Modal,
  SupportContent, ChangelogContent,
} from "./SiteModal"

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
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  )
  const [modal, setModal] = useState<ModalKey>(null)

  return (
    <div data-theme={theme}>

      <nav className="site-top-nav fixed left-0 top-0 z-[200] w-full border-b border-[var(--border)] bg-[var(--nav-bg)] backdrop-blur-2xl backdrop-saturate-150">
        <div className="mx-auto flex h-[52px] w-full max-w-[1200px] items-center justify-between px-6 md:px-12">
          <a href="/" className="text-[17px] font-semibold tracking-[-0.02em] text-[var(--text)] no-underline">Disk<em className="not-italic text-[var(--blue)]">Cleaner</em></a>
          <ul className="hidden list-none items-center gap-7 md:flex">
            <li><a className="text-[13px] text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]" href="/#features">Features</a></li>
            <li><a className="text-[13px] text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]" href="/#uninstaller">Uninstaller</a></li>
            <li><a className="text-[13px] text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]" href="/#compare">Compare</a></li>
            <li><a className="text-[13px] text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]" href="/#requirements">Requirements</a></li>
            <li><a className="text-[13px] text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]" href="/#download">Pricing</a></li>
            <li><a className="text-[13px] text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]" href="/blog">Blog</a></li>
            <li><a className="text-[13px] text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]" href="/help">Help</a></li>
          </ul>
          <div className="flex items-center gap-2.5">
            <button
              className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface2)] text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--text)]"
              onClick={() => setTheme(t => t === "light" ? "dark" : "light")}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </button>
            <a href="/#download" className="rounded-full bg-[var(--blue)] px-4 py-[7px] text-[13px] font-medium text-white no-underline transition hover:brightness-110">Download Free</a>
          </div>
        </div>
      </nav>

      <main className="pt-[52px] page-enter">
        <Outlet />
      </main>

      <footer className="border-t border-[var(--border)] bg-[var(--bg)] py-8">
        <div className="mx-auto w-full max-w-[1080px] px-6 md:px-12">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <span className="text-xs font-normal text-[var(--muted2)]">Copyright © {new Date().getFullYear()} DiskCleaner. All rights reserved. · diskcleaner.pro</span>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a href="/privacy-policy" className="bg-transparent p-0 text-[13px] text-[var(--muted2)] no-underline transition-colors hover:text-[var(--muted)]">Privacy</a>
              <a href="/terms-of-service" className="bg-transparent p-0 text-[13px] text-[var(--muted2)] no-underline transition-colors hover:text-[var(--muted)]">Terms</a>
              <button type="button" className="bg-transparent p-0 text-[13px] text-[var(--muted2)] transition-colors hover:text-[var(--muted)]" onClick={() => setModal("support")}>Support</button>
              <button type="button" className="bg-transparent p-0 text-[13px] text-[var(--muted2)] transition-colors hover:text-[var(--muted)]" onClick={() => setModal("changelog")}>Changelog</button>
            </div>
          </div>
        </div>
      </footer>

      <Modal openKey={modal} onClose={() => setModal(null)} title={modalTitle(modal)}>
        {modal === "support" && <SupportContent />}
        {modal === "changelog" && <ChangelogContent />}
      </Modal>

    </div>
  )
}
