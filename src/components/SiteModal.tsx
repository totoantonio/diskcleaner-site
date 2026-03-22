import { useEffect, useState, type FormEvent, type ReactNode } from "react"
import { createPortal } from "react-dom"
import type { ModalKey } from "./modalConfig"

export function Modal({
  openKey, onClose, title, children,
}: {
  openKey: ModalKey; onClose: () => void; title: string; children: ReactNode
}) {
  const isWaitlist = openKey === "waitlist"
  const currentTheme =
    typeof document === "undefined"
      ? "light"
      : document.querySelector("[data-theme]")?.getAttribute("data-theme") ?? "light"
  useEffect(() => {
    if (!openKey) return
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", onKeyDown)
    const scrollY = window.scrollY
    const prev = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    }
    // Use fixed body lock so closing the modal restores the exact page position.
    document.body.style.overflow = "hidden"
    document.body.style.position = "fixed"
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = "100%"
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = prev.overflow
      document.body.style.position = prev.position
      document.body.style.top = prev.top
      document.body.style.width = prev.width
      const prevScrollBehavior = document.documentElement.style.scrollBehavior
      document.documentElement.style.scrollBehavior = "auto"
      window.scrollTo(0, scrollY)
      document.documentElement.style.scrollBehavior = prevScrollBehavior
    }
  }, [openKey, onClose])
  if (!openKey) return null
  return createPortal(
    <div
      className="fixed inset-0 isolate flex items-center justify-center bg-black/78 p-4 backdrop-blur-sm sm:p-5"
      style={{ zIndex: 2147483646, pointerEvents: "auto" }}
      data-theme={currentTheme}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className={`relative w-full overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--surface)] shadow-[0_28px_90px_rgba(0,0,0,0.45),0_8px_24px_rgba(0,0,0,0.35)] ${isWaitlist ? "max-h-[90vh] max-w-[560px] min-h-[620px]" : "max-h-[88vh] max-w-[760px]"}`}
        style={{ zIndex: 2147483647, pointerEvents: "auto", opacity: 1 }}
        onClick={e => e.stopPropagation()}
      >
        <div className={`flex items-center justify-between border-b border-[var(--border)] ${isWaitlist ? "px-6 py-5 sm:px-7 sm:py-6" : "px-5 py-4 sm:px-6"}`}>
          <div className={`${isWaitlist ? "text-[19px] font-semibold tracking-[-0.02em]" : "text-base font-semibold tracking-[-0.01em]"} text-[var(--text)]`}>{title}</div>
          <button className="h-8 w-8 rounded-full border border-[var(--border)] text-[var(--muted)] transition-colors hover:bg-[var(--surface2)] hover:text-[var(--text)]" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className={`${isWaitlist ? "h-[calc(90vh-88px)] px-6 py-6 text-[16px] leading-7 sm:px-7 sm:py-7" : "max-h-[calc(88vh-64px)] px-5 py-5 text-[15px] leading-7 sm:px-6"} overflow-y-auto text-[var(--muted)]`}>{children}</div>
      </div>
    </div>,
    document.body
  )
}

