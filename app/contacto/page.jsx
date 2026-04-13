import ContactForm from "@/components/sections/contact-form"

export const metadata = {
  title: "Contacto",
  description:
    "Contactá a Fede para proyectos de desarrollo de software, consultoría o colaboraciones.",
}

export default function ContactPage() {
  return (
    <main className="flex-grow w-full max-w-3xl mx-auto px-4 mt-12 md:mt-20 mb-16">
      <div className="mb-10">
        <div className="flex items-center space-x-3 mb-4">
          <svg
            className="w-6 h-6 text-emerald-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Contacto
          </h1>
        </div>
        <p className="text-slate-400 text-lg font-light max-w-xl">
          ¿Tenés un proyecto en mente, una idea para colaborar, o simplemente
          querés decir hola? Escribime y te respondo lo antes posible.
        </p>
      </div>

      <ContactForm />

      {/* Alternative contact */}
      <div className="mt-10 pt-8 border-t border-slate-800">
        <p className="text-slate-500 text-sm font-mono text-center">
          También podés encontrarme en{" "}
          <a
            href="https://github.com/FedeiaTech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            GitHub
          </a>
        </p>
      </div>
    </main>
  )
}
