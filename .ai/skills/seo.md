# Skill: SEO — Optimización para Motores de Búsqueda

## Reglas Generales

- Cada página debe tener un `<title>` único y una `<meta description>` única.
- El título debe tener entre 50-60 caracteres. La descripción entre 120-160.
- Usar una sola etiqueta `<h1>` por página.
- Jerarquía de headings: H1 → H2 → H3. No saltar niveles.

## Metadata en Next.js

Usar el objeto `metadata` exportado en cada `page.jsx` o `layout.jsx`.
Para páginas dinámicas (blog posts, proyectos), usar `generateMetadata()`.

```jsx
export const metadata = {
  title: 'Proyectos | FedeiaTech',
  description: 'Portfolio de proyectos de desarrollo web y software.',
  openGraph: {
    title: 'Proyectos | FedeiaTech',
    description: 'Portfolio de proyectos de desarrollo web y software.',
    images: ['/images/og-proyectos.webp'],
  },
}
```

## Open Graph y Redes Sociales

- Todas las páginas deben tener tags OG (title, description, image).
- Imagen OG por defecto: 1200x630px con branding del sitio.
- Cada post del blog debe tener su propia imagen OG.
- Twitter card: `summary_large_image`.

## Performance (Core Web Vitals)

- Imágenes: Usar `<Image>` de Next.js. Formato WebP. Definir width/height.
- Fuentes: Usar `next/font` para cargar fuentes con font-display: swap.
- JavaScript: Minimizar Client Components. Cada `"use client"` es JS extra para el navegador.
- LCP (Largest Contentful Paint): La imagen o texto principal de cada página debe cargar en < 2.5s.

## Sitemap y Robots

- Generar `sitemap.xml` automáticamente con la API nativa de Next.js (`app/sitemap.js`).
- Archivo `robots.txt` en `public/` permitiendo indexación completa.
- Enviar sitemap a Google Search Console después del primer deploy.

## URLs

- Siempre en minúsculas, con guiones (kebab-case).
- Sin trailing slash (Next.js lo maneja por defecto).
- Redirigir URLs viejas si en algún momento cambiamos slugs.

## Contenido Estructurado (Schema.org)

- Blog posts: usar JSON-LD con schema `Article`.
- Página principal: schema `Organization` o `Person`.
- Proyectos: schema `CreativeWork`.

## Restricciones

- NO publicar páginas sin metadata.
- NO usar imágenes de más de 200KB sin optimizar.
- NO crear rutas con parámetros de query para contenido que debería tener su propia URL.
- NO bloquear recursos estáticos (CSS, JS, imágenes) en robots.txt.
