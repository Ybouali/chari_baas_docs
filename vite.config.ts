import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    base: '/', // TODO: Set to '/YOUR-REPO-NAME/' for GitHub Pages (e.g., '/chari-baas-docs/')
    plugins: [react(), tailwindcss()],
});
