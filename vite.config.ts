import * as path from 'path';
import { defineConfig, loadEnv, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';

const htmlPlugin = ({ mode }): PluginOption => {
    return {
        name: 'html-transform',
        transformIndexHtml(html) {
            if (mode && mode !== 'production') return html.replace(/(<\/title>)/, `(${mode.toUpperCase()})$1`);
            return html;
        },
    };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [htmlPlugin({ mode }), react()],
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
