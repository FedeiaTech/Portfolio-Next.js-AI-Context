"use client"

import { useTime } from "@/hooks/use-time"
import { useLiveMode } from "@/context/live-mode-context"
import Navbar from "@/components/layout/navbar"

export default function StatusBar() {
  const { time } = useTime()
  const { isLive, toggleLiveMode } = useLiveMode()

  return (
    <div className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 text-slate-300 text-xs font-mono py-2 px-4 flex justify-between items-center fixed top-0 z-50 transition-colors duration-500">
      {/* Left: Clock + Location */}
      <div className="flex items-center space-x-4">
        <span className="flex items-center space-x-1">
          <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{time}</span>
        </span>
        <span className="hidden sm:inline-block tracking-widest uppercase">Oro Verde, ARG</span>

        {/* Navigation */}
        <div className="hidden md:block ml-2">
          <Navbar />
        </div>
      </div>

      {/* Center: Status */}
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
          {isLive ? "Open to Work" : "Modo Ahorro"}
        </span>
      </div>

      {/* Right: Live Toggle */}
      <div className="flex items-center space-x-4">
        {/* Mobile nav */}
        <div className="md:hidden">
          <Navbar />
        </div>

        <div onClick={toggleLiveMode} className="flex items-center space-x-2 cursor-pointer group">
          <span className="uppercase tracking-wider text-slate-400 group-hover:text-white transition-colors hidden sm:inline-block">
            {isLive ? "Modo Vivo" : "Modo Simple"}
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
  )
}
