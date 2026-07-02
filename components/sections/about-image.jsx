"use client"

import Image from "next/image"
import { useTilt } from "@/hooks/use-tilt"

// Retrato de la bio con inclinación 3D hacia el cursor (mismo useTilt que las
// cards) y un glow esmeralda detrás, coherente con el avatar del hero.
export default function AboutImage({ src, alt, className = "" }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt(8)

  return (
    <div className={`relative w-full max-w-[260px] mx-auto md:mx-0 ${className}`}>
      {/* Glow difuminado detrás */}
      <div className="absolute inset-2 -z-10 rounded-3xl bg-emerald-500/20 blur-3xl opacity-70" />

      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="group transition-transform duration-200 ease-out will-change-transform [transform-style:preserve-3d]"
      >
        <div className="relative aspect-[1038/2048] overflow-hidden rounded-2xl border border-slate-700/80 shadow-xl">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 80vw, 260px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
        </div>
      </div>
    </div>
  )
}
