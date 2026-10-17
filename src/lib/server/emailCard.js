import sharp from 'sharp';
import { randomUUID } from 'node:crypto';

const xml = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[char]));
function wrap(value, width, size = 16) {
  const lines = [];
  for (const paragraph of String(value ?? '').replace(/\r/g, '').split('\n')) {
    let line = '', used = 0;
    for (const word of paragraph.split(/(\s+)/)) {
      const estimate = text => [...text].reduce((sum, c) => sum + (/[MW@%]/.test(c) ? .9 : /[ilI.,' :;!|]/.test(c) ? .28 : /[A-Z]/.test(c) ? .66 : .55), 0) * size;
      if (line && used + estimate(word) > width) { lines.push(line.trimEnd()); line = ''; used = 0; }
      for (const char of word) {
        const cost = estimate(char);
        if (used + cost > width && line) { lines.push(line); line = ''; used = 0; }
        if (!line && /\s/.test(char)) continue;
        line += char; used += cost;
      }
    }
    lines.push(line.trimEnd());
  }
  return lines;
}

// Render only the content card locally. No enquiry data is uploaded to a public image host.
// Opaque PNG pixels preserve both text and background contrast in Outlook dark mode.
export async function emailCard({ title, rows = [], messageTitle, message, note }) {
  let y = 22;
  const parts = [];
  function text(value, x, baseline, size = 16, color = '#252a35', bold = false) {
    parts.push(`<text x="${x}" y="${baseline}" font-family="Arial,Helvetica,sans-serif" font-size="${size}" font-weight="${bold ? 700 : 400}" fill="${color}">${xml(value)}</text>`);
  }
  function heading(value) {
    parts.push(`<rect x="0" y="${y - 12}" width="5" height="17" fill="#ff7b16"/>`);
    text(value.toUpperCase(), 18, y + 1, 14, '#161817', true); y += 36;
  }
  heading(title);
  for (const [label, value] of rows) {
    const lines = wrap(value, 468);
    text(label, 0, y, 15, '#686d68');
    lines.forEach((line, index) => text(line, 130, y + index * 24));
    y += Math.max(1, lines.length) * 24 + 12;
  }
  if (messageTitle) {
    y += 8;
    parts.push(`<path d="M0 ${y}H624" stroke="#dfe2db"/>`); y += 36;
    heading(messageTitle);
  }
  if (message) { for (const line of wrap(message, 624)) { text(line, 0, y); y += 26; } }
  if (note) { y += 22; for (const line of wrap(note, 624, 14)) { text(line, 0, y, 14, '#686d68'); y += 23; } }
  const height = Math.ceil(y + 12);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="624" height="${height}" viewBox="0 0 624 ${height}"><rect width="624" height="${height}" fill="#fafaf8"/>${parts.join('')}</svg>`;
  const content = await sharp(Buffer.from(svg), { density: 144 }).flatten({ background: '#fafaf8' }).png().toBuffer();
  const cid = `content-${randomUUID()}@algofort.com`;
  return { html: `<img src="cid:${cid}" alt="${xml(title)}. The full details are also available in this email's plain-text version." width="624" height="${height}" style="display:block;width:100%;max-width:624px;height:auto;border:0;outline:none">`, attachment: { filename: 'enquiry-details.png', content, cid, contentType: 'image/png', contentDisposition: 'inline' } };
}
