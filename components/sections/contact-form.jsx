"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY

export default function ContactForm() {
  const t = useTranslations("contactForm")
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
        <h3 className="text-xl font-bold text-white mb-2">{t("successTitle")}</h3>
        <p className="text-slate-400 text-sm mb-6">{t("successMsg")}</p>
        <button
          onClick={() => setStatus("idle")}
          className="text-[11px] font-mono text-emerald-400 border border-emerald-500/30 px-6 py-2 rounded-full hover:bg-emerald-500 hover:text-white transition-all duration-300"
        >
          {t("sendAnotherBtn")}
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
          {t("filename")}
        </span>
      </div>

      <div className="p-6">
        <div className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">
              {t("nameLabel")}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder={t("namePlaceholder")}
              className="w-full bg-slate-900/60 border border-slate-700/80 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 font-mono outline-none focus:border-emerald-500/50 focus:shadow-[0_0_10px_rgba(16,185,129,0.08)] transition-all duration-300"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">
              {t("emailLabel")}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder={t("emailPlaceholder")}
              className="w-full bg-slate-900/60 border border-slate-700/80 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 font-mono outline-none focus:border-emerald-500/50 focus:shadow-[0_0_10px_rgba(16,185,129,0.08)] transition-all duration-300"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">
              {t("messageLabel")}
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder={t("messagePlaceholder")}
              className="w-full bg-slate-900/60 border border-slate-700/80 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 font-mono outline-none focus:border-emerald-500/50 focus:shadow-[0_0_10px_rgba(16,185,129,0.08)] transition-all duration-300 resize-none"
            />
          </div>

          {/* Error */}
          {status === "error" && (
            <p className="text-red-400 font-mono text-[10px] bg-red-400/10 py-2 px-3 rounded-md border border-red-400/20">
              {t("errorMsg")}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "sending" || !formData.name || !formData.email || !formData.message}
            className="w-full py-3 bg-slate-900/60 hover:bg-emerald-500 border border-slate-700/50 hover:border-emerald-500 rounded-lg text-[11px] font-mono text-slate-400 hover:text-white uppercase tracking-widest transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-slate-900/60 disabled:hover:text-slate-400 disabled:hover:border-slate-700/50"
          >
            {status === "sending" ? (
              <span className="animate-pulse">{t("sendingBtn")}</span>
            ) : (
              t("submitBtn")
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
