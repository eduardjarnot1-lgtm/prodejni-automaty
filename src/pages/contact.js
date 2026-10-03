import { esc, join } from '../lib/html.js';
import { icons } from '../lib/icons.js';
import { site, addressOneLine, mapLinks } from '../data/site.js';
import { pageHead, contactList, inquiryOptions } from '../lib/components.js';

const c = site.contact;

export default {
  path: 'kontakt.html',
  navKey: 'kontakt',
  title: 'Kontakt a nezávazná poptávka',
  description: `Kontakt: ${c.person}, tel. ${c.phone}, e-mail ${c.email}. ${addressOneLine()}. Nezávazná poptávka výdejních automatů a služeb.`,
  render(r) {
    const groups = inquiryOptions();
    // Invisible anchors so links like kontakt.html#poptat-<id> scroll to the
    // form even without JavaScript; main.js also preselects the option.
    const anchors = join(groups.flatMap((g) => g.items), (o) => `<span class="anchor" id="poptat-${esc(o.id)}"></span>`);

    return `
${pageHead({
  r,
  title: 'Kontakt',
  lead: `Zavolejte, napište nebo vyplňte nezávaznou poptávku. Působíme po celé České republice.`,
  crumbs: [{ label: 'Úvod', href: 'index.html' }, { label: 'Kontakt' }],
})}

<div class="wrap contact">
  <section class="contact__info" aria-labelledby="spojeni-h">
    <h2 id="spojeni-h" class="visually-hidden">Kontaktní údaje</h2>
    ${contactList()}

    <div class="map" data-map-src="${esc(mapLinks.embed)}">
      <p class="map__note">Mapa se načte až po kliknutí. Poskytuje ji Google.</p>
      <div class="map__actions">
        <button class="btn btn--secondary" type="button" data-map-load data-size="sm">Zobrazit mapu</button>
        <a class="link-ext" href="${esc(mapLinks.mapy)}" target="_blank" rel="noopener">Mapy.com ${icons.external(16)}<span class="visually-hidden"> (otevře se v novém okně)</span></a>
        <a class="link-ext" href="${esc(mapLinks.google)}" target="_blank" rel="noopener">Google Maps ${icons.external(16)}<span class="visually-hidden"> (otevře se v novém okně)</span></a>
      </div>
      <div class="map__frame" hidden></div>
    </div>
  </section>

  <section class="contact__form" id="poptavka" aria-labelledby="poptavka-h">
    ${anchors}
    <h2 id="poptavka-h">Nezávazná poptávka</h2>
    <p class="form-intro">Vyplňte, o co máte zájem. Poptávka vás k ničemu nezavazuje.</p>

    <form class="form" id="poptavka-form" action="mailto:${esc(c.email)}" method="post" enctype="text/plain" novalidate
      data-email="${esc(c.email)}">
      <div class="field">
        <label for="f-jmeno">Jméno a příjmení</label>
        <input id="f-jmeno" name="jmeno" type="text" autocomplete="name" required>
        <p class="field__error" id="f-jmeno-err" hidden>Vyplňte prosím své jméno.</p>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="f-email">E-mail</label>
          <input id="f-email" name="email" type="email" autocomplete="email" inputmode="email" required>
          <p class="field__error" id="f-email-err" hidden>Zadejte e-mail ve tvaru jmeno@domena.cz.</p>
        </div>
        <div class="field">
          <label for="f-telefon">Telefon <span class="opt">(nepovinné)</span></label>
          <input id="f-telefon" name="telefon" type="tel" autocomplete="tel" inputmode="tel">
        </div>
      </div>
      <div class="field">
        <label for="f-zajem">O co máte zájem</label>
        <select id="f-zajem" name="zajem" required>
          <option value="">Vyberte…</option>
          ${join(groups, (g) => `<optgroup label="${esc(g.group)}">${join(g.items, (o) => `<option value="${esc(o.label)}" data-id="${esc(o.id)}">${esc(o.label)}</option>`)}</optgroup>`)}
        </select>
        <p class="field__error" id="f-zajem-err" hidden>Vyberte, o co máte zájem.</p>
      </div>
      <div class="field">
        <label for="f-zprava">Zpráva</label>
        <textarea id="f-zprava" name="zprava" rows="6" required aria-describedby="f-zprava-hint"></textarea>
        <p class="field__hint" id="f-zprava-hint">Například co chcete prodávat nebo vydávat, kde bude automat stát a zda zvažujete koupi, nebo pronájem.</p>
        <p class="field__error" id="f-zprava-err" hidden>Napište nám prosím krátkou zprávu.</p>
      </div>

      <div class="form__send">
        <button class="btn btn--primary" type="submit">Připravit e-mail s poptávkou</button>
        <p class="field__hint">Formulář zatím neodesílá data přímo. Otevře váš e-mailový program s připravenou zprávou na adresu <strong>${esc(c.email)}</strong>, kterou pak odešlete vy.</p>
      </div>
    </form>

    <div class="form-result" id="poptavka-vysledek" hidden tabindex="-1">
      <h3>Zpráva je připravená, ale ještě nebyla odeslána</h3>
      <p>Pokud se otevřel váš e-mailový program, zprávu v něm odešlete. Pokud se neotevřel, zkopírujte text níže a pošlete ho na <strong>${esc(c.email)}</strong>, nebo zavolejte na <a href="${c.phoneHref}">${esc(c.phone)}</a>.</p>
      <label for="f-text" class="visually-hidden">Text poptávky</label>
      <textarea id="f-text" rows="9" readonly></textarea>
      <div class="actions">
        <button class="btn btn--secondary" type="button" data-copy="#f-text" data-size="sm">${icons.copy(18)} Zkopírovat text</button>
        <a class="btn btn--secondary" id="f-mailto" href="mailto:${esc(c.email)}" data-size="sm">${icons.mail(18)} Otevřít e-mail znovu</a>
        <button class="btn btn--ghost" type="button" data-form-back data-size="sm">Upravit poptávku</button>
      </div>
      <p class="copy-status" role="status" aria-live="polite"></p>
    </div>

    <p class="privacy-note">Údaje z poptávky použijeme jen k odpovědi na váš dotaz.</p>
  </section>
</div>
`;
  },
};
