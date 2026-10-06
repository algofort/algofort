import fs from 'fs';

const data = fs.readFileSync('scripts/schunk_b3.js', 'utf8');

// Find all occurrences of "actionListId"
const actionListMatches = [...data.matchAll(/"actionListId":"([^"]+)"/g)].map(m => m[1]);
console.log('Unique actionListIds:', [...new Set(actionListMatches)]);

// Find all event triggers
const events = [...data.matchAll(/"(e-\d+)":\{[^}]*"target":\{"id":"([^"]+)"/g)];
console.log('Total events:', events.length);

// Let's search for "footer"
let fPos = 0;
while ((fPos = data.indexOf('footer', fPos)) !== -1) {
  console.log('footer match at:', fPos);
  console.log(data.substring(Math.max(0, fPos - 100), Math.min(data.length, fPos + 200)));
  console.log('---');
  fPos += 6;
}
