"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslations } from "next-intl"

export default function TerminalChat() {
  const t = useTranslations("terminal")
  const [messages, setMessages] = useState(() => [
    { sender: "bot", text: t("initialMsg1") },
    { sender: "bot", text: t("initialMsg2") },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const generateBotResponse = (userInput) => {
    const text = userInput.toLowerCase()

    if (text.includes("estudio") || text.includes("utn") || text.includes("educacion") || text.includes("education")) {
      return t("respEducation")
    }
    if (text.includes("tecno") || text.includes("stack") || text.includes("habilidad") || text.includes("technolog")) {
      return t("respTech")
    }
    if (text.includes("proyecto") || text.includes("portfolio") || text.includes("experiencia") || text.includes("project")) {
      return t("respProjects")
    }
    if (text.includes("contacto") || text.includes("email") || text.includes("hablar") || text.includes("contact")) {
      return t("respContact")
    }
    if (text.includes("clear") || text.includes("limpiar")) {
      setMessages([])
      return t("respCleared")
    }

    return t("respUnknown")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessages = [...messages, { sender: "user", text: input }]
    setMessages(newMessages)
    setInput("")

    setTimeout(() => {
      const botReply = generateBotResponse(input)
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }])
    }, 500)
  }

  return (
    <section className="w-full max-w-3xl mx-auto mt-20 px-4">
      <div className="flex items-center space-x-3 mb-6">
        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h2 className="text-2xl font-bold text-white tracking-tight">{t("title")}</h2>
      </div>

      <div className="bg-[#0D1117] border border-slate-700/80 rounded-xl overflow-hidden shadow-2xl font-mono text-sm">
        <div className="bg-slate-800/80 px-4 py-2 flex items-center space-x-2 border-b border-slate-700/80">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-4 text-xs text-slate-400 font-sans">{t("filename")}</span>
        </div>

        <div className="p-4 h-64 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {messages.map((msg, index) => (
            <div key={index} className="flex flex-col">
              {msg.sender === "bot" ? (
                <div className="flex space-x-2 text-emerald-400">
                  <span>&gt;</span>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              ) : (
                <div className="flex space-x-2 text-blue-400">
                  <span>$</span>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="border-t border-slate-800 p-2 flex items-center bg-[#090C10]">
          <span className="text-emerald-500 px-3 font-bold">~</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("placeholder")}
            className="flex-grow bg-transparent border-none outline-none text-slate-300 placeholder-slate-600 focus:ring-0 px-2"
            autoComplete="off"
          />
          <button type="submit" className="text-slate-500 hover:text-emerald-400 px-3 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>
    </section>
  )
}
