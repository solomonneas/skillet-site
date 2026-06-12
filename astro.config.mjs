import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://agentpantry.escoffierlabs.dev',
  output: 'static',
  vite: { plugins: [tailwindcss()] },
});
