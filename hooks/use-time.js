"use client"

import { useState, useEffect } from "react"

export const useTime = () => {
  const [time, setTime] = useState(null)

  useEffect(() => {
    setTime(new Date())
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!time) {
    return { time: "--:--:--", greeting: "", hour: 0 }
  }

  const formattedTime = time.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })

  const hour = time.getHours()
  let greeting = "Buenas noches"
  if (hour >= 6 && hour < 12) {
    greeting = "Buenos días"
  } else if (hour >= 12 && hour < 19) {
    greeting = "Buenas tardes"
  }

  return { time: formattedTime, greeting, hour }
}