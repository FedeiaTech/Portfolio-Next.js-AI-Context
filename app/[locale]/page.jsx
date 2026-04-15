import { setRequestLocale } from "next-intl/server"
import HeroSection from "@/components/sections/hero-section"
import LiveDashboard from "@/components/sections/live-dashboard"
import ProjectsGallery from "@/components/sections/projects-gallery"
import TerminalChat from "@/components/sections/terminal-chat"

export default async function HomePage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="flex-grow flex flex-col items-center mt-12 md:mt-20 w-full mb-12">
      <HeroSection />
      <LiveDashboard />
      <ProjectsGallery />
      <TerminalChat />
    </main>
  )
}
