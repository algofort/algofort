import { defineConfig, loadEnv } from 'vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(root, '../..');

export default defineConfig(({ mode }) => ({
  root,
  base: '/lp/web-development/',
  publicDir: false,
  define: {
    __RECAPTCHA_SITE_KEY__: JSON.stringify(loadEnv(mode, projectRoot, 'NEXT_PUBLIC_').NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''),
  },
  build: {
    outDir: resolve(projectRoot, 'public/lp/web-development'),
    emptyOutDir: true,
  },
}));
