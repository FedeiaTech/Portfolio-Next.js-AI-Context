import { NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import ClientProviders from "@/components/layout/client-providers"
import "../globals.css"

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }]
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const messages = (await import(`../../messages/${locale}.json`)).default
  const m = messages.metadata

  return {
    title: {
      default: m.defaultTitle,
      template: m.titleTemplate,
    },
    description: m.defaultDescription,
    openGraph: {
      title: m.defaultTitle,
      description: m.defaultDescription,
      url: "https://fedeiatech.vercel.app",
      siteName: "FedeiaTech",
      locale: m.ogLocale,
      type: "website",
      images: [
        {
          url: "https://fedeiatech.vercel.app/opengraph-image",
          width: 1200,
          height: 630,
          alt: m.defaultTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: ["https://fedeiatech.vercel.app/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <ClientProviders>{children}</ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
