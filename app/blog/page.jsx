import Link from "next/link"
import { getAllPosts } from "@/lib/blog"

export const metadata = {
  title: "Blog",
  description:
    "Artículos sobre desarrollo de software, inteligencia artificial y herramientas para programadores.",
}

export default function BlogPage() {
  const posts = getAllPosts()

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
          <h1 className="text-4xl font-bold text-white tracking-tight">Blog</h1>
          <span className="bg-slate-800 text-slate-400 text-[10px] px-2 py-1 rounded-md font-mono border border-slate-700">
            {posts.length} {posts.length === 1 ? "ARTÍCULO" : "ARTÍCULOS"}
          </span>
        </div>
        <p className="text-slate-400 text-lg font-light max-w-2xl">
          Artículos sobre desarrollo de software, inteligencia artificial y
          herramientas para programadores.
        </p>
      </div>

      {/* Post list */}
      {posts.length === 0 ? (
        <div className="text-center py-20 bg-slate-800/30 rounded-xl border border-slate-700/50">
          <p className="text-slate-500 font-mono text-sm">
            &gt;_ No hay artículos publicados todavía.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="bg-slate-800/40 border border-slate-700/80 rounded-xl p-6 hover:border-emerald-500/40 transition-all duration-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.06)]">
                {/* Tags */}
                {post.tags && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-tighter"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

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
                    LEER &gt;_
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
