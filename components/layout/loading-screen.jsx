"use client"

import { useState, useEffect } from "react"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [label, setLabel] = useState("Initializing...")
  const [fading, setFading] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    function finish() {
      setProgress(100)
      setLabel("Ready.")
      setTimeout(() => setFading(true), 400)
      setTimeout(() => setGone(true), 900)
    }

    if (document.readyState === "complete") {
      setProgress(100)
      setLabel("Ready.")
      const t1 = setTimeout(() => setFading(true), 300)
      const t2 = setTimeout(() => setGone(true), 800)
      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
      }
    }

    setProgress(20)
    setLabel("Parsing DOM...")

    if (document.readyState === "interactive") {
      setProgress(65)
      setLabel("Loading assets...")
    }

    function onReadyStateChange() {
      if (document.readyState === "interactive") {
        setProgress(65)
        setLabel("Loading assets...")
      }
      if (document.readyState === "complete") {
        finish()
      }
    }

    document.addEventListener("readystatechange", onReadyStateChange)
    window.addEventListener("load", finish)

    return () => {
      document.removeEventListener("readystatechange", onReadyStateChange)
      window.removeEventListener("load", finish)
    }
  }, [])

  if (gone) return null

  return (
    <div
      className={`fixed inset-0 z-[200] bg-slate-950 flex flex-col items-center justify-center transition-opacity duration-500 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-xs px-8 flex flex-col items-center gap-6">
        <div className="text-center">
          <span className="font-mono text-emerald-400 text-xl font-bold tracking-widest">
            FEDEIATECH
          </span>
          <div className="text-slate-500 text-[10px] font-mono tracking-widest mt-1 uppercase">
            Portfolio v2.0
          </div>
        </div>

        <div className="w-full">
          <div className="w-full h-[2px] bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[10px] font-mono text-slate-500">{label}</span>
            <span className="text-[10px] font-mono text-emerald-400">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
