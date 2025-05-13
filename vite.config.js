import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
        hmr: !process.env.VITEST,
      },
    }),
  ],
  server: {
    hmr: {
      overlay: false,
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    exclude: [
      'node_modules/**',
      '.fttemplates/**',
      '.storybook/**',
      'test/**',
      'src/lib/components/**/*Decorator.svelte',
    ],
    setupFiles: [],
    coverage: {
      provider: 'istanbul', // o 'c8'
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/**', '.fttemplates/**', '.storybook/**', 'test/'],
    },
  },
});
