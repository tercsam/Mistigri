import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
// Plugin Tailwind v4 pour Vite — remplace la config PostCSS traditionnelle.
// Plus rapide et zéro fichier tailwind.config nécessaire.
// Ref: https://tailwindcss.com/docs/installation/vite
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});
