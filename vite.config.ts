import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    base: '/chari-baas-docs/', // IMPORTANT: Change to your actual GitHub repo name for Pages deployment
    plugins: [react(), tailwindcss()],
});
