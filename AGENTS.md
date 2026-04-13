# AGENTS.md — División de Agentes por Área

Cada agente carga solo el contexto que necesita para su tarea.
Antes de actuar, cada agente debe leer los archivos indicados en su sección y nada más.

---

## Agente: `blog-writer`

**Cuándo usarlo:** Crear o editar artículos `.mdx` en `content/blog/`.

**Leer antes de actuar:**

- `.ai/skills/blog.md` — frontmatter, componentes MDX, convenciones de escritura
- `.ai/skills/seo.md` — metadata y Open Graph para posts

**Archivos de trabajo:**

- `content/blog/*.mdx`

**No tocar:**

- Ningún archivo fuera de `content/blog/`

---

## Agente: `ui-dev`

**Cuándo usarlo:** Crear o modificar componentes React en `components/` o páginas en `app/`.

**Leer antes de actuar:**

- `CLAUDE.md` — reglas obligatorias, patrones correctos y qué no hacer
- `.ai_memory.md` — estado actual de rutas y decisiones de arquitectura
- `.ai/skills/general.md` — convenciones de código y estructura

**Archivos de trabajo:**

- `components/**/*.jsx`
- `app/**/*.jsx`
- `hooks/*.js`
- `context/*.jsx`

**No tocar:**

- `components/layout/ambient-background.jsx` sin consultar (canvas frágil)
- Ningún archivo `.mdx` de contenido

---

## Agente: `seo`

**Cuándo usarlo:** Revisar o completar metadata, Open Graph, robots, sitemap.

**Leer antes de actuar:**

- `.ai/skills/seo.md` — reglas de SEO para Next.js
- `app/layout.jsx` — metadata global

**Archivos de trabajo:**

- `app/layout.jsx`
- `app/**/page.jsx` (solo el bloque `export const metadata`)
- `public/robots.txt`, `public/sitemap.xml` (si existen)

**No tocar:**

- Lógica de componentes ni estilos

---

## Agente: `maintainer`

**Cuándo usarlo:** Limpieza, refactor, actualización de dependencias, revisión de inconsistencias.

**Leer antes de actuar:**

- `CLAUDE.md` — reglas completas del proyecto
- `.ai_memory.md` — historial de bugs y decisiones
- `.ai/skills/general.md` — convenciones

**Archivos de trabajo:** Todo el proyecto excepto `content/blog/`.

**Responsabilidad adicional:** Después de cada intervención significativa, actualizar `.ai_memory.md` y evaluar si `CLAUDE.md` o algún `.ai_skills/*.md` requiere cambios.

---

## Notas generales

- Si una tarea cruza dos áreas (ej: nuevo componente MDX + documentarlo), usá `ui-dev` primero y luego `blog-writer`.
- Ningún agente pushea a `main` sin verificar `npm run dev` primero.
- Ningún agente instala dependencias sin confirmación explícita del usuario.
