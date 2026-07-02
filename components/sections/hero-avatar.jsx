"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"
import { useLiveMode } from "@/context/live-mode-context"
import SleepBubble from "@/components/sections/sleep-bubble"
import WakeExclamation from "@/components/sections/wake-exclamation"

// El canvas WebGL no se renderiza en servidor: carga solo en cliente
const HeroAvatar3D = dynamic(
  () => import("@/components/sections/hero-avatar-3d"),
  { ssr: false }
)

export default function HeroAvatar() {
  const t = useTranslations("avatar")
  const { isLive } = useLiveMode()
  // El 3D avisa cuando el modelo está montado para ocultar el póster
  const [ready, setReady] = useState(false)

  return (
    <div className="relative group cursor-pointer flex justify-center mb-8">
      {/* Burbuja de "zzz..." cuando el avatar duerme (Live Mode apagado) */}
      <SleepBubble active={!isLive} />
      {/* "!" al despertar (Live Mode encendido) */}
      <WakeExclamation live={isLive} />

      {/* Glow circular difuminado detrás del personaje */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-52 md:h-52 rounded-full transition-all duration-700 blur-[40px] ${
          isLive
            ? "bg-emerald-500/30 opacity-60 animate-pulse"
            : "bg-slate-500/10 opacity-20"
        }`}
      />

      {/* Contenedor con máscara circular radial — el borde se disuelve en el fondo */}
      <div
        className="relative w-40 h-40 md:w-52 md:h-52"
        style={{
          maskImage: "radial-gradient(circle, white 45%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(circle, white 45%, transparent 75%)",
        }}
      >
        {/* Cabeza 3D que sigue el mouse — aparece cuando termina de cargar */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: ready ? 1 : 0,
            filter: isLive ? undefined : "brightness(0.7)",
          }}
        >
          <HeroAvatar3D isLive={isLive} onReady={() => setReady(true)} />
        </div>
      </div>

      {/* Barra de carga indeterminada mientras se baja el bundle 3D + el modelo */}
      {!ready && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 z-10">
          <div className="h-1 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full w-1/3 rounded-full bg-emerald-400"
              style={{
                animation: "hero-loading-slide 1.1s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      )}

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
