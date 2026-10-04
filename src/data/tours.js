// "Vizuální prohlídka" on product pages: same dark section, layout and
// behaviour for every product (src/lib/media-markup.js → productTour).
//
// Each tour uses either a video from src/data/media.js (`media`) whose
// footage matches that product, or the product's photographs (`photos`) when
// no matching video exists. Chapter texts repeat only facts already listed
// for the product; they do not describe actions seen in the AI footage.

export const tours = {
  'chlazeny-automat-na-potraviny': {
    media: 'chilledTour',
    title: 'Chlazený automat zblízka',
    intro: 'Prohlédněte si celkové provedení a detaily automatu. Video je ilustrační; konkrétní výbavu upřesníme v nabídce.',
    // Five chapters following the full clip. Where the footage shows actions
    // that are not confirmed for this product (payment, spiral dispensing),
    // the text says so instead of presenting them as features.
    chapters: [
      { title: 'Celý automat', text: 'Celkové provedení automatu. Rozměry 1330 × 815 × 1915 mm a příkon najdete v technických parametrech níže.' },
      { title: 'Dotykový displej', text: 'Zákazník vybírá zboží na dotykovém displeji o úhlopříčce 21,5″. Řídicí systém běží na platformě Android.' },
      { title: 'Výběr a platba', text: 'Vizualizace ukazuje výběr na displeji a platbu u terminálu. Podporované způsoby platby upřesníme v nabídce.' },
      { title: 'Prostor pro zboží', text: 'Až 6 polic a 9 kanálů na polici, celkem až 54 prodejních pozic. Chlazení 4–8 °C je volitelné.' },
      { title: 'Výdej a odběr zboží', text: 'Ve vizualizaci zboží vydává spirála do výdejního otvoru. Tento automat vydává zboží výtahem; způsob výdeje se liší podle modelu.' },
    ],
  },
  'automaticky-boxovy-system': {
    media: 'lockerShowcase',
    title: 'Boxový systém zblízka',
    intro: 'Ilustrační vizualizace jednoho provedení. Skutečné uspořádání schránek navrhneme podle vašich požadavků.',
    chapters: [
      { title: 'Celá skříň', text: 'Uzamykatelné schránky pro výdej připraveného zboží. Počet a uspořádání schránek odpovídá konfiguraci, kterou s vámi navrhneme.' },
      { title: 'Schránky a ovládací panel', text: 'Dveře schránek v ocelovém nebo průhledném provedení, chlazení v rozsahu 2–8 °C. Vybavení ovládacího panelu upřesníme v nabídce.' },
      { title: 'Ilustrační umístění v interiéru', text: 'Například pro výdej předem objednaných jídel a nákupů nebo pro firemní a areálové stravování. Požadavky na místo instalace projdeme předem.' },
    ],
  },
  'modularni-boxovy-system': {
    // No footage of a modular arrangement: example photographs instead.
    photos: ['boxovy-system-12-schranek', 'boxovy-system-bily', 'boxovy-system-zeleny'],
    title: 'Modulární systém zblízka',
    intro: 'Ukázky provedení boxových systémů. Modulární sestavu navrhneme podle vašeho prostoru a zboží.',
    chapters: [
      { title: 'Sestava na míru', text: 'Sestavu navrhneme podle prostoru, ve kterém bude systém stát.' },
      { title: 'Schránky podle zboží', text: 'Počet a velikost schránek odpovídá vašemu zboží.' },
      { title: 'Konfigurace před nabídkou', text: 'Konfiguraci s vámi projdeme ještě před vypracováním nabídky.' },
    ],
  },
};
