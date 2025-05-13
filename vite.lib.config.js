import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: './src/lib/components/main.js',
      name: 'Garnet UI Library',
    },
    // rollupOptions: {
    //   input: ["./src/lib/components/Spinner/Spinner.svelte"],
    //   },
    //   output: {
    //   format: "es",
    //   },
  },
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
      },
    }),
  ],
});
