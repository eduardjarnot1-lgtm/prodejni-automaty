// Services. `id` is used as an anchor on sluzby.html and as a value in the
// inquiry form. Text must not promise terms that are not confirmed
// (e.g. servicing included in the purchase price, response times).

// Order = order on the homepage and on sluzby.html; the buyback service is
// last (shown as a separate strip on the homepage).
export const services = [
  {
    id: 'prodej',
    title: 'Prodej automatů',
    short: 'Nové chlazené automaty a výdejní boxové systémy.',
    text: [
      'Dodáváme chlazené automaty na potraviny a výdejní boxové systémy. Vybraný typ a výbavu shrneme v nezávazné nabídce.',
    ],
  },
  {
    id: 'pronajem',
    title: 'Pronájem automatů',
    short: 'Možnost provozu bez jednorázové investice do koupě.',
    text: [
      'Automaty nabízíme také k pronájmu. Podmínky pronájmu a dostupné typy zařízení upřesníme v nabídce.',
    ],
  },
  {
    id: 'poradenstvi',
    title: 'Poradenství při výběru',
    short: 'Bezplatně s vámi probereme vhodné zařízení pro váš provoz.',
    text: [
      'Poradenství a konzultace k vašemu projektu jsou zdarma. Pomůžeme vybrat zařízení s ohledem na druh zboží, místo instalace a ekonomiku provozu.',
    ],
  },
  {
    id: 'instalace',
    title: 'Instalace a uvedení do provozu',
    short: 'Umístění, zapojení a spuštění automatu na místě.',
    text: [
      'Automat dopravíme, umístíme, zapojíme a uvedeme do provozu. Před instalací s vámi projdeme požadavky na místo, například přívod elektřiny a přístup.',
    ],
  },
  {
    id: 'servis',
    title: 'Servis a údržba',
    short: 'Pomoc s opravami, údržbou a provozem zařízení.',
    text: [
      'Zajišťujeme servis a údržbu automatů i během jejich provozu. Rozsah a podmínky servisu sjednáváme individuálně.',
    ],
  },
  {
    id: 'nahradni-dily',
    title: 'Náhradní díly',
    short: 'Pomůžeme se zajištěním dílů k vašemu automatu.',
    text: [
      'Pomůžeme se zajištěním náhradních dílů. Uveďte typ automatu a díl, který potřebujete.',
    ],
  },
  {
    id: 'vykup',
    title: 'Výkup použitých automatů',
    short: 'Nabídněte nám automat, který už nevyužijete.',
    text: [
      'Vykupujeme použité automaty. Pošlete nám typ zařízení, jeho stáří a stav, ideálně i fotografie.',
    ],
  },
];

export const process = [
  {
    title: 'Konzultace',
    text: 'Probereme, co chcete prodávat nebo vydávat, kde bude automat stát a jaký provoz očekáváte.',
  },
  {
    title: 'Výběr zařízení',
    text: 'Doporučíme vhodný typ automatu a výbavu. Zvážíme koupi i pronájem.',
  },
  {
    title: 'Nabídka',
    text: 'Připravíme nezávaznou nabídku s cenou a podmínkami dodání.',
  },
  {
    title: 'Instalace a podpora',
    text: 'Automat nainstalujeme a uvedeme do provozu. Servis a údržbu zajistíme i během provozu.',
  },
];

// Frequently asked questions. Answers use only confirmed facts already
// published elsewhere on the site.
export const faq = [
  {
    q: 'Je konzultace opravdu zdarma?',
    a: 'Ano. Poradenství a konzultace k vašemu projektu jsou zdarma a k ničemu vás nezavazují.',
  },
  {
    q: 'Můžu si automat pronajmout místo koupě?',
    a: 'Ano, automaty nabízíme ke koupi i k pronájmu. Možnost pronájmu pro konkrétní typ a podmínky upřesníme v nabídce.',
  },
  {
    q: 'Zajistíte instalaci a uvedení do provozu?',
    a: 'Ano. Automat nainstalujeme a uvedeme do provozu. Před instalací s vámi projdeme požadavky na místo, například přívod elektřiny a přístup.',
  },
  {
    q: 'Jsou ceny na webu konečné?',
    a: 'Ne. Uvedené ceny jsou orientační. Konečnou cenu podle konfigurace, výbavy a rozsahu instalace uvedeme v nezávazné nabídce.',
  },
  {
    q: 'Je servis součástí kupní ceny?',
    a: 'Rozsah a podmínky servisu sjednáváme individuálně a uvedeme je v nabídce.',
  },
  {
    q: 'Kde působíte?',
    a: 'Automaty dodáváme a servisujeme po celé České republice.',
  },
];
