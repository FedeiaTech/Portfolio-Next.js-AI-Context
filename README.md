# FedeiaTech — Portfolio + Blog Técnico

Portfolio profesional y blog técnico de Federico Iacono. Diseñado con estética de terminal, datos en vivo desde GitHub y un motor de blog basado en MDX.

**URL:** [fedeiatech.vercel.app](https://fedeiatech.vercel.app)

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Lenguaje:** JavaScript (sin TypeScript)
- **Estilos:** Tailwind CSS 4
- **Blog:** MDX con `next-mdx-remote` + `gray-matter`
- **Formulario de contacto:** Web3Forms
- **Deploy:** Vercel (automático desde `main`)

## Estructura

```text
app/                    → Páginas (App Router)
  page.jsx              → Landing principal
  blog/                 → Listado de artículos
  blog/[slug]/          → Artículo individual
  contacto/             → Formulario de contacto
components/
  layout/               → StatusBar, Navbar, Footer, AmbientBackground
  sections/             → HeroSection, LiveDashboard, ProjectsGallery, TerminalChat, ContactForm
  ui/                   → Componentes para MDX
content/blog/           → Artículos en formato .mdx
lib/
  blog.js               → Lectura y parseo de MDX
  github-service.js     → Datos de GitHub para LiveDashboard
public/images/          → Estáticos (char/, projects/)
```

## Correr en local

```bash
npm install
npm run dev
```

Requiere un archivo `.env.local` con:

```env
NEXT_PUBLIC_WEB3FORMS_KEY=tu_api_key
```

## Agregar un artículo al blog

1. Crear un archivo `.mdx` en `content/blog/` con el nombre en kebab-case.
1. Completar el frontmatter obligatorio:

```yaml
---
title: "Título del artículo"
description: "Descripción corta (máx 160 caracteres)"
date: "2026-04-12"
tags: ["ia", "desarrollo"]
published: true
readingTime: "10 min"
---
```

1. Hacer commit y push a `main` — Vercel deploya automáticamente.

## Componentes MDX disponibles

| Componente | Uso |
| --- | --- |
| `<Callout type="tip/warn/info/analogy">` | Cajas de nota |
| `<ConceptCard color="..." badge="..." title="...">` | Tarjeta de concepto |
| `<CardGrid cols={2}>` | Grid de tarjetas |
| `<LayerStack>` + `<Layer num="..." title="...">` | Capas apiladas |
| `<PhaseTimeline>` + `<Phase num="..." title="...">` | Línea de tiempo |
| `<PhaseExample>` | Ejemplo dentro de una Phase |
