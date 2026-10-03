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
  // Batch 3 (higher resolution, white background). Listed first so they are
  // used as the main example of their category.
  {
    id: 'chlazeny-automat-dotykovy-displej',
    alt: 'Prodejní automat s proskleným výdejním prostorem, šesti policemi se zbožím, dotykovým displejem a platebním terminálem',
    category: 'chlazene-automaty',
    product: null,
    note: 'Batch 3. Very likely the chilled-food machine (touchscreen, 6 shelves, pickup door), but the matching dimension drawing (media/pending) shows 1352 × 951 × 1950 mm vs. the listed 1330 × 815 × 1915 mm. Assign to product after confirmation.',
  },
  {
    id: 'chlazeny-automat-dvojita-sestava',
    alt: 'Sestava dvou prosklených prodejních automatů se společným ovládacím panelem s dotykovým displejem',
    category: 'chlazene-automaty',
    product: null,
    note: 'Batch 3. Two-cabinet assembly. Possibly the unnamed 200 000 Kč assembly from the old site – needs confirmation.',
  },
  {
    id: 'boxovy-system-12-schranek',
    alt: 'Výdejní boxový systém s dvanácti prosklenými schránkami, dotykovým displejem a čtečkou',
    category: 'boxove-systemy',
    product: null,
    note: 'Batch 3. Manufacturer photo with "YOUR LOGO HERE" placeholder on the top panel. Model not confirmed (transparent doors fit the automatic locker system).',
  },
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
  {
    id: 'boxovy-system-oranzovy-potisk',
    alt: 'Vizualizace chlazeného boxového systému s barevným potiskem dvířek a ovládacím terminálem s displejem',
    category: 'boxove-systemy',
    product: null,
    note: 'Batch 2, cropped from a screenshot of the old site (548 px). Manufacturer mock-up with English text "Refrigerated Locker 24/7" and "Put Your Brand Here" – does not imply 24/7 operation or a branding service. Model not confirmed.',
  },
];

export const photoById = (id) => photos.find((p) => p.id === id);
export const photosByCategory = (cat) => photos.filter((p) => p.category === cat);
