import { build, createServer } from 'vite';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const pages = { 'brand-agency': 'brand-agency', 'app-development': 'app-development', 'saas-development': 'saas-app-development' };
const name = process.argv[2];
if (!pages[name]) throw new Error('Unknown landing page');
const configFile = resolve(`landing-pages/${name}/vite.config.js`);
await build({ configFile });
// Generate HTML once during the build. cPanel still serves a static file;
// React hydrates the identical markup to keep all forms and motion interactive.
const server = await createServer({ configFile, mode: 'production', appType: 'custom', server: { middlewareMode: true, watch: null }, ssr: { noExternal: ['gsap', 'lucide-react'] } });
try {
  const { render } = await server.ssrLoadModule('/src/entry-server.tsx');
  const markup = render();
  const path = resolve(`public/lp/${pages[name]}/index.html`);
  const html = await readFile(path, 'utf8');
  if (!html.includes('<div id="root"></div>')) throw new Error('Missing landing page render outlet');
  await writeFile(path, html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`).replace(/\r\n/g, '\n').replace(/[\t ]+$/gm, ''));
  console.log(`Pre-rendered ${pages[name]}: ${Buffer.byteLength(markup)} bytes of HTML`);
} finally { await server.close(); }
