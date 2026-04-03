export const mdxComponents = {
  // Headings
  h1: (props) => (
    <h1
      className="text-3xl font-bold text-white mt-12 mb-4 tracking-tight"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="text-2xl font-bold text-white mt-10 mb-4 tracking-tight border-b border-slate-800 pb-3"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-xl font-semibold text-white mt-8 mb-3"
      {...props}
    />
  ),

  // Text
  p: (props) => (
    <p className="text-slate-300 leading-relaxed mb-4 text-[0.95rem]" {...props} />
  ),
  strong: (props) => <strong className="text-white font-semibold" {...props} />,
  em: (props) => <em className="text-slate-200 italic" {...props} />,

  // Links
  a: (props) => (
    <a
      className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-500/30 hover:decoration-emerald-400 transition-colors"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),

  // Lists
  ul: (props) => (
    <ul className="text-slate-300 mb-4 ml-4 space-y-2 list-none" {...props} />
  ),
  ol: (props) => (
    <ol
      className="text-slate-300 mb-4 ml-4 space-y-2 list-decimal marker:text-emerald-500/60"
      {...props}
    />
  ),
  li: (props) => (
    <li className="text-[0.95rem] leading-relaxed pl-2 relative before:content-['→'] before:absolute before:-left-4 before:text-emerald-500/50 before:font-mono before:text-xs" {...props} />
  ),

  // Code
  code: (props) => {
    // Inline code (no className means not inside a pre block)
    if (!props.className) {
      return (
        <code className="font-mono text-[0.85rem] bg-slate-800/80 text-emerald-300 px-1.5 py-0.5 rounded border border-slate-700/80">
          {props.children}
        </code>
      )
    }
    // Code inside pre blocks
    return <code className={`${props.className} font-mono text-[0.85rem]`} {...props} />
  },

  pre: (props) => (
    <pre className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-5 mb-6 overflow-x-auto font-mono text-[0.85rem] leading-relaxed text-slate-300">
      {props.children}
    </pre>
  ),

  // Blockquote
  blockquote: (props) => (
    <blockquote className="border-l-3 border-emerald-500 bg-emerald-500/5 rounded-r-lg px-5 py-4 my-6 text-slate-300 italic">
      {props.children}
    </blockquote>
  ),

  // Horizontal rule
  hr: () => <hr className="border-slate-800 my-10" />,

  // Images
  img: (props) => (
    <img className="rounded-xl border border-slate-700/80 my-6 w-full" {...props} />
  ),

  // Table
  table: (props) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm border-collapse" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="text-left font-mono text-[0.7rem] font-semibold tracking-wider uppercase text-emerald-400 px-4 py-3 border-b border-slate-700 bg-slate-800/40" {...props} />
  ),
  td: (props) => (
    <td className="px-4 py-3 border-b border-slate-800/50 text-slate-300 text-[0.85rem]" {...props} />
  ),

  // Custom components for MDX
  Callout: ({ type = "info", children }) => {
    const styles = {
      tip: {
        border: "border-emerald-500",
        bg: "bg-emerald-500/5",
        label: "Tip",
        labelColor: "text-emerald-400",
      },
      warn: {
        border: "border-red-400",
        bg: "bg-red-400/5",
        label: "Atención",
        labelColor: "text-red-400",
      },
      info: {
        border: "border-blue-400",
        bg: "bg-blue-400/5",
        label: "Nota",
        labelColor: "text-blue-400",
      },
      analogy: {
        border: "border-amber-400",
        bg: "bg-amber-400/5",
        label: "Analogía",
        labelColor: "text-amber-400",
      },
    }
    const s = styles[type] || styles.info

    return (
      <div
        className={`border-l-3 ${s.border} ${s.bg} rounded-r-lg px-5 py-4 my-6`}
      >
        <span
          className={`font-mono text-[0.65rem] font-semibold tracking-widest uppercase ${s.labelColor} block mb-2`}
        >
          {s.label}
        </span>
        <div className="text-slate-300 text-[0.9rem] leading-relaxed [&>p]:mb-0">
          {children}
        </div>
      </div>
    )
  },
}
