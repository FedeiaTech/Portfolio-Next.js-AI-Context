"use client"

import { useState, useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
]

export default function Footer() {
  const t = useTranslations("footer")
  const [unlocked, setUnlocked] = useState(false)
  const [year, setYear] = useState(null)
  const sequence = useRef([])

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      sequence.current = [...sequence.current, e.key]
      if (sequence.current.length > KONAMI_CODE.length) sequence.current.shift()
      if (sequence.current.join(",") === KONAMI_CODE.join(",")) {
        setUnlocked(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <footer className="w-full mt-24 border-t border-slate-800 bg-[#06090E] relative overflow-hidden">
      {unlocked && (
        <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center pointer-events-none z-0">
          <span className="text-emerald-500/20 text-9xl font-bold uppercase tracking-widest transform -rotate-12">
            {t("godMode")}
          </span>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-12 relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span className="text-white font-bold tracking-wider">FEDEIA.DEV</span>
          </div>
          <p className="text-slate-500 text-sm font-mono">
            {t("rights", { year: year ?? "——" })}
          </p>
          <p className="text-[10px] text-slate-700 font-mono tracking-widest mt-1 opacity-50 hover:opacity-100 transition-opacity cursor-default">
            [&uarr; &uarr; &darr; &darr; &larr; &rarr; &larr; &rarr; B A]
          </p>
        </div>

        <div className="flex items-center space-x-6">
          <a
            href="https://github.com/FedeiaTech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center space-x-2 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="font-mono text-sm">{t("github")}</span>
          </a>
          <Link
            href="/contacto"
            className="bg-slate-800 border border-slate-700 hover:border-emerald-500 text-slate-300 hover:text-white px-4 py-2 rounded-md font-mono text-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            {t("contactBtn")}
          </Link>
        </div>
      </div>
    </footer>
  )
}
