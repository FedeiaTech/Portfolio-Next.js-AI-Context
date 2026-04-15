"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { useLiveMode } from "@/context/live-mode-context"

export default function HeroAvatar() {
  const t = useTranslations("avatar")
  const { isLive } = useLiveMode()

  return (
    <div className="relative group cursor-pointer flex justify-center mb-8">
      {/* Glow circular difuminado detrás del personaje */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-52 md:h-52 rounded-full transition-all duration-700 blur-[40px] ${
          isLive
            ? "bg-emerald-500/30 opacity-60 animate-pulse"
            : "bg-slate-500/10 opacity-20"
        }`}
      />

      {/* Imagen con máscara circular radial — borde se disuelve en el fondo */}
      <div
        className="relative w-40 h-40 md:w-52 md:h-52"
        style={{
          maskImage: "radial-gradient(circle, white 45%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(circle, white 45%, transparent 75%)",
        }}
      >
        <Image
          src="/images/char/happy.webp"
          alt="Avatar de Fede"
          fill
          className="object-cover transition-all duration-500"
          style={{
            mixBlendMode: "screen",
            willChange: "transform",
            transform: "translateZ(0)",
            filter: isLive
              ? "drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))"
              : "grayscale(1) brightness(0.5)",
          }}
          priority
          unoptimized
        />
      </div>

      <div
        className={`absolute bottom-0 px-4 py-1 rounded-full text-[10px] font-mono shadow-lg transform transition-all duration-500 z-20 ${
          isLive
            ? "bg-slate-900 border-emerald-500 text-emerald-400 translate-y-3 group-hover:-translate-y-1"
            : "bg-slate-950 border-slate-700 text-slate-600 translate-y-3"
        } border`}
      >
        {isLive ? t("online") : t("standby")}
      </div>
    </div>
  )
}
