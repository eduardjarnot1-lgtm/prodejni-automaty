// Inline SVG icons (stroke-based, inherit currentColor). Decorative only:
// every icon sits next to visible text, so they are hidden from screen readers.

const svg = (body, size = 20) =>
  `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;

export const icons = {
  phone: (s) => svg('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>', s),
  mail: (s) => svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>', s),
  pin: (s) => svg('<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>', s),
  user: (s) => svg('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>', s),
  arrow: (s) => svg('<path d="M5 12h14M13 6l6 6-6 6"/>', s),
  check: (s) => svg('<path d="m5 12.5 4.5 4.5L19 7.5"/>', s),
  plus: (s) => svg('<path d="M12 5v14M5 12h14"/>', s),
  menu: (s) => svg('<path d="M4 7h16M4 12h16M4 17h16"/>', s),
  close: (s) => svg('<path d="M6 6l12 12M18 6 6 18"/>', s),
  copy: (s) => svg('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>', s),
  external: (s) => svg('<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>', s),
  play: (s) => svg('<path d="M8 5.5v13l11-6.5z" fill="currentColor"/>', s),
  pause: (s) => svg('<path d="M8 5v14M16 5v14" stroke-width="3"/>', s),
  replay: (s) => svg('<path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4.5h4.5"/>', s),
  // Service / reason pictograms
  calendar: (s) => svg('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', s),
  chat: (s) => svg('<path d="M4 5h16v11H9l-5 4z"/>', s),
  tool: (s) => svg('<path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.5-7.5"/><path d="M14.5 6.5 17 4"/>', s),
  plug: (s) => svg('<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4"/>', s),
  machine: (s) => svg('<rect x="5" y="2.5" width="14" height="19" rx="1.5"/><path d="M8 6h5M8 9.5h5M8 13h5M16 6v7M8 17.5h8"/>', s),
  shelves: (s) => svg('<rect x="4" y="2.5" width="16" height="19" rx="1.5"/><path d="M4 8.5h16M4 14.5h16M8 6.5v-1.5M11 6.5v-1.5M8 12.5v-1.5M11 12.5v-1.5M14 12.5v-1.5"/>', s),
  receipt: (s) => svg('<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="m9 11 2 2 4-4"/>', s),
  chart: (s) => svg('<path d="M4 20h16"/><path d="M7 16v-4M12 16V8M17 16v-6"/>', s),
  tag: (s) => svg('<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z"/><circle cx="8" cy="8" r="1.5"/>', s),
  users: (s) => svg('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>', s),
  gear: (s) => svg('<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>', s),
  thermo: (s) => svg('<path d="M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0z"/><path d="M12 9v7"/>', s),
  bell: (s) => svg('<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>', s),
  cloud: (s) => svg('<path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 8.5a4.75 4.75 0 0 1-.5 9.5z"/>', s),
  mobile: (s) => svg('<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.5 18.5h3"/>', s),
  // Service icons: one set, same stroke; the green part is .icon-accent.
  svcSale: (s) => svg('<rect x="6" y="2.5" width="12" height="19" rx="1.5"/><rect x="8.5" y="5" width="7" height="10" rx="1" class="icon-accent"/><path d="M8.5 8.3h7M8.5 11.6h7M9.5 18.5h5"/>', s),
  svcRent: (s) => svg('<rect x="3" y="2.5" width="10" height="17" rx="1.5"/><path d="M5.5 5.5h5v7h-5zM6 16.5h4"/><g class="icon-accent"><rect x="13" y="12" width="8.5" height="8.5" rx="1.2"/><path d="M13 15h8.5M15.5 10.5v3M19 10.5v3"/></g>', s),
  svcChat: (s) => svg('<path d="M3 5.5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H8l-3.5 3v-3H5a2 2 0 0 1-2-2z"/><path d="M17.5 8.5H19a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-.5v3l-3.5-3h-4a2 2 0 0 1-2-2v-1" class="icon-accent"/>', s),
  svcInstall: (s) => svg('<rect x="3" y="2.5" width="10" height="17" rx="1.5"/><path d="M5.5 5.5h5v7h-5zM6 16.5h4"/><path d="M13 10h3.5M16.5 8v4M16.5 10h2.5" /><path d="m15.5 18.5 2 2 3.8-4.2" class="icon-accent"/>', s),
  svcService: (s) => svg('<path d="M14.5 3.5a4 4 0 0 0-3.9 5L4 15.1a1.9 1.9 0 0 0 2.7 2.7l6.6-6.6a4 4 0 0 0 5-3.9l-2.3 2.3-2.4-.6-.6-2.4z"/><g class="icon-accent"><circle cx="18" cy="17.5" r="2"/><path d="M18 13.8v1.2M18 20v1.2M21.7 17.5h-1.2M15.5 17.5h-1.2"/></g>', s),
  svcPart: (s) => svg('<path d="M12 2.5 20 7v10l-8 4.5L4 17V7z"/><circle cx="12" cy="12" r="3.2" class="icon-accent"/>', s),
  svcBuyback: (s) => svg('<rect x="8" y="3" width="8" height="14" rx="1.2"/><path d="M10 5.5h4v5.5h-4zM10.5 14.5h3"/><g class="icon-accent"><path d="M3 9.5a6 6 0 0 1 3.5-4.8M5.5 3.4l1.2 1.4-1.4 1.2"/><path d="M21 14.5a6 6 0 0 1-3.5 4.8M18.5 20.6l-1.2-1.4 1.4-1.2"/></g>', s),
  ruler: (s) => svg('<rect x="2.5" y="8" width="19" height="8" rx="1.5"/><path d="M6.5 8v3M10.5 8v4M14.5 8v3M18.5 8v4"/>', s),
  office: (s) => svg('<rect x="4" y="3" width="11" height="18" rx="1"/><path d="M15 9h5v12h-5M7.5 7h4M7.5 11h4M7.5 15h4M17.5 13h0M17.5 17h0"/>', s),
  dumbbell: (s) => svg('<path d="M8 12h8"/><rect x="4" y="8" width="4" height="8" rx="1"/><rect x="16" y="8" width="4" height="8" rx="1"/><path d="M2.5 10.5v3M21.5 10.5v3"/>', s),
  cap: (s) => svg('<path d="m2.5 9 9.5-4.5L21.5 9 12 13.5z"/><path d="M6.5 11v4.5c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3V11M21.5 9v5"/>', s),
  building: (s) => svg('<path d="M3 21h18M5 21V9l7-5 7 5v12"/><path d="M9.5 21v-5h5v5M9 11h.01M15 11h.01"/>', s),
  factory: (s) => svg('<path d="M3 21V11l5 3V11l5 3V7h3l1-4h2l1 4v14z"/><path d="M7 18h2M12 18h2"/>', s),
  box: (s) => svg('<rect x="3" y="3" width="18" height="18" rx="1.5"/><path d="M3 9h18M3 15h18M12 3v18"/>', s),
};

// Brand mark: front view of a vending machine (cells + touch panel).
export const logoMark = `<svg class="logo-mark" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><rect x="4" y="2" width="24" height="28" rx="2.5" fill="currentColor"/><g fill="#fff"><rect x="7.5" y="5.5" width="4.5" height="4" rx=".6"/><rect x="13.5" y="5.5" width="4.5" height="4" rx=".6"/><rect x="7.5" y="11" width="4.5" height="4" rx=".6"/><rect x="13.5" y="11" width="4.5" height="4" rx=".6"/><rect x="7.5" y="16.5" width="4.5" height="4" rx=".6"/><rect x="13.5" y="16.5" width="4.5" height="4" rx=".6"/><rect x="7.5" y="23.5" width="10.5" height="3" rx=".6"/></g><rect x="20.5" y="5.5" width="4" height="9" rx=".6" fill="#3fa34d"/></svg>`;
