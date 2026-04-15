"use client"

import { useState, useEffect } from "react"

export const useTime = (localeStr = "es-AR") => {
  const [time, setTime] = useState(null)

  useEffect(() => {
    setTime(new Date())
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!time) {
    return { time: "--:--:--", hour: null }
  }

  const formattedTime = time.toLocaleTimeString(localeStr, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })

  const hour = time.getHours()

  return { time: formattedTime, hour }
}
