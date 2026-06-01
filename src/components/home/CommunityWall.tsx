import { useEffect, useMemo, useRef, useState, type FormEvent } from "react"

type WallUser = {
  id: string
  alias: string
  device: string
  deviceType: string
  macOS: string
  os: string
  browser: string
  timezone: string
  joinedAt: string
  country: string
  countryPublic?: boolean
  avatarTone: string
  avatarVariant: number
  isFake?: boolean
  deviceFingerprint?: string
  source: "mac" | "email"
  email?: string
}

type RegistrantRow = {
  id: string
  username: string
  device_type: string
  country: string
  os_family: string
  created_at: string
}

type RegistrantsPayload =
  | RegistrantRow[]
  | {
      registrants?: unknown
      data?: unknown
      items?: unknown
      results?: unknown
    }

type StatsPayload = {
  total?: unknown
  count?: unknown
  stats?: {
    total?: unknown
    count?: unknown
  }
  data?: {
    total?: unknown
    count?: unknown
  }
}

const isRegistrantRow = (value: unknown): value is RegistrantRow => {
  if (!value || typeof value !== "object") return false
  const row = value as Partial<RegistrantRow>
  return typeof row.id === "string" && typeof row.username === "string" && typeof row.created_at === "string"
}

const normalizeRegistrantText = (value: string | undefined) => value?.trim().toLowerCase() ?? ""

const registrantIdentityKey = (row: RegistrantRow) =>
  [
    normalizeRegistrantText(row.username),
    normalizeRegistrantText(row.device_type),
    normalizeRegistrantText(row.country),
    normalizeRegistrantText(row.os_family),
  ].join("|")

const dedupeRegistrantRows = (rows: RegistrantRow[]) => {
  const uniqueRows = new Map<string, RegistrantRow>()

  for (const row of rows) {
    const byIdKey = `id:${row.id}`
    if (uniqueRows.has(byIdKey)) continue

    const identityKey = `identity:${registrantIdentityKey(row)}`
    const existing = uniqueRows.get(identityKey)
    if (!existing) {
      uniqueRows.set(identityKey, row)
      uniqueRows.set(byIdKey, row)
      continue
    }

    if (Date.parse(row.created_at) > Date.parse(existing.created_at)) {
      uniqueRows.set(identityKey, row)
      uniqueRows.set(byIdKey, row)
    }
  }

  return Array.from(new Set(uniqueRows.values()))
}

const extractRegistrantRows = (payload: RegistrantsPayload): RegistrantRow[] => {
  if (Array.isArray(payload)) return dedupeRegistrantRows(payload.filter(isRegistrantRow))
  const nested =
    payload.registrants ??
    payload.data ??
    payload.items ??
    payload.results

  return Array.isArray(nested) ? dedupeRegistrantRows(nested.filter(isRegistrantRow)) : []
}

const extractRegisteredTotal = (payload: StatsPayload): number | null => {
  const candidates = [
    payload.total,
    payload.count,
    payload.stats?.total,
    payload.stats?.count,
    payload.data?.total,
    payload.data?.count,
  ]

  for (const candidate of candidates) {
    const value = Number(candidate)
    if (Number.isFinite(value) && value >= 0) return value
  }

  return null
}

const wallUserIdentityKey = (user: WallUser) =>
  user.deviceFingerprint
    ? `fingerprint:${user.deviceFingerprint}`
    : [
        normalizeRegistrantText(user.alias),
        normalizeRegistrantText(formatDeviceLabel(user)),
        normalizeRegistrantText(user.country),
        normalizeRegistrantText(formatOsLabel(user)),
      ].join("|")

const dedupeWallUsers = (users: WallUser[]) => {
  const uniqueUsers = new Map<string, WallUser>()

  for (const user of users) {
    const identityKey = wallUserIdentityKey(user)
    const existing = uniqueUsers.get(identityKey)
    if (!existing || Date.parse(user.joinedAt) > Date.parse(existing.joinedAt)) {
      uniqueUsers.set(identityKey, user)
    }
  }

  return Array.from(uniqueUsers.values()).sort((a, b) => Date.parse(b.joinedAt) - Date.parse(a.joinedAt))
}

const INITIAL_WALL_USERS = 16
const WALL_LOAD_STEP = 8
const DEVICE_REGISTRY_KEY = "dc:registered-device-fingerprints"
const LAST_REGISTERED_ID_KEY = "dc:last-registered-id"
const COMMUNITY_API_BASE =
  (import.meta.env.VITE_DISKCLEANER_COMMUNITY_API_BASE as string | undefined)?.replace(/\/$/, "") ||
  (import.meta.env.DEV ? "/api/community" : "https://diskcleaner-api.totoantonio.workers.dev")
