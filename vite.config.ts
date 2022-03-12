import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [react()],
    server: {
        proxy: {
            '^/api': {
                target: loadEnv(mode, __dirname).VITE_API_URL,
                rewrite: (p) => p.replace(/^\/api/, ''),
                changeOrigin: true,
            },
        },
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, './src'),
        },
    },
}));
