"use client"

import { useTime } from "@/hooks/use-time"
import HeroAvatar from "@/components/sections/hero-avatar"

export default function HeroSection() {
  const { greeting } = useTime()

  return (
    <div className="text-center max-w-2xl px-4 flex flex-col items-center">
      <HeroAvatar />
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
        {greeting},<br />
        <span className="text-emerald-400">soy Fede.</span>
      </h1>
      <h2 className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed">
        Desarrollador de Software especializado en crear experiencias web
        interactivas y dinámicas.
      </h2>
    </div>
  )
}
