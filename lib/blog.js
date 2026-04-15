import fs from "fs"
import path from "path"
import matter from "gray-matter"

const BLOG_DIR = path.join(process.cwd(), "content/blog")

export function getAllPosts(locale = "es") {
  const dir = path.join(BLOG_DIR, locale)
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"))

  return files
    .map((filename) => {
      const slug = filename.replace(".mdx", "")
      const filePath = path.join(dir, filename)
      const { data } = matter(fs.readFileSync(filePath, "utf-8"))

      return { slug, ...data }
    })
    .filter((post) => post.published !== false)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getPostBySlug(slug, locale = "es") {
  const filePath = path.join(BLOG_DIR, locale, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(fileContent)

  return {
    frontmatter: data,
    content,
    slug,
  }
}

export function getAllSlugs(locale = "es") {
  const dir = path.join(BLOG_DIR, locale)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""))
    .filter((slug) => {
      const filePath = path.join(dir, `${slug}.mdx`)
      const { data } = matter(fs.readFileSync(filePath, "utf-8"))
      return data.published !== false
    })
}
