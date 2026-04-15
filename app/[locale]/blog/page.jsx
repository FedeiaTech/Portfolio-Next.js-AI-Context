import Image from "next/image"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { getAllPosts } from "@/lib/blog"

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "blog" })
  const mt = await getTranslations({ locale, namespace: "metadata" })

  return {
    title: t("title"),
    description: mt("defaultDescription"),
  }
}

export default async function BlogPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("blog")
  const posts = getAllPosts(locale)

  return (
    <main className="flex-grow w-full max-w-4xl mx-auto px-4 mt-12 md:mt-20 mb-16">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center space-x-3 mb-4">
          <svg
            className="w-6 h-6 text-emerald-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            {t("title")}
          </h1>
          <span className="bg-slate-800 text-slate-400 text-[10px] px-2 py-1 rounded-md font-mono border border-slate-700">
            {posts.length} {posts.length === 1 ? t("article") : t("articles")}
          </span>
        </div>
        <p className="text-slate-400 text-lg font-light max-w-2xl">
          {t("description")}
        </p>
      </div>

      {/* Post list */}
      {posts.length === 0 ? (
        <div className="text-center py-20 bg-slate-800/30 rounded-xl border border-slate-700/50">
          <p className="text-slate-500 font-mono text-sm">{t("empty")}</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="bg-slate-800/40 border border-slate-700/80 rounded-xl p-6 hover:border-emerald-500/40 transition-all duration-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.06)] flex gap-5">
                {/* Thumbnail */}
                {post.cover && (
                  <div
                    className="relative w-28 md:w-36 shrink-0 rounded-lg overflow-hidden self-stretch opacity-80 group-hover:opacity-100 transition-opacity duration-500 border border-slate-600/30 shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
                    style={{ aspectRatio: "4/3", transform: "translateZ(0)" }}
                  >
                    <Image
                      src={post.cover}
                      alt={post.coverAlt || post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 112px, 144px"
                      style={{
                        imageRendering: "auto",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    />
                  </div>
                )}

                {/* Text content */}
                <div className="flex-1 min-w-0">
                  {/* Tags + lang badge */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-slate-700/60 text-slate-400 border border-slate-600/60 uppercase tracking-tighter">
                      {t("langBadge")}
                    </span>
                    {post.tags &&
                      post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-tighter"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {post.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500">
                    <span>{post.date}</span>
                    {post.readingTime && (
                      <>
                        <span className="text-slate-700">•</span>
                        <span>{post.readingTime}</span>
                      </>
                    )}
                    <span className="ml-auto text-emerald-500/60 group-hover:text-emerald-400 transition-colors">
                      {t("readLink")}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
