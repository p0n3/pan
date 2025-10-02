// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// Get build mode from environment variables
const buildMode = process.env.BUILD_MODE || 'demo';
const apiUrl = process.env.API_URL;

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    define: {
      BUILD_MODE: JSON.stringify(buildMode),
      API_URL: JSON.stringify(apiUrl),
    }
  }
});