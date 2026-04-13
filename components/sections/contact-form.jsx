"use client"

import { useState } from "react"

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState("idle") // idle | sending | success | error

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("sending")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Nuevo mensaje de ${formData.name} — FedeiaTech`,
          from_name: formData.name,
          ...formData,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setStatus("success")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-8 text-center">
        <div className="text-emerald-400 text-4xl mb-4">✓</div>
        <h3 className="text-xl font-bold text-white mb-2">Mensaje enviado</h3>
        <p className="text-slate-400 text-sm mb-6">
          Te respondo lo antes posible. Gracias por escribirme.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-[11px] font-mono text-emerald-400 border border-emerald-500/30 px-6 py-2 rounded-full hover:bg-emerald-500 hover:text-white transition-all duration-300"
        >
          &gt;_ ENVIAR_OTRO_MENSAJE
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800/40 border border-slate-700/80 rounded-xl overflow-hidden"
    >
      {/* Terminal header */}
      <div className="bg-slate-800/80 px-5 py-2.5 flex items-center space-x-2 border-b border-slate-700/80">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        <span className="ml-4 text-xs text-slate-400 font-mono">
          contacto.exe
        </span>
      </div>

      <div className="p-6">
        <div className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">
              &gt;_ Nombre
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Tu nombre"
              className="w-full bg-slate-900/60 border border-slate-700/80 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 font-mono outline-none focus:border-emerald-500/50 focus:shadow-[0_0_10px_rgba(16,185,129,0.08)] transition-all duration-300"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">
              &gt;_ Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
              className="w-full bg-slate-900/60 border border-slate-700/80 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 font-mono outline-none focus:border-emerald-500/50 focus:shadow-[0_0_10px_rgba(16,185,129,0.08)] transition-all duration-300"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">
              &gt;_ Mensaje
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Contame sobre tu proyecto o idea..."
              className="w-full bg-slate-900/60 border border-slate-700/80 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 font-mono outline-none focus:border-emerald-500/50 focus:shadow-[0_0_10px_rgba(16,185,129,0.08)] transition-all duration-300 resize-none"
            />
          </div>

          {/* Error */}
          {status === "error" && (
            <p className="text-red-400 font-mono text-[10px] bg-red-400/10 py-2 px-3 rounded-md border border-red-400/20">
              Error al enviar. Verificá tu conexión o intentá de nuevo.
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "sending" || !formData.name || !formData.email || !formData.message}
            className="w-full py-3 bg-slate-900/60 hover:bg-emerald-500 border border-slate-700/50 hover:border-emerald-500 rounded-lg text-[11px] font-mono text-slate-400 hover:text-white uppercase tracking-widest transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-slate-900/60 disabled:hover:text-slate-400 disabled:hover:border-slate-700/50"
          >
            {status === "sending" ? (
              <span className="animate-pulse">{">_ ENVIANDO..."}</span>
            ) : (
              <>{">"}_  TRANSMITIR_MENSAJE</>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
