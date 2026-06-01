import { marked } from "marked"

export interface BlogPost {
  title: string
  description: string
  excerpt: string
  date: string
  updatedAt?: string
  author: string
  category: string
  slug: string
  featured?: boolean
  content: string
  wordCount: number
  readingTimeMinutes: number
}

const modules = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default"
})

type BlogModule = () => Promise<unknown>

const postPromises = new Map<string, Promise<BlogPost | undefined>>()
let allPostsPromise: Promise<BlogPost[]> | undefined

const stepHeadingRegex = /^(\d+)\)\s+(.*)$/
const stepIcon = ``

const renderer = new marked.Renderer()

renderer.heading = ({ tokens, depth }) => {
  const text = tokens.map(token => token.raw).join("").trim()
  const match = text.match(stepHeadingRegex)
  if (!match) {
    return `<h${depth}>${marked.parseInline(text)}</h${depth}>`
  }

  const cleanText = match[2]
  const inlineText = marked.parseInline(cleanText)
  return `<h${depth} class="blog-step-heading">${stepIcon}<span>${inlineText}</span></h${depth}>`
}

marked.setOptions({ renderer })

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return { data: {}, content: raw }

  const yaml = match[1]
  const content = raw.replace(match[0], "")

  const data: Record<string, string> = {}

  yaml.split("\n").forEach(line => {
    const [key, ...rest] = line.split(":")
    if (!key) return
    data[key.trim()] = rest.join(":").trim().replace(/^"|"$/g, "")
  })

  return { data, content }
}

function stripMarkdown(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/[#>*_~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function truncateExcerpt(text: string, maxLength = 240) {
  if (text.length <= maxLength) return text
  const cutoff = text.slice(0, maxLength)
  const lastSpace = cutoff.lastIndexOf(" ")
  if (lastSpace < 80) return `${cutoff.trim()}...`
  return `${cutoff.slice(0, lastSpace).trim()}...`
}

function parseBlogPost(raw: string): BlogPost {
  const { data, content } = parseFrontmatter(raw)
  const plainText = stripMarkdown(content)
  const wordCount = plainText ? plainText.split(" ").length : 0
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 220))
  const excerptSource = data.excerpt || data.description || plainText

  return {
    title: data.title,
    description: data.description,
    excerpt: truncateExcerpt(excerptSource),
    date: data.date,
    updatedAt: data.updatedAt || data.updated_at,
    author: data.author || "DiskCleaner Team",
    category: data.category || "Guide",
    slug: data.slug,
    featured: data.featured === "true",
    content: marked.parse(content) as string,
    wordCount,
    readingTimeMinutes
  }
}

function loadPost(path: string, load: BlogModule): Promise<BlogPost | undefined> {
  const existing = postPromises.get(path)
  if (existing) return existing

  const promise = load().then(raw => parseBlogPost(raw as string))
  postPromises.set(path, promise)
  return promise
}

export function getAllPosts(): Promise<BlogPost[]> {
  if (!allPostsPromise) {
    allPostsPromise = Promise.all(
      Object.entries(modules).map(([path, load]) => loadPost(path, load))
    ).then(posts =>
      posts
        .filter((post): post is BlogPost => Boolean(post))
        .sort(
          (a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        )
    )
  }

  return allPostsPromise
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const entry = Object.entries(modules).find(([path]) => path.endsWith(`/${slug}.md`))
  if (!entry) return undefined
  return loadPost(entry[0], entry[1])
}

export function preloadPostBySlug(slug: string) {
  void getPostBySlug(slug)
}

export async function getRelatedPosts(slug: string, limit = 3): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  const current = posts.find(post => post.slug === slug)
  if (!current) return posts.filter(post => post.slug !== slug).slice(0, limit)

  return posts
    .filter(post => post.slug !== slug)
    .sort((a, b) => {
      const aScore =
        Number(a.category === current.category) * 3 +
        Number(Boolean(a.featured)) * 2
      const bScore =
        Number(b.category === current.category) * 3 +
        Number(Boolean(b.featured)) * 2

      if (bScore !== aScore) return bScore - aScore
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    .slice(0, limit)
}
