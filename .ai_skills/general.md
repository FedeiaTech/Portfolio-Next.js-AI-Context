# Skill: General — Convenciones del Proyecto

## Stack
- **Framework:** Next.js 15+ (App Router)
- **Lenguaje:** JavaScript (ES2022+, NO TypeScript)
- **Estilos:** Tailwind CSS 4+
- **Package Manager:** npm
- **Bundler:** SWC (viene integrado con Next.js)

## Convenciones de Código
- Nombres de archivos: kebab-case (`mi-componente.jsx`)
- Nombres de componentes: PascalCase (`MiComponente`)
- Nombres de funciones y variables: camelCase
- Exportaciones: `export default` para componentes de página, `export` nombrado para utilitarios
- Imports: primero dependencias externas, después internas, separados por línea vacía

## Estructura de Carpetas
```
app/
  layout.jsx          → Layout raíz
  page.jsx            → Página de inicio
  globals.css         → Estilos globales + Tailwind
  (secciones)/
    proyectos/
    blog/
    sobre-mi/
    contacto/
components/
  ui/                 → Componentes reutilizables (Button, Card, etc.)
  layout/             → Header, Footer, Navigation
  sections/           → Secciones específicas de páginas
content/
  blog/               → Archivos .mdx de artículos
  projects/           → Datos de proyectos (JSON o MDX)
lib/
  utils.js            → Funciones utilitarias
  constants.js        → Constantes globales
public/
  images/             → Imágenes optimizadas
  fonts/              → Fuentes locales (si aplica)
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
- NO usar `any` como tipo (si en algún momento migramos a TS).
- NO usar `dangerouslySetInnerHTML` excepto para el contenido MDX renderizado.
- NO hacer fetching de datos en Client Components si se puede resolver con Server Components.
- NO hardcodear strings de texto que aparezcan en la UI (usar constantes o el archivo de contenido).