export function PrivacyContent() {
  return (
    <div className="space-y-4 [&>h3]:mt-6 [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-[var(--text)]">
      <p className="text-sm font-medium text-[var(--blue)]">Effective date: March 8, 2026</p>
      <p>
        This Privacy Policy explains how DiskCleaner (&quot;DiskCleaner,&quot; &quot;we,&quot; &quot;our,&quot; or
        &quot;us&quot;) collects, uses, stores, and discloses information when you visit the DiskCleaner website,
        download, install, or use the DiskCleaner macOS application, or contact support.
      </p>
      <p>
        DiskCleaner is designed as a local-first utility. File scanning and cleanup actions are processed on your
        device. We do not intentionally collect file contents from your Mac through normal use of the application.
      </p>
      <h3>Information We Collect</h3>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          Website analytics data, such as page views, approximate location by IP region, browser type, and device
          type, collected through Google Analytics.
        </li>
        <li>
          Support communications you send us, including your email address and any information you choose to include
          in your message.
        </li>
        <li>No account registration data, because we currently do not provide user account creation on the site.</li>
      </ul>
      <h3>How the App Processes Data</h3>
      <ul className="list-disc space-y-2 pl-5">
        <li>DiskCleaner scans locally on your Mac to identify files and storage categories.</li>
        <li>The app may process file metadata, such as file names, paths, sizes, and timestamps.</li>
        <li>DiskCleaner does not require file content uploads for normal cleanup features.</li>
        <li>Cleanup actions are designed to move selected items to macOS Trash for recoverability.</li>
      </ul>
      <h3>How We Use Information</h3>
      <ul className="list-disc space-y-2 pl-5">
        <li>To operate, maintain, and improve the website and application.</li>
        <li>To respond to support requests and communicate about product updates or security notices.</li>
        <li>To monitor usage trends, detect abuse, and improve product performance and reliability.</li>
        <li>To comply with legal obligations and enforce our Terms of Service.</li>
      </ul>
      <h3>Legal Bases for Processing</h3>
      <ul className="list-disc space-y-2 pl-5">
        <li>Legitimate interests, including product security, analytics, and service improvement.</li>
        <li>Performance of a contract, where processing is necessary to provide requested services.</li>
        <li>Compliance with legal obligations, where required by applicable law.</li>
        <li>Consent, where required for specific data processing activities.</li>
      </ul>
      <h3>Cookies and Analytics</h3>
      <p>
        We use cookies and similar technologies for analytics and core site functionality. You can control cookies
        through your browser settings. Disabling certain cookies may affect site behavior.
      </p>
      <h3>Data Sharing and Disclosure</h3>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          We do not sell your personal information. We do not share personal information for third-party behavioral
          advertising.
        </li>
        <li>
          We may share data with service providers who process information on our behalf, such as analytics or email
          support tools, subject to contractual safeguards.
        </li>
        <li>
          We may disclose information where required by law, court order, or legal process, or to protect rights,
          safety, and property.
        </li>
      </ul>
      <h3>Data Retention</h3>
      <p>
        We keep personal information only as long as reasonably necessary for the purposes described in this Privacy
        Policy, including legal, accounting, tax, security, and enforcement requirements.
      </p>
      <h3>Security</h3>
      <p>
        We use reasonable technical and organizational safeguards designed to protect information. No method of
        transmission or storage is fully secure, and we cannot guarantee absolute security.
      </p>
      <h3>International Data Transfers</h3>
      <p>
        Your information may be processed in countries other than your own. Where required, we use appropriate
        safeguards to protect personal information transferred internationally.
      </p>
      <h3>Your Privacy Rights</h3>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict processing of
          your personal information.
        </li>
        <li>You may also have rights to data portability and to object to certain processing activities.</li>
        <li>You may submit requests by contacting customersupport@diskcleaner.pro.</li>
      </ul>
      <h3>Children&apos;s Privacy</h3>
      <p>
        DiskCleaner is not directed to children under 13, and we do not knowingly collect personal information from
        children under 13.
      </p>
      <h3>Changes to This Privacy Policy</h3>
      <p>
        We may update this Privacy Policy from time to time. Material changes become effective on the posted Effective
        Date unless a later date is stated.
      </p>
      <h3>Contact</h3>
      <p>For privacy questions or requests, contact customersupport@diskcleaner.pro.</p>
    </div>
  )
}

