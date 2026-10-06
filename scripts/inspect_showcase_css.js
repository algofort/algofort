import fs from 'fs';

const content = fs.readFileSync('C:/Users/Rehan Ayaz/.gemini/antigravity-ide/brain/9b70859c-7340-4ba0-87a2-bbaa22622114/.system_generated/steps/1262/content.md', 'utf8');

const matches = [...content.matchAll(/\.pxl-show-case[^{]*\{[^}]*\}/g)];
console.log('CSS matches for pxl-show-case:', matches.length);
matches.slice(0, 20).forEach(m => console.log(m[0]));
