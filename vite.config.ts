import { readdirSync } from 'node:fs'
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import netlify from '@netlify/vite-plugin'
import contentCollections from '@content-collections/vite'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    contentCollections(),
    netlify(),
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart({
      pages: [
        ...readdirSync(new URL('./public/images/', import.meta.url)).map((file) => ({
          path: `/images/${file}`,
          prerender: { enabled: false },
          sitemap: { exclude: true },
        })),
        { path: '/contact-form.html', prerender: { enabled: false }, sitemap: { exclude: true } },
      ],
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
      sitemap: {
        enabled: true,
        host: 'https://valleydesignbuild.com',
      },
    }),
    viteReact(),
  ],
})
