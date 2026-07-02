"use client"

import { useEffect, useRef, useState } from "react"

// Burbuja de "sueño" del avatar: cuando el Live Mode está apagado, tipea
// "zzz..." en loop con estética de terminal. El cursor titila solo al terminar.
const SLEEP_TEXT = "zzz..."
const TYPE_SPEED = 220 // ms por carácter (lento, dormido)
const HOLD = 2600 // ms con el texto completo (el cursor titila en esta ventana)

export default function SleepBubble({ active }) {
  const [text, setText] = useState("")
  const [complete, setComplete] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    if (!active) {
      setText("")
      setComplete(false)
      return
    }
    let i = 0
    const tick = () => {
      if (i <= SLEEP_TEXT.length) {
        setText(SLEEP_TEXT.slice(0, i))
        setComplete(i === SLEEP_TEXT.length) // terminó de escribir
        i++
        timer.current = setTimeout(tick, TYPE_SPEED)
      } else {
        // Mantiene el texto completo y luego reinicia el ciclo (ronquido continuo)
        timer.current = setTimeout(() => {
          i = 0
          tick()
        }, HOLD)
      }
    }
    tick()
    return () => clearTimeout(timer.current)
  }, [active])

  return (
    <div
      aria-hidden="true"
      className="absolute top-2 -right-2 md:top-4 md:-right-6 z-30"
    >
      <div
        className={`flex h-7 w-[80px] items-center rounded-lg rounded-bl-none border border-slate-700/70 bg-slate-900/60 px-2.5 shadow-lg backdrop-blur-sm origin-center transition-all duration-300 ease-out ${
          active ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        <span className="font-mono text-xs tracking-widest text-emerald-400 lowercase">
          {text}
        </span>
        <span
          className={`ml-0.5 inline-block h-3.5 w-[2px] bg-emerald-400 ${
            complete ? "terminal-cursor" : ""
          }`}
        />
      </div>
    </div>
  )
}
