import { notFound } from "next/navigation"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getPostBySlug, getAllSlugs } from "@/lib/blog"
import { mdxComponents } from "@/components/ui/mdx-components"

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
    },
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const { frontmatter, content } = post

  return (
    <main className="flex-grow w-full max-w-3xl mx-auto px-4 mt-12 md:mt-20 mb-16">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-mono text-slate-500 hover:text-emerald-400 transition-colors mb-8 group"
      >
        <svg
          className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        &lt;_ VOLVER AL BLOG
      </Link>

      {/* Post header */}
      <header className="mb-10 pb-8 border-b border-slate-800">
        {frontmatter.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-tighter"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
          {frontmatter.title}
        </h1>

        <p className="text-slate-400 text-lg font-light leading-relaxed mb-6">
          {frontmatter.description}
        </p>

        <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500">
          <span>{frontmatter.date}</span>
          {frontmatter.readingTime && (
            <>
              <span className="text-slate-700">•</span>
              <span>{frontmatter.readingTime}</span>
            </>
          )}
        </div>
      </header>

      {/* Post content */}
      <article className="prose-custom">
        <MDXRemote source={content} components={mdxComponents} />
      </article>
    </main>
  )
}
