"use client"

import { LiveModeProvider } from "@/context/live-mode-context"
import AmbientBackground from "@/components/layout/ambient-background"
import StatusBar from "@/components/layout/status-bar"
import Footer from "@/components/layout/footer"
import LoadingScreen from "@/components/layout/loading-screen"

export default function ClientProviders({ children }) {
  return (
    <LiveModeProvider>
      <LoadingScreen />
      <AmbientBackground />
      <div className="relative z-10 min-h-screen flex flex-col pt-16 font-sans selection:bg-emerald-500 selection:text-white">
        <StatusBar />
        {children}
        <Footer />
      </div>
    </LiveModeProvider>
  )
}
