// Checks the built site in dist/:
//   - every local href/src/srcset target exists (including #anchors)
//   - each page has exactly one <h1>, a <title> and a meta description
//   - every <img> has an alt attribute
//   - no leftover placeholder text from the old website
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, normalize, relative } from 'node:path';

const ROOT = 'dist';
const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) files.push(p);
  }
})(ROOT);

const ids = new Map();
for (const f of files) {
  ids.set(normalize(f), new Set([...readFileSync(f, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}

const errors = [];
const BANNED = [/\?\?\?/, /facebookov/i, /herní/i, /lorem/i, /undefined/, /\[object/];

for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const where = relative(ROOT, f);
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) errors.push(`${where}: ${h1} × <h1>`);
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${where}: missing <title>`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) errors.push(`${where}: missing meta description`);
  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\salt="/.test(m[0])) errors.push(`${where}: img without alt`);
  const text = html.replace(/<[^>]+>/g, ' ');
  for (const b of BANNED) if (b.test(text)) errors.push(`${where}: banned text ${b}`);

  const urls = [...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  for (const m of html.matchAll(/\ssrcset="([^"]+)"/g)) urls.push(...m[1].split(',').map((s) => s.trim().split(/\s+/)[0]));
  for (const u of urls) {
    if (/^(https?:|mailto:|tel:|data:)/.test(u)) continue;
    const [path, hash] = u.split('#');
    const target = path ? normalize(join(dirname(f), path)) : normalize(f);
    if (!existsSync(target)) { errors.push(`${where}: broken link ${u}`); continue; }
    if (hash && target.endsWith('.html') && !ids.get(target)?.has(hash)) errors.push(`${where}: missing anchor ${u}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  console.error(`\n${errors.length} problem(s) in ${files.length} pages`);
  process.exit(1);
}
console.log(`OK: ${files.length} pages, links, anchors, headings and alt texts checked`);
