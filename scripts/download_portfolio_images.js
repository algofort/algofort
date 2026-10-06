import fs from 'fs';
import https from 'https';
import path from 'path';

const outDir = path.resolve('public/assets/portfolio');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const demos = [
  { id: 1, name: 'home-1-feature.webp', url: 'https://demo.casethemes.net/mouno/wp-content/uploads/2025/04/home-1-feature.webp' },
  { id: 2, name: 'home-2-feature.webp', url: 'https://demo.casethemes.net/mouno/wp-content/uploads/2025/04/home-2-feature.webp' },
  { id: 3, name: 'home-3-feature.webp', url: 'https://demo.casethemes.net/mouno/wp-content/uploads/2025/04/home-3-feature.webp' },
  { id: 4, name: 'home-4-feature.webp', url: 'https://demo.casethemes.net/mouno/wp-content/uploads/2025/04/home-4-feature.webp' },
  { id: 5, name: 'home-5-feature.webp', url: 'https://demo.casethemes.net/mouno/wp-content/uploads/2025/04/home-5-feature.webp' },
  { id: 6, name: 'home-6-feature.webp', url: 'https://demo.casethemes.net/mouno/wp-content/uploads/2025/04/home-6-feature.webp' },
  { id: 7, name: 'home-7-feature.webp', url: 'https://demo.casethemes.net/mouno/wp-content/uploads/2025/04/home-7-feature.webp' },
  { id: 8, name: 'home-8-feature.webp', url: 'https://demo.casethemes.net/mouno/wp-content/uploads/2025/04/home-8-feature.webp' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('Downloading 8 portfolio demo images...');
  for (const d of demos) {
    const dest = path.join(outDir, d.name);
    console.log(`Downloading ${d.name}...`);
    try {
      await download(d.url, dest);
      console.log(`Saved ${d.name} (${fs.statSync(dest).size} bytes)`);
    } catch (e) {
      console.error(`Error downloading ${d.name}:`, e.message);
    }
  }
  console.log('All downloads completed!');
}

main();
