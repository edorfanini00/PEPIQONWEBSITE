import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolveSeoConfig } from './scripts/seo-config.mjs'

const seo = resolveSeoConfig()

// https://vite.dev/config/
export default defineConfig({
  define: { __SITE_ORIGIN__: JSON.stringify(seo.origin), __SEO_INDEXABLE__: JSON.stringify(seo.indexable) },
  plugins: [react(), tailwindcss()],
})
