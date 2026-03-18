import { useEffect } from "react"

const getTableSvg = (dark: boolean) => {
  const bg       = dark ? "#1c1c1e" : "#FFFFFF"
  const headerBg = dark ? "#2c2c2e" : "#F5F5F7"
  const hlCol    = dark ? "rgba(0,113,227,0.14)" : "#EAF2FF"
  const divider  = dark ? "rgba(255,255,255,0.12)" : "#D8DADF"
  const rowLine  = dark ? "rgba(255,255,255,0.07)" : "#E5E7EB"
  const textPri  = dark ? "#f5f5f7" : "#1D1D1F"
  const textMut  = dark ? "#8e8e93" : "#6E6E73"
  const checkFill   = dark ? "#1c1c1e" : "#FFFFFF"
  const checkStroke = dark ? "rgba(0,113,227,0.4)" : "#B9D4FF"
  const crossFill   = dark ? "#1c1c1e" : "#FFFFFF"
  const crossStroke = dark ? "rgba(255,255,255,0.14)" : "#DFDFE4"
  const crossPath   = dark ? "#636366" : "#76767B"

  const check = (cx: number, cy: number) =>
    `<circle cx="${cx}" cy="${cy}" r="10" fill="${checkFill}" stroke="${checkStroke}"/><path d="M${cx-4} ${cy}l3 3 6-7" stroke="#0071E3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`
  const cross = (cx: number, cy: number) =>
    `<circle cx="${cx}" cy="${cy}" r="10" fill="${crossFill}" stroke="${crossStroke}"/><path d="M${cx-4} ${cy-4}l8 8M${cx+4} ${cy-4}l-8 8" stroke="${crossPath}" stroke-width="1.5" stroke-linecap="round" fill="none"/>`

  return `<svg width="920" height="590" viewBox="0 0 920 590" xmlns="http://www.w3.org/2000/svg" font-family="'Plus Jakarta Sans Variable', 'Plus Jakarta Sans', sans-serif">
  <defs>
    <clipPath id="dc-table-clip">
      <rect x="0.5" y="0.5" width="919" height="589" rx="28"/>
    </clipPath>
  </defs>
  <rect x="0.5" y="0.5" width="919" height="589" rx="28" fill="${bg}" stroke="${rowLine}"/>
  <g clip-path="url(#dc-table-clip)">
    <rect x="1" y="1" width="918" height="58" fill="${headerBg}"/>
    <line x1="1" y1="58.5" x2="919" y2="58.5" stroke="${divider}"/>
    <circle cx="28" cy="29" r="6" fill="#FF5F57"/>
    <circle cx="48" cy="29" r="6" fill="#FEBC2E"/>
    <circle cx="68" cy="29" r="6" fill="#28C840"/>
    <text x="94" y="34" font-size="13" font-weight="400" fill="${textMut}">DiskCleaner</text>

    <rect x="1" y="59" width="918" height="531" fill="${bg}"/>
    <rect x="316" y="59" width="168" height="531" fill="${hlCol}"/>

    <line x1="316" y1="59" x2="316" y2="590" stroke="${rowLine}"/>
    <line x1="484" y1="59" x2="484" y2="590" stroke="${rowLine}"/>
    <line x1="695" y1="59" x2="695" y2="590" stroke="${rowLine}"/>

    <line x1="1" y1="106.5" x2="919" y2="106.5" stroke="${divider}"/>
    <line x1="1" y1="146.5" x2="919" y2="146.5" stroke="${rowLine}"/>
    <line x1="1" y1="186.5" x2="919" y2="186.5" stroke="${rowLine}"/>
    <line x1="1" y1="226.5" x2="919" y2="226.5" stroke="${rowLine}"/>
    <line x1="1" y1="266.5" x2="919" y2="266.5" stroke="${rowLine}"/>
    <line x1="1" y1="306.5" x2="919" y2="306.5" stroke="${rowLine}"/>
    <line x1="1" y1="346.5" x2="919" y2="346.5" stroke="${rowLine}"/>
    <line x1="1" y1="386.5" x2="919" y2="386.5" stroke="${rowLine}"/>
    <line x1="1" y1="426.5" x2="919" y2="426.5" stroke="${rowLine}"/>
    <line x1="1" y1="466.5" x2="919" y2="466.5" stroke="${rowLine}"/>
    <line x1="1" y1="506.5" x2="919" y2="506.5" stroke="${rowLine}"/>
    <line x1="1" y1="546.5" x2="919" y2="546.5" stroke="${rowLine}"/>

    <text x="24" y="89" font-size="16" font-weight="700" fill="${textPri}">Feature</text>
    <text x="400" y="89" text-anchor="middle" font-size="16" font-weight="700" fill="#0071E3">DiskCleaner</text>
    <text x="589.5" y="89" text-anchor="middle" font-size="16" font-weight="700" fill="${textPri}">Subscription Cleaner</text>
    <text x="807" y="89" text-anchor="middle" font-size="16" font-weight="700" fill="${textPri}">Free Cleaner</text>

    <text x="24" y="132" font-size="14.5" fill="${textPri}">Full file preview before cleaning</text>
    <text x="24" y="172" font-size="14.5" fill="${textPri}">Per-file checkboxes - keep what you want</text>
    <text x="24" y="212" font-size="14.5" fill="${textPri}">Files go to Trash - never permanent</text>
    <text x="24" y="252" font-size="14.5" fill="${textPri}">App Uninstaller with leftover scan</text>
    <text x="24" y="292" font-size="14.5" fill="${textPri}">One-time purchase - no subscription</text>
    <text x="24" y="332" font-size="14.5" fill="${textPri}">Native SwiftUI - no Electron</text>
    <text x="24" y="372" font-size="14.5" fill="${textPri}">Menu bar live disk monitor</text>
    <text x="24" y="412" font-size="14.5" fill="${textPri}">9 browsers - all profiles</text>
    <text x="24" y="452" font-size="14.5" fill="${textPri}">Developer data cleaning (Xcode, npm)</text>
    <text x="24" y="492" font-size="14.5" fill="${textPri}">No account required - ever</text>
    <text x="24" y="532" font-size="14.5" fill="${textPri}">Zero analytics or tracking</text>
    <text x="24" y="572" font-size="14.5" font-weight="700" fill="${textPri}">Price</text>

    <g fill="none">
      ${check(400,127)} ${check(400,167)} ${check(400,207)} ${check(400,247)}
      ${check(400,287)} ${check(400,327)} ${check(400,367)} ${check(400,407)}
      ${check(400,447)} ${check(400,487)} ${check(400,527)}

      ${cross(589,127)} ${cross(589,167)} ${cross(589,207)} ${check(589,247)}
      ${cross(589,287)} ${cross(589,327)} ${check(589,367)} ${cross(589,407)}
      ${check(589,447)} ${cross(589,487)} ${cross(589,527)}

      ${cross(807,127)} ${cross(807,167)} ${cross(807,207)} ${check(807,247)}
      ${check(807,287)} ${check(807,327)} ${cross(807,367)} ${cross(807,407)}
      ${cross(807,447)} ${check(807,487)} ${check(807,527)}
    </g>
  </g>

  <text x="400" y="572" text-anchor="middle" font-size="17" font-weight="700" fill="#0071E3">$9.99</text>
  <text x="589.5" y="572" text-anchor="middle" font-size="17" font-weight="600" fill="${textMut}">$35/yr</text>
  <text x="807" y="572" text-anchor="middle" font-size="17" font-weight="600" fill="${textMut}">Free</text>
</svg>`
}