const ALIAS_ADJ = ["Cupertino", "Retina", "Swift", "Notarized", "Silicon", "Aqua", "Studio", "Siri", "Spotlight", "iCloud"]
const ALIAS_NOUN = ["MacBook", "AirDrop", "Finder", "iMac", "MacMini", "Xcode", "Catalina", "Safari", "ProDisplay", "TimeMachine"]
const COUNTRY_LIST = ["United States", "Canada", "United Kingdom", "Australia", "Germany", "Japan", "Philippines", "Singapore", "France", "Brazil"]
const AVATAR_TONES = ["tone-a", "tone-b", "tone-c", "tone-d", "tone-e", "tone-f"]
const AVATAR_VARIANTS = [0, 1, 2, 3]

const ANGLO_COUNTRIES = ["United States", "Canada", "United Kingdom"]
const EUROPE_COUNTRIES = ["Germany", "France", "Spain", "Netherlands", "Sweden", "Italy"]
const ASIA_COUNTRIES = ["Japan", "Singapore", "South Korea", "Malaysia", "Thailand"]
const AUS_NZ_COUNTRIES = ["Australia", "New Zealand"]

const COUNTRY_TIMEZONE: Record<string, string> = {
  "United States": "America/New_York",
  Canada: "America/Toronto",
  "United Kingdom": "Europe/London",
  Germany: "Europe/Berlin",
  France: "Europe/Paris",
  Spain: "Europe/Madrid",
  Netherlands: "Europe/Amsterdam",
  Sweden: "Europe/Stockholm",
  Italy: "Europe/Rome",
  Japan: "Asia/Tokyo",
  Singapore: "Asia/Singapore",
  "South Korea": "Asia/Seoul",
  Malaysia: "Asia/Kuala_Lumpur",
  Thailand: "Asia/Bangkok",
  Australia: "Australia/Sydney",
  "New Zealand": "Pacific/Auckland",
  Philippines: "Asia/Manila",
}

const countryTypeOf = (country: string) => {
  if (country === "Private location") return "Private"
  if (country === "Philippines") return "Philippines"
  if (ANGLO_COUNTRIES.includes(country)) return "US/CA/UK"
  if (EUROPE_COUNTRIES.includes(country)) return "Europe"
  if (ASIA_COUNTRIES.includes(country)) return "Asia"
  if (AUS_NZ_COUNTRIES.includes(country)) return "AU/NZ"
  return "Other"
}

const COUNTRY_FLAG_CODE: Record<string, string> = {
  "United States": "US",
  Canada: "CA",
  "United Kingdom": "GB",
  Germany: "DE",
  France: "FR",
  Spain: "ES",
  Netherlands: "NL",
  Sweden: "SE",
  Italy: "IT",
  Japan: "JP",
  Singapore: "SG",
  "South Korea": "KR",
  Malaysia: "MY",
  Thailand: "TH",
  Australia: "AU",
  "New Zealand": "NZ",
  Philippines: "PH",
}

const countryToFlag = (country: string) => {
  const code = COUNTRY_FLAG_CODE[country]
  if (!code) return "🌐"
  return String.fromCodePoint(...code.toUpperCase().split("").map(c => 127397 + c.charCodeAt(0)))
}

const COUNTRY_ABBR: Record<string, string> = {
  "United States": "US",
  Canada: "CA",
  "United Kingdom": "UK",
  Germany: "DE",
  France: "FR",
  Spain: "ES",
  Netherlands: "NL",
  Sweden: "SE",
  Italy: "IT",
  Japan: "JP",
  Singapore: "SG",
  "South Korea": "KR",
  Malaysia: "MY",
  Thailand: "TH",
  Australia: "AU",
  "New Zealand": "NZ",
  Philippines: "PH",
  "Private location": "Private",
}

const timezoneToCityCode = (timezone: string) => {
  const city = timezone.split("/").pop()?.replace(/_/g, " ") ?? ""
  const directMap: Record<string, string> = {
    Manila: "MLA",
    Tokyo: "TYO",
    Singapore: "SG",
    London: "LDN",
    Berlin: "BER",
    Paris: "PAR",
    Madrid: "MAD",
    Amsterdam: "AMS",
    Stockholm: "STO",
    Rome: "ROM",
    Seoul: "SEL",
    "Kuala Lumpur": "KUL",
    Bangkok: "BKK",
    Sydney: "SYD",
    Auckland: "AKL",
    Toronto: "TOR",
    "New York": "NYC",
    Chicago: "CHI",
    Denver: "DEN",
    "Los Angeles": "LAX",
  }
  if (directMap[city]) return directMap[city]
  const letters = city.replace(/[^A-Za-z]/g, "").toUpperCase()
  return letters.slice(0, 3) || null
}

