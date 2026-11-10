import { defineShikiSetup } from '@slidev/types'

// High-contrast code colours: the default light theme is too faint on a projector and in print.
export default defineShikiSetup(() => ({
  themes: {
    dark: 'github-dark',
    light: 'github-light',
  },
}))
