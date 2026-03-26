const HOME_URL = "https://www.diskcleaner.pro/"
const DEFAULT_TITLE = "DiskCleaner for Mac – Secure, Fast, Minimal Cache Cleaner"
const DEFAULT_DESCRIPTION = "DiskCleaner is a focused macOS cleaner that scans cache and clutter safely, shows every file before it moves, and sends everything to Trash. Private, fast, and beautifully simple."
const DEFAULT_IMAGE = "https://www.diskcleaner.pro/DiskCleaner_Social.webp"

function setContent(id: string, value: string) {
  const el = document.getElementById(id)
  if (el) el.setAttribute("content", value)
}

function setHref(id: string, value: string) {
  const el = document.getElementById(id)
  if (el) el.setAttribute("href", value)
}

export function applyPageMetadata({
  title,
  description,
  url,
  ogType = "website",
  image = DEFAULT_IMAGE,
}: {
  title: string
  description: string
  url: string
  ogType?: "website" | "article"
  image?: string
}) {
  document.title = title
  setContent("meta-desc", description)
  setHref("canonical-link", url)
  setContent("og-type", ogType)
  setContent("og-url", url)
  setContent("og-title", title)
  setContent("og-desc", description)
  setContent("og-image", image)
  setContent("og-image-secure", image)
  setContent("og-image-alt", title)
  setContent("tw-url", url)
  setContent("tw-title", title)
  setContent("tw-desc", description)
  setContent("tw-image", image)
}

export function restoreDefaultMetadata() {
  applyPageMetadata({
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: HOME_URL,
    ogType: "website",
  })
}

export function setJsonLd(id: string, schema: unknown) {
  const el = document.getElementById(id)
  if (el) el.textContent = JSON.stringify(schema)
}

export function suppressFaqPageSchema() {
  const el = document.getElementById("global-faqpage-jsonld")
  if (el) el.setAttribute("type", "text/plain")
}

export function restoreFaqPageSchema() {
  const el = document.getElementById("global-faqpage-jsonld")
  if (el) el.setAttribute("type", "application/ld+json")
}
