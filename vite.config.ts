import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    // IMPORTANT for GitHub Pages: base must be '/repo-name/' (case-sensitive)
    base: '/chari_baas_docs/', 
    plugins: [react(), tailwindcss()],
});