const formatDeviceLabel = (user: WallUser) => {
  if (user.source === "mac" || user.deviceFingerprint) {
    if (/iPhone/i.test(user.device)) return "iPhone"
    if (/iPad/i.test(user.device)) return "iPad"
    if (/Mac/i.test(user.device) || user.os === "macOS") return "Mac"
  }
  if (/iPhone|iPad/i.test(user.device)) return user.device
  return user.deviceType
}

const formatOsLabel = (user: WallUser) => {
  if (/iPhone/i.test(user.device)) return "iOS"
  if (/iPad/i.test(user.device)) return "iPadOS"
  if (/Mac/i.test(user.device) || ["Tahoe", "Sequoia", "Sonoma", "Ventura"].includes(user.macOS)) return "macOS"
  return "Apple OS"
}

const formatLocationLabel = (user: WallUser) => {
  if (user.countryPublic === false) return "Private"
  if (!user.country || user.country === "Detecting...") return "Detecting..."
  const country = COUNTRY_ABBR[user.country] ?? user.country
  if (!country) return "Detecting..."
  const city = timezoneToCityCode(user.timezone)
  return city ? `${city}, ${country}` : country
}

const hashText = (value: string) => {
  let h = 0
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) >>> 0
  return h
}

const pickBySeed = <T,>(seed: string, list: T[], salt: string): T => list[hashText(`${seed}-${salt}`) % list.length]

const localDeviceFingerprint = () => {
  const ua = navigator.userAgent || ""
  const platform = navigator.platform || ""
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""
  const lang = navigator.language || ""
  return `fp-${hashText(`${ua}|${platform}|${tz}|${lang}`)}`
}

const isMacBrowser = () => {
  const ua = navigator.userAgent || ""
  const platform = navigator.platform || ""
  if (/iPhone|iPad|iPod|Android/i.test(ua)) return false
  if (/Win|Linux/i.test(platform) && !/Mac/i.test(platform)) return false
  return /Mac/i.test(platform) || /Macintosh/i.test(ua)
}

const inferDeviceName = () => {
  const ua = navigator.userAgent || ""
  const platform = navigator.platform || ""
  if (/Mac/i.test(platform)) {
    const match = ua.match(/Mac OS X (\d+)[_.](\d+)/i)
    const major = match ? Number(match[1]) : NaN
    let version = "Detecting"
    if (major >= 16) version = "Tahoe"
    else if (major === 15) version = "Sequoia"
    else if (major === 14) version = "Sonoma"
    else if (major === 13) version = "Ventura"
    else if (!Number.isNaN(major)) version = `macOS ${major}`
    return `It's a Mac (${version})`
  }
  if (/iPhone/i.test(ua)) return "iPhone"
  if (/iPad/i.test(ua)) return "iPad"
  return "Non-Apple device"
}

const inferDeviceType = () => {
  const ua = navigator.userAgent || ""
  const platform = navigator.platform || ""
  if (/Mac/i.test(platform)) return "Desktop"
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua)) return "Tablet"
  if (/Mobi|iPhone|Android/i.test(ua)) return "Mobile"
  return "Desktop"
}

const inferMacOSName = () => {
  const ua = navigator.userAgent || ""
  const match = ua.match(/Mac OS X (\d+)[_.](\d+)/i)
  const major = match ? Number(match[1]) : NaN
  if (major >= 16) return "Tahoe"
  if (major === 15) return "Sequoia"
  if (major === 14) return "Sonoma"
  if (major === 13) return "Ventura"
  return "Tahoe"
}

const inferOS = () => {
  const ua = navigator.userAgent || ""
  const platform = navigator.platform || ""
  if (/Mac/i.test(platform)) return "macOS"
  if (/Win/i.test(platform)) return "Windows"
  if (/Android/i.test(ua)) return "Android"
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS"
  if (/Linux/i.test(platform)) return "Linux"
  return "Unknown OS"
}

