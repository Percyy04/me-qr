import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    plugins: [react()],
    esbuild: isProd ? { drop: ['console', 'debugger'] } : undefined,
    build: {
      sourcemap: !isProd,
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-qr': ['qr-code-styling'],
            'vendor-pdf': ['jspdf'],
            'vendor-editor': ['@tiptap/react', '@tiptap/starter-kit', '@tiptap/extension-underline'],
          },
        },
      },
    },
    server: {
      port: 5173,
      host: true,
      open: false,
    },
    preview: {
      port: 4173,
      host: true,
    },
  };
});
