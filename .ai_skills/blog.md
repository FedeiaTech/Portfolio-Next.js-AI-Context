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
image: "/images/blog/slug/cover.webp"
readingTime: "15 min"
---
```

## Convenciones de Escritura
- Idioma: Español (Argentina). Tuteo con "vos" (no "tú").
- Tono: Técnico pero accesible. Como explicarle a un colega, no a un profesor.
- Estructura: Cada artículo debe tener una introducción clara que explique qué se va a aprender, secciones con headers H2 y H3, y un cierre con próximos pasos o reflexión.
- Longitud: Mínimo 1500 palabras para artículos técnicos.

## Componentes MDX Disponibles
- `<Callout type="tip|warn|info">` → Cajas de nota/advertencia
- `<CodeBlock language="js" title="archivo.js">` → Bloques de código con título
- `<Diagram>` → Diagramas inline (SVG o ASCII)
- (Se irán agregando más a medida que los necesitemos)

## SEO para Blog
- URL: `/blog/[slug]` donde slug = nombre-del-archivo sin extensión.
- Cada post genera su propia metadata Open Graph (título, descripción, imagen).
- Incluir links internos a otros posts cuando sea relevante.
- Las imágenes de portada deben ser 1200x630px (formato OG).

## Flujo de Publicación
1. Crear el archivo `.mdx` en `content/blog/`.
2. Escribir el contenido con frontmatter completo.
3. Verificar que `published: true` para que aparezca en el listado.
4. Hacer commit y push — Vercel deploya automáticamente.

## Restricciones
- NO publicar artículos sin descripción SEO.
- NO usar imágenes sin texto alternativo (alt).
- NO crear posts con `published: false` en la rama main (usar branches o drafts).
