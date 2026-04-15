"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useLiveMode } from "@/context/live-mode-context"

const SETTINGS = {
  count: 120,
  connectionDistance: 130,
  repulsionRadius: 190,
  repulsionStrength: 0.4,
  friction: 0.92,
  color: "16, 185, 129",
  spotlightSize: 600,
}

export default function AmbientBackground() {
  const { isLive } = useLiveMode()
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const context = useRef(null)
  const particles = useRef([])
  const spotlightPos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const animationRef = useRef()
  const isInitialized = useRef(false)

  const [nebulas, setNebulas] = useState([])

useEffect(() => {
  setNebulas(
    Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 400 + 200,
    }))
  )
}, [])

  const createParticle = (w, h) => ({
    x: Math.random() * w,
    y: Math.random() * h,
    size: Math.random() * 2 + 0.5,
    baseAlpha: Math.random() * 0.3 + 0.1,
    alpha: 0,
    dx: (Math.random() - 0.5) * 0.05,
    dy: (Math.random() - 0.5) * 0.05,
    vx: 0,
    vy: 0,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: Math.random() * 0.005,
  })

  const handleResize = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return
    const w = containerRef.current.offsetWidth
    const h = containerRef.current.offsetHeight
    const dpr = window.devicePixelRatio || 1

    canvasRef.current.width = w * dpr
    canvasRef.current.height = h * dpr
    canvasRef.current.style.width = `${w}px`
    canvasRef.current.style.height = `${h}px`

    context.current = canvasRef.current.getContext("2d")
    context.current.scale(dpr, dpr)
  }, [])

  const draw = useCallback(() => {
    if (!context.current || !containerRef.current || !isLive) return

    const ctx = context.current
    const w = containerRef.current.offsetWidth
    const h = containerRef.current.offsetHeight

    ctx.clearRect(0, 0, w, h)

    const sp = spotlightPos.current
    sp.x += (sp.targetX - sp.x) * 0.05
    sp.y += (sp.targetY - sp.y) * 0.05

    const gradient = ctx.createRadialGradient(sp.x, sp.y, 0, sp.x, sp.y, SETTINGS.spotlightSize)
    gradient.addColorStop(0, `rgba(${SETTINGS.color}, 0.1)`)
    gradient.addColorStop(1, "transparent")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, w, h)

    const pts = particles.current

    pts.forEach((p) => {
      const dx = p.x - sp.x
      const dy = p.y - sp.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < SETTINGS.repulsionRadius) {
        const force = (SETTINGS.repulsionRadius - dist) / SETTINGS.repulsionRadius
        const angle = Math.atan2(dy, dx)
        p.vx += Math.cos(angle) * force * SETTINGS.repulsionStrength
        p.vy += Math.sin(angle) * force * SETTINGS.repulsionStrength
      }

      p.vx *= SETTINGS.friction
      p.vy *= SETTINGS.friction

      p.wobble += p.wobbleSpeed
      const driftX = Math.sin(p.wobble) * 0.08
      const driftY = Math.cos(p.wobble) * 0.08

      p.x += p.dx + p.vx + driftX
      p.y += p.dy + p.vy + driftY

      if (p.x < -20) p.x = w + 20
      if (p.x > w + 20) p.x = -20
      if (p.y < -20) p.y = h + 20
      if (p.y > h + 20) p.y = -20

      const lightFactor = Math.max(0, 1 - dist / (SETTINGS.spotlightSize * 0.8))
      const targetAlpha = 0.05 + p.baseAlpha * lightFactor
      p.alpha += (targetAlpha - p.alpha) * 0.05
    })

    ctx.lineWidth = 0.8
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x
        const dy = pts[i].y - pts[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < SETTINGS.connectionDistance) {
          const lineAlpha = (1 - dist / SETTINGS.connectionDistance) * 0.15
          ctx.strokeStyle = `rgba(${SETTINGS.color}, ${lineAlpha})`
          ctx.beginPath()
          ctx.moveTo(pts[i].x, pts[i].y)
          ctx.lineTo(pts[j].x, pts[j].y)
          ctx.stroke()
        }
      }
    }

    pts.forEach((p) => {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${SETTINGS.color}, ${p.alpha})`
      ctx.fill()
    })

    animationRef.current = requestAnimationFrame(draw)
  }, [isLive])

  useEffect(() => {
    if (!isInitialized.current && containerRef.current) {
      const w = containerRef.current.offsetWidth
      const h = containerRef.current.offsetHeight
      particles.current = Array.from({ length: SETTINGS.count }).map(() => createParticle(w, h))
      spotlightPos.current = { x: w / 2, y: h / 2, targetX: w / 2, targetY: h / 2 }
      isInitialized.current = true
    }

    handleResize()
    if (isLive) animationRef.current = requestAnimationFrame(draw)

    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      spotlightPos.current.targetX = e.clientX - rect.left
      spotlightPos.current.targetY = e.clientY - rect.top
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationRef.current)
    }
  }, [isLive, draw, handleResize])

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 bg-slate-950 overflow-hidden pointer-events-none">
      {isLive &&
        nebulas.map((n) => (
          <div
            key={n.id}
            className="absolute rounded-full bg-emerald-500/5 blur-[120px] animate-pulse"
            style={{ top: n.top, left: n.left, width: `${n.size}px`, height: `${n.size}px` }}
          />
        ))}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 transition-opacity duration-1000 ${isLive ? "opacity-100" : "opacity-0"}`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.7)_100%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  )
}
