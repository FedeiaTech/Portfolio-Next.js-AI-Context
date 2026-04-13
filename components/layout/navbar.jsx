"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-1">
      {NAV_LINKS.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href)

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider transition-all duration-300 ${
              isActive
                ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                : "text-slate-400 hover:text-white border border-transparent"
            }`}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