const inferBrowser = () => {
  const ua = navigator.userAgent || ""
  if (/Edg\//i.test(ua)) return "Edge"
  if (/OPR\//i.test(ua)) return "Opera"
  if (/Firefox\//i.test(ua)) return "Firefox"
  if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua) && !/OPR\//i.test(ua)) return "Chrome"
  if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) return "Safari"
  return "Unknown Browser"
}

const inferCountry = (seed: string) => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""
  if (/Manila/i.test(tz)) return "Philippines"
  if (/Tokyo/i.test(tz)) return "Japan"
  if (/Singapore/i.test(tz)) return "Singapore"
  if (/London/i.test(tz)) return "United Kingdom"
  if (/Berlin|Paris/i.test(tz)) return "Germany"
  if (/New_York|Chicago|Denver|Los_Angeles/i.test(tz)) return "United States"
  return pickBySeed(seed, COUNTRY_LIST, "country")
}

const registrantRowToWallUser = (row: RegistrantRow, index: number): WallUser => {
  const seed = `${row.id}-${row.username}-${row.country}-${row.created_at}-${index}`
  const timezone = COUNTRY_TIMEZONE[row.country] ?? "UTC"
  const os = row.os_family || "Apple OS"
  const device = row.device_type || (os === "macOS" ? "Mac" : "Apple device")
  const deviceType = /iPhone/i.test(device) ? "Mobile" : /iPad/i.test(device) ? "Tablet" : "Desktop"

  return {
    id: row.id,
    alias: row.username,
    device,
    deviceType,
    macOS: os === "macOS" ? inferMacOSName() : os,
    os,
    browser: "Unknown Browser",
    timezone,
    joinedAt: row.created_at,
    country: row.country,
    countryPublic: row.country !== "Private location",
    avatarTone: pickBySeed(seed, AVATAR_TONES, "avatar"),
    avatarVariant: pickBySeed(seed, AVATAR_VARIANTS, "avatar-variant"),
    isFake: false,
    source: "mac",
  }
}

