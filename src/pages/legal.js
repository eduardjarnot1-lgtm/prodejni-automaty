// Legal pages: privacy (GDPR information), cookies, website terms of use.
//
// Written for the website as it is built: no analytics, no marketing tools,
// no cookies set by the site, an inquiry form that only prepares an e-mail in
// the visitor's own mail program (nothing is sent to a server), and a Google
// map that loads only after a click. If any of that changes (analytics, a
// form backend, chat, newsletter, e-shop), these texts must be updated.
//
// Facts that are not known yet (IČO, legal form, concrete retention periods,
// commercial terms) are NOT invented; see LEGAL-REVIEW.md.

import { esc, join } from '../lib/html.js';
import { site, addressOneLine } from '../data/site.js';
import { pageHead, contactBand, emailLink, phoneLink } from '../lib/components.js';

const c = site.contact;
const op = site.operator;

// "Ing. Jan Petr, Kaštanová 489/34, 620 00 Brno, IČO …"
export function operatorLine() {
  return [op.name, addressOneLine(), c.companyId ? `IČO: ${c.companyId}` : '', op.register].filter(Boolean).join(', ');
}

const legalPage = ({ path, title, description, lead, body }) => ({
  path,
  navKey: 'legal',
  title,
  description,
  render(r) {
    return `
${pageHead({ r, title, lead, crumbs: [{ label: 'Úvod', href: 'index.html' }, { label: title }] })}
<section class="section section--first">
  <div class="wrap legal">
    ${body(r)}
    <p class="legal__updated">Poslední aktualizace: ${esc(site.processors.legalUpdated)}</p>
  </div>
</section>
${contactBand(r, { heading: 'Máte dotaz k těmto informacím?' })}
`;
  },
});

const operatorBlock = () => `<dl class="legal__card">
      <div><dt>Provozovatel</dt><dd>${esc(operatorLine())}</dd></div>
      <div><dt>E-mail</dt><dd>${emailLink()}</dd></div>
      <div><dt>Telefon</dt><dd>${phoneLink()}</dd></div>
    </dl>`;