export function TosContent() {
  return (
    <div className="space-y-4 [&>h3]:mt-6 [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-[var(--text)]">
      <p className="text-sm font-medium text-[var(--blue)]">Effective date: March 8, 2026</p>
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your access to and use of the DiskCleaner website,
        software, and related services (collectively, the &quot;Services&quot;). By accessing or using the Services,
        you agree to be bound by these Terms.
      </p>
      <h3>Eligibility and Acceptance</h3>
      <ul className="list-disc space-y-2 pl-5">
        <li>You must be legally capable of entering into a binding agreement to use the Services.</li>
        <li>If you use the Services on behalf of an organization, you represent that you can bind that organization.</li>
        <li>If you do not agree to these Terms, do not access or use the Services.</li>
      </ul>
      <h3>License Grant and Restrictions</h3>
      <ul className="list-disc space-y-2 pl-5">
        <li>Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license.</li>
        <li>The license allows personal or internal business use as permitted by your purchased plan.</li>
        <li>You may not resell, sublicense, redistribute, reverse engineer, or create derivative works of the app.</li>
        <li>You may not remove proprietary notices or use the Services in violation of applicable laws.</li>
      </ul>
      <h3>Purchases, Billing, and Refunds</h3>
      <ul className="list-disc space-y-2 pl-5">
        <li>Prices, plans, and feature availability may change at any time.</li>
        <li>Taxes may apply depending on your jurisdiction.</li>
        <li>Unless required by law, fees are non-refundable once a license key is delivered.</li>
      </ul>
      <h3>Safe Use and User Responsibilities</h3>
      <ul className="list-disc space-y-2 pl-5">
        <li>DiskCleaner is designed to move removed files to macOS Trash to support recovery workflows.</li>
        <li>You are solely responsible for reviewing selected items and maintaining your own data backups.</li>
        <li>You are responsible for all activity performed through your device and your copy of the software.</li>
      </ul>
      <h3>Intellectual Property</h3>
      <p>
        The Services, including software, branding, and content, are owned by DiskCleaner or its licensors and are
        protected by intellectual property laws. No rights are granted except as expressly stated in these Terms.
      </p>
      <h3>Disclaimers</h3>
      <p>
        The Services are provided on an &quot;as is&quot; and &quot;as available&quot; basis, to the fullest extent
        permitted by law, without warranties of any kind, express or implied, including merchantability, fitness for a
        particular purpose, and non-infringement.
      </p>
      <h3>Limitation of Liability</h3>
      <p>
        To the maximum extent permitted by law, DiskCleaner and its affiliates will not be liable for any indirect,
        incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, goodwill, or
        business interruption arising from or related to the Services. Our aggregate liability for all claims relating
        to the Services will not exceed the amount you paid to us for the Services in the twelve (12) months preceding
        the event giving rise to liability.
      </p>
      <h3>Indemnification</h3>
      <p>
        You agree to defend, indemnify, and hold harmless DiskCleaner and its officers, directors, employees, and
        agents from and against claims, damages, liabilities, and expenses arising out of your use of the Services or
        violation of these Terms.
      </p>
      <h3>Termination</h3>
      <ul className="list-disc space-y-2 pl-5">
        <li>We may suspend or terminate access to the Services if these Terms are violated.</li>
        <li>Upon termination, license rights granted under these Terms will end immediately.</li>
      </ul>
      <h3>Governing Law and Disputes</h3>
      <ul className="list-disc space-y-2 pl-5">
        <li>These Terms are governed by applicable laws of the jurisdiction where DiskCleaner operates.</li>
        <li>
          You agree to attempt informal resolution first by contacting customersupport@diskcleaner.pro before filing a formal
          legal claim.
        </li>
        <li>Where enforceable, disputes will be resolved in the courts with proper jurisdiction over DiskCleaner.</li>
      </ul>
      <h3>Changes to These Terms</h3>
      <p>
        We may update these Terms from time to time. Material changes are effective on the posted Effective Date
        unless otherwise specified. Continued use of the Services after changes become effective constitutes acceptance
        of the revised Terms.
      </p>
      <h3>Contact</h3>
      <p>Questions about these Terms can be sent to customersupport@diskcleaner.pro.</p>
    </div>
  )
}

export function SupportContent() {
  return (
    <div className="space-y-4 [&>h3]:mt-6 [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-[var(--text)]">
      <p>Need help? Include the details below so the issue can be reproduced quickly.</p>
      <h3>Include</h3>
      <ul className="list-disc space-y-2 pl-5">
        <li>macOS version (example: 15 Sequoia, 26 Tahoe)</li>
        <li>Chip type (Apple Silicon or Intel)</li>
        <li>What you clicked and what happened</li>
        <li>Screenshot of the result screen (if possible)</li>
      </ul>
      <h3>Support email</h3>
      <p className="font-semibold text-[var(--text)]">customersupport@diskcleaner.pro</p>
    </div>
  )
}

