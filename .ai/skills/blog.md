# Skill: Blog — Creación y Gestión de Artículos

## Sistema de Contenido

- Los artículos se escriben en archivos `.mdx` dentro de `content/blog/`.
- Cada artículo tiene un frontmatter YAML con metadata obligatoria.
- El slug se genera automáticamente desde el nombre del archivo.
- Las imágenes de cada post van en `public/images/blog/[slug]/`.

## Frontmatter Obligatorio

```yaml
---
title: "Título del artículo"
description: "Descripción corta para SEO (máx 160 caracteres)"
date: "2026-04-02"
tags: ["ia", "desarrollo", "tutorial"]
published: true
readingTime: "15 min"
cover: "/images/blog/[slug]/cover.jpg"   # opcional — activa miniatura en listado y hero en post
coverAlt: "Descripción de la imagen para accesibilidad"
---
```

- `cover` y `coverAlt` son opcionales. Si no se incluyen, el post se muestra sin imagen.
- La imagen se guarda en `public/images/blog/[slug]/cover.jpg` (o `.png`, `.webp`).
- Se renderiza automáticamente como hero en el post (entre descripción y fecha) y como miniatura en el listado.
- Resolución recomendada: mínimo 800×600px. La miniatura del listado usa aspect-ratio 4/3.

## Convenciones de Escritura

- Idioma: Español (Argentina). Tuteo con "vos" (no "tú").
- Tono: Técnico pero accesible. Como explicarle a un colega, no a un profesor.
- Estructura: introducción clara, secciones con H2/H3, cierre con próximos pasos.
- Longitud: Mínimo 1500 palabras para artículos técnicos.

## Posts de Anécdota (criterios adicionales)

Cuando el post narra una experiencia propia (un bug encontrado, un error cometido, algo que salió mal y se resolvió):

- **Narración en primera persona singular** — "estaba", "volví", "llegué". No usar "estábamos" o formas impersonales salvo que el contexto lo requiera.
- **Subtítulos breves como etiquetas** — frases cortas sin dramatismo ni spoiler del contenido. Ejemplos: "Una misión", "La salida", "El ajuste". No frases completas que anticipen lo que viene.
- **Términos técnicos desconocidos siempre explicados** — si aparece una herramienta, comando o concepto que un lector no especializado no conocería, explicarlo en el mismo párrafo con una frase entre guiones o paréntesis. Ej: `` `robocopy` — una herramienta de Windows que sirve para copiar carpetas de forma robusta``.
- **Comandos comentados** — si se muestra un bloque de código con flags o argumentos, agregar un comentario inline (`#`) explicando qué hace cada parte no obvia, y un párrafo posterior desglosando los elementos más importantes.
- **Tono medido** — contar lo que pasó con naturalidad, sin exagerar los momentos como si fueran épicos ni minimizarlos. El humor tranquilo está bien; el drama no.
- **No anticipar la solución en los subtítulos** — el lector tiene que llegar a la sección de resolución sin saber de antemano cómo termina.

## Componentes MDX Disponibles

Todos definidos en `components/ui/mdx-components.jsx`:

- `<Callout type="tip|warn|info|analogy">` — Cajas de nota/advertencia/analogía
- `<ConceptCard color="cyan|amber|violet|rose|green|red|blue" badge="..." title="...">` — Tarjeta de concepto con badge opcional
- `<CardGrid cols={1|2|3}>` — Grid para agrupar ConceptCards
- `<LayerStack>` + `<Layer num="..." title="..." color="...">` — Diagrama de capas apiladas
- `<PhaseTimeline>` + `<Phase num="..." title="..." time="..." color="...">` — Línea de tiempo de fases
- `<PhaseExample>` — Bloque de ejemplo dentro de un Phase
- Bloques de código: usar triple backtick estándar de Markdown (no hay componente custom).

## SEO para Blog

- URL: `/blog/[slug]` donde slug = nombre-del-archivo sin extensión.
- Cada post genera su propia metadata Open Graph (título, descripción, imagen).
- Incluir links internos a otros posts cuando sea relevante.
- Las imágenes de portada deben ser 1200x630px (formato OG).

## Flujo de Publicación

1. Crear el archivo `.mdx` en `content/blog/`.
1. Escribir el contenido con frontmatter completo.
1. Verificar que `published: true` para que aparezca en el listado.
1. Hacer commit y push — Vercel deploya automáticamente.

## Restricciones

- NO publicar artículos sin descripción SEO.
- NO usar imágenes sin texto alternativo (alt).
- NO crear posts con `published: false` en la rama main (usar branches o drafts).
