const HOME_URL = "https://www.diskcleaner.pro/"
const DEFAULT_TITLE = "DiskCleaner for Mac | Review-First, Trash-First Cleaner"
const DEFAULT_DESCRIPTION = "DiskCleaner is a review-first Mac cleaner. See every cache, log, leftover, and large file before cleanup. Everything moves to Trash. Free Core Cleaning."
const DEFAULT_IMAGE = "https://www.diskcleaner.pro/DiskCleaner_Social.webp"

export function canonicalUrl(value: string) {
  const url = new URL(value, HOME_URL)
  if (!url.pathname.endsWith("/") && !/\.[a-z0-9]+$/i.test(url.pathname)) {
    url.pathname += "/"
  }
  return url.toString()
}

function normalizeSchemaUrls(value: unknown): unknown {
  if (typeof value === "string" && value.startsWith("https://www.diskcleaner.pro")) {
    return canonicalUrl(value)
  }
  if (Array.isArray(value)) return value.map(normalizeSchemaUrls)
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, normalizeSchemaUrls(entry)]))
  }
  return value
}

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
  const canonical = canonicalUrl(url)
  document.title = title
  setContent("meta-desc", description)
  setHref("canonical-link", canonical)
  setContent("og-type", ogType)
  setContent("og-url", canonical)
  setContent("og-title", title)
  setContent("og-desc", description)
  setContent("og-image", image)
  setContent("og-image-secure", image)
  setContent("og-image-alt", title)
  setContent("tw-url", canonical)
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
  if (el) el.textContent = JSON.stringify(normalizeSchemaUrls(schema))
}

export function suppressFaqPageSchema() {
  const el = document.getElementById("global-faqpage-jsonld")
  if (el) el.setAttribute("type", "text/plain")
}

export function restoreFaqPageSchema() {
  const el = document.getElementById("global-faqpage-jsonld")
  if (el) el.setAttribute("type", "application/ld+json")
}
