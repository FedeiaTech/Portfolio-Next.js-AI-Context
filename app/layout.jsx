import "./globals.css"
import ClientProviders from "@/components/layout/client-providers"

export const metadata = {
  title: {
    default: "Fede | Desarrollador de Software",
    template: "%s | Fede Dev",
  },
  description:
    "Portfolio profesional y blog técnico. Desarrollador de software especializado en experiencias web interactivas.",
  openGraph: {
    title: "Fede | Desarrollador de Software",
    description:
      "Portfolio profesional y blog técnico. Desarrollador de software especializado en experiencias web interactivas.",
    url: "https://fedeiatech.vercel.app",
    siteName: "FedeiaTech",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="antialiased">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
