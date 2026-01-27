import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        target: 'esnext',
        minify: 'esbuild', // Faster and usually sufficient
        cssMinify: true,
        rollupOptions: {
            output: {
                manualChunks: undefined, // Let Vite/Rollup handle splitting naturally
            },
        },
        reportCompressedSize: false, // Saves time during build
    },
});
