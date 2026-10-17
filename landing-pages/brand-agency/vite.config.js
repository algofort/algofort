import { defineConfig, loadEnv } from 'vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(root, '../..');

export default defineConfig(({ mode }) => ({
  root,
  base: '/lp/brand-agency/',
  publicDir: false,
  plugins: [{
    name: 'static-footer-client-boundary',
    enforce: 'pre',
    transform(code, id) {
      // Next's client boundary has no meaning in this entirely client-side bundle.
      if (id.replaceAll('\\', '/').endsWith('/src/components/common/Footer.jsx')) {
        return { code: code.replace(/^'use client';\s*/, ''), map: null };
      }
    },
  }],
  esbuild: { jsx: 'automatic' },
  resolve: {
    alias: {
      'next/link': resolve(root, '../shared/StaticLink.jsx'),
      'next/image': resolve(root, '../shared/StaticImage.jsx'),
    },
    dedupe: ['react', 'react-dom'],
  },
  define: {
    __RECAPTCHA_SITE_KEY__: JSON.stringify(loadEnv(mode, projectRoot, 'NEXT_PUBLIC_').NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''),
  },
  build: {
    outDir: resolve(projectRoot, 'public/lp/brand-agency'),
    emptyOutDir: true,
  },
}));
