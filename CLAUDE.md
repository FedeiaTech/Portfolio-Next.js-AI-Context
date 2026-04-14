# CLAUDE.md — Instrucciones para Claude Code

## Proyecto

Portfolio profesional + blog técnico de FedeiaTech.
Stack: Next.js 16 (App Router, Turbopack) + JavaScript + Tailwind CSS.
Hosting: Vercel con deploy automático desde GitHub.

## Reglas obligatorias

- JavaScript solamente. No TypeScript.
- Server Components por defecto. `"use client"` solo cuando haya hooks o eventos.
- Archivos en kebab-case. Componentes en PascalCase.
- Todo valor que use `Math.random()` o `Date.now()` se inicializa en `useEffect`, nunca en `useState` directo (causa hydration mismatch).
- No instalar librerías sin mi confirmación explícita.
- Imágenes con `<Image>` de Next.js. Ruta desde `/public/images/`.
- Imports con alias `@/`.

## Estructura del proyecto

```text
app/                  → Páginas (App Router)
  blog/               → Listado + posts individuales en MDX
  contacto/           → Formulario de contacto
components/
  layout/             → StatusBar, Footer, Navbar, AmbientBackground, ClientProviders
  sections/           → HeroSection, HeroAvatar, LiveDashboard, ProjectsGallery, TerminalChat, ContactForm
  ui/                 → Componentes reutilizables (mdx-components)
content/blog/         → Archivos .mdx con frontmatter YAML
context/              → LiveModeContext (client-side)
hooks/                → use-time.js
lib/                  → blog.js, github-service.js
public/images/        → Estáticos (char/, projects/)
```

## Blog

- Los posts son archivos `.mdx` en `content/blog/`.
- Frontmatter obligatorio: title, description, date, tags, published, readingTime.
- Slug = nombre del archivo sin extensión.
- Idioma: español argentino (voseo).
- Componentes MDX disponibles (definidos en `components/ui/mdx-components.jsx`):
  - `<Callout type="tip|warn|info|analogy">` — caja de nota/advertencia/analogía
  - `<ConceptCard color="cyan|amber|violet|rose|green|red|blue" badge="..." title="...">` — tarjeta de concepto
  - `<CardGrid cols={1|2|3}>` — grid para agrupar ConceptCards
  - `<LayerStack>` + `<Layer num="..." title="..." color="...">` — diagrama de capas apiladas
  - `<PhaseTimeline>` + `<Phase num="..." title="..." time="..." color="...">` — línea de tiempo de fases
  - `<PhaseExample>` — bloque de ejemplo dentro de un Phase
- Imagen de portada (opcional): campos `cover` y `coverAlt` en frontmatter. Imagen en `public/images/blog/[slug]/cover.jpg`. Se renderiza como hero en el post y miniatura en el listado automáticamente. No insertar con `![]()` en el contenido MDX.

## Agentes

Los agentes reales viven en `.claude/agents/`. Para cada tarea, usar el agente correspondiente:

- **`blog-writer`** — crear o editar posts en `content/blog/`. Usarlo siempre que se cree o edite un artículo del blog.
- **`ui-dev`** — componentes React, páginas, hooks, context.
- **`seo`** — metadata, Open Graph, sitemap.
- **`maintainer`** — limpieza, refactor, actualización de archivos de contexto IA.

## Archivos de contexto para la IA

Ubicados en `.ai/` (no se suben a GitHub excepto los skills):

- `.ai/memory.md` — historial de decisiones, bugs resueltos y estado actual. **Gitignoreado.**
- `.ai/skills/general.md` — convenciones de código y estructura.
- `.ai/skills/blog.md` — frontmatter, componentes MDX, flujo de publicación.
- `.ai/skills/seo.md` — reglas de metadata y Open Graph.

Memoria persistente entre sesiones (fuera del repo, gestionada por Claude Code):

- `memory/MEMORY.md`

## Protocolo de memoria

### Al iniciar cada sesión

Antes de editar cualquier archivo, leer en orden:

1. Este archivo (`CLAUDE.md`) — reglas, patrones y estado del proyecto.
1. `.ai/memory.md` — historial de decisiones, bugs resueltos, rutas y estado actual.
1. `.ai/skills/` — convenciones por área (general, blog, seo).

### Después de cada sesión de edición

Evaluar si alguno de estos archivos necesita actualización:

- `.ai/memory.md` → si cambió el estado de una ruta, se resolvió un bug, o se tomó una decisión de arquitectura.
- `CLAUDE.md` → si se estableció un patrón nuevo, una restricción nueva, o cambió la estructura del proyecto.
- `.ai/skills/*.md` → si se agregó o modificó una convención específica de un área.

## Commits

- Mensaje breve en una línea: resumen general de lo que se hizo.
- Sin descripción extendida, sin firma de autoría ni co-autoría.
- Formato: `tipo: resumen` (ej. `feat: avatar animado`, `fix: scroll en carga`).

## Qué NO hacer

- No modificar `components/layout/ambient-background.jsx` sin consultar (es frágil por el canvas).
- No pushear a main sin verificar `npm run dev` primero.
- No crear rutas nuevas sin actualizar el componente `Navbar`.
- No generar código que yo no pueda explicar línea por línea.
- No usar `console.log` en producción (ni siquiera en easter eggs).
- No usar `<img>` nativo — siempre `<Image>` de `next/image`.
- No usar `<a href>` para links internos — siempre `<Link>` de `next/link`.
- No importar módulos sin usarlos (causa hints/errores de lint).

## Patrones correctos

- Formularios: siempre usar `<form onSubmit>` + `<button type="submit">`, nunca `<div>` + `onClick` en el botón.
- Secuencias de input (teclado, etc.) que no necesitan re-render: usar `useRef` en lugar de `useState`.
- `Date`, `Math.random()`, valores dinámicos: siempre en `useEffect`, nunca en render directo ni en `useState` inicial. Mientras carga, mostrar placeholder (`——`, `--:--:--`, etc.).
