import { createServer } from "node:http"
import { readFile, writeFile } from "node:fs/promises"
import { resolve } from "node:path"
import { URL } from "node:url"

const credentialsPath = resolve(process.env.GSC_CREDENTIALS || ".gsc-credentials.local")
const tokenPath = resolve(process.env.GSC_TOKEN || ".gsc-token.local")
const scope = "https://www.googleapis.com/auth/webmasters"
const command = process.argv[2] || "report"
const preferredSite = "sc-domain:diskcleaner.pro"
const preferredSitemap = "https://www.diskcleaner.pro/sitemap.xml"

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"))
}

async function credentials() {
  const raw = await readJson(credentialsPath)
  const config = raw.installed || raw.web
  if (!config) throw new Error("OAuth credentials must contain an installed or web client.")
  return config
}

async function exchangeToken(body) {
  const config = await credentials()
  const response = await fetch(config.token_uri, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: config.client_id,
      client_secret: config.client_secret,
      ...body,
    }),
  })
  if (!response.ok) throw new Error(`OAuth token exchange failed: ${await response.text()}`)
  return response.json()
}

async function authorize() {
  const config = await credentials()
  const configuredRedirect = config.redirect_uris.find(uri => uri.startsWith("http://localhost"))
  const redirectUri = configuredRedirect && new URL(configuredRedirect).port
    ? configuredRedirect
    : "http://localhost:53682"
  const redirect = new URL(redirectUri)
  const authUrl = new URL(config.auth_uri)
  authUrl.search = new URLSearchParams({
    client_id: config.client_id,
    redirect_uri: redirectUri,
    response_type: "code",
    scope,
    access_type: "offline",
    prompt: "consent",
  }).toString()

  console.log("\nOpen this URL in your browser and approve Search Console access:\n")
  console.log(authUrl.toString())
  console.log("\nWaiting for Google authorization...")

  const code = await new Promise((resolveCode, reject) => {
    const server = createServer((request, response) => {
      const callback = new URL(request.url, redirectUri)
      if (callback.searchParams.get("error")) {
        response.end("Authorization was denied. You can close this tab.")
        server.close()
        reject(new Error(callback.searchParams.get("error")))
        return
      }
      const value = callback.searchParams.get("code")
      if (!value) {
        response.statusCode = 400
        response.end("Missing authorization code.")
        return
      }
      response.end("DiskCleaner Search Console access is connected. You can close this tab.")
      server.close()
      resolveCode(value)
    })
    server.on("error", reject)
    server.listen(Number(redirect.port), redirect.hostname)
  })

  const token = await exchangeToken({
    code,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
  })
  await writeFile(tokenPath, JSON.stringify(token, null, 2), { mode: 0o600 })
  console.log(`\nSaved the local token to ${tokenPath}`)
}

async function accessToken() {
  const token = await readJson(tokenPath)
  if (!token.refresh_token) {
    if (token.access_token) return token.access_token
    throw new Error("No refresh token found. Run npm run gsc:auth.")
  }
  const refreshed = await exchangeToken({
    refresh_token: token.refresh_token,
    grant_type: "refresh_token",
  })
  return refreshed.access_token
}

async function googleApi(path, options = {}) {
  const response = await fetch(`https://www.googleapis.com${path}`, {
    ...options,
    headers: {
      authorization: `Bearer ${await accessToken()}`,
      "content-type": "application/json",
      ...options.headers,
    },
  })
  if (!response.ok) throw new Error(`Google API request failed: ${response.status} ${await response.text()}`)
  return response.json()
}

async function listSites() {
  const result = await googleApi("/webmasters/v3/sites")
  const sites = result.siteEntry || []
  console.table(sites.map(site => ({ property: site.siteUrl, permission: site.permissionLevel })))
  return sites
}

async function selectedSite() {
  const sites = await listSites()
  const requested = process.env.GSC_SITE
  const site = requested
    ? sites.find(entry => entry.siteUrl === requested)
    : sites.find(entry => entry.siteUrl === preferredSite)
      || sites.find(entry => entry.siteUrl === "https://diskcleaner.pro/")
      || sites[0]

  if (!site) throw new Error("No Search Console properties are available to this Google account.")
  return site
}

function isoDate(date) {
  return date.toISOString().slice(0, 10)
}

async function report() {
  const site = await selectedSite()

  const end = new Date()
  end.setUTCDate(end.getUTCDate() - 2)
  const start = new Date(end)
  start.setUTCDate(start.getUTCDate() - 27)

  const data = await googleApi(`/webmasters/v3/sites/${encodeURIComponent(site.siteUrl)}/searchAnalytics/query`, {
    method: "POST",
    body: JSON.stringify({
      startDate: isoDate(start),
      endDate: isoDate(end),
      dimensions: ["query"],
      rowLimit: 25,
    }),
  })

  console.log(`\nTop queries for ${site.siteUrl}, ${isoDate(start)} to ${isoDate(end)}\n`)
  console.table((data.rows || []).map(row => ({
    query: row.keys[0],
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: `${(row.ctr * 100).toFixed(1)}%`,
    position: row.position.toFixed(1),
  })))
}

