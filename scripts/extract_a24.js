import https from 'https';

const url = 'https://cdn.prod.website-files.com/68ee74b7102caefef6ce7890/js/webflow.7ba27734.7755045cf47a5e76.js';

https.get(url, (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    let pos = 0;
    while ((pos = data.indexOf('a-24', pos)) !== -1) {
      console.log('Match at pos:', pos);
      console.log(data.substring(Math.max(0, pos - 50), Math.min(data.length, pos + 1000)));
      console.log('='.repeat(50));
      pos += 4;
    }
  });
});
