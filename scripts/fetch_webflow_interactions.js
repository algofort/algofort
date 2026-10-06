import https from 'https';
import fs from 'fs';

const url = 'https://cdn.prod.website-files.com/68ee74b7102caefef6ce7890/js/webflow.7ab7ca59.c67ac6cf072f396f.js';

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('scripts/unusually_webflow.js', data);
    console.log('webflow.js saved, size:', data.length);
    
    // Find 80d35003-1e2a-41ba-2a76-4551850c9eed
    let target = '80d35003-1e2a-41ba-2a76-4551850c9eed';
    let idx = 0;
    while ((idx = data.indexOf(target, idx)) !== -1) {
      console.log('Match target at:', idx);
      console.log(data.substring(Math.max(0, idx - 400), Math.min(data.length, idx + 1500)));
      console.log('='.repeat(50));
      idx += target.length;
    }
  });
});
