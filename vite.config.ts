/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        include: ['react', 'react-dom', '@mantine/core', '@mantine/hooks'],
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./setupTests.ts', './src/mocks/server.js'],
    },
});
