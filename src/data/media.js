// Product videos: one record per source clip.
//
// All three clips are AI-generated (PixVerse) illustrative visualisations
// with the PixVerse watermark kept in this draft. They do not document
// specifications, installations or dispensing behaviour.
//
// Originals (unchanged, exact upload names): media/video/originals/
// Web derivatives (trimmed, no audio, fast start): src/assets/video/
//   <alias>.mp4  H.264 (all current browsers)
//   <alias>.webm VP9 (fallback for browsers without H.264)
//
// Times in `chapters`, `range` and posters are seconds in the DERIVATIVE
// (the trimmed file). `sourceRange` gives the matching range in the original.
// To replace a clip with a clean, authorised export, see README → "Product
// videos": regenerate the derivative and posters with the same names, then
// adjust the times here if the cut changes.

export const media = {
  // VIDEO A: single glass-front machine, camera moves from front to three-quarter.
  heroOrbit: {
    alias: 'hero-single-machine-orbit',
    original: 'PixVerse_V6_Image_Text_540P_Create_a_premium_c.mp4',
    association: 'Úvod: hero (chlazený automat, ilustrační)',
    width: 704,
    height: 1024,
    sourceRange: [0.25, 1.40],
    // Excluded: 0–0.2 s white opening (flash into the dark stage); from
    // ~1.5 s the camera reaches a blank side panel, then screen/cabinet
    // details change (AI inconsistencies).
    range: [0, 1.12],
    // Every frame is a keyframe, so scroll scrubbing can seek to any frame.
    keyframes: 'every frame',
    poster: 'assets/video/hero-single-machine-orbit-poster.webp', // start frame (front view)
    posterEnd: 'assets/video/hero-single-machine-orbit-end.webp', // held end frame (three-quarter)
    mode: 'scroll-scrub (desktop), play once and hold (mobile)',
    reducedMotion: 'static start poster; optional manual playback',
    alt: 'Ilustrační vizualizace proskleného prodejního automatu na tmavém pozadí',
  },

  // VIDEO B: locker cabinet with transparent compartment doors.
  lockerShowcase: {
    alias: 'locker-cabinet-showcase',
    original: 'PixVerse_V6_Image_Text_540P_Create_a_premium_p.mp4',
    association: 'automaty/automaticky-boxovy-system.html (+ poster v katalogu #boxove-systemy)',
    product: 'automaticky-boxovy-system',
    width: 704,
    height: 1024,
    sourceRange: [0.25, 4.10],
    // Excluded: 0–0.2 s white frame; 4.2–5.04 s dark ending.
    keyframes: 'every 6 frames (0.25 s)',
    // Chapter ends stop before each cut, so the held frame is never a blend.
    chapters: [
      { id: 'skrin', range: [0, 0.75], source: [0.25, 1.0], poster: 'assets/video/locker-cabinet-showcase-ch1.webp' },
      { id: 'detail', range: [1.0, 2.2], source: [1.25, 2.45], poster: 'assets/video/locker-cabinet-showcase-ch2.webp' },
      { id: 'interier', range: [2.5, 3.75], source: [2.75, 4.0], poster: 'assets/video/locker-cabinet-showcase-ch3.webp' },
    ],
    mode: 'chapter-triggered playback, runs once per chapter and holds the last frame',
    reducedMotion: 'chapter posters only; optional manual playback',
  },

  // VIDEO D: single glass-front machine. Used COMPLETE (0–7.04 s), in its
  // original order with all camera moves and transitions: scroll position is
  // mapped to the whole duration (desktop) or it plays once in full (mobile).
  // Chapters follow the footage; they do not trim it.
  chilledTour: {
    alias: 'chilled-machine-tour',
    original: 'PixVerse_V6_Image_Text_540P_create_me_a_vide_w.mp4',
    association: 'automaty/chlazeny-automat-na-potraviny.html#prohlidka',
    product: 'chlazeny-automat-na-potraviny',
    width: 624,
    height: 1024,
    sourceRange: [0, 7.042],
    continuous: true,
    duration: 7.042,
    keyframes: 'every frame (scroll scrubbing over the full clip)',
    // Chapter windows = what is on screen (visual boundaries; the only hard
    // cut is at 4.42 s). Posters: one representative frame per chapter.
    chapters: [
      { id: 'automat', range: [0, 0.9], poster: 'assets/video/chilled-machine-tour-ch1.webp' },
      { id: 'displej', range: [0.9, 1.95], poster: 'assets/video/chilled-machine-tour-ch2.webp' },
      { id: 'vyber', range: [1.95, 3.75], poster: 'assets/video/chilled-machine-tour-ch3.webp' },
      { id: 'zbozi', range: [3.75, 4.42], poster: 'assets/video/chilled-machine-tour-ch4.webp' },
      { id: 'vydej', range: [4.42, 7.042], poster: 'assets/video/chilled-machine-tour-ch5.webp' },
    ],
    mode: 'continuous scroll scrub over the full duration (desktop); full playback once, hold last frame, replay (mobile)',
    reducedMotion: 'chapter posters; optional manual playback of the full clip',
  },

  // VIDEO E: HAHA VENDING Pro 542. One continuous camera move from the
  // stocked shelves back to the complete cabinet (no hard cut). Edited
  // derivative = source frames 32–120 (1.333–5.042 s): the English
  // specification board and the opening morph are removed (its figures
  // differ from the brochure and are never used), audio removed, frame rate,
  // speed and square framing kept. Two delivery sizes of the SAME edit; the
  // player picks one before loading (`files[].media`), never both.
  haha542Tour: {
    alias: 'haha-pro-542',
    original: 'PixVerse_V6_Image_Text_540P_Create_a_6second_p.mp4',
    association: 'automaty/haha-vending-pro-542.html#prohlidka (+ static poster in index.html#automaty-s-ai)',
    product: 'haha-vending-pro-542',
    width: 1024,
    height: 1024,
    sourceRange: [1.333333, 5.041667],
    sourceFrames: [32, 120],
    continuous: true,
    duration: 3.708,
    keyframes: 'web: every frame (scroll scrubbing); mobile: every 6 frames',
    files: [
      { src: 'assets/video/haha-pro-542-web.mp4', type: 'video/mp4; codecs="avc1.640020"', media: '(min-width: 900px)' },
      { src: 'assets/video/haha-pro-542-web.webm', type: 'video/webm; codecs="vp9"', media: '(min-width: 900px)' },
      { src: 'assets/video/haha-pro-542-mobile.mp4', type: 'video/mp4; codecs="avc1.64001F"' },
      { src: 'assets/video/haha-pro-542-mobile.webm', type: 'video/webm; codecs="vp9"' },
    ],
    poster: 'assets/video/haha-pro-542-poster.webp', // final frame, complete machine
    posterSmall: 'assets/video/haha-pro-542-poster-480.webp',
    // Boundary at 1.5 s: the cabinet top enters at ~1.3 s and the whole upper
    // cabinet is in view by ~1.6 s (continuous move, no cut).
    chapters: [
      { id: 'police', range: [0, 1.5], poster: 'assets/video/haha-pro-542-ch1.webp' },
      { id: 'celek', range: [1.5, 3.708], poster: 'assets/video/haha-pro-542-poster.webp' },
    ],
    // Mobile / reduced motion: final-frame poster, playback only on request.
    startOnRequest: true,
    labels: { play: 'Přehrát prohlídku', pause: 'Pozastavit prohlídku', replay: 'Přehrát znovu' },
    scrollPerSecond: '26vh',
    mode: 'continuous scroll scrub over the full edit (desktop); poster + "Přehrát prohlídku", full playback once, hold, replay (mobile)',
    reducedMotion: 'final-frame poster; optional manual playback',
    note: 'Ilustrační vizualizace vytvořená pomocí AI. Skutečné provedení a výbavu upřesníme v nabídce.',
  },

  // VIDEO C: two glass-front cabinets with a central control area.
  doubleDetails: {
    alias: 'double-machine-details',
    codec: 'avc1.64001E',
    original: 'PixVerse_V6_Image_Text_360P_Create_a_premium_p.mp4',
    association: 'automaty.html#chlazene-automaty (Ukázka sestavy); poster on chlazeny-automat-na-potraviny.html',
    width: 640,
    height: 640,
    sourceRange: [0, 3.80],
    // Excluded: 4.2–7.04 s, where the footage changes into a single machine.
    keyframes: 'every 6 frames (0.25 s)',
    chapters: [
      { id: 'sestava', range: [0, 1.38], source: [0, 1.38], poster: 'assets/video/double-machine-details-ch1.webp' },
      { id: 'police', range: [1.75, 2.45], source: [1.75, 2.45], poster: 'assets/video/double-machine-details-ch2.webp' },
      { id: 'platba', range: [2.8, 3.7], source: [2.8, 3.7], poster: 'assets/video/double-machine-details-ch3.webp' },
      // Final step: the original still photo of the double assembly.
      { id: 'foto', photo: 'chlazeny-automat-dvojita-sestava' },
    ],
    mode: 'chapter-triggered playback, runs once per chapter and holds the last frame',
    reducedMotion: 'chapter posters only; optional manual playback',
  },
};

export const mediaSources = (m) => m.files || [
  { src: `assets/video/${m.alias}.mp4`, type: `video/mp4; codecs="${m.codec || 'avc1.64001F'}"` },
  { src: `assets/video/${m.alias}.webm`, type: 'video/webm; codecs="vp9"' },
];

export const MEDIA_NOTE = 'Ilustrační vizualizace. Skutečné provedení se liší podle modelu a konfigurace.';