// ---------------------------------------------------------------------------
export const privacy = legalPage({
  path: 'ochrana-osobnich-udaju.html',
  title: 'Ochrana osobních údajů',
  description: 'Informace o zpracování osobních údajů při návštěvě webu a při nezávazné poptávce.',
  lead: 'Jaké údaje zpracováváme, proč, jak dlouho a jaká máte práva.',
  body: (r) => `
    <h2>Kdo vaše údaje zpracovává</h2>
    <p>Správcem osobních údajů je provozovatel tohoto webu:</p>
    ${operatorBlock()}

    <h2>Jaké údaje zpracováváme a proč</h2>
    <h3>Poptávka, e-mail a telefon</h3>
    <p>Když nám napíšete nebo zavoláte, zpracováváme údaje, které nám sami sdělíte: jméno, e-mail, případně telefon, o co máte zájem a obsah zprávy. Používáme je jen k tomu, abychom vám odpověděli, připravili nabídku a případně uzavřeli a plnili smlouvu.</p>
    <p>Právním základem je jednání o smlouvě na vaši žádost a plnění smlouvy (čl. 6 odst. 1 písm. b) GDPR). Pokud smlouva nevznikne, je základem náš oprávněný zájem odpovědět na váš dotaz a mít přehled o vzájemné komunikaci (čl. 6 odst. 1 písm. f) GDPR). Uvedení údajů je dobrovolné, bez kontaktu vám ale nemůžeme odpovědět.</p>
    <p><strong>Jak funguje formulář:</strong> poptávkový formulář na tomto webu žádné údaje neodesílá ani neukládá. Pouze připraví zprávu ve vašem e-mailovém programu a odeslání je na vás. Údaje k nám tedy dorazí až jako běžný e-mail.</p>

    <h3>Návštěva webu</h3>
    <p>Při načtení stránek zpracovává poskytovatel webhostingu technické údaje nutné k doručení webu a jeho zabezpečení, zejména IP adresu, čas požadavku a údaje o prohlížeči. Právním základem je náš oprávněný zájem na bezpečném a funkčním provozu webu (čl. 6 odst. 1 písm. f) GDPR).</p>
    <p>Web nepoužívá analytické ani reklamní nástroje a neprofiluje návštěvníky. Podrobnosti o ukládání dat v prohlížeči najdete v <a href="${r('cookies.html')}">zásadách cookies</a>.</p>

    <h3>Mapa</h3>
    <p>Mapa na stránce Kontakt se načte až po kliknutí na tlačítko „Zobrazit mapu“. Teprve potom se váš prohlížeč spojí se službou Google Maps společnosti Google, která zpracovává mimo jiné vaši IP adresu a může ukládat cookies podle vlastních zásad: <a href="https://policies.google.com/privacy?hl=cs" rel="noopener">policies.google.com/privacy</a>. Pokud mapu nenačtete, Google od nás žádné údaje nedostane.</p>

    <h2>Kdo další se k údajům může dostat</h2>
    <ul>
      <li>poskytovatel webhostingu: ${esc(site.processors.hosting)}, který zpracovává technické údaje o návštěvě; předávání do USA se řídí zárukami podle kapitoly V GDPR, které poskytovatel nabízí ve svých smluvních podmínkách,</li>
      <li>poskytovatelé našich e-mailových schránek, přes které vaše zprávy přijímáme,</li>
      <li>Google, pouze pokud sami načtete mapu,</li>
      <li>osoby, které pro nás vedou účetnictví nebo poskytují právní služby, pokud je to potřeba, a orgány veřejné moci, pokud to vyžaduje zákon.</li>
    </ul>
    <p>Vaše údaje neprodáváme a nepoužíváme je k zasílání reklamy.</p>

    <h2>Jak dlouho údaje uchováváme</h2>
    <p>Údaje z poptávky a komunikace uchováváme po dobu nezbytnou k vyřízení dotazu a navazující komunikace. Pokud uzavřeme smlouvu, uchováváme údaje po dobu jejího trvání a dále po dobu, kterou stanoví právní předpisy (například účetní a daňové) nebo kterou potřebujeme k uplatnění či obhajobě právních nároků. Technické údaje u poskytovatele webhostingu se uchovávají podle jeho pravidel.</p>

    <h2>Vaše práva</h2>
    <p>Máte právo požadovat přístup ke svým údajům, jejich opravu nebo výmaz, omezení zpracování a přenositelnost údajů. Proti zpracování na základě oprávněného zájmu můžete vznést námitku. Stačí nám napsat na ${emailLink()}.</p>
    <p>Pokud se domníváte, že údaje zpracováváme v rozporu s právními předpisy, můžete podat stížnost u Úřadu pro ochranu osobních údajů, Pplk. Sochora 27, 170 00 Praha 7, <a href="https://uoou.gov.cz" rel="noopener">uoou.gov.cz</a>.</p>
    <p>Nedochází k automatizovanému rozhodování ani profilování.</p>
`,
});

// ---------------------------------------------------------------------------
export const cookies = legalPage({
  path: 'cookies.html',
  title: 'Zásady cookies',
  description: 'Jaké cookies a data v prohlížeči web používá. Web nepoužívá analytické ani reklamní cookies.',
  lead: 'Web nepoužívá analytické, reklamní ani sledovací cookies.',
  body: () => `
    <h2>Cookies tohoto webu</h2>
    <p>Tento web sám žádné cookies nenastavuje. Nepoužíváme Google Analytics, reklamní pixely ani jiné nástroje pro měření návštěvnosti nebo sledování návštěvníků. Proto po vás nežádáme souhlas s cookies a nezobrazujeme cookie lištu.</p>

    <h2>Data uložená ve vašem prohlížeči</h2>
    <div class="table-scroll" tabindex="0" role="region" aria-label="Tabulka dat v prohlížeči (lze posouvat do stran)"><table class="specs legal__table">
      <caption class="visually-hidden">Data ukládaná do prohlížeče</caption>
      <thead><tr><th scope="col">Název</th><th scope="col">Typ</th><th scope="col">Účel</th><th scope="col">Doba uložení</th></tr></thead>
      <tbody>
        <tr><td>sa-media-motion</td><td>místní úložiště prohlížeče (localStorage)</td><td>Zapamatuje si, že jste vypnuli pohyb videí. Uloží se jen tehdy, když to sami nastavíte.</td><td>Dokud ho nesmažete nebo pohyb znovu nezapnete.</td></tr>
        <tr><td>stav navigace</td><td>historie prohlížeče (history state)</td><td>Pamatuje si pozici na stránce, abyste se tlačítkem Zpět vrátili na stejné místo.</td><td>Po dobu návštěvy v daném panelu prohlížeče.</td></tr>
      </tbody>
    </table></div>
    <p>Tato data neobsahují osobní údaje, neodesílají se nám ani nikomu dalšímu a slouží jen k fungování webu, o které jste požádali. Podle § 89 odst. 3 zákona o elektronických komunikacích k nim proto souhlas není potřeba.</p>

    <h2>Obsah třetích stran</h2>
    <p>Mapa Google na stránce Kontakt se načte až po kliknutí na „Zobrazit mapu“. Kliknutím ji načítáte vy a společnost Google pak může ukládat vlastní cookies a zpracovávat vaši IP adresu podle svých zásad: <a href="https://policies.google.com/technologies/cookies?hl=cs" rel="noopener">policies.google.com/technologies/cookies</a>. Odkazy na Mapy.com a Google Maps otevírají jejich vlastní weby.</p>

    <h2>Jak data smazat</h2>
    <p>Uložená data můžete kdykoli smazat v nastavení svého prohlížeče (vymazání dat webu nebo historie prohlížení).</p>
`,
});

