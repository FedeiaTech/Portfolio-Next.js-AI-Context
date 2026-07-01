"use client"

import { useTranslations } from "next-intl"
import { Link, usePathname } from "@/i18n/navigation"
import { useMagnetic } from "@/hooks/use-magnetic"

function MagneticLink({ href, className, onClick, children }) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(0.4)
  return (
    <Link
      ref={ref}
      href={href}
      className={className}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Link>
  )
}

export default function Navbar({ onNavigate }) {
  const t = useTranslations("nav")
  const pathname = usePathname()

  const NAV_LINKS = [
    { href: "/", label: t("home") },
    { href: "/blog", label: t("blog") },
    { href: "/contacto", label: t("contact") },
  ]

  return (
    <nav className="flex items-center gap-1">
      {NAV_LINKS.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href)

        return (
          <MagneticLink
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={`inline-block px-3 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider transition-all duration-300 ${
              isActive
                ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                : "text-slate-400 hover:text-white border border-transparent"
            }`}
          >
            {link.label}
          </MagneticLink>
        )
      })}
    </nav>
  )
}
