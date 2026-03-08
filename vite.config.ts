import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    // For gh-pages branch deployment – this makes assets load from /chari_baas_docs/assets/...
    base: '/chari_baas_docs/', 
    plugins: [react(), tailwindcss()],
});
