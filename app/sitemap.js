import { getAllPosts } from "@/lib/blog"
import { locales } from "@/i18n/navigation"

const BASE_URL = "https://fedeiatech.vercel.app"

const STATIC_ROUTES = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contacto", changeFrequency: "yearly", priority: 0.5 },
]

export default function sitemap() {
  const now = new Date()

  const staticEntries = locales.flatMap((locale) =>
    STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    }))
  )

  const blogEntries = locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({
      url: `${BASE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.7,
    }))
  )

  return [...staticEntries, ...blogEntries]
}
