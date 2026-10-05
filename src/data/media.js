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
  // HERO (homepage): HAHA VENDING Pro 542 turning from a side view to the
  // front, dark studio with green accent light. Supplied web version
  // (haha-pro-542-orbit-web.mp4, 464 × 464, 4.25 s, silent, fast start) is
  // used unchanged; WebM is a fallback for browsers without H.264. Shown at
  // about 360–440 CSS px, never enlarged beyond that. Plays once when
  // visible (native speed), holds the final frame; no scroll pinning.
  // To use the enhanced 928 × 928 version later, replace the files with the
  // same names and update width/height here.
  heroPro542: {
    alias: 'haha-pro-542-orbit',
    original: 'haha-pro-542-orbit-web.mp4',
    association: 'Úvod: hero (HAHA VENDING Pro 542, ilustrační)',
    product: 'haha-vending-pro-542',
    width: 464,
    height: 464,
    codec: 'avc1.640016',
    range: [0, 4.25],
    once: true,
    rate: 1,
    posterStart: 'assets/video/haha-pro-542-orbit-start.webp', // first frame (side view)
    poster: 'assets/video/haha-pro-542-orbit-poster.webp', // final frame (front view)
    mode: 'play once when visible, hold final frame; pause/replay button',
    reducedMotion: 'final-frame poster; optional manual playback',
    alt: 'Ilustrační vizualizace černého prodejního automatu HAHA VENDING Pro 542 na tmavém pozadí',
    note: 'Ilustrační vizualizace. Skutečné provedení se může lišit.',
  },

  // VIDEO A (no longer on the homepage, kept for reference): single
  // glass-front machine, camera moves from front to three-quarter.
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

  // VIDEO E: HAHA VENDING Pro 542, used COMPLETE (0–8.04 s, 193 frames,
  // no trimming). Scenes in the footage:
  //   0–0.25 s  English specification board fading out (its figures differ
  //             from the brochure and are never used as specifications)
  //   0.25–1 s  "AI-powered smart vending" title, machine, camera moves closer
  //   1–3.85 s  shelves close up, green outlines + "AI product recognition"
  //   3.85–6.5 s camera widens; icons and the Swipe/Tap → Grab Items →
  //             Auto Checkout captions (partly malformed lettering)
  //   6.5–8.04 s circle transition into the final "24H Smart Vending" shot
  // Two delivery sizes of the same clip; the player picks one before loading.
  // `duration` is a fallback: media.js reads the real one from loadedmetadata.
  haha542Tour: {
    alias: 'haha-pro-542-tour',
    original: 'PixVerse_V6_Image_Text_540P_Create_an_8second_.mp4',
    association: 'automaty/haha-vending-pro-542.html#prohlidka (+ static poster in ai-automaty.html#jak-probiha-nakup)',
    product: 'haha-vending-pro-542',
    width: 1024,
    height: 1024,
    sourceRange: [0, 8.041667],
    continuous: true,
    duration: 8.041667,
    keyframes: 'web: every frame (scroll scrubbing); mobile: every 6 frames',
    files: [
      { src: 'assets/video/haha-pro-542-tour-web.mp4', type: 'video/mp4; codecs="avc1.640020"', media: '(min-width: 900px)' },
      { src: 'assets/video/haha-pro-542-tour-web.webm', type: 'video/webm; codecs="vp9"', media: '(min-width: 900px)' },
      { src: 'assets/video/haha-pro-542-tour-mobile.mp4', type: 'video/mp4; codecs="avc1.64001F"' },
      { src: 'assets/video/haha-pro-542-tour-mobile.webm', type: 'video/webm; codecs="vp9"' },
    ],
    poster: 'assets/video/haha-pro-542-tour-poster.webp', // final frame
    posterSmall: 'assets/video/haha-pro-542-tour-poster-480.webp',
    // Boundaries at visual changes (frame-checked): 1.0 s green outlines
    // start, 3.85 s camera widens, 6.5 s the step icons are gone and the
    // closing transition begins.
    chapters: [
      { id: 'automat', range: [0, 1.0], poster: 'assets/video/haha-pro-542-tour-ch1.webp' },
      { id: 'rozpoznavani', range: [1.0, 3.85], poster: 'assets/video/haha-pro-542-tour-ch2.webp' },
      { id: 'nakup', range: [3.85, 6.5], poster: 'assets/video/haha-pro-542-tour-ch3.webp' },
      { id: 'zaver', range: [6.5, 8.041667], poster: 'assets/video/haha-pro-542-tour-poster.webp' },
    ],
    // Mobile / reduced motion: final-frame poster, playback on request with
    // chapters following the video.
    startOnRequest: true,
    labels: { play: 'Přehrát prohlídku', pause: 'Pozastavit prohlídku', replay: 'Přehrát znovu' },
    scrollPerSecond: '36vh',
    mode: 'continuous scroll scrub over the full clip (desktop, sticky video); poster + "Přehrát prohlídku", full playback once, pause/resume, replay (mobile)',
    reducedMotion: 'final-frame poster and all chapter text; optional manual playback',
    note: 'Ilustrační AI vizualizace. Skutečné provedení a funkce se mohou lišit podle konfigurace.',
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
