import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// Preserve the supplied portrait; only crop/resize it for browser and social formats.
const target = relative => fileURLToPath(new URL(`../${relative}`, import.meta.url));
const source = target('public/profile.png');
await fs.mkdir(target('public/icons'), { recursive: true });
const portrait = await sharp(source).extract({ left: 175, top: 35, width: 450, height: 450 }).png().toBuffer();
for (const [file, size] of [['app/icon.png', 192], ['app/apple-icon.png', 180], ['public/icons/profile-192.png', 192], ['public/icons/profile-512.png', 512]]) {
  await sharp(portrait).resize(size, size).png().toFile(target(file));
}
const png = await sharp(portrait).resize(48, 48).ensureAlpha().png().toBuffer();
const ico = Buffer.alloc(22);
ico.writeUInt16LE(1, 2);
ico.writeUInt16LE(1, 4);
ico[6] = 48; ico[7] = 48;
ico.writeUInt16LE(1, 10); ico.writeUInt16LE(32, 12);
ico.writeUInt32LE(png.length, 14); ico.writeUInt32LE(22, 18);
await fs.writeFile(target('app/favicon.ico'), Buffer.concat([ico, png]));

const face = await sharp(source).resize(470, 630, { fit: 'cover', position: 'centre' }).png().toBuffer();
const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<rect width="1200" height="630" fill="#171717"/>
<path d="M48 47H684M48 583H684" stroke="#474747" stroke-dasharray="4 5"/>
<g font-family="Arial,Helvetica,sans-serif">
<text x="52" y="112" fill="#a3a3a3" font-size="18" letter-spacing="3">SOFTWARE / CLOUD / DISTRIBUTED SYSTEMS</text>
<text x="48" y="280" fill="#f5f5f5" font-size="82" font-weight="600">Utkarsh</text>
<text x="48" y="368" fill="#f5f5f5" font-size="82" font-weight="600">Saxena</text>
<text x="52" y="446" fill="#d4d4d4" font-size="25">Product Manager &amp; Software Engineer</text>
<text x="52" y="487" fill="#a3a3a3" font-size="21">Golang · Kubernetes · Infrastructure</text>
</g></svg>`);
await sharp(text).composite([{ input: face, left: 730, top: 0 }]).jpeg({ quality: 92 }).toFile(target('public/social.jpg'));
console.log('Generated portrait favicon, browser/app icons and 1200×630 social preview.');
