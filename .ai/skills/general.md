# Skill: General — Convenciones del Proyecto

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Lenguaje:** JavaScript (ES2022+, NO TypeScript)
- **Estilos:** Tailwind CSS 4+
- **Package Manager:** npm
- **Bundler:** Turbopack (viene integrado con Next.js 16)

## Convenciones de Código

- Nombres de archivos: kebab-case (`mi-componente.jsx`)
- Nombres de componentes: PascalCase (`MiComponente`)
- Nombres de funciones y variables: camelCase
- Exportaciones: `export default` para componentes de página, `export` nombrado para utilitarios
- Imports: primero dependencias externas, después internas, separados por línea vacía

## Estructura de Carpetas

```text
app/
  layout.jsx          → Layout raíz
  page.jsx            → Página de inicio
  globals.css         → Estilos globales + Tailwind
  blog/               → Listado + posts individuales
  contacto/           → Formulario de contacto
components/
  ui/                 → Componentes reutilizables (mdx-components)
  layout/             → StatusBar, Footer, Navbar, AmbientBackground, ClientProviders
  sections/           → HeroSection, HeroAvatar, LiveDashboard, ProjectsGallery, TerminalChat, ContactForm
content/
  blog/               → Archivos .mdx de artículos
lib/
  blog.js             → Lectura y parseo de archivos MDX
  github-service.js   → Fetch de datos de GitHub para LiveDashboard
public/
  images/             → Estáticos (char/, projects/)
```

## Reglas de Componentes

- Server Components por defecto. Solo usar `"use client"` cuando el componente necesite useState, useEffect, event handlers, o APIs del navegador.
- Props destructuradas en la firma de la función, no dentro del cuerpo.
- Un componente = un archivo. No definir múltiples componentes en el mismo archivo.
- Los componentes de UI genéricos van en `components/ui/`. Los específicos de una sección van en `components/sections/`.

## SEO

- Cada página debe exportar metadata estática o usar `generateMetadata()`.
- Las imágenes usan el componente `<Image>` de Next.js (optimización automática).
- Los links internos usan `<Link>` de Next.js (prefetching automático).

## Restricciones

- NO usar `dangerouslySetInnerHTML` excepto para el contenido MDX renderizado.
- NO hacer fetching de datos en Client Components si se puede resolver con Server Components.
- NO hardcodear strings de texto que aparezcan en la UI (usar constantes o el archivo de contenido).
