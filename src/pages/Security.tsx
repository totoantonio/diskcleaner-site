import { useEffect } from "react"
import { Link } from "react-router-dom"
import { applyPageMetadata, restoreDefaultMetadata, setJsonLd } from "../lib/seo"

const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function Security() {
  useEffect(() => {
    const url = "https://www.diskcleaner.pro/security"
    const description = "DiskCleaner security posture, local-first cleanup model, permissions, data handling, and vulnerability reporting channel."

    applyPageMetadata({
      title: "DiskCleaner Security",
      description,
      url,
    })

    setJsonLd("article-jsonld", {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "name": "DiskCleaner Security",
          "url": url,
          "description": description,
          "dateModified": "2026-06-02"
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.diskcleaner.pro/" },
            { "@type": "ListItem", "position": 2, "name": "Trust Center", "item": "https://www.diskcleaner.pro/trust" },
            { "@type": "ListItem", "position": 3, "name": "Security", "item": url }
          ]
        }
      ]
    })

    return () => restoreDefaultMetadata()
  }, [])

  return (
    <section className="bg-[var(--bg)] py-12 sm:py-20">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-12">
        <Link to="/trust" className="article-back">
          <ChevronLeft />
          Back to Trust Center
        </Link>

        <div className="mx-auto mt-8 flex max-w-[860px] flex-col items-center gap-3 text-center">
          <span className="rounded-full border border-[var(--blue-tint-border)] bg-[var(--blue-tint)] px-3 py-1 text-xs font-semibold tracking-[0.01em] text-[var(--blue)]">
            Security
          </span>
          <h1 className="article-title text-balance">DiskCleaner security posture and disclosure path.</h1>
          <p className="article-excerpt">
            A technical summary of DiskCleaner&apos;s local-first cleanup model, permissions, data handling, and vulnerability reporting channel.
          </p>
        </div>

        <article className="mx-auto mt-10 max-w-[860px] rounded-3xl bg-[var(--surface)] px-5 py-6 sm:px-12 sm:py-12">
          <div className="blog-content">
            <p>
              This document describes the public security posture and disclosure path for DiskCleaner. It is not a third-party audit report.
              If DiskCleaner completes an independent audit in the future, that history should be added here with dates and scope.
            </p>

            <h2>Scope</h2>
            <p>
              This repository contains the DiskCleaner website and public product documentation.
            </p>
            <p>
              The DiskCleaner product is a macOS cleanup utility positioned around:
            </p>
            <ul>
              <li>local-first scanning</li>
              <li>review-before-cleanup</li>
              <li>Trash-first removal rather than permanent deletion</li>
              <li>no account requirement for normal use</li>
            </ul>

            <h2>Security Model</h2>
            <p>
              DiskCleaner is designed to reduce the trust burden usually associated with Mac cleaner software.
            </p>
            <p>
              The intended security model is:
            </p>
            <ul>
              <li>file discovery and cleanup decisions happen on-device</li>
              <li>users can review what was found before cleanup</li>
              <li>removed items go through macOS Trash to preserve a recovery window</li>
              <li>the app avoids broad permanent-delete behavior as a default workflow</li>
            </ul>

            <h2>Permissions and Access</h2>
            <p>
              Depending on the category being reviewed, DiskCleaner may require standard macOS permissions such as:
            </p>
            <ul>
              <li>Full Disk Access for protected locations</li>
              <li>administrator approval for certain system-level cleanup actions</li>
            </ul>
            <p>
              These permissions should be granted through standard macOS dialogs only.
            </p>

            <h2>Network Behavior</h2>
            <p>
              DiskCleaner is positioned as a local-first app. Public product and trust documentation currently describe the app as:
            </p>
            <ul>
              <li>not requiring an account for cleanup</li>
              <li>not relying on cloud processing for scan results</li>
              <li>avoiding analytics or telemetry in the cleanup workflow</li>
            </ul>
            <p>
              If network-connected product behavior changes materially in the future, this document should be updated with what is sent, when it is sent, and why it is necessary.
            </p>

            <h2>Data Handling</h2>
            <p>
              The intended cleanup workflow may inspect file metadata such as file names, file paths, file sizes, and timestamps.
              Normal cleanup workflows should not require uploading file contents.
            </p>

            <h2>Code Signing and Notarization</h2>
            <p>
              DiskCleaner is publicly described as Apple-Notarized and expected to pass Gatekeeper.
              For each release, advanced users should be able to verify the code signing identity, notarization status, and downloaded build hash where practical.
            </p>
            <p>
              If reproducible release verification steps are published separately, link them from this file.
            </p>

            <h2>Safe Cleanup Defaults</h2>
            <p>
              DiskCleaner&apos;s public safety claims are based on these product principles:
            </p>
            <ul>
              <li>show files before moving them</li>
              <li>allow user review</li>
              <li>use Trash-first cleanup</li>
              <li>avoid touching personal documents, passwords, and protected locations as cleanup junk</li>
            </ul>
            <p>
              These claims should remain aligned with the actual app behavior. If product behavior changes, update this document immediately.
            </p>

            <h2>Supported Reporting Channel</h2>
            <p>
              If you believe you found a security issue, email <a href="mailto:customersupport@diskcleaner.pro">customersupport@diskcleaner.pro</a>.
            </p>
            <p>
              Please include:
            </p>
            <ul>
              <li>affected app version</li>
              <li>macOS version</li>
              <li>Apple Silicon or Intel</li>
              <li>steps to reproduce</li>
              <li>screenshots or screen recordings if relevant</li>
              <li>impact assessment</li>
            </ul>

            <h2>Disclosure Expectations</h2>
            <p>
              When reporting a potential vulnerability:
            </p>
            <ul>
              <li>do not publicly disclose the issue before coordinated review</li>
              <li>do not exfiltrate user data</li>
              <li>do not exploit the issue beyond what is necessary to demonstrate impact</li>
            </ul>
            <p>
              DiskCleaner should acknowledge legitimate reports and evaluate severity based on user-data exposure risk, unintended file-removal risk,
              privilege boundary violations, and code-signing, notarization, or supply-chain impact.
            </p>

            <h2>Audit History</h2>
            <p>
              No independent third-party audit is documented in this repository at this time. If an audit is completed later, record the auditor,
              audit date, scope, summary of findings, and remediation status.
            </p>

            <h2>Verification References</h2>
            <p>
              Related public trust materials:
            </p>
            <ul>
              <li><Link to="/trust">Trust Center</Link></li>
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service">Terms of Service</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </section>
  )
}
