"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"

export default function LocaleSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  function switchLocale(next) {
    if (next === locale) return
    router.replace(pathname, { locale: next })
  }

  return (
    <div className="flex items-center rounded-md overflow-hidden border border-slate-700 text-[10px] font-mono uppercase tracking-wider">
      {["es", "en"].map((lang) => (
        <button
          key={lang}
          onClick={() => switchLocale(lang)}
          className={`px-2 py-0.5 transition-colors duration-200 ${
            locale === lang
              ? "bg-emerald-500/20 text-emerald-400"
              : "text-slate-500 hover:text-white"
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  )
}
