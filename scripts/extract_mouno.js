import fs from 'fs';

const content = fs.readFileSync('C:/Users/Rehan Ayaz/.gemini/antigravity-ide/brain/9b70859c-7340-4ba0-87a2-bbaa22622114/.system_generated/steps/1262/content.md', 'utf8');

const allShowcases = content.split('class="pxl-show-case-wrapper');

const items = [];
for (let i = 1; i < allShowcases.length; i++) {
  const part = allShowcases[i].substring(0, 3000);
  const title = part.match(/<span class="pxl-title-text">\s*([^<]+)\s*<\/span>/);
  const img = part.match(/src="([^"?]+\.webp)"/);
  const btnsBlock = part.match(/<div class="pxl-show-case-btns">([\s\S]*?)<\/div>/);
  const btns = btnsBlock ? [...btnsBlock[1].matchAll(/<a[^>]*href="([^"]*)"[^>]*>\s*([^<]+)\s*<\/a>/g)].map(m => ({ text: m[2].trim(), href: m[1] })) : [];
  
  items.push({
    id: i,
    title: title ? title[1].trim() : `Demo ${i}`,
    image: img ? img[1] : null,
    buttons: btns
  });
}

console.log(JSON.stringify(items, null, 2));
fs.writeFileSync('scripts/mouno_demos.json', JSON.stringify(items, null, 2));
