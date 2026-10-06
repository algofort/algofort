import fs from 'fs';
import https from 'https';

const text = fs.readFileSync('C:/Users/Rehan Ayaz/.gemini/antigravity-ide/brain/9b70859c-7340-4ba0-87a2-bbaa22622114/.system_generated/steps/187/content.md', 'utf8');

const regex = /src=["']([^"']+\.js[^"']*)["']/gi;
let m;
const scripts = [];
while ((m = regex.exec(text)) !== null) {
  scripts.push(m[1]);
}
console.log('Scripts:', scripts);

async function inspectScript(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        if (data.includes('cta-overlay') || data.includes('80d35003-1e2a-41ba-2a76-4551850c9eed')) {
          console.log('Found CTA interactions in:', url);
          // find snippet around 80d35003-1e2a-41ba-2a76-4551850c9eed
          const idx = data.indexOf('80d35003-1e2a-41ba-2a76-4551850c9eed');
          console.log(data.substring(idx - 100, idx + 2000));
        }
        resolve();
      });
    }).on('error', () => resolve());
  });
}

(async () => {
  for (const s of scripts) {
    await inspectScript(s);
  }
})();
