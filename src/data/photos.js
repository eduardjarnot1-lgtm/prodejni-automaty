// Photo registry.
//
// How to add photos (e.g. the second batch):
//   1. Put the original file into media/originals/ (jpg, png or webp).
//   2. Run `npm run images` – creates optimized WebP variants in
//      src/assets/img/ and updates src/data/photo-manifest.json.
//   3. Add an entry below (id = file name without extension).
//   4. Assign it to a product in src/data/products.js (`photos: ['id']`)
//      only when the match with that model is confirmed. Otherwise leave
//      `product: null` and use `category` for general example photos.
//
// Fields:
//   id        file name in media/originals without extension
//   alt       Czech alternative text describing what is visible
//   category  'chlazene-automaty' | 'boxove-systemy' | 'instalace' | null
//   product   product slug when the assignment is confirmed, otherwise null
//   note      internal note, never rendered on the website

export const photos = [
  {
    id: 'boxovy-system-bily',
    alt: 'Bílý výdejní boxový systém s prosklenými schránkami a centrálním dotykovým terminálem',
    category: 'boxove-systemy',
    product: null,
    note: 'Batch 1, cropped from a screenshot of the old site (low resolution). Model not confirmed.',
  },
  {
    id: 'boxovy-system-zeleny',
    alt: 'Výdejní boxový systém se zelenými schránkami, dotykovým displejem a stříškou nad terminálem',
    category: 'boxove-systemy',
    product: null,
    note: 'Batch 1, cropped from a screenshot of the old site (low resolution). Model not confirmed.',
  },
  {
    id: 'boxovy-system-modry',
    alt: 'Modrý výdejní boxový systém s dotykovým terminálem uprostřed, vizualizace výrobce',
    category: 'boxove-systemy',
    product: null,
    note: 'Batch 1, manufacturer visual with decorative background and partly illegible text. Model not confirmed.',
  },
];

export const photoById = (id) => photos.find((p) => p.id === id);
export const photosByCategory = (cat) => photos.filter((p) => p.category === cat);
