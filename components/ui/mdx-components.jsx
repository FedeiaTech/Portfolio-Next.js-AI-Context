import NextImage from "next/image"

export const mdxComponents = {
  // ── Headings ──
  h1: (props) => (
    <h1 className="text-3xl font-bold text-white mt-12 mb-4 tracking-tight" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-2xl font-bold text-white mt-10 mb-4 tracking-tight border-b border-slate-800 pb-3" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-xl font-semibold text-white mt-8 mb-3" {...props} />
  ),

  // ── Text ──
  p: (props) => (
    <p className="text-slate-300 leading-relaxed mb-4 text-[0.95rem]" {...props} />
  ),
  strong: (props) => <strong className="text-white font-semibold" {...props} />,
  em: (props) => <em className="text-slate-200 italic" {...props} />,

  // ── Links ──
  a: (props) => (
    <a
      className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-500/30 hover:decoration-emerald-400 transition-colors"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),

  // ── Lists ──
  ul: (props) => (
    <ul className="text-slate-300 mb-4 ml-1 space-y-2 list-none" {...props} />
  ),
  ol: (props) => (
    <ol className="text-slate-300 mb-4 ml-6 space-y-2 list-decimal marker:text-emerald-500/60 marker:font-mono" {...props} />
  ),
  li: (props) => (
    <li className="text-[0.95rem] leading-relaxed pl-5 relative before:content-['→'] before:absolute before:left-0 before:text-emerald-500/50 before:font-mono before:text-xs" {...props} />
  ),

  // ── Code ──
  code: (props) => {
    if (!props.className) {
      return (
        <code className="font-mono text-[0.82rem] bg-slate-800/80 text-emerald-300 px-1.5 py-0.5 rounded border border-slate-700/80">
          {props.children}
        </code>
      )
    }
    return <code className={`${props.className} font-mono text-[0.82rem]`} {...props} />
  },
  pre: (props) => (
    <pre className="bg-[#0d0f14] border border-slate-700/80 rounded-xl p-5 mb-6 overflow-x-auto font-mono text-[0.82rem] leading-relaxed text-slate-300 shadow-inner">
      {props.children}
    </pre>
  ),

  // ── Blockquote ──
  blockquote: (props) => (
    <blockquote className="border-l-[3px] border-emerald-500 bg-emerald-500/5 rounded-r-lg px-5 py-4 my-6 text-slate-300 italic [&>p]:mb-0">
      {props.children}
    </blockquote>
  ),

  // ── HR ──
  hr: () => <hr className="border-slate-800 my-10" />,

  // ── Images ──
  img: ({ src, alt = "" }) => (
    <NextImage
      src={src}
      alt={alt}
      width={800}
      height={450}
      className="rounded-xl border border-slate-700/80 my-6 w-full h-auto"
    />
  ),

  // ── Table ──
  table: (props) => (
    <div className="overflow-x-auto my-6 rounded-xl border border-slate-700/80">
      <table className="w-full text-sm border-collapse" {...props} />
    </div>
  ),
  thead: (props) => <thead className="bg-slate-800/60" {...props} />,
  th: (props) => (
    <th className="text-left font-mono text-[0.68rem] font-semibold tracking-wider uppercase text-emerald-400 px-4 py-3 border-b border-slate-700" {...props} />
  ),
  td: (props) => (
    <td className="px-4 py-3 border-b border-slate-800/50 text-slate-300 text-[0.85rem]" {...props} />
  ),
  tr: (props) => (
    <tr className="hover:bg-slate-800/20 transition-colors" {...props} />
  ),

  // ════════════════════════════════════════
  // CUSTOM COMPONENTS
  // ════════════════════════════════════════

  // ── Callout ──
  Callout: ({ type = "info", children }) => {
    const styles = {
      tip: { border: "border-emerald-500", bg: "bg-emerald-500/[0.06]", label: "Tip", color: "text-emerald-400" },
      warn: { border: "border-red-400", bg: "bg-red-400/[0.06]", label: "Atención", color: "text-red-400" },
      info: { border: "border-blue-400", bg: "bg-blue-400/[0.06]", label: "Nota", color: "text-blue-400" },
      analogy: { border: "border-amber-400", bg: "bg-amber-400/[0.06]", label: "Analogía", color: "text-amber-400" },
    }
    const s = styles[type] || styles.info
    return (
      <div className={`border-l-[3px] ${s.border} ${s.bg} rounded-r-lg px-5 py-4 my-6`}>
        <span className={`font-mono text-[0.62rem] font-semibold tracking-[0.12em] uppercase ${s.color} block mb-2`}>
          {s.label}
        </span>
        <div className="text-slate-300 text-[0.9rem] leading-relaxed [&>p]:mb-0">{children}</div>
      </div>
    )
  },

  // ── ConceptCard ──
  ConceptCard: ({ color = "cyan", badge, title, children }) => {
    const colors = {
      cyan: { border: "hover:border-cyan-500/40", badge: "text-cyan-400 bg-cyan-400/10", glow: "hover:shadow-[0_0_20px_rgba(34,211,238,0.04)]" },
      amber: { border: "hover:border-amber-500/40", badge: "text-amber-400 bg-amber-400/10", glow: "hover:shadow-[0_0_20px_rgba(245,158,11,0.04)]" },
      violet: { border: "hover:border-violet-400/40", badge: "text-violet-400 bg-violet-400/10", glow: "hover:shadow-[0_0_20px_rgba(167,139,250,0.04)]" },
      rose: { border: "hover:border-rose-400/40", badge: "text-rose-400 bg-rose-400/10", glow: "hover:shadow-[0_0_20px_rgba(251,113,133,0.04)]" },
      green: { border: "hover:border-green-400/40", badge: "text-green-400 bg-green-400/10", glow: "hover:shadow-[0_0_20px_rgba(74,222,128,0.04)]" },
      red: { border: "hover:border-red-400/40", badge: "text-red-400 bg-red-400/10", glow: "hover:shadow-[0_0_20px_rgba(248,113,113,0.04)]" },
      blue: { border: "hover:border-blue-400/40", badge: "text-blue-400 bg-blue-400/10", glow: "hover:shadow-[0_0_20px_rgba(96,165,250,0.04)]" },
    }
    const c = colors[color] || colors.cyan
    return (
      <div className={`bg-slate-800/40 border border-slate-700/80 rounded-xl p-5 my-3 transition-all duration-300 ${c.border} ${c.glow}`}>
        {badge && (
          <span className={`inline-block font-mono text-[0.6rem] font-semibold tracking-[0.1em] uppercase px-2 py-0.5 rounded ${c.badge} mb-3`}>
            {badge}
          </span>
        )}
        {title && <h4 className="text-[0.95rem] font-semibold text-white mb-2">{title}</h4>}
        <div className="text-slate-400 text-[0.85rem] leading-relaxed [&>p]:mb-0">{children}</div>
      </div>
    )
  },

  // ── CardGrid ──
  CardGrid: ({ cols = 1, children }) => (
    <div className={`grid gap-3 my-6 ${cols === 2 ? "md:grid-cols-2" : cols === 3 ? "md:grid-cols-3" : ""}`}>
      {children}
    </div>
  ),

  // ── LayerStack ──
  LayerStack: ({ children }) => (
    <div className="my-6 space-y-[3px]">{children}</div>
  ),

  Layer: ({ num, title, color = "cyan", children }) => {
    const colors = {
      cyan: { num: "bg-cyan-400/15 text-cyan-400", body: "border-cyan-400/15 bg-cyan-400/[0.03]", title: "text-cyan-400" },
      amber: { num: "bg-amber-400/15 text-amber-400", body: "border-amber-400/15 bg-amber-400/[0.03]", title: "text-amber-400" },
      violet: { num: "bg-violet-400/15 text-violet-400", body: "border-violet-400/15 bg-violet-400/[0.03]", title: "text-violet-400" },
      rose: { num: "bg-rose-400/15 text-rose-400", body: "border-rose-400/15 bg-rose-400/[0.03]", title: "text-rose-400" },
      green: { num: "bg-green-400/15 text-green-400", body: "border-green-400/15 bg-green-400/[0.03]", title: "text-green-400" },
    }
    const c = colors[color] || colors.cyan
    return (
      <div className="flex">
        <div className={`w-10 min-h-[52px] flex items-center justify-center font-mono text-[0.72rem] font-semibold rounded-l-lg shrink-0 ${c.num}`}>
          {num}
        </div>
        <div className={`flex-1 px-4 py-3 rounded-r-lg border border-l-0 ${c.body}`}>
          <h4 className={`text-[0.85rem] font-semibold mb-0.5 ${c.title}`}>{title}</h4>
          <div className="text-[0.78rem] text-slate-500 leading-snug [&>p]:mb-0">{children}</div>
        </div>
      </div>
    )
  },

  // ── PhaseTimeline ──
  PhaseTimeline: ({ children }) => (
    <div className="my-6 space-y-5">{children}</div>
  ),

  Phase: ({ num, title, time, color = "cyan", children }) => {
    const dotColors = {
      cyan: "border-cyan-400", amber: "border-amber-400", violet: "border-violet-400",
      rose: "border-rose-400", green: "border-green-400",
    }
    const iconBg = {
      cyan: "bg-cyan-400/15 text-cyan-400", amber: "bg-amber-400/15 text-amber-400",
      violet: "bg-violet-400/15 text-violet-400", rose: "bg-rose-400/15 text-rose-400",
      green: "bg-green-400/15 text-green-400",
    }
    return (
      <div className="relative pl-8 pb-0">
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-800 ml-[6px]" />
        <div className={`absolute left-0 top-1 w-[14px] h-[14px] rounded-full border-2 bg-[#08090d] ${dotColors[color] || dotColors.cyan}`} />
        <div className="bg-slate-800/40 border border-slate-700/80 rounded-xl p-5 hover:border-slate-600 transition-colors">
          <div className="flex items-baseline justify-between gap-3 flex-wrap mb-2">
            <div className="flex items-center gap-2">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[0.7rem] font-semibold shrink-0 ${iconBg[color] || iconBg.cyan}`}>
                {num}
              </span>
              <h4 className="text-[0.95rem] font-semibold text-white">{title}</h4>
            </div>
            {time && <span className="font-mono text-[0.65rem] text-slate-500">{time}</span>}
          </div>
          <div className="text-slate-400 text-[0.85rem] leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">{children}</div>
        </div>
      </div>
    )
  },

  // ── PhaseExample ──
  PhaseExample: ({ children }) => (
    <div className="bg-slate-900/60 border border-slate-700/60 rounded-lg p-4 mt-3">
      <span className="font-mono text-[0.6rem] font-semibold tracking-[0.12em] uppercase text-amber-400 block mb-2">
        Ejemplo práctico
      </span>
      <div className="text-slate-500 text-[0.8rem] leading-relaxed [&>p]:mb-0">{children}</div>
    </div>
  ),
}
