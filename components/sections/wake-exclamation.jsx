"use client"

import { useEffect, useState } from "react"

// Signo de admiración rojo estilo WordArt que aparece medio segundo cuando el
// avatar despierta (Live Mode pasa de apagado a encendido). Pop desde el centro.
// Detecta el flanco de subida en render (prop previa en state) y se desmonta solo
// por timer a los WAKE_DURATION ms — no depende del fill-mode del CSS.
const WAKE_DURATION = 500 // ms visible

export default function WakeExclamation({ live }) {
  const [prevLive, setPrevLive] = useState(live)
  const [visible, setVisible] = useState(false)
  const [wakeId, setWakeId] = useState(0)

  if (prevLive !== live) {
    setPrevLive(live)
    if (live) {
      setVisible(true)
      setWakeId((n) => n + 1)
    } else {
      setVisible(false)
    }
  }

  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setVisible(false), WAKE_DURATION)
    return () => clearTimeout(t)
  }, [wakeId, visible])

  if (!visible) return null

  return (
    <div
      key={wakeId}
      aria-hidden="true"
      className="wake-pop pointer-events-none absolute -top-2 right-8 md:right-6 z-30 origin-center"
    >
      <span
        className="block select-none font-black italic leading-none text-6xl -rotate-12"
        style={{
          background: "linear-gradient(180deg, #f87171 0%, #dc2626 55%, #991b1b 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          WebkitTextStroke: "1.5px #450a0a",
          filter: "drop-shadow(2px 3px 0 rgba(0,0,0,0.4))",
        }}
      >
        !
      </span>
    </div>
  )
}
