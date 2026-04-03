"use client"

import Image from "next/image"
import { useLiveMode } from "@/context/live-mode-context"

export default function HeroAvatar() {
  const { isLive } = useLiveMode()

  return (
    <div className="relative group cursor-pointer flex justify-center mb-8">
      <div
        className={`absolute inset-0 rounded-full transition-all duration-700 blur-[30px] ${
          isLive
            ? "bg-gradient-to-tr from-emerald-500/20 via-blue-500/10 to-emerald-500/20 opacity-40 animate-pulse"
            : "bg-slate-700/10 opacity-10"
        }`}
      />

      <div
        className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-slate-900 border-2 overflow-hidden transition-all duration-500 ${
          isLive
            ? "border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
            : "border-slate-800"
        }`}
      >
        <Image
          src="/images/char/idle.png"
          alt="Avatar de Fede"
          fill
          className={`object-cover transition-all duration-500 ${
            isLive ? "opacity-100" : "opacity-40 grayscale"
          }`}
          style={{
            filter: isLive
              ? "drop-shadow(0 0 5px rgba(16, 185, 129, 0.4))"
              : "none",
          }}
          priority
        />

        {isLive && (
          <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <Image
              src="/images/char/idle.png"
              alt="Glow Hover"
              fill
              className="object-cover"
              style={{
                filter:
                  "drop-shadow(0 0 8px rgba(209, 250, 229, 0.6)) brightness(1.1)",
              }}
            />
          </div>
        )}

        {isLive && (
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.03)_50%)] bg-[length:100%_4px] pointer-events-none opacity-10" />
        )}
      </div>

      <div
        className={`absolute bottom-0 px-4 py-1 rounded-full text-[10px] font-mono shadow-lg transform transition-all duration-500 z-20 ${
          isLive
            ? "bg-slate-900 border-emerald-500 text-emerald-400 translate-y-3 group-hover:-translate-y-1"
            : "bg-slate-950 border-slate-700 text-slate-600 translate-y-3"
        } border`}
      >
        {isLive ? "NVL. 36 - ONLINE" : "SISTEMA_STANDBY"}
      </div>
    </div>
  )
}
