// Central company, contact and navigation data.
// Values marked "TODO potvrdit" are taken from the old website and still need
// confirmation from the client (see CONTENT-TODO.md).

export const site = {
  // Brand name used in the header, footer and page titles. TODO potvrdit.
  brandName: 'Stravovací automaty',
  brandTagline: 'Prodej, pronájem a servis výdejních automatů',
  lang: 'cs',

  // Production domain is not confirmed yet. While empty, no canonical URLs
  // or absolute Open Graph URLs are generated.
  baseUrl: '',

  // Keep the site out of search engines until it is approved for launch.
  indexable: false,

  since: 1992,
  coverage: 'Česká republika',

  contact: {
    person: 'Ing. Jan Petr',
    phone: '+420 773 881 333',
    phoneHref: 'tel:+420773881333',
    // Primary address used for the inquiry form. Taken from the current
    // website; TODO potvrdit, which mailbox should receive inquiries.
    email: 'stravovaciautomaty@email.cz',
    // Second address mentioned in the brief. TODO potvrdit, that it works.
    emailAlt: 'info@stravovaciautomaty.cz',
    address: {
      street: 'Kaštanová 489/34',
      zip: '620 00',
      city: 'Brno',
    },
    // Company ID (IČO) is not known yet. Add it when confirmed; the footer
    // shows it automatically.
    companyId: '',
  },

  nav: [
    { label: 'Úvod', href: 'index.html', key: 'home' },
    { label: 'Automaty', href: 'automaty.html', key: 'automaty' },
    { label: 'Služby', href: 'sluzby.html', key: 'sluzby' },
    { label: 'O nás', href: 'o-nas.html', key: 'o-nas' },
    { label: 'Kontakt', href: 'kontakt.html', key: 'kontakt' },
  ],
};

export const addressOneLine = (c = site.contact) =>
  `${c.address.street}, ${c.address.zip} ${c.address.city}`;

export const mapLinks = {
  mapy: 'https://mapy.com/zakladni?q=' + encodeURIComponent(addressOneLine()),
  google:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(addressOneLine()),
  // Loaded only after the visitor clicks "Zobrazit mapu".
  embed:
    'https://maps.google.com/maps?q=' +
    encodeURIComponent(addressOneLine()) +
    '&z=15&output=embed',
};
