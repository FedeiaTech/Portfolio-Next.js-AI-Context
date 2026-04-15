import { createNavigation } from "next-intl/navigation"

export const locales = ["es", "en"]
export const defaultLocale = "es"

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  defaultLocale,
})