export function ChangelogContent() {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface2)] px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--muted2)]">Release Notes</p>
        <p className="mt-1 text-sm text-[var(--muted)]">Shipped changes from the DiskCleaner Team.</p>
      </div>

      {[
        {
          version: "2026.01.12",
          date: "January 12, 2026",
          title: "v1.0 (Planned)",
          groups: [
            {
              label: "◎ Foundation",
              items: [
                "Quick Scan and Deep Scan.",
                "Core cleanup categories plus Downloads, iOS backups, Mail attachments, and external drive review.",
                "Per-file review with checkboxes.",
                "Risk labels and review-required categories.",
                "Trash-only cleaning (recoverable).",
                "Menu bar utilities, update badge, and clean history.",
                "App Uninstaller with leftovers scan.",
              ],
            },
          ],
        },
        {
          version: "2026.02.28",
          date: "February 28, 2026",
          title: "Uninstaller UX Overhaul",
          groups: [
            {
              label: "• Improved",
              items: [
                "App Uninstaller layout for cleaner spacing, alignment, and typography consistency.",
                "Drag-and-drop uninstall flow with clearer instructional hierarchy.",
                "Bottom action placement to match primary screen patterns.",
              ],
            },
            {
              label: "+ Added",
              items: [
                "Installed-app gallery option to pick apps directly without drag-and-drop.",
              ],
            },
          ],
        },
        {
          version: "2026.03.14",
          date: "March 14, 2026",
          title: "Overview + Scan Results Polish",
          groups: [
            {
              label: "• Improved",
              items: [
                "Scan results column layout with better row spacing, badge handling, and size alignment.",
                "Notes and legend presentation for safety indicators and review guidance.",
                "Gauge and summary area visual polish while preserving fast scan performance.",
                "Section text styles and title casing across major Overview states.",
              ],
            },
          ],
        },
        {
          version: "2026.03.18",
          date: "March 18, 2026",
          title: "RAM Optimizer + Mail Attachments Expansion",
          groups: [
            {
              label: "+ Added",
              items: [
                "Full RAM Optimizer route and UI with live metrics for Memory Pressure, Compressed Memory, Swap Used, and Page In/Out (Min).",
                "Safe Optimize action with immediate telemetry refresh.",
              ],
            },
            {
              label: "~ Expanded",
              items: [
                "Mail Attachments coverage to include supported Outlook, Spark, and Canary attachment locations.",
              ],
            },
            {
              label: "• Improved",
              items: [
                "System-wide typography token migration for cleaner, more consistent readability.",
              ],
            },
          ],
        },
      ].map(entry => (
        <section key={entry.version} className="rounded-[22px] border border-[var(--border)] bg-[var(--surface)] px-4 py-4 sm:px-5 sm:py-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] text-[var(--blue)]">
              {entry.version}
            </span>
            <span className="text-[12px] text-[var(--muted2)]">{entry.date}</span>
          </div>
          <h3 className="mt-3 text-[17px] font-semibold tracking-[-0.02em] text-[var(--text)]">{entry.title}</h3>
          <div className="mt-4 space-y-4">
            {entry.groups.map(group => (
              <div key={group.label}>
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--muted2)]">{group.label}</p>
                <ul className="mt-2 space-y-2 pl-0 list-none">
                  {group.items.map(item => (
                    <li key={item} className="flex gap-2.5 text-[15px] leading-7 text-[var(--muted)]">
                      <span className="pt-[10px] text-[10px] leading-none text-[var(--blue)]">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export function WaitlistContent({ formAction }: { formAction?: string }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setStatus("error")
      setMessage("Please enter a valid email address.")
      return
    }
    if (!formAction) {
      setStatus("error")
      setMessage("Waitlist is not configured yet. Add VITE_WAITLIST_FORM_ACTION.")
      return
    }

    setStatus("submitting")
    setMessage("")

    try {
      if (/list-manage\.com/i.test(formAction)) {
        const body = new URLSearchParams()
        body.set("EMAIL", email.trim())
        if (name.trim()) body.set("FNAME", name.trim())
        await fetch(formAction, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString(),
        })
      } else {
        const res = await fetch(formAction, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name.trim(), email: email.trim() }),
        })
        if (!res.ok) throw new Error("waitlist failed")
      }

      setStatus("success")
      setMessage("You’re on the list. We’ll email you before launch.")
      setName("")
      setEmail("")
    } catch {
      setStatus("error")
      setMessage("Couldn’t submit right now. Please try again.")
    }
  }

  return (
    <div className="flex h-full min-h-[460px] flex-col">
      <div className="relative overflow-hidden rounded-[28px] border border-[var(--border)] bg-[linear-gradient(180deg,var(--surface),var(--surface2))] px-5 py-5 sm:px-6 sm:py-6">
        <div
          className="pointer-events-none absolute inset-x-[-8%] top-[-26%] h-[220px] rounded-full opacity-80 blur-3xl"
          style={{
            background: "radial-gradient(circle at center, rgba(0,113,227,0.18), rgba(0,113,227,0) 68%)",
          }}
        />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--blue)]">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[var(--blue)]" />
            Launch Updates
          </div>
          <h2 className="mt-4 text-[clamp(28px,4vw,36px)] font-semibold leading-[1.05] tracking-[-0.05em] text-[var(--text)]">
            Get first access when DiskCleaner ships.
          </h2>
          <p className="mt-3 max-w-[440px] text-[15px] leading-[1.45] text-[var(--muted)] sm:text-[16px]">
            Join the list for launch access, major product updates, and pricing changes. No spam, no weekly marketing drip, and no account required.
          </p>

          <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
            {[
              ["Quick Scan + Deep Scan", "See the launch flow as it ships."],
              ["Trash-first cleanup", "Review-first and recoverable by design."],
              ["One-time pricing", "Know when direct purchase opens."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.52)] px-4 py-3 backdrop-blur-sm dark:bg-[rgba(255,255,255,0.03)]">
                <p className="text-[13px] font-semibold tracking-[-0.02em] text-[var(--text)]">{title}</p>
                <p className="mt-1 text-[12px] leading-5 text-[var(--muted)]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <form className="mt-5 space-y-4" onSubmit={onSubmit}>
        <div className="grid gap-3">
          <label className="space-y-1.5">
            <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--muted2)]">Name</span>
            <input
              className="h-[52px] w-full rounded-[20px] border border-[var(--border)] bg-[var(--surface2)] px-4 text-[15px] text-[var(--text)] outline-none transition-[border-color,box-shadow] placeholder:text-[var(--muted2)] focus:border-[var(--blue-tint-border)] focus:shadow-[0_0_0_4px_rgba(0,113,227,0.10)]"
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={e => setName(e.target.value)}
              autoComplete="name"
            />
          </label>
          <label className="space-y-1.5">
            <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--muted2)]">Email</span>
            <input
              className="h-[52px] w-full rounded-[20px] border border-[var(--border)] bg-[var(--surface2)] px-4 text-[15px] text-[var(--text)] outline-none transition-[border-color,box-shadow] placeholder:text-[var(--muted2)] focus:border-[var(--blue-tint-border)] focus:shadow-[0_0_0_4px_rgba(0,113,227,0.10)]"
              type="email"
              placeholder="you@domain.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </label>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--blue)] px-7 text-[15px] font-semibold tracking-[-0.01em] text-white shadow-[0_14px_30px_rgba(0,113,227,0.24)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Joining..." : "Join Waitlist"}
          </button>
          <p className="text-[12px] leading-5 text-[var(--muted)]">
            Early updates only. Unsubscribe any time.
          </p>
        </div>
      </form>

      {message && (
        <div
          className={`mt-4 rounded-2xl border px-4 py-3 text-[14px] leading-6 ${
            status === "success"
              ? "border-[var(--blue-tint-border)] bg-[var(--blue-tint)] text-[var(--blue)]"
              : "border-[rgba(255,59,48,0.18)] bg-[rgba(255,59,48,0.08)] text-[#ff3b30]"
          }`}
        >
          {message}
        </div>
      )}

      <div className="mt-auto pt-5">
        <div className="flex items-start gap-2.5 rounded-2xl border border-[var(--border)] bg-[var(--surface2)] px-4 py-3">
          <svg
            className="mt-0.5 h-4 w-4 shrink-0 text-[var(--muted)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 1 1 8 0v3" />
          </svg>
          <p className="text-[12px] leading-[1.4] text-[var(--muted)]">
            We only use your email for DiskCleaner launch and product updates. Review our Privacy Policy for details.
          </p>
        </div>
      </div>
    </div>
  )
}
