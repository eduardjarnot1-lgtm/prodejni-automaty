// Creates optimized WebP variants for every file in media/originals/ and
// writes src/data/photo-manifest.json (dimensions + available widths).
// Requires ImageMagick (`convert`, `identify`) on the developer machine.
// Images are never upscaled.
import { execFileSync } from 'node:child_process';
import { readdirSync, mkdirSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join, parse } from 'node:path';

const SRC = 'media/originals';
const OUT = 'src/assets/img';
const MANIFEST = 'src/data/photo-manifest.json';
const WIDTHS = [480, 800, 1200, 1600];
const QUALITY = '82';

mkdirSync(OUT, { recursive: true });
const manifest = {};

for (const file of readdirSync(SRC).sort()) {
  if (!/\.(jpe?g|png|webp|tiff?)$/i.test(file)) continue;
  const id = parse(file).name;
  const input = join(SRC, file);
  const [w, h] = execFileSync('identify', ['-format', '%w %h', `${input}[0]`])
    .toString().trim().split(' ').map(Number);

  const targets = WIDTHS.filter((tw) => tw < w);
  targets.push(w); // always keep the original width as the largest variant
  const variants = [];
  for (const tw of targets) {
    const out = join(OUT, `${id}-${tw}.webp`);
    if (!existsSync(out) || statSync(out).mtimeMs < statSync(input).mtimeMs) {
      execFileSync('convert', [
        `${input}[0]`, '-auto-orient', '-strip',
        '-resize', `${tw}x`, '-quality', QUALITY, out,
      ]);
    }
    variants.push({ w: tw, file: `${id}-${tw}.webp` });
  }
  manifest[id] = { width: w, height: h, variants };
  console.log(`${id}: ${w}×${h} → ${variants.map((v) => v.w).join(', ')}`);
}

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Manifest: ${MANIFEST}`);
