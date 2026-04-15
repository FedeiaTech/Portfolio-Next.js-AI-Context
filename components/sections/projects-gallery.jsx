"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"

const PROJECT_META = [
  {
    id: 1,
    name: "SpriteLab",
    techs: ["Java", "JavaFX", "Automation"],
    repoName: "FedeiaTech/SpriteLab",
    readmeLink: "https://github.com/FedeiaTech/SpriteLab/blob/main/Readme.md",
    bgImage: "/images/projects/spritelab-bg.jpg",
    statusKey: "spriteLabStatus",
    snippetKey: "spriteLabSnippet",
  },
  {
    id: 2,
    name: "JFX Business Engine",
    techs: ["Java", "SQL", "ERP Architecture"],
    repoName: "FedeiaTech/JFX-Business-Engine",
    readmeLink:
      "https://github.com/FedeiaTech/JFX-Business-Engine/blob/develop/Readme.md",
    bgImage: "/images/projects/jfx-engine-bg.jpg",
    statusKey: "jfxStatus",
    snippetKey: "jfxSnippet",
  },
  {
    id: 3,
    name: "AI Space",
    techs: ["Godot", "GDScript", "AI Animation"],
    repoName: "FedeiaTech/AI-Space-Visual-Novel-GD",
    readmeLink: "https://github.com/FedeiaTech/AI-Space-Visual-Novel-GD",
    bgImage: "/images/projects/aispace-bg.jpg",
    statusKey: "aiSpaceStatus",
    snippetKey: "aiSpaceSnippet",
  },
]

export default function ProjectsGallery() {
  const t = useTranslations("projects")

  return (
    <section className="w-full max-w-5xl mx-auto mt-20 px-4">
      <div className="flex items-center space-x-3 mb-8">
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
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
        <h2 className="text-3xl font-bold text-white tracking-tight">
          {t("title")}
        </h2>
        <span className="bg-slate-800 text-slate-400 text-[10px] px-2 py-1 rounded-md font-mono border border-slate-700">
          REPO_BROWSER_V2
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {PROJECT_META.map((project) => (
          <article
            key={project.id}
            className="group relative bg-slate-900 border border-slate-700/80 rounded-xl overflow-hidden shadow-xl hover:border-emerald-500/50 transition-all duration-500 flex flex-col min-h-[350px]"
          >
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <Image
                src={project.bgImage}
                alt={`${project.name} background`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-0 group-hover:opacity-40 group-hover:scale-110 transition-all duration-1000 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <header className="relative z-10 bg-slate-800/50 px-5 py-3 border-b border-slate-700/80 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="font-mono text-[11px] text-emerald-400 font-medium truncate max-w-[150px] md:max-w-none">
                  {project.repoName}
                </span>
              </div>
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
            </header>

            <div className="relative z-10 p-5 flex-grow">
              <div className="bg-slate-950/80 backdrop-blur-sm rounded-lg p-4 font-mono text-xs text-slate-300 border border-slate-800 whitespace-pre-wrap leading-relaxed shadow-inner h-full">
                {t(project.snippetKey)}
              </div>
            </div>

            <footer className="relative z-10 bg-slate-800/30 border-t border-slate-700/80 p-0 flex flex-col">
              <div className="px-5 py-3 flex flex-wrap gap-2">
                {project.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[9px] font-bold rounded bg-slate-800 text-slate-400 border border-slate-700 uppercase tracking-tighter"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.readmeLink}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-slate-900/50 hover:bg-emerald-500 hover:text-white border-t border-slate-700/50 text-[10px] font-mono text-center text-slate-500 uppercase tracking-widest transition-all duration-300"
              >
                {t("readDoc")}
              </a>
            </footer>
          </article>
        ))}
      </div>
    </section>
  )
}
