"use client"

import { useState } from "react"
import { getGitHubData } from "@/lib/github-service"
import { useLiveMode } from "@/context/live-mode-context"

export default function LiveDashboard() {
  const { isLive } = useLiveMode()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSpy = async () => {
    if (!isLive) return
    setLoading(true)
    setError(null)
    try {
      const result = await getGitHubData()
      setData(result)
    } catch (apiError) {
      console.error(apiError)
      setError("Error de red o límite de API alcanzado.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      className={`w-full max-w-5xl mx-auto mt-12 px-4 transition-all duration-700 ${
        !isLive
          ? "grayscale opacity-50 pointer-events-none"
          : "grayscale-0 opacity-100"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Último Commit */}
        <div
          className={`flex flex-col bg-slate-800/40 rounded-xl border transition-all duration-500 ${
            data && isLive
              ? "border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
              : "border-slate-700"
          }`}
        >
          <div className="p-6 flex-grow">
            <div className="flex justify-between items-start mb-4 text-white font-medium">
              <h3>Último Commit</h3>
              {data && (
                <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-md border border-yellow-500/20">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.169L12 18.896l-7.334 3.87 1.4-8.169L.132 9.21l8.2-1.192z" />
                  </svg>
                  <span className="text-xs font-bold font-mono">
                    {data.lastCommit.stars}
                  </span>
                </div>
              )}
            </div>
            <div className="min-h-[100px] flex flex-col justify-center">
              {data ? (
                <div>
                  <p className="text-[10px] text-slate-500 font-mono uppercase tracking-tighter mb-2">
                    Repo:{" "}
                    <span className="text-emerald-400">
                      {data.lastCommit.repoName}
                    </span>
                  </p>
                  <div className="bg-slate-950 p-3 rounded border border-slate-800 text-[11px] text-slate-300 font-mono relative overflow-hidden shadow-inner">
                    <span className="text-emerald-500 mr-2 opacity-50">$</span>
                    <span className="italic">
                      &quot;{data.lastCommit.message}&quot;
                    </span>
                    {isLive && (
                      <div className="absolute bottom-0 right-0 w-1 h-4 bg-emerald-500/20 animate-pulse" />
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex justify-center">
                  {loading ? (
                    <div className="text-emerald-500 font-mono text-[10px] animate-pulse tracking-widest">
                      CONECTANDO...
                    </div>
                  ) : (
                    <button
                      onClick={handleSpy}
                      disabled={!isLive}
                      className="text-[10px] font-mono text-emerald-400 border border-emerald-500/30 px-6 py-2 rounded-full hover:bg-emerald-500 hover:text-white transition-all duration-300 disabled:opacity-30"
                    >
                      &gt;_ {isLive ? "ESCANEAR" : "SISTEMA OFFLINE"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="px-6 py-3 border-t border-slate-700/50 bg-slate-900/20 rounded-b-xl">
            {data ? (
              <a
                href={data.lastCommit.url}
                target="_blank"
                rel="noreferrer"
                className="block text-center text-[9px] text-slate-500 hover:text-emerald-400 font-mono uppercase tracking-widest transition-colors"
              >
                Ver repositorio completo &gt;_
              </a>
            ) : (
              <p className="text-[9px] text-slate-600 font-mono uppercase tracking-widest text-center">
                Esperando escaneo...
              </p>
            )}
          </div>
        </div>

        {/* Stack Tecnológico */}
        <div
          className={`flex flex-col bg-slate-800/40 rounded-xl border transition-all duration-500 ${
            data && isLive
              ? "border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
              : "border-slate-700"
          }`}
        >
          <div className="p-6 flex-grow">
            <h3 className="text-white font-medium mb-4">Stack Tecnológico</h3>
            <div className="flex flex-wrap gap-2 min-h-[100px] items-center">
              {data
                ? data.topLanguages.map((lang) => (
                    <span
                      key={lang}
                      className="px-2 py-1 text-[10px] font-mono font-bold rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-tighter"
                    >
                      {lang}
                    </span>
                  ))
                : [1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`h-6 w-12 bg-slate-900/50 rounded border border-slate-800 ${
                        isLive ? "animate-pulse" : ""
                      }`}
                    />
                  ))}
            </div>
          </div>
          <div className="px-6 py-3 border-t border-slate-700/50 bg-slate-900/20 rounded-b-xl text-center">
            <p className="text-[9px] text-slate-600 font-mono uppercase tracking-widest">
              {data
                ? "Arsenal tecnológico recientemente utilizado"
                : "Esperando escaneo..."}
            </p>
          </div>
        </div>

        {/* Métricas Dev */}
        <div
          className={`flex flex-col bg-slate-800/40 rounded-xl border transition-all duration-500 ${
            data && isLive ? "border-slate-600" : "border-slate-700"
          }`}
        >
          <div className="p-6 flex-grow">
            <h3 className="text-white font-medium mb-4">Métricas Dev</h3>
            <div className="grid grid-cols-2 gap-4 text-center min-h-[100px] items-center">
              <div className="bg-slate-900/50 p-2 rounded border border-slate-800">
                <p className="text-2xl font-bold text-white font-mono">
                  {data ? data.stats.repos : "--"}
                </p>
                <p className="text-[10px] text-slate-500 uppercase tracking-tighter">
                  Proyectos
                </p>
              </div>
              <div className="bg-slate-900/50 p-2 rounded border border-slate-800">
                <p className="text-2xl font-bold text-white font-mono">
                  {data ? data.stats.followers : "--"}
                </p>
                <p className="text-[10px] text-slate-500 uppercase tracking-tighter">
                  Seguidores
                </p>
              </div>
            </div>
          </div>
          <div className="px-6 py-3 border-t border-slate-700/50 bg-slate-900/20 rounded-b-xl text-center">
            <p className="text-[9px] text-slate-600 font-mono uppercase tracking-widest">
              {data
                ? "Actividad verificada en GitHub"
                : "Esperando escaneo..."}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-center text-red-400 font-mono text-[10px] mt-6 bg-red-400/10 py-2 rounded-md border border-red-400/20 mx-auto max-w-xs">
          {error}
        </p>
      )}
    </section>
  )
}
