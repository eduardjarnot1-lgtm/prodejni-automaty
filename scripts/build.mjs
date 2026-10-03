// Static site build: renders src/pages/* into dist/ and copies src/assets.
//   node scripts/build.mjs            → dist/
//   node scripts/build.mjs --preview  → preview/ (root page without the
//                                        <html>/<head>/<body> skeleton, for
//                                        the private claude.ai preview)
import { mkdirSync, rmSync, writeFileSync, cpSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { rel } from '../src/lib/html.js';
import { layout } from '../src/lib/layout.js';
import { publishedProducts } from '../src/data/products.js';
import home from '../src/pages/home.js';
import catalog from '../src/pages/catalog.js';
import { productPage } from '../src/pages/product.js';
import services from '../src/pages/services.js';
import about from '../src/pages/about.js';
import contact from '../src/pages/contact.js';
import notFound from '../src/pages/not-found.js';

const preview = process.argv.includes('--preview');
const OUT = preview ? 'preview' : 'dist';

const pages = [home, catalog, ...publishedProducts.map(productPage), services, about, contact, notFound];

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync('src/assets', join(OUT, 'assets'), { recursive: true });

for (const page of pages) {
  const depth = page.path.split('/').length - 1;
  const r = rel(depth);
  const html = layout({
    r,
    path: page.path,
    navKey: page.navKey,
    title: page.title,
    description: page.description,
    body: page.render(r),
    preview: preview && page.path === 'index.html',
  });
  const file = join(OUT, page.path);
  mkdirSync(dirname(file), { recursive: true });
  // Collapse blank lines left by conditional template parts.
  writeFileSync(file, html.replace(/\n\s*\n+/g, '\n'));
  console.log(`  ${file}`);
}
console.log(`Built ${pages.length} pages → ${OUT}/`);
