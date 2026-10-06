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
//   title     short Czech name shown in captions and thumbnails
//   alt       Czech alternative text describing what is visible
//   category  'chlazene-automaty' | 'boxove-systemy' | 'instalace' | null
//   product   product slug when the assignment is confirmed, otherwise null
//   config    'double' marks the two-cabinet assembly (kept apart from single-machine galleries)
//   note      internal note, never rendered on the website

export const photos = [
  // Batch 3 (higher resolution, white background). Listed first so they are
  // used as the main example of their category.
  {
    id: 'chlazeny-automat-dotykovy-displej',
    title: 'Prodejní automat s dotykovým displejem',
    alt: 'Prodejní automat s proskleným výdejním prostorem, šesti policemi se zbožím, dotykovým displejem a platebním terminálem',
    category: 'chlazene-automaty',
    product: null,
    note: 'Batch 3. Very likely the chilled-food machine (touchscreen, 6 shelves, pickup door), but the matching dimension drawing (media/pending) shows 1352 × 951 × 1950 mm vs. the listed 1330 × 815 × 1915 mm. Assign to product after confirmation.',
  },
  {
    id: 'chlazeny-automat-dvojita-sestava',
    title: 'Sestava dvou prodejních automatů',
    config: 'double', // shown in the catalogue's 'Ukázka sestavy', not as a photo of the single machine
    alt: 'Sestava dvou prosklených prodejních automatů se společným ovládacím panelem s dotykovým displejem',
    category: 'chlazene-automaty',
    product: null,
    note: 'Batch 3. Two-cabinet assembly. Possibly the unnamed 200 000 Kč assembly from the old site – needs confirmation.',
  },
  {
    id: 'boxovy-system-12-schranek',
    title: 'Boxový systém s 12 schránkami',
    alt: 'Výdejní boxový systém s dvanácti prosklenými schránkami, dotykovým displejem a čtečkou',
    category: 'boxove-systemy',
    product: null,
    note: 'Batch 3. Manufacturer photo with "YOUR LOGO HERE" placeholder on the top panel. Model not confirmed (transparent doors fit the automatic locker system).',
  },
  {
    id: 'boxovy-system-bily',
    title: 'Boxový systém s prosklenými schránkami',
    alt: 'Bílý výdejní boxový systém s prosklenými schránkami a centrálním dotykovým terminálem',
    category: 'boxove-systemy',
    product: null,
    note: 'Batch 1, cropped from a screenshot of the old site (low resolution). Model not confirmed.',
  },
  {
    id: 'boxovy-system-zeleny',
    title: 'Boxový systém se zelenými schránkami',
    alt: 'Výdejní boxový systém se zelenými schránkami, dotykovým displejem a stříškou nad terminálem',
    category: 'boxove-systemy',
    product: null,
    note: 'Batch 1, cropped from a screenshot of the old site (low resolution). Model not confirmed.',
  },
  {
    id: 'boxovy-system-modry',
    title: 'Boxový systém, vizualizace výrobce',
    alt: 'Modrý výdejní boxový systém s dotykovým terminálem uprostřed, vizualizace výrobce',
    category: 'boxove-systemy',
    product: null,
    note: 'Batch 1, manufacturer visual with decorative background and partly illegible text. Model not confirmed.',
  },
  {
    id: 'boxovy-system-oranzovy-potisk',
    title: 'Boxový systém s potiskem, vizualizace',
    alt: 'Vizualizace chlazeného boxového systému s barevným potiskem dvířek a ovládacím terminálem s displejem',
    category: 'boxove-systemy',
    product: null,
    note: 'Batch 2, cropped from a screenshot of the old site (548 px). Manufacturer mock-up with English text "Refrigerated Locker 24/7" and "Put Your Brand Here" – does not imply 24/7 operation or a branding service. Model not confirmed.',
  },
  // HAHA VENDING Pro 542: photos supplied by the client (manufacturer
  // material). Unmodified uploads: media/source/haha-vending-pro-542/.
  // Assigned to the product, so they are never used as category examples.
  // The "24H SMART VENDING" print is the manufacturer's design; the website
  // does not promise 24/7 operation. The English marketing image
  // (marketing-pro-542-en.png) is not used: its figures (5.96 kWh/24 h,
  // 324+ bottles) contradict the brochure.
  {
    id: 'haha-pro-542-celkovy-pohled',
    title: 'HAHA VENDING Pro 542',
    alt: 'Prodejní automat HAHA VENDING Pro 542 v tmavém provedení: prosklené dveře, šest polic s nápoji a svačinami a platební terminál na dveřích',
    category: 'chlazene-automaty',
    product: 'haha-vending-pro-542',
    note: 'Client upload, three-quarter view on white background (418 × 776 px).',
  },
  {
    id: 'haha-pro-542-pohled-zepredu',
    title: 'Pohled zepředu',
    alt: 'HAHA VENDING Pro 542 zepředu: prosklené dveře, šest polic se zbožím a platební terminál',
    category: 'chlazene-automaty',
    product: 'haha-vending-pro-542',
    note: 'Client upload, front view against a grey wall (low resolution, 212 × 488 px).',
  },
  {
    id: 'haha-pro-542-detaily',
    title: 'Detaily provedení (materiál výrobce)',
    alt: 'Materiál výrobce s anglickými popisky: detail kamery pro rozpoznávání zboží, hliníkového rámu, vyhřívaných dveří proti zamlžení a samozavíracích dveří',
    category: 'chlazene-automaty',
    product: 'haha-vending-pro-542',
    note: 'Client upload "Clear · Long-Lasting · Secure", headline cropped off (y 105–701). English labels kept. Self-closing door is not in the brochure, so it is not claimed in the text.',
  },
  // Illustrations for the "AI automaty" page, supplied by the client
  // (originals: media/source/ai-ilustrace/). Schematic, not photographs of
  // the real machine or app; the page labels them as illustrations. Not
  // assigned to a category, so they never appear in catalogue galleries.
  {
    id: 'ai-nakup-1-platba',
    title: 'Přiložení karty',
    alt: 'Ruka přikládá platební kartu k bezkontaktní čtečce',
    category: null, product: null,
    note: 'Crop 1/3 of the supplied purchase-journey illustration.',
  },
  {
    id: 'ai-nakup-2-vyber',
    title: 'Výběr zboží',
    alt: 'Otevřená chladicí vitrína, ruka bere lahev s džusem z police',
    category: null, product: null,
    note: 'Crop 2/3 of the supplied purchase-journey illustration.',
  },
  {
    id: 'ai-nakup-3-dokonceni',
    title: 'Dokončený nákup',
    alt: 'Telefon se zeleným potvrzením a účtenka',
    category: null, product: null,
    note: 'Crop 3/3 of the supplied purchase-journey illustration. Receipt shown only as an illustration.',
  },
  {
    id: 'ai-rozpoznavani-police',
    title: 'Rozpoznávání zboží',
    alt: 'Kamera nad policí se zbožím; vyznačené rámečky kolem lahve a salátu, které ruka odebírá',
    category: null, product: null,
    note: 'Supplied illustration of camera recognition.',
  },
  {
    id: 'ai-prehled-sortimentu',
    title: 'Přehled sortimentu a prodejů',
    alt: 'Tablet se sloupcovým grafem a kartami produktů, vedle lahev, jogurt a účtenka',
    category: null, product: null,
    note: 'Supplied illustration; abstract interface without real data.',
  },
  {
    id: 'ai-upozorneni-zasoby',
    title: 'Upozornění z automatu',
    alt: 'Telefon s ikonami teploty, zásob a servisu, spojený se zvonečkem upozornění a chladicím automatem',
    category: null, product: null,
    note: 'Supplied illustration of alerts.',
  },
  {
    id: 'ai-automat-cloud-aplikace',
    title: 'Automat, cloud a aplikace',
    alt: 'Chladicí automat propojený přes cloud s telefonem, na kterém je seznam produktů',
    category: null, product: null,
    note: 'Supplied illustration of the machine – cloud – app connection.',
  },
];

export const photoById = (id) => photos.find((p) => p.id === id);
// Category examples only: photos assigned to a product belong to that product.
export const photosByCategory = (cat) => photos.filter((p) => p.category === cat && !p.product);
