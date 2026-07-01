"use client"

import { useEffect, useRef, useState } from "react"

// Global tap/click feedback. A single pointerdown listener covers both
// touch (mobile) and mouse (desktop). The overlay is fixed and
// pointer-events-none so it never intercepts clicks on buttons or links.
const RIPPLE_SIZE = 180
const RIPPLE_LIFETIME = 600

export default function TapRipple() {
  const [ripples, setRipples] = useState([])
  const nextId = useRef(0)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (media.matches) return

    function handlePointerDown(event) {
      // Skip ripple over interactive controls so it never competes with real UI actions.
      if (event.target.closest("a, button, input, textarea, select, label, [role='button']")) {
        return
      }
      const id = nextId.current++
      setRipples((prev) => [...prev, { id, x: event.clientX, y: event.clientY }])
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id))
      }, RIPPLE_LIFETIME)
    }

    window.addEventListener("pointerdown", handlePointerDown)
    return () => window.removeEventListener("pointerdown", handlePointerDown)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" aria-hidden="true">
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="tap-ripple absolute rounded-full border-2 border-emerald-400/70 bg-emerald-400/10"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: RIPPLE_SIZE,
            height: RIPPLE_SIZE,
            marginLeft: -RIPPLE_SIZE / 2,
            marginTop: -RIPPLE_SIZE / 2,
          }}
        />
      ))}
    </div>
  )
}
