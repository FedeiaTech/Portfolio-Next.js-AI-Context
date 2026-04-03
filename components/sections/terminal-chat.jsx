"use client"

import { useState, useRef, useEffect } from "react"

export default function TerminalChat() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Conexión establecida. Soy el asistente virtual de Fede." },
    { sender: "bot", text: "Puedes preguntarme sobre: [estudios], [tecnologias], [proyectos] o [contacto]." },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const generateBotResponse = (userInput) => {
    const text = userInput.toLowerCase()

    if (text.includes("estudio") || text.includes("utn") || text.includes("educacion")) {
      return "Fede es estudiante de Programación en la UTN (Universidad Tecnológica Nacional). Busca constantemente aplicar la teoría académica en sistemas reales."
    }
    if (text.includes("tecno") || text.includes("stack") || text.includes("habilidad")) {
      return "Su stack principal incluye React para el frontend, junto con experiencia sólida en Java, JavaFX, Python, SQL y Godot Engine para lógica compleja y videojuegos."
    }
    if (text.includes("proyecto") || text.includes("portfolio") || text.includes("experiencia")) {
      return 'Actualmente desarrolla "Iron & Elfskin" (RPG 2D), la herramienta "Sprite Lab" en Java, y sistemas ERP modulares para PyMEs.'
    }
    if (text.includes("contacto") || text.includes("email") || text.includes("hablar")) {
      return "Puedes contactarlo directamente a través del formulario al final de esta página o en su perfil de GitHub (@FedeiaTech)."
    }
    if (text.includes("clear") || text.includes("limpiar")) {
      setMessages([])
      return "Consola limpiada. ¿En qué más puedo ayudarte?"
    }

    return "Comando no reconocido. Prueba con palabras clave como: estudios, tecnologias o proyectos."
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
        <h2 className="text-2xl font-bold text-white tracking-tight">Terminal Interactiva</h2>
      </div>

      <div className="bg-[#0D1117] border border-slate-700/80 rounded-xl overflow-hidden shadow-2xl font-mono text-sm">
        <div className="bg-slate-800/80 px-4 py-2 flex items-center space-x-2 border-b border-slate-700/80">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-4 text-xs text-slate-400 font-sans">IA_Asistente.exe</span>
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
            placeholder="Escribe un comando..."
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