const ROWS = [
  { f: "Full file preview",          dc: true,  sub: false, free: false },
  { f: "Per-file checkboxes",        dc: true,  sub: false, free: false },
  { f: "Files to Trash only",        dc: true,  sub: false, free: false },
  { f: "App Uninstaller",            dc: true,  sub: true,  free: true  },
  { f: "One-time purchase",          dc: true,  sub: false, free: true  },
  { f: "Native SwiftUI",             dc: true,  sub: false, free: true  },
  { f: "Menu bar monitor",           dc: true,  sub: true,  free: false },
  { f: "9 browsers & profiles",      dc: true,  sub: false, free: false },
  { f: "Developer data (Xcode/npm)", dc: true,  sub: true,  free: false },
  { f: "No account — ever",          dc: true,  sub: false, free: true  },
  { f: "Zero analytics",             dc: true,  sub: false, free: true  },
]

const Check = ({ blue }: { blue?: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="9" fill={blue ? "var(--blue-tint)" : "var(--surface2)"} stroke={blue ? "var(--blue-tint-border)" : "var(--border)"}/>
    <path d="M6.5 10l2.5 2.5 4.5-5" stroke="#0071E3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const Cross = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="9" fill="var(--surface2)" stroke="var(--border)"/>
    <path d="M7 7l6 6M13 7l-6 6" stroke="var(--muted2)" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
)

export default function CompareTable({ BG, theme }: { BG: string; theme?: string }) {
  const dark = theme === "dark"

  useEffect(() => {
    window.dispatchEvent(new Event("dc:reveal-refresh"))
  }, [])

  return (
    <section id="compare" className="py-12 sm:py-20" style={{ background: BG }}>
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <div className="mb-8 flex flex-col items-center text-center sm:mb-10">
          <h2 className="reveal reveal-headline d1 text-[clamp(34px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.04em] text-[var(--text)]">
            Why DiskCleaner <span>is different.</span>
          </h2>
          <p className="reveal d2 mt-4 max-w-[480px] text-[17px] leading-7 text-[var(--muted)]">
            Other apps clean in the dark.<br />
            DiskCleaner puts you in the light — every file, every time.
          </p>
        </div>

        {/* Desktop: SVG table */}
        <div className="reveal hidden md:flex mb-12 justify-center">
          <div
            style={{ width: "fit-content", maxWidth: "100%", lineHeight: 0, borderRadius: 28, boxShadow: "0 32px 72px rgba(0,0,0,0.14)", overflow: "hidden", display: "inline-block" }}
            dangerouslySetInnerHTML={{ __html: getTableSvg(dark) }}
          />
        </div>

        {/* Mobile: HTML table */}
        <div className="reveal md:hidden mb-10 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_8px_32px_rgba(0,0,0,0.10)]">
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--surface2)] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
            <span className="h-3 w-3 rounded-full bg-[#28C840]" />
            <span className="ml-2 text-[12px] text-[var(--muted)]">DiskCleaner</span>
          </div>

          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="py-3 pl-4 pr-2 text-[12px] font-semibold text-[var(--text)] w-[44%]">Feature</th>
                <th className="py-3 px-2 text-center text-[12px] font-bold text-[var(--blue)] w-[19%] bg-[var(--blue-tint)]">Disk<br/>Cleaner</th>
                <th className="py-3 px-2 text-center text-[11px] font-semibold text-[var(--text)] w-[19%] leading-tight">Sub.<br/>Cleaner</th>
                <th className="py-3 px-2 text-center text-[11px] font-semibold text-[var(--text)] w-[18%] leading-tight">Free<br/>Cleaner</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr key={i} className="border-b border-[var(--border)]">
                  <td className="py-3 pl-4 pr-2 text-[12px] leading-[1.35] text-[var(--text)]">{row.f}</td>
                  <td className="py-3 px-2 text-center bg-[var(--blue-tint)]">
                    <div className="flex justify-center"><Check blue /></div>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <div className="flex justify-center">{row.sub ? <Check /> : <Cross />}</div>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <div className="flex justify-center">{row.free ? <Check /> : <Cross />}</div>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="py-3 pl-4 pr-2 text-[12px] font-bold text-[var(--text)]">Price</td>
                <td className="py-3 px-2 text-center bg-[var(--blue-tint)] text-[13px] font-bold text-[var(--blue)]">$9.99</td>
                <td className="py-3 px-2 text-center text-[11px] font-medium text-[var(--muted)]">$35/yr</td>
                <td className="py-3 px-2 text-center text-[11px] font-medium text-[var(--muted)]">Free</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "clamp(16px,2.5vw,21px)", fontWeight: 400, lineHeight: 1.55, letterSpacing: ".011em", color: "var(--muted)", margin: 0 }}>
            DiskCleaner takes the opposite approach — show everything, delete nothing without your approval. Every file, every category, reviewed by you before anything moves. Most cleaners are black boxes. <span style={{ color: "var(--text)" }}>Not this one.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