async function opportunities() {
  const site = await selectedSite()

  const end = new Date()
  end.setUTCDate(end.getUTCDate() - 2)
  const start = new Date(end)
  start.setUTCDate(start.getUTCDate() - 89)

  const data = await googleApi(`/webmasters/v3/sites/${encodeURIComponent(site.siteUrl)}/searchAnalytics/query`, {
    method: "POST",
    body: JSON.stringify({
      startDate: isoDate(start),
      endDate: isoDate(end),
      dimensions: ["page", "query"],
      rowLimit: 25000,
    }),
  })

  const rows = (data.rows || []).map(row => ({
    page: row.keys[0],
    query: row.keys[1],
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.ctr,
    position: row.position,
  }))
  const opportunities = rows
    .filter(row => row.impressions >= 2 && row.position <= 30)
    .sort((a, b) => b.impressions - a.impressions || a.position - b.position)
    .slice(0, 50)

  const pages = new Map()
  for (const row of rows) {
    const current = pages.get(row.page) || { page: row.page, clicks: 0, impressions: 0, weightedPosition: 0 }
    current.clicks += row.clicks
    current.impressions += row.impressions
    current.weightedPosition += row.position * row.impressions
    pages.set(row.page, current)
  }

  console.log(`\nTop pages for ${site.siteUrl}, ${isoDate(start)} to ${isoDate(end)}\n`)
  console.table([...pages.values()]
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 25)
    .map(page => ({
      page: page.page.replace("https://diskcleaner.pro", ""),
      clicks: page.clicks,
      impressions: page.impressions,
      ctr: page.impressions ? `${(page.clicks / page.impressions * 100).toFixed(1)}%` : "0.0%",
      position: page.impressions ? (page.weightedPosition / page.impressions).toFixed(1) : "-",
    })))

  console.log("\nHighest-value query opportunities: impressions >= 2 and average position <= 30\n")
  console.table(opportunities.map(row => ({
    page: row.page.replace("https://diskcleaner.pro", ""),
    query: row.query,
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: `${(row.ctr * 100).toFixed(1)}%`,
    position: row.position.toFixed(1),
  })))

  const sitemap = await googleApi(`/webmasters/v3/sites/${encodeURIComponent(site.siteUrl)}/sitemaps`)
  console.log("\nSubmitted sitemaps\n")
  console.table((sitemap.sitemap || []).map(item => ({
    path: item.path,
    submitted: item.lastSubmitted,
    warnings: item.warnings,
    errors: item.errors,
    pending: item.isPending,
  })))
}

async function submitSitemap() {
  const site = await selectedSite()
  const sitemapUrl = process.env.GSC_SITEMAP || preferredSitemap
  const response = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site.siteUrl)}/sitemaps/${encodeURIComponent(sitemapUrl)}`,
    { method: "PUT", headers: { authorization: `Bearer ${await accessToken()}` } },
  )
  if (!response.ok) throw new Error(`Sitemap submission failed: ${response.status} ${await response.text()}`)
  console.log(`Submitted sitemap for ${site.siteUrl}: ${sitemapUrl}`)
}

async function ctrWeekly() {
  const site = await selectedSite()
  const end = new Date()
  end.setUTCDate(end.getUTCDate() - 2)
  const start = new Date(end)
  start.setUTCDate(start.getUTCDate() - 41)

  const data = await googleApi(`/webmasters/v3/sites/${encodeURIComponent(site.siteUrl)}/searchAnalytics/query`, {
    method: "POST",
    body: JSON.stringify({
      startDate: isoDate(start),
      endDate: isoDate(end),
      dimensions: ["date"],
      rowLimit: 250,
    }),
  })

  const weeks = new Map()
  for (const row of data.rows || []) {
    const date = new Date(`${row.keys[0]}T00:00:00Z`)
    const weekStart = new Date(date)
    weekStart.setUTCDate(date.getUTCDate() - date.getUTCDay())
    const key = isoDate(weekStart)
    const current = weeks.get(key) || { week: key, clicks: 0, impressions: 0, weightedPosition: 0 }
    current.clicks += row.clicks
    current.impressions += row.impressions
    current.weightedPosition += row.position * row.impressions
    weeks.set(key, current)
  }

  console.log(`\nWeekly CTR for ${site.siteUrl}, ${isoDate(start)} to ${isoDate(end)}\n`)
  console.table([...weeks.values()].sort((a, b) => a.week.localeCompare(b.week)).map(week => ({
    week: week.week,
    clicks: week.clicks,
    impressions: week.impressions,
    ctr: week.impressions ? `${(week.clicks / week.impressions * 100).toFixed(1)}%` : "0.0%",
    position: week.impressions ? (week.weightedPosition / week.impressions).toFixed(1) : "-",
  })))
}

try {
  if (command === "auth") await authorize()
  else if (command === "sites") await listSites()
  else if (command === "report") await report()
  else if (command === "opportunities") await opportunities()
  else if (command === "submit-sitemap") await submitSitemap()
  else if (command === "ctr-weekly") await ctrWeekly()
  else throw new Error(`Unknown command: ${command}`)
} catch (error) {
  console.error(`\nSearch Console error: ${error.message}`)
  process.exitCode = 1
}