const createWallUser = (
  source: "mac" | "email",
  country: string,
  countryPublic: boolean,
  preferredAlias?: string,
  deviceFingerprint?: string,
  email?: string
): WallUser => {
  const seed = `${Date.now()}-${Math.random()}-${email ?? ""}-${navigator.userAgent}`
  const alias = preferredAlias?.trim() || `${pickBySeed(seed, ALIAS_ADJ, "adj")} ${pickBySeed(seed, ALIAS_NOUN, "noun")}`
  return {
    id: `u-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    alias,
    device: inferDeviceName(),
    deviceType: inferDeviceType(),
    macOS: inferMacOSName(),
    os: inferOS(),
    browser: inferBrowser(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown timezone",
    joinedAt: new Date().toISOString(),
    country,
    countryPublic,
    avatarTone: pickBySeed(seed, AVATAR_TONES, "avatar"),
    avatarVariant: pickBySeed(seed, AVATAR_VARIANTS, "avatar-variant"),
    isFake: false,
    deviceFingerprint,
    source,
    email,
  }
}

const glyphDecoration = (variant: number) => {
  if (variant === 1) return <circle cx="12" cy="10" r="1.5" fill="currentColor" stroke="none" />
  if (variant === 2) return <path d="M9 9.5h6M10 12h4" />
  if (variant === 3) return <path d="M9 12l1.6-2 1.4 1.2 2-2.2" />
  return <path d="M10 10h4" />
}

const DesktopAvatarGlyph = ({ variant }: { variant: number }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="4.5" width="16" height="10.5" rx="2.2" />
    {glyphDecoration(variant)}
    <path d="M9.5 19.5h5" />
    <path d="M12 15v4.5" />
  </svg>
)

const LaptopAvatarGlyph = ({ variant }: { variant: number }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="5" width="16" height="9.5" rx="1.8" />
    {glyphDecoration(variant)}
    <path d="M2.5 18.5h19" />
  </svg>
)

const PhoneAvatarGlyph = ({ variant }: { variant: number }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="8" y="3.5" width="8" height="17" rx="2.4" />
    {variant === 1 ? <circle cx="12" cy="10.5" r="1.2" fill="currentColor" stroke="none" /> : null}
    {variant === 2 ? <path d="M10.3 9.8h3.4M10.3 12.4h2.4" /> : null}
    {variant === 3 ? <path d="M10.4 12.6l1.2-1.4 1.8 1.8" /> : null}
    {variant === 0 ? <path d="M10.3 11.1h3.4" /> : null}
    <path d="M11 17h2" />
  </svg>
)

const TabletAvatarGlyph = ({ variant }: { variant: number }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="5.5" y="4" width="13" height="16" rx="2.4" />
    {variant === 1 ? <circle cx="12" cy="10.5" r="1.35" fill="currentColor" stroke="none" /> : null}
    {variant === 2 ? <path d="M9.2 10h5.6M10 12.8h4" /> : null}
    {variant === 3 ? <path d="M9.4 12.7l1.5-1.7 1.3 1.1 2-2" /> : null}
    {variant === 0 ? <path d="M9.5 11h5" /> : null}
    <circle cx="12" cy="17.2" r="0.7" fill="currentColor" stroke="none" />
  </svg>
)

const DeviceAvatarGlyph = ({ user }: { user: WallUser }) => {
  const device = user.device.toLowerCase()
  if (device.includes("iphone")) return <PhoneAvatarGlyph variant={user.avatarVariant} />
  if (device.includes("ipad")) return <TabletAvatarGlyph variant={user.avatarVariant} />
  if (device.includes("macbook")) return <LaptopAvatarGlyph variant={user.avatarVariant} />
  if (device.includes("imac") || device.includes("studio display") || device.includes("display")) {
    return <DesktopAvatarGlyph variant={user.avatarVariant} />
  }
  if (device.includes("mac mini") || device.includes("macmini") || device.includes("mac studio") || device.includes("mac pro")) {
    return <DesktopAvatarGlyph variant={user.avatarVariant} />
  }
  if (user.deviceType === "Mobile") return <PhoneAvatarGlyph variant={user.avatarVariant} />
  if (user.deviceType === "Tablet") return <TabletAvatarGlyph variant={user.avatarVariant} />
  if (user.deviceType === "Desktop") return <DesktopAvatarGlyph variant={user.avatarVariant} />
  return <LaptopAvatarGlyph variant={user.avatarVariant} />
}

export default function CommunityWall({ SURFACE }: { SURFACE: string }) {
  const registeredLabel = "Registered Members"
  const isMacUser = isMacBrowser()
  const [isDesktopCommunity, setIsDesktopCommunity] = useState(false)
  const [source, setSource] = useState<"mac" | "email">("mac")
  const [email, setEmail] = useState("")
  const [useCustomUsername, setUseCustomUsername] = useState(false)
  const [customUsername, setCustomUsername] = useState("")
  const [publishCountry, setPublishCountry] = useState(true)
  const [detectedCountry, setDetectedCountry] = useState("Detecting...")
  const [error, setError] = useState("")
  const [users, setUsers] = useState<WallUser[]>([])
  const [totalRegistered, setTotalRegistered] = useState(0)
  const [registeredFingerprints, setRegisteredFingerprints] = useState<string[]>([])
  const [lastRegisteredId, setLastRegisteredId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [animatedTotalSupporters, setAnimatedTotalSupporters] = useState(0)
  const [countInView, setCountInView] = useState(false)
  const [desktopVisibleCount, setDesktopVisibleCount] = useState(INITIAL_WALL_USERS)
  const countRef = useRef<HTMLParagraphElement | null>(null)
  const wallScrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => {
      window.dispatchEvent(new Event("dc:reveal-refresh"))
    })
    return () => window.cancelAnimationFrame(raf)
  }, [])

  const wallUsers = useMemo(() => users, [users])
  const visibleUsers = isDesktopCommunity ? wallUsers.slice(0, desktopVisibleCount) : wallUsers.slice(0, INITIAL_WALL_USERS)
  const totalSupporters = Math.max(totalRegistered, wallUsers.length)
  const displayedSupporters = countInView
    ? Math.max(animatedTotalSupporters, totalSupporters > 0 ? 1 : 0)
    : totalSupporters
  const localFingerprint = isMacUser ? localDeviceFingerprint() : null
  const isRegisteredLocally = Boolean(localFingerprint && registeredFingerprints.includes(localFingerprint))
  const isRegisteredFromThisDevice = isRegisteredLocally || lastRegisteredId !== null
  const deviceTypeCounts = wallUsers.reduce<Record<string, number>>((acc, user) => {
    acc[user.deviceType] = (acc[user.deviceType] ?? 0) + 1
    return acc
  }, {})
  const countryTypeCounts = wallUsers.reduce<Record<string, number>>((acc, user) => {
    const key = countryTypeOf(user.countryPublic === false ? "Private location" : user.country)
    acc[key] = (acc[key] ?? 0) + 1
    return acc
  }, {})

  useEffect(() => {
    const updateDesktopState = () => {
      setIsDesktopCommunity(window.innerWidth >= 1024)
    }

    updateDesktopState()
    window.addEventListener("resize", updateDesktopState)
    return () => window.removeEventListener("resize", updateDesktopState)
  }, [])

  useEffect(() => {
    if (!countRef.current) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          setCountInView(true)
          observer.disconnect()
        })
      },
      { threshold: 0.35 }
    )
    observer.observe(countRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!countInView) return
    const totalEnd = totalSupporters
    if (totalEnd === 0) return

    const duration = 2200
    const startTime = performance.now()
    let raf = 0

    const step = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1)
      const eased = 1 - (1 - t) * (1 - t)
      setAnimatedTotalSupporters(Math.round(totalEnd * eased))
      if (t < 1) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [countInView, totalSupporters])

  useEffect(() => {
    try {
      const rawFingerprints = localStorage.getItem(DEVICE_REGISTRY_KEY)
      if (rawFingerprints) {
        const parsedFingerprints = JSON.parse(rawFingerprints) as string[]
        if (Array.isArray(parsedFingerprints)) setRegisteredFingerprints(parsedFingerprints)
      }
    } catch {
      // ignore invalid local data
    }

    const fallbackCountry = inferCountry(String(Date.now()))
    const controller = new AbortController()

    const detectCountry = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/", { signal: controller.signal })
        if (!res.ok) throw new Error("country lookup failed")
        const data = (await res.json()) as { country_name?: string }
        setDetectedCountry(data.country_name || fallbackCountry)
      } catch {
        setDetectedCountry(fallbackCountry)
      }
    }

    detectCountry()
    return () => controller.abort()
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    const loadCommunity = async () => {
      try {
        const [registrantsRes, statsRes] = await Promise.all([
          fetch(`${COMMUNITY_API_BASE}/registrants`, { signal: controller.signal }),
          fetch(`${COMMUNITY_API_BASE}/stats`, { signal: controller.signal }),
        ])

        if (!registrantsRes.ok) throw new Error("registrants fetch failed")
        const registrantsPayload = (await registrantsRes.json()) as RegistrantsPayload
        const rows = extractRegistrantRows(registrantsPayload)
        setUsers(dedupeWallUsers(rows.map(registrantRowToWallUser)))

        if (statsRes.ok) {
          const statsPayload = (await statsRes.json()) as StatsPayload
          const remoteTotal = extractRegisteredTotal(statsPayload)
          if (remoteTotal !== null) {
            setTotalRegistered(remoteTotal)
          }
        }
      } catch {
        // keep local wall if API is unavailable
      }
    }

    loadCommunity()
    return () => controller.abort()
  }, [])

  useEffect(() => {
    setTotalRegistered(current => Math.max(current, users.length))
  }, [users.length])

  useEffect(() => {
    if (!isDesktopCommunity) return
    const storedId = localStorage.getItem(LAST_REGISTERED_ID_KEY)
    const byStoredId = storedId ? users.find(u => u.id === storedId) : undefined
    if (byStoredId) {
      setLastRegisteredId(byStoredId.id)
      return
    }

    const fingerprint = localDeviceFingerprint()
    const byFingerprint = users.find(u => u.deviceFingerprint === fingerprint)
    if (byFingerprint) {
      setLastRegisteredId(byFingerprint.id)
      localStorage.setItem(LAST_REGISTERED_ID_KEY, byFingerprint.id)
    }
  }, [isDesktopCommunity, users])

  useEffect(() => {
    if (!isDesktopCommunity) return
    setDesktopVisibleCount(INITIAL_WALL_USERS)
  }, [isDesktopCommunity, wallUsers.length])

  const saveFingerprints = (next: string[]) => {
    setRegisteredFingerprints(next)
    localStorage.setItem(DEVICE_REGISTRY_KEY, JSON.stringify(next))
  }

  const onRegister = async (e: FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    if (!isMacUser) {
      setError("Registration is only available on macOS devices. iPhone, iPad, Android, and Windows devices are not accepted.")
      return
    }
    if (source === "email" && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Please enter a valid email address.")
      return
    }
    if (useCustomUsername && !/^[A-Za-z0-9 _-]{3,24}$/.test(customUsername.trim())) {
      setError("Username must be 3-24 characters (letters, numbers, spaces, _ or -).")
      return
    }
    setError("")
    const fingerprint = localDeviceFingerprint()
    if (source === "mac" && (registeredFingerprints.includes(fingerprint) || users.some(u => u.deviceFingerprint === fingerprint))) {
      setError("This device is already registered.")
      return
    }

    const newUser = createWallUser(
      source,
      publishCountry ? detectedCountry : "Private location",
      publishCountry,
      useCustomUsername ? customUsername.trim() : undefined,
      source === "mac" ? fingerprint : undefined,
      source === "email" ? email.trim() : undefined
    )
    setIsSubmitting(true)
    try {
      const res = await fetch(`${COMMUNITY_API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: newUser.alias,
          device_type: formatDeviceLabel(newUser),
          country: publishCountry ? detectedCountry : "Private location",
          os_family: formatOsLabel(newUser),
          device_fingerprint: fingerprint,
        }),
      })

      const payload = (await res.json().catch(() => ({}))) as { id?: string; error?: string }
      if (!res.ok) {
        setError(payload.error || (res.status === 409 ? "This device is already registered." : "Registration failed."))
        return
      }

      const registeredUser: WallUser = {
        ...newUser,
        id: payload.id || newUser.id,
      }

      setUsers(current => dedupeWallUsers([registeredUser, ...current]).slice(0, 100))
      setLastRegisteredId(registeredUser.id)
      localStorage.setItem(LAST_REGISTERED_ID_KEY, registeredUser.id)
      if (source === "mac") {
        saveFingerprints(Array.from(new Set([...registeredFingerprints, fingerprint])))
      }
      setEmail("")
      setTotalRegistered(current => Math.max(current, users.length + 1))
    } catch {
      setError("Could not reach the community service.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const onWallScroll = () => {
    const el = wallScrollRef.current
    if (!el) return
    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 120
    if (!nearBottom) return
    setDesktopVisibleCount(current => {
      if (current >= wallUsers.length) return current
      return Math.min(current + WALL_LOAD_STEP, wallUsers.length)
    })
  }

  return (
    <section id="community" className="py-12 sm:py-16 lg:py-20" style={{ background: SURFACE }}>
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <div className="mb-8 flex flex-col items-center gap-3 text-center sm:mb-10 sm:gap-4">
          <h2 className="reveal reveal-headline d1 text-[clamp(38px,4.6vw,62px)] font-bold leading-[1.04] tracking-[-0.04em] text-[var(--text)]">
            <span className="inline-block text-left sm:contents">
              <span className="block sm:inline">Register your seat.</span>{" "}
              <em className="not-italic block text-[var(--blue)] sm:inline">Join the wall.</em>
            </span>
          </h2>
          <p ref={countRef} className="reveal d1 text-[clamp(20px,2.4vw,28px)] font-bold tracking-[-0.01em] text-[var(--text)] [font-variant-numeric:tabular-nums]">
            {displayedSupporters.toLocaleString()}{" "}
            <span className="community-count-label" aria-label={registeredLabel}>
              {registeredLabel.split("").map((char, index) => (
                <span
                  key={`${char}-${index}`}
                  className="community-count-char"
                  style={{ animationDelay: `${index * 45}ms` }}
                  aria-hidden="true"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </p>
          <p className="reveal d2 max-w-[760px] text-[17px] leading-7 text-[var(--muted)]">
            See who joined from around the world. Every card comes from a real registration returned by the community service, with optional private location sharing.
          </p>
        </div>

        <>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_1fr]">
              <form className="community-form reveal" onSubmit={onRegister}>
                <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--blue)]">
                  Community Access
                </div>
                <div className="mb-2 text-[clamp(20px,2vw,24px)] font-semibold tracking-[-0.02em] text-[var(--text)]">
                  Add your <span className="text-[var(--blue)]">Mac</span> to the Wall
                </div>
                <p className="mb-3 text-[13px] leading-[1.6] text-[var(--muted)]">One registration per device. Mac-only. Private location is optional.</p>
                <div className="mb-3 rounded-xl bg-[var(--surface2)] p-0.5 text-sm font-medium">
                  <div className="flex">
                    <button type="button" onClick={() => setSource("mac")} disabled={!isMacUser || isRegisteredFromThisDevice} className={`flex-1 rounded-[10px] py-1.5 transition ${source === "mac" ? "bg-[var(--surface)] text-[var(--text)] shadow-sm" : "text-[var(--muted)]"}`}>
                      This Mac
                    </button>
                    <button type="button" onClick={() => setSource("email")} disabled={!isMacUser || isRegisteredFromThisDevice} className={`flex-1 rounded-[10px] py-1.5 transition ${source === "email" ? "bg-[var(--surface)] text-[var(--text)] shadow-sm" : "text-[var(--muted)]"}`}>
                      Email
                    </button>
                  </div>
                </div>
                <label className="mb-2 flex items-center gap-2.5 text-[13px] text-[var(--text)]">
                  <input type="checkbox" checked={useCustomUsername} onChange={e => setUseCustomUsername(e.target.checked)} />
                  Use my own username
                </label>
                <input className="mb-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface2)] px-3 py-2 text-[14px] text-[var(--text)]" type="text" placeholder="your-username" value={customUsername} onChange={e => setCustomUsername(e.target.value)} disabled={!useCustomUsername || !isMacUser} />
                <label className="mb-2 flex items-center gap-2.5 text-[13px] text-[var(--text)]">
                  <input type="checkbox" checked={publishCountry} onChange={e => setPublishCountry(e.target.checked)} />
                  Publish my detected country: {detectedCountry}
                </label>
                <p className="mb-2 text-[12px] text-[var(--muted)]">Country is inferred from timezone when available. Device and OS labels are the highest-confidence values the browser exposes.</p>
                <input className="mb-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface2)] px-3 py-2 text-[14px] text-[var(--text)]" type="email" placeholder="you@domain.com" value={email} onChange={e => setEmail(e.target.value)} disabled={source !== "email" || !isMacUser} />
                {!isMacUser && <p className="mb-2 text-[12px] text-[var(--muted)]">Registration is limited to Mac devices. iPhone, iPad, Android, Windows, and other non-macOS devices are blocked.</p>}
                {isRegisteredFromThisDevice && <p className="mb-2 text-[12px] text-[var(--muted)]">This device is already registered. The wall keeps one registration per device.</p>}
                {error && <p className="mb-2 text-[12px] text-[#ff3b30]">{error}</p>}
                <button type="submit" className="mt-4 inline-flex items-center justify-center rounded-full bg-[var(--blue)] px-7 py-3.5 text-[17px] font-medium text-white transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.97] active:brightness-90 disabled:cursor-not-allowed disabled:opacity-60" disabled={!isMacUser || isSubmitting || isRegisteredFromThisDevice}>{isRegisteredFromThisDevice ? "Already Registered" : isSubmitting ? "Registering..." : "Register"}</button>
              </form>

              <div className="reveal d1 relative rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-5">
                <div className="community-wall-wrap">
                  <div ref={wallScrollRef} onScroll={onWallScroll} className="community-wall">
                    {visibleUsers.length > 0 ? visibleUsers.map((user, i) => (
                      <article
                        key={`${user.id}-${i}`}
                        className={`community-card-enter relative flex min-h-[86px] items-center gap-3 rounded-2xl border px-3 py-3 transition-colors ${lastRegisteredId === user.id ? "border-[rgba(0,113,227,0.34)] bg-[var(--blue-tint)]" : "border-[var(--border)] bg-[var(--surface2)]"}`}
                        style={{ animationDelay: `${Math.min(i, 11) * 70}ms` }}
                      >
                        <span className="community-flag" aria-label={user.countryPublic === false ? "Private location" : user.country}>
                          {user.countryPublic === false ? "🌐" : countryToFlag(user.country)}
                        </span>
                        <div className={`community-avatar ${user.avatarTone}`}>
                          <DeviceAvatarGlyph user={user} />
                        </div>
                        <div className="community-meta">
                          <div className="community-alias">{user.alias}</div>
                          <div className="community-detail">{formatDeviceLabel(user)} · {formatOsLabel(user)}</div>
                          <div className="community-detail">{formatLocationLabel(user)}</div>
                        </div>
                      </article>
                    )) : (
                      <article className="col-span-full rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface2)] px-5 py-8 text-center">
                        <p className="text-[15px] leading-[1.6] text-[var(--muted)]">
                          The wall is empty right now. The first real registrations will appear here once the community service returns them.
                        </p>
                      </article>
                    )}
                  </div>
                </div>
              </div>
          </div>
          <div className="mt-4 border-t border-[rgba(127,127,127,0.15)] pt-3 text-xs text-[var(--muted2)]">
              <span className="block whitespace-normal leading-[1]">
                Device mix: Desktop {deviceTypeCounts.Desktop ?? 0} · Tablet {deviceTypeCounts.Tablet ?? 0} · Mobile {deviceTypeCounts.Mobile ?? 0} · Country mix: US/CA/UK {countryTypeCounts["US/CA/UK"] ?? 0} · Europe {countryTypeCounts.Europe ?? 0} · Asia {countryTypeCounts.Asia ?? 0} · AU/NZ {countryTypeCounts["AU/NZ"] ?? 0} · Private/Other {(countryTypeCounts.Private ?? 0) + (countryTypeCounts.Other ?? 0)}.
                The device and OS line shows the highest-confidence Apple platform label we can read from your browser. When browser or security settings limit detail, we fall back to the most reliable label we can detect.
              </span>
          </div>
        </>
      </div>
    </section>
  )
}
