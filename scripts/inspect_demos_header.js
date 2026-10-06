import fs from 'fs';

const content = fs.readFileSync('C:/Users/Rehan Ayaz/.gemini/antigravity-ide/brain/9b70859c-7340-4ba0-87a2-bbaa22622114/.system_generated/steps/1262/content.md', 'utf8');

const demosIdx = content.indexOf('Checkout Our Amazing');
console.log('--- AROUND DEMOS HEADER ---');
console.log(content.substring(demosIdx - 800, demosIdx + 600));
