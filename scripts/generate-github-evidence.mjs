import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const username = 'UtkarshSaxenautk';
const snapshotFile = new URL('../content/github-evidence.json', import.meta.url);
if (process.argv.includes('--refresh')) {
  const urls = {
    profile: `https://api.github.com/users/${username}`,
    activity: `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
  };
  const get = async url => {
    const response = await fetch(url, { headers: { 'User-Agent': 'Utkarsh-Portfolio-Public-Evidence' }, signal: AbortSignal.timeout(20000) });
    if (!response.ok) throw new Error(`${url}: ${response.status}`);
    return response.json();
  };
  const [profile, activity] = await Promise.all([get(urls.profile), get(urls.activity)]);
  await fs.writeFile(snapshotFile, JSON.stringify({ fetchedAt: new Date().toISOString(), sources: urls, profile: { name: profile.name, login: profile.login, public_repos: profile.public_repos, followers: profile.followers, avatar_url: profile.avatar_url, html_url: profile.html_url }, activity }, null, 2));
}
const snapshot = JSON.parse(await fs.readFile(snapshotFile, 'utf8'));
const { profile, activity } = snapshot;
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const portrait = (await fs.readFile(new URL('../public/profile.png', import.meta.url))).toString('base64');
const contributions = activity.contributions;
if (!Array.isArray(contributions) || !contributions.length) throw new Error('No contribution history in snapshot');
const total = activity.total.lastYear;
if (!Number.isInteger(total)) throw new Error('Missing last-year contribution total');
const date = new Date(snapshot.fetchedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });
const colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
const pitch = 18;
const left = 95;
const top = 282;
const firstWeekday = new Date(contributions[0].date + 'T00:00:00Z').getUTCDay();
const cells = contributions.map((day, i) => {
  const n = i + firstWeekday;
  return `<rect x="${left + Math.floor(n / 7) * pitch}" y="${top + n % 7 * pitch}" width="13" height="13" rx="2" fill="${colors[Math.max(0, Math.min(4, day.level))]}" stroke="#30363d" stroke-width="0.5"><title>${escape(day.date)}: ${day.count} contributions</title></rect>`;
}).join('');
let previousMonth = '';
const months = contributions.map((day, i) => {
  const month = day.date.slice(0, 7);
  if (month === previousMonth) return '';
  previousMonth = month;
  const week = Math.floor((i + firstWeekday) / 7);
  if (week > 50) return '';
  const name = new Date(day.date + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });
  return `<text x="${left + week * pitch}" y="265" font-size="12" fill="#8b949e">${name}</text>`;
}).join('');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="520" viewBox="0 0 1200 520">
<defs><clipPath id="portrait"><circle cx="92" cy="94" r="40"/></clipPath></defs>
<rect width="1200" height="520" rx="16" fill="#0d1117"/>
<rect x="1" y="1" width="1198" height="518" rx="15" fill="none" stroke="#30363d"/>
<image href="data:image/png;base64,${portrait}" x="52" y="54" width="80" height="80" clip-path="url(#portrait)"/>
<g font-family="Arial,Helvetica,sans-serif">
<text x="154" y="86" font-size="28" font-weight="600" fill="#f0f6fc">${escape(profile.name)}</text>
<text x="154" y="117" font-size="17" fill="#8b949e">@${escape(profile.login)}</text>
<rect x="971" y="58" width="175" height="29" rx="14" fill="#161b22" stroke="#30363d"/>
<text x="1058" y="77" text-anchor="middle" font-size="12" fill="#8b949e">PUBLIC GITHUB ACTIVITY</text>
<text x="54" y="183" font-size="32" fill="#f0f6fc" font-weight="600">${total.toLocaleString('en-US')}</text>
<text x="54" y="208" font-size="13" fill="#8b949e">contributions in the last year</text>
<text x="490" y="183" font-size="32" fill="#f0f6fc" font-weight="600">${profile.public_repos}</text>
<text x="490" y="208" font-size="13" fill="#8b949e">public repositories</text>
<text x="885" y="183" font-size="32" fill="#f0f6fc" font-weight="600">${profile.followers}</text>
<text x="885" y="208" font-size="13" fill="#8b949e">followers</text>
${months}
${[1,3,5].map((n,i)=>`<text x="54" y="${top+n*pitch+10}" font-size="11" fill="#8b949e">${['Mon','Wed','Fri'][i]}</text>`).join('')}
${cells}
<text x="54" y="465" font-size="12" fill="#8b949e">github.com/${escape(profile.login)}</text>
<text x="54" y="488" font-size="11" fill="#6e7681">Public profile snapshot / ${date} / contribution counts, not private-repository commit statistics</text>
<text x="978" y="466" font-size="11" fill="#8b949e">Less</text>
${colors.map((color,i)=>`<rect x="${1012+i*18}" y="454" width="13" height="13" rx="2" fill="${color}" stroke="#30363d" stroke-width="0.5"/>`).join('')}
<text x="1110" y="466" font-size="11" fill="#8b949e">More</text>
</g></svg>`;
await fs.mkdir(new URL('../public/work/', import.meta.url), { recursive: true });
await fs.writeFile(new URL('../public/work/github-activity.svg', import.meta.url), svg);
await sharp(Buffer.from(svg)).resize(2400, 1040).png().toFile(fileURLToPath(new URL('../public/work/github-activity.png', import.meta.url)));
console.log(`Generated GitHub contribution image from verified snapshot: ${total} contributions, ${profile.public_repos} public repositories.`);
