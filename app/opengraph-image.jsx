import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "#08090d",
        padding: "72px 80px",
        fontFamily: "monospace",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow top-right */}
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Status bar top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 40,
          backgroundColor: "rgba(15,23,42,0.9)",
          borderBottom: "1px solid rgba(51,65,85,0.6)",
          display: "flex",
          alignItems: "center",
          padding: "0 32px",
          gap: 24,
        }}
      >
        <span style={{ color: "#10b981", fontSize: 12, letterSpacing: 2 }}>● ONLINE</span>
        <span style={{ color: "#475569", fontSize: 11, letterSpacing: 3 }}>SANTO TOMÉ, SANTA FE</span>
        <span style={{ color: "#475569", fontSize: 11, letterSpacing: 3 }}>FEDEIATECH.VERCEL.APP</span>
      </div>

      {/* Main content */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative", zIndex: 10 }}>
        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.25)",
            borderRadius: 6,
            padding: "6px 14px",
            width: "fit-content",
          }}
        >
          <span style={{ color: "#10b981", fontSize: 13, letterSpacing: 2 }}>{"</>"}</span>
          <span style={{ color: "#10b981", fontSize: 12, letterSpacing: 3 }}>DESARROLLADOR DE SOFTWARE</span>
        </div>

        {/* Name */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ color: "#ffffff", fontSize: 68, fontWeight: 700, letterSpacing: -2, lineHeight: 1 }}>
            Fede
          </span>
          <span style={{ color: "#10b981", fontSize: 68, fontWeight: 700, letterSpacing: -2, lineHeight: 1 }}>
            Iacono
          </span>
        </div>

        {/* Description */}
        <span style={{ color: "#64748b", fontSize: 20, maxWidth: 560, lineHeight: 1.5, marginTop: 8 }}>
          Portfolio profesional · Blog técnico · Desarrollo web e IA
        </span>
      </div>

      {/* Bottom right: stack tags */}
      <div
        style={{
          position: "absolute",
          bottom: 52,
          right: 80,
          display: "flex",
          gap: 10,
        }}
      >
        {["Next.js", "JavaScript", "Tailwind CSS"].map((tag) => (
          <div
            key={tag}
            style={{
              backgroundColor: "rgba(30,41,59,0.8)",
              border: "1px solid rgba(51,65,85,0.8)",
              borderRadius: 6,
              padding: "6px 14px",
              color: "#94a3b8",
              fontSize: 13,
              letterSpacing: 1,
            }}
          >
            {tag}
          </div>
        ))}
      </div>

      {/* Bottom left: domain */}
      <div
        style={{
          position: "absolute",
          bottom: 52,
          left: 80,
          color: "#334155",
          fontSize: 14,
          letterSpacing: 3,
        }}
      >
        FEDEIATECH.VERCEL.APP
      </div>
    </div>,
    size
  )
}