// ---------------------------------------------------------------------------
export const terms = legalPage({
  path: 'podminky-uzivani.html',
  title: 'Podmínky užívání webu',
  description: 'Podmínky užívání webu, informace o cenách, poptávkách, smlouvách, reklamacích a vrácení zboží.',
  lead: 'Co z informací na webu vyplývá a co se sjednává až ve smlouvě.',
  body: (r) => `
    <h2>Provozovatel</h2>
    ${operatorBlock()}

    <h2>Informace na webu</h2>
    <p>Informace o automatech, službách a cenách mají informativní povahu. Nejsou návrhem na uzavření smlouvy. Uvedené ceny jsou orientační; závaznou cenu a podmínky uvedeme v nabídce podle konkrétní konfigurace.</p>
    <p>Technické parametry vycházejí z podkladů výrobců. Fotografie a videa mohou ukazovat jiné provedení nebo výbavu. Videa a některé obrázky označené jako ilustrační vizualizace byly vytvořeny pomocí umělé inteligence a neukazují skutečný provoz ani skutečné funkce konkrétního automatu.</p>

    <h2>Poptávka a uzavření smlouvy</h2>
    <p>Odeslání poptávky je nezávazné a nevzniká jím smlouva. Smlouvu o koupi, pronájmu, instalaci nebo servisu uzavíráme vždy individuálně. Podmínky dodání, platby, záruky a servisu jsou uvedeny v nabídce a ve smlouvě. Přes tento web nelze nic koupit ani zaplatit.</p>

    <h2>Reklamace, odstoupení od smlouvy a vrácení peněz</h2>
    <p>Tento web neprovozuje e-shop, a nepřijímá proto platby ani objednávky. Práva z vadného plnění (reklamace), případné odstoupení od smlouvy a vrácení peněz se řídí uzavřenou smlouvou a právními předpisy, zejména občanským zákoníkem.</p>
    <p>Pokud jste spotřebitel, máte práva, která vám zákon přiznává a která smlouva nemůže omezit, včetně práva odstoupit od smlouvy uzavřené na dálku nebo mimo obchodní prostory ve lhůtě 14 dnů v případech, kdy to zákon umožňuje. Podrobnosti uvedeme ve smlouvě.</p>
    <p>Spory se spotřebiteli lze řešit i mimosoudně. Příslušným subjektem je Česká obchodní inspekce, <a href="https://adr.coi.gov.cz" rel="noopener">adr.coi.gov.cz</a>.</p>

    <h2>Autorská práva a ochranné známky</h2>
    <p>Texty, grafika a uspořádání webu jsou chráněny autorským právem. Bez souhlasu provozovatele je nelze dále šířit. Fotografie výrobků a názvy jako HAHA VENDING, AI VENDING, Apple Pay nebo Google Pay patří jejich vlastníkům a jsou uvedeny jen pro popis nabízených výrobků a jejich funkcí.</p>

    <h2>Odkazy na jiné weby</h2>
    <p>Web obsahuje odkazy na stránky třetích stran (například mapové služby). Za jejich obsah a zpracování údajů na nich neodpovídáme.</p>

    <h2>Osobní údaje a cookies</h2>
    <p>Informace o zpracování osobních údajů najdete na stránce <a href="${r('ochrana-osobnich-udaju.html')}">Ochrana osobních údajů</a>, informace o cookies na stránce <a href="${r('cookies.html')}">Zásady cookies</a>.</p>

    <h2>Rozhodné právo</h2>
    <p>Užívání webu se řídí právním řádem České republiky.</p>
`,
});
