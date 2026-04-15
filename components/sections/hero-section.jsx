"use client"

import { useTranslations } from "next-intl"
import { useTime } from "@/hooks/use-time"
import HeroAvatar from "@/components/sections/hero-avatar"

export default function HeroSection() {
  const t = useTranslations("hero")
  const { hour } = useTime()

  const greeting =
    hour === null
      ? ""
      : hour >= 6 && hour < 12
      ? t("greetingMorning")
      : hour >= 12 && hour < 19
      ? t("greetingAfternoon")
      : t("greetingNight")

  return (
    <div className="text-center max-w-2xl px-4 flex flex-col items-center">
      <HeroAvatar />
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
        {greeting},<br />
        <span className="text-emerald-400">{t("name")}</span>
      </h1>
      <h2 className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed">
        {t("description")}
      </h2>
    </div>
  )
}
