/// <reference types="vitest/config" />
import { defineConfig, mergeConfig } from 'vite';
import viteConfig from './vite.config';
import react from '@vitejs/plugin-react';

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      include: ['**/*.test.tsx', '**/*.test.ts'],
      coverage: {
        exclude: ['src/main.tsx', '**/*.config.js', '**/*.config.ts'],
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
    },
  }),
);
