import fs from 'fs';

const data = fs.readFileSync('scripts/unusually_webflow.js', 'utf8');

// Find all event triggers
const triggers = [...data.matchAll(/"e-\d+":\{[^}]+\}/g)].map(m => m[0]);
console.log('Total event triggers in unusually_webflow:', triggers.length);
triggers.forEach(t => console.log(t));

// Also check schunk.b3bb5289312a7366.js for triggers
const data2 = fs.readFileSync('scripts/unusually_about.html', 'utf8');
// check what other interactions exist
