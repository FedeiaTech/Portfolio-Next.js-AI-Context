"use client"

import { createContext, useState, useContext } from "react"

const LiveModeContext = createContext()

export function LiveModeProvider({ children }) {
  const [isLive, setIsLive] = useState(true)

  const toggleLiveMode = () => {
    setIsLive((prev) => !prev)
  }

  return (
    <LiveModeContext.Provider value={{ isLive, toggleLiveMode }}>
      {children}
    </LiveModeContext.Provider>
  )
}

export function useLiveMode() {
  return useContext(LiveModeContext)
}
