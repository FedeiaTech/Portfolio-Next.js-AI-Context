"use client"

import { useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { useTime } from "@/hooks/use-time"
import { useLiveMode } from "@/context/live-mode-context"
import Navbar from "@/components/layout/navbar"
import LocaleSwitcher from "@/components/layout/locale-switcher"

export default function StatusBar() {
  const t = useTranslations("statusBar")
  const locale = useLocale()
  const { time } = useTime(locale === "en" ? "en-US" : "es-AR")
  const { isLive, toggleLiveMode } = useLiveMode()
  const [menuOpen, setMenuOpen] = useState(false)
  const [clockExpanded, setClockExpanded] = useState(false)

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Barra principal */}
      <div className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 text-slate-300 text-xs font-mono py-2 px-4 flex justify-between items-center transition-colors duration-500">

        {/* Izquierda: Reloj + Ubicación + Nav desktop */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setClockExpanded((v) => !v)}
            className="flex items-center space-x-1 md:cursor-default"
          >
            <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{time}</span>
            <span
              className={`tracking-widest uppercase ml-1 transition-all duration-300 overflow-hidden whitespace-nowrap ${
                clockExpanded ? "max-w-[160px] opacity-100" : "max-w-0 opacity-0 md:max-w-[160px] md:opacity-100"
              }`}
            >
              · {t("location")}
            </span>
          </button>

          <div className="hidden md:block ml-2">
            <Navbar />
          </div>
        </div>

        {/* Centro: Dot de estado */}
        <div className="flex items-center space-x-2">
          <span className="relative flex h-3 w-3">
            {isLive && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            )}
            <span
              className={`relative inline-flex rounded-full h-3 w-3 transition-colors duration-300 ${
                isLive ? "bg-emerald-500" : "bg-slate-600"
              }`}
            />
          </span>
          <span
            className={`font-semibold hidden sm:inline-block uppercase tracking-wider transition-colors duration-300 ${
              isLive ? "text-emerald-400" : "text-slate-500"
            }`}
          >
            {isLive ? t("openToWork") : t("saveMode")}
          </span>
        </div>

        {/* Derecha: controles desktop + hamburguesa mobile */}
        <div className="flex items-center space-x-4">
          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <LocaleSwitcher />
            <div onClick={toggleLiveMode} className="flex items-center space-x-2 cursor-pointer group">
              <span className="uppercase tracking-wider text-slate-400 group-hover:text-white transition-colors">
                {isLive ? t("liveMode") : t("simpleMode")}
              </span>
              <div
                className={`w-8 h-4 rounded-full relative flex items-center p-0.5 transition-colors duration-300 ${
                  isLive ? "bg-emerald-500" : "bg-slate-600"
                }`}
              >
                <div
                  className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${
                    isLive ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Mobile: botón hamburguesa */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center w-6 h-6 gap-1"
            aria-label="Menú"
          >
            <span
              className={`block w-4 h-[1.5px] bg-slate-400 transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[4px]" : ""
              }`}
            />
            <span
              className={`block w-4 h-[1.5px] bg-slate-400 transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-4 h-[1.5px] bg-slate-400 transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[4px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Menú mobile desplegable */}
      <div
        className={`md:hidden bg-slate-900/95 backdrop-blur-md border-b border-slate-800 overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-3 flex flex-col gap-3">
          <Navbar />
          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <LocaleSwitcher />
            <div onClick={toggleLiveMode} className="flex items-center space-x-2 cursor-pointer group">
              <span className="uppercase tracking-wider text-slate-400 group-hover:text-white transition-colors text-[10px] font-mono">
                {isLive ? t("liveMode") : t("simpleMode")}
              </span>
              <div
                className={`w-8 h-4 rounded-full relative flex items-center p-0.5 transition-colors duration-300 ${
                  isLive ? "bg-emerald-500" : "bg-slate-600"
                }`}
              >
                <div
                  className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${
                    isLive ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
