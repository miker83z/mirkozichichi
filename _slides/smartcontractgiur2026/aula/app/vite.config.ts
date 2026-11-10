import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

// The class app is served by the website next to the deck: mirkozichichi.me/slides/smartcontractgiur2026/aula/
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  base: '/slides/smartcontractgiur2026/aula/',
  build: {
    outDir: fileURLToPath(new URL('../../../../slides/smartcontractgiur2026/aula', import.meta.url)),
    emptyOutDir: true,
    target: 'es2022',
  },
  server: { port: 3050 },
})
