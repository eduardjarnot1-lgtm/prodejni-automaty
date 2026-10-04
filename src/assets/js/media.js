// Product videos: scroll-driven hero (Video A) and chapter sequences
// (Videos B and C). Configuration and time ranges: src/data/media.js,
// rendered into data-* attributes by src/lib/media-markup.js.
//
// Modes
//   scroll  desktop, motion allowed: the hero is scrubbed by scrolling;
//           sequences play the chapter currently in view once and hold.
//   manual  mobile, reduced motion, or motion switched off: no scrubbing or
//           extra scroll height. On mobile (motion allowed) the clip plays
//           once when it comes into view and holds its last frame; otherwise
//           posters stay and the button offers playback.
//
// Every video starts with preload="none". Lower-page videos load only near
// the viewport; the hero loads after the page itself has loaded. Posters stay
// visible until a real frame is ready. Seeks are coalesced: only the latest
// requested time is applied once the previous seek has finished.
//
// MediaStage.init(main) / MediaStage.destroy(main) are called by main.js for
// the initial page and by the page transition (zoom-through.js).
(function () {
  'use strict';

  var root = document.documentElement;
  var PREF_KEY = 'sa-media-motion';
  var mqDesktop = window.matchMedia('(min-width: 900px)');
  var mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var each = function (list, fn) { Array.prototype.forEach.call(list, fn); };
  var ST = function () { return window.gsap && window.ScrollTrigger ? window.ScrollTrigger : null; };
  var EPS = 1 / 48;          // half a frame at 24 fps
  var LOAD_TIMEOUT = 9000;

  function prefOff() { try { return localStorage.getItem(PREF_KEY) === 'off'; } catch (e) { return false; } }
  function setPrefOff(off) {
    try { if (off) localStorage.setItem(PREF_KEY, 'off'); else localStorage.removeItem(PREF_KEY); } catch (e) { /* ignore */ }
    document.dispatchEvent(new CustomEvent('media-motion-change'));
  }
  function motionAllowed() { return !mqReduce.matches && !prefOff(); }
  function pageLoaded() {
    return document.readyState === 'complete' ? Promise.resolve()
      : new Promise(function (res) { window.addEventListener('load', res, { once: true }); });
  }

  // ---------------------------------------------------------------------
  // Clip: one <video>, loading, coalesced seeking and range playback
  // ---------------------------------------------------------------------
  function Clip(video) {
    var self = this;
    var ready = null;
    var target = null;
    var busy = false;
    var playToken = 0;
    var rafId = 0;
    var rejectLoad = null;
    this.video = video;
    this.failed = false;
    this.onFrame = function () {};
    this.onFail = function () {};

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    var sources = video.querySelectorAll('source');
    var fail = function () {
      if (self.destroyed) return;
      if (video.error || video.networkState === video.NETWORK_NO_SOURCE) {
        self.failed = true;
        if (rejectLoad) rejectLoad(new Error('error'));
        self.onFail();
      }
    };
    video.addEventListener('error', fail);
    if (sources.length) sources[sources.length - 1].addEventListener('error', fail);

    this.load = function () {
      if (ready) return ready;
      ready = new Promise(function (resolve, reject) {
        if (video.readyState >= 2) { resolve(); return; }
        var timer = setTimeout(function () { reject(new Error('timeout')); }, LOAD_TIMEOUT);
        video.addEventListener('loadeddata', function () {
          clearTimeout(timer);
          var sk = video.seekable;
          self.seekable = sk.length > 0 && sk.end(sk.length - 1) > 0.1;
          resolve();
        }, { once: true });
        rejectLoad = function (err) { clearTimeout(timer); reject(err); };
        // The clips are small, so the chosen file is fetched completely and
        // played from memory: seeking then works on every host, also where
        // the server does not support HTTP range requests.
        var source = Array.prototype.filter.call(sources, function (sEl) { return video.canPlayType(sEl.type) !== ''; })[0];
        var fallback = function () { video.preload = 'auto'; video.load(); };
        if (!source || !window.fetch || !window.URL || !URL.createObjectURL) { fallback(); return; }
        fetch(source.src).then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res.blob();
        }).then(function (blob) {
          if (self.destroyed) return;
          self.objectUrl = URL.createObjectURL(blob);
          video.src = self.objectUrl;
          video.load();
        }).catch(fallback);
      });
      ready.catch(function () { self.failed = true; });
      return ready;
    };

    function step() {
      if (target === null || busy) return;
      if (self.seekable === false) { target = null; return; } // cannot seek: hold the poster
      if (Math.abs(video.currentTime - target) < EPS) { target = null; self.onFrame(); return; }
      busy = true;
      video.currentTime = target;
    }
    video.addEventListener('seeked', function () { busy = false; self.onFrame(); step(); });

    // Seek to t; rapid calls collapse into one pending seek.
    this.seekTo = function (t) {
      target = t;
      self.load().then(step, function () {});
    };

    // Play from a to b once, then hold at b. Resolves when finished,
    // rejects if interrupted by another play/seek/stop call.
    this.playRange = function (a, b, rate) {
      var my = ++playToken;
      cancelAnimationFrame(rafId);
      return self.load().then(function () {
        if (my !== playToken) throw new Error('cancelled');
        if (video.currentTime < a - EPS || video.currentTime > b - EPS) {
          return new Promise(function (res) {
            video.addEventListener('seeked', res, { once: true });
            busy = false; target = null;
            video.currentTime = a;
          });
        }
      }).then(function () {
        if (my !== playToken) throw new Error('cancelled');
        video.playbackRate = rate || 1;
        return video.play();
      }).then(function () {
        return new Promise(function (res, rej) {
          (function watch() {
            if (my !== playToken) { rej(new Error('cancelled')); return; }
            if (video.currentTime >= b - EPS || video.ended) { video.pause(); res(); return; }
            if (video.paused) { rej(new Error('paused')); return; }
            rafId = requestAnimationFrame(watch);
          })();
        });
      });
    };

    this.stop = function () {
      playToken++;
      cancelAnimationFrame(rafId);
      if (!video.paused) video.pause();
    };
    this.playing = function () { return !video.paused && !video.ended; };
    this.destroy = function () {
      self.destroyed = true;
      self.stop();
      target = null;
      // Release the network request and decoder.
      if (ready) {
        video.removeAttribute('src');
        try { video.load(); } catch (e) { /* ignore */ }
      }
      if (self.objectUrl) { URL.revokeObjectURL(self.objectUrl); self.objectUrl = null; }
    };
  }

  // ---------------------------------------------------------------------
  // Control button (shared look; label/icon depend on the mode)
  // ---------------------------------------------------------------------
  function setButton(btn, icon, label) {
    btn.hidden = false;
    btn.setAttribute('data-state', icon);
    btn.setAttribute('aria-label', label);
    btn.querySelector('.media-toggle__label').textContent = label;
  }

  // ---------------------------------------------------------------------
  // Hero stage (Video A)
  // ---------------------------------------------------------------------
  function HeroStage(section) {
    var video = section.querySelector('.stage__video');
    var btn = section.querySelector('[data-media-toggle]');
    var range = section.getAttribute('data-range').split(',').map(Number);
    var clip = new Clip(video);
    var trigger = null;
    var io = null;
    var state = 'idle'; // idle | playing | done
    var mode = null;

    clip.onFrame = function () { section.classList.add('has-frame'); };
    clip.onFail = function () { teardown(); section.classList.add('is-failed'); btn.hidden = true; refresh(); };

    function refresh() { if (ST()) ST().refresh(); }

    function teardown() {
      if (trigger) { trigger.scrollTrigger && trigger.scrollTrigger.kill(); trigger.kill(); trigger = null; }
      if (io) { io.disconnect(); io = null; }
      clip.stop();
      section.classList.remove('is-scrub', 'has-frame');
    }

    function updateManualButton() {
      if (clip.playing()) setButton(btn, 'pause', 'Pozastavit video');
      else if (state === 'done') setButton(btn, 'replay', 'Přehrát video znovu');
      else setButton(btn, 'play', 'Přehrát video');
    }

    function playOnce() {
      state = 'playing';
      var p = clip.playRange(range[0], range[1], 0.55);
      updateManualButton();
      p.then(function () { state = 'done'; updateManualButton(); },
        function () { if (state === 'playing') state = 'idle'; updateManualButton(); });
    }

    function setup() {
      teardown();
      if (clip.failed) return;
      var scroll = mqDesktop.matches && motionAllowed() && !!ST();
      mode = scroll ? 'scroll' : 'manual';

      if (scroll) {
        // Desktop: the section gets extra height; the sticky stage holds
        // while scrolling moves through the selected camera movement.
        section.classList.add('is-scrub');
        setButton(btn, 'pause', 'Vypnout pohyb videa');
        var proxy = { t: range[0] };
        trigger = window.gsap.timeline({
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.4, invalidateOnRefresh: true },
        });
        trigger.to(proxy, { t: range[1], duration: 0.82, ease: 'none', onUpdate: function () { clip.seekTo(proxy.t); } })
          .to({}, { duration: 0.18 }); // hold the final frame before releasing
        // Once loaded, show the frame for the current scroll position (e.g.
        // after Back/Forward restored a position inside the hero).
        pageLoaded().then(function () {
          if (mode !== 'scroll') return;
          clip.load().then(function () { if (mode === 'scroll') clip.seekTo(proxy.t); }, function () {});
        });
      } else {
        updateManualButton();
        if (mqDesktop.matches || !motionAllowed()) return;
        // Mobile with motion: play once when the stage is mostly visible.
        io = new IntersectionObserver(function (entries) {
          var vis = entries[entries.length - 1].isIntersecting;
          if (vis && state === 'idle') pageLoaded().then(function () { if (mode === 'manual' && state === 'idle') playOnce(); });
          if (!vis && clip.playing()) { clip.stop(); state = 'idle'; updateManualButton(); }
        }, { threshold: 0.5 });
        io.observe(section.querySelector('.stage__media'));
      }
      refresh();
    }

    // The poster gives way only once real playback has started.
    video.addEventListener('playing', function () { section.classList.add('has-frame'); if (mode === 'manual') updateManualButton(); });
    video.addEventListener('pause', function () { if (mode === 'manual') updateManualButton(); });

    btn.addEventListener('click', function () {
      if (mode === 'scroll') { setPrefOff(true); return; }
      if (clip.playing()) { clip.stop(); state = 'idle'; updateManualButton(); return; }
      if (!mqReduce.matches && prefOff() && mqDesktop.matches) { setPrefOff(false); return; }
      playOnce();
    });

    var onChange = function () { setup(); };
    var onHidden = function () { if (document.hidden && clip.playing()) { clip.stop(); state = 'idle'; updateManualButton(); } };
    mqDesktop.addEventListener('change', onChange);
    mqReduce.addEventListener('change', onChange);
    document.addEventListener('media-motion-change', onChange);
    document.addEventListener('visibilitychange', onHidden);

    root.classList.add('has-stage');
    setup();

    this.destroy = function () {
      teardown();
      clip.destroy();
      mqDesktop.removeEventListener('change', onChange);
      mqReduce.removeEventListener('change', onChange);
      document.removeEventListener('media-motion-change', onChange);
      document.removeEventListener('visibilitychange', onHidden);
      root.classList.remove('has-stage');
    };
  }

  // ---------------------------------------------------------------------
  // Chapter sequence (Videos B and C)
  // ---------------------------------------------------------------------
  function Sequence(section) {
    var video = section.querySelector('.seq__video');
    var btn = section.querySelector('[data-media-toggle]');
    var layers = Array.prototype.slice.call(section.querySelectorAll('[data-layer]'));
    var items = Array.prototype.slice.call(section.querySelectorAll('.seq__chapter'));
    var ranges = JSON.parse(section.getAttribute('data-chapters'));
    var visual = section.querySelector('.seq__frame');
    // Without matching footage the tour shows photographs only.
    var clip = video ? new Clip(video) : {
      failed: false, stop: function () {}, playing: function () { return false; },
      load: function () { return Promise.resolve(); }, playRange: function () { return Promise.reject(new Error('no video')); },
      seekTo: function () {}, destroy: function () {},
    };
    var triggers = [];
    var observers = [];
    var current = 0;
    var mode = null;
    var auto = false;
    var runToken = 0;
    var state = 'idle'; // idle | playing | done

    clip.onFail = function () { if (btn) btn.hidden = true; showLayer(current); };

    function showLayer(i) {
      layers.forEach(function (l, k) { l.classList.toggle('is-on', k === i); });
    }
    function hideLayers() { layers.forEach(function (l) { l.classList.remove('is-on'); }); }
    function markChapter(i) {
      current = i;
      items.forEach(function (el, k) {
        el.classList.toggle('is-active', k === i);
        if (k === i) el.setAttribute('aria-current', 'step'); else el.removeAttribute('aria-current');
      });
    }

    // Show chapter i: poster first, then (with motion) its footage.
    function chapter(i, direction) {
      var my = ++runToken;
      markChapter(i);
      showLayer(i);
      clip.stop();
      var r = ranges[i];
      if (!r || !auto || clip.failed) { state = 'idle'; updateButton(); return; }
      if (direction < 0) {
        // Scrolling back: show the chapter's held end frame, no replay.
        clip.onFrame = function () { if (my === runToken) hideLayers(); };
        clip.seekTo(r[1] - 0.05);
        return;
      }
      clip.onFrame = function () {};
      state = 'playing';
      updateButton();
      var startPlay = clip.playRange(r[0], r[1], 1);
      video.addEventListener('playing', function onP() { video.removeEventListener('playing', onP); if (my === runToken) hideLayers(); });
      startPlay.then(function () { if (my === runToken) { state = 'done'; updateButton(); } },
        function () { if (my === runToken) { state = 'idle'; updateButton(); } });
    }

    // Play from chapter `from` through the end once (mobile / manual).
    function playAll(from) {
      var my = ++runToken;
      state = 'playing';
      updateButton();
      var i = from;
      (function next() {
        if (my !== runToken) return;
        if (i >= ranges.length) { state = 'done'; updateButton(); return; }
        markChapter(i);
        var r = ranges[i];
        if (!r || clip.failed) { showLayer(i); i++; setTimeout(next, r ? 0 : 1600); return; }
        showLayer(i);
        video.addEventListener('playing', function onP() { video.removeEventListener('playing', onP); if (my === runToken) hideLayers(); });
        clip.playRange(r[0], r[1], 1).then(function () { i++; next(); }, function () {
          if (my === runToken) { state = 'idle'; updateButton(); }
        });
      })();
    }

    function stopAll() { runToken++; clip.stop(); state = 'idle'; showLayer(current); updateButton(); }

    function updateButton() {
      if (!btn) return;
      if (clip.failed) { btn.hidden = true; return; }
      if (mode === 'scroll' && auto) { setButton(btn, 'pause', 'Vypnout pohyb videa'); return; }
      if (state === 'playing') setButton(btn, 'pause', 'Pozastavit video');
      else if (state === 'done') setButton(btn, 'replay', 'Přehrát video znovu');
      else setButton(btn, 'play', 'Přehrát video');
    }

    function teardown() {
      triggers.forEach(function (t) { t.kill(); });
      observers.forEach(function (o) { o.disconnect(); });
      triggers = []; observers = [];
      runToken++;
      clip.stop();
      state = 'idle';
    }

    function setup() {
      teardown();
      auto = motionAllowed();
      mode = mqDesktop.matches ? 'scroll' : 'manual';
      showLayer(current);
      updateButton();

      // Load the video only when the area is near the viewport.
      var near = new IntersectionObserver(function (entries) {
        if (entries[entries.length - 1].isIntersecting && (auto || state === 'playing')) {
          clip.load().catch(function () {});
          near.disconnect();
        }
      }, { rootMargin: '60% 0px' });
      near.observe(section);
      observers.push(near);

      // Pause whenever the visual is out of view.
      var vis = new IntersectionObserver(function (entries) {
        if (!entries[entries.length - 1].isIntersecting && clip.playing()) stopAll();
      });
      vis.observe(visual);
      observers.push(vis);

      if (mode === 'scroll') {
        // Desktop: the active chapter is the last one whose top has passed
        // 60 % of the viewport. One trigger for the whole list, so gaps
        // between chapters and jumps (scrollbar drag, End key) are handled.
        var list = section.querySelector('.seq__chapters');
        var shown = -1;
        var pick = function (dir) {
          var line = window.innerHeight * 0.6;
          var idx = 0;
          items.forEach(function (el, k) { if (el.getBoundingClientRect().top <= line) idx = k; });
          if (idx === shown) return;
          var forward = dir === undefined ? idx > shown : dir > 0;
          shown = idx;
          chapter(idx, forward ? 1 : -1);
        };
        if (ST()) {
          triggers.push(ST().create({
            trigger: list, start: 'top bottom', end: 'bottom top',
            onUpdate: function (self) { pick(self.direction); },
            onRefresh: function (self) { if (self.isActive) pick(); },
          }));
        } else {
          var raf = 0;
          var onScroll = function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(function () { pick(); }); };
          window.addEventListener('scroll', onScroll, { passive: true });
          triggers.push({ kill: function () { window.removeEventListener('scroll', onScroll); } });
          pick();
        }
      } else if (auto && video) {
        // Mobile: play the whole selection once when the visual is in view.
        var once = new IntersectionObserver(function (entries) {
          if (entries[entries.length - 1].isIntersecting && state === 'idle') {
            once.disconnect();
            playAll(0);
          }
        }, { threshold: 0.6 });
        once.observe(visual);
        observers.push(once);
      }
      if (ST()) ST().refresh();
    }

    if (btn) btn.addEventListener('click', function () {
      if (mode === 'scroll' && auto) { setPrefOff(true); return; }
      if (state === 'playing') { stopAll(); return; }
      if (mode === 'scroll' && !mqReduce.matches && prefOff()) { setPrefOff(false); return; }
      clip.load().catch(function () {});
      playAll(state === 'done' ? 0 : current);
    });

    // Chapter buttons (keyboard and pointer). Desktop: scroll the chapter to
    // the activation line, so scrolling and choosing stay in sync. Mobile:
    // show (and, with motion allowed, play) that chapter directly.
    section.addEventListener('click', function (e) {
      var b = e.target.closest('[data-jump]');
      if (!b || !section.contains(b)) return;
      var i = Number(b.getAttribute('data-jump'));
      if (mode === 'scroll') {
        var top = items[i].getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.5;
        window.scrollTo({ top: top, behavior: mqReduce.matches ? 'auto' : 'smooth' });
      } else {
        if (auto && video) clip.load().catch(function () {});
        chapter(i, 1);
      }
    });

    var onChange = function () { setup(); };
    var onHidden = function () { if (document.hidden && clip.playing()) stopAll(); };
    mqDesktop.addEventListener('change', onChange);
    mqReduce.addEventListener('change', onChange);
    document.addEventListener('media-motion-change', onChange);
    document.addEventListener('visibilitychange', onHidden);
    setup();

    this.destroy = function () {
      teardown();
      clip.destroy();
      mqDesktop.removeEventListener('change', onChange);
      mqReduce.removeEventListener('change', onChange);
      document.removeEventListener('media-motion-change', onChange);
      document.removeEventListener('visibilitychange', onHidden);
    };
  }

  // ---------------------------------------------------------------------
  // Continuous tour: the COMPLETE clip, chapters follow the footage
  // (data-continuous="<duration>", data-chapters = contiguous [start, end]).
  //   scroll  desktop + motion: scroll position through the chapter list is
  //           mapped piecewise to the whole duration. While chapter k's text
  //           passes the activation line, the video moves through chapter k's
  //           time window, so text and footage stay together, forward and back.
  //   manual  mobile (plays the full clip once on entry, holds the last frame,
  //           replay), reduced motion or motion off (posters; manual playback).
  // ---------------------------------------------------------------------
  function ContinuousTour(section) {
    var video = section.querySelector('.seq__video');
    var btn = section.querySelector('[data-media-toggle]');
    var layers = Array.prototype.slice.call(section.querySelectorAll('[data-layer]'));
    var items = Array.prototype.slice.call(section.querySelectorAll('.seq__chapter'));
    var ranges = JSON.parse(section.getAttribute('data-chapters'));
    var duration = Number(section.getAttribute('data-continuous'));
    var visual = section.querySelector('.seq__frame');
    var list = section.querySelector('.seq__chapters');
    var clip = new Clip(video);
    var triggers = [];
    var observers = [];
    var mode = null;
    var auto = false;
    var current = -1;
    var state = 'idle'; // idle | playing | done (manual mode)
    var raf = 0;
    var proxy = { t: 0 };
    var tween = null;

    function showLayer(i) { layers.forEach(function (l, k) { l.classList.toggle('is-on', k === i); }); }
    function hideLayers() { layers.forEach(function (l) { l.classList.remove('is-on'); }); }
    function chapterAt(t) {
      for (var k = ranges.length - 1; k >= 0; k--) if (t >= ranges[k][0] - 0.001) return k;
      return 0;
    }
    function mark(i) {
      if (i === current) return;
      current = i;
      items.forEach(function (el, k) {
        el.classList.toggle('is-active', k === i);
        if (k === i) el.setAttribute('aria-current', 'step'); else el.removeAttribute('aria-current');
      });
    }

    clip.onFrame = function () { if (mode === 'scroll') hideLayers(); };
    clip.onFail = function () { if (btn) btn.hidden = true; showLayer(current < 0 ? 0 : current); section.classList.remove('is-scrub'); refresh(); };
    function refresh() { if (ST()) ST().refresh(); }

    function setButton2() {
      if (!btn) return;
      if (clip.failed) { btn.hidden = true; return; }
      if (mode === 'scroll') { setButton(btn, 'pause', 'Vypnout pohyb videa'); return; }
      if (state === 'playing') setButton(btn, 'pause', 'Pozastavit video');
      else if (state === 'done') setButton(btn, 'replay', 'Přehrát video znovu');
      else setButton(btn, 'play', 'Přehrát celé video');
    }

    // Scroll → time, piecewise per chapter.
    function timeFromScroll() {
      var line = window.innerHeight * 0.6;
      var tops = items.map(function (el) { return el.getBoundingClientRect().top; });
      var listBottom = list.getBoundingClientRect().bottom;
      if (line <= tops[0]) return 0;
      for (var k = 0; k < items.length; k++) {
        var start = tops[k];
        var end = k + 1 < items.length ? tops[k + 1] : listBottom;
        if (line < end || k === items.length - 1) {
          var f = Math.min(1, Math.max(0, (line - start) / Math.max(1, end - start)));
          return ranges[k][0] + f * (ranges[k][1] - ranges[k][0]);
        }
      }
      return duration;
    }

    function onScroll() {
      var t = Math.min(duration - 0.02, Math.max(0, timeFromScroll()));
      mark(chapterAt(t));
      // Short smoothing so wheel steps glide; reverses naturally.
      if (window.gsap) {
        if (tween) tween.kill();
        tween = window.gsap.to(proxy, { t: t, duration: 0.25, ease: 'power1.out', onUpdate: function () { clip.seekTo(proxy.t); } });
      } else {
        proxy.t = t;
        clip.seekTo(t);
      }
    }

    // Manual: play the complete clip once (from `from`), chapters follow.
    function follow() {
      cancelAnimationFrame(raf);
      (function tick() {
        mark(chapterAt(video.currentTime));
        if (!video.paused && !video.ended) raf = requestAnimationFrame(tick);
      })();
    }
    function playFull(from) {
      state = 'playing';
      setButton2();
      var p = clip.playRange(from || 0, duration, 1);
      video.addEventListener('playing', function onP() { video.removeEventListener('playing', onP); hideLayers(); follow(); });
      p.then(function () { state = 'done'; mark(ranges.length - 1); setButton2(); },
        function () { if (state === 'playing') state = 'idle'; setButton2(); });
    }

    function teardown() {
      triggers.forEach(function (t) { t.kill(); });
      observers.forEach(function (o) { o.disconnect(); });
      triggers = []; observers = [];
      if (tween) { tween.kill(); tween = null; }
      cancelAnimationFrame(raf);
      clip.stop();
      section.classList.remove('is-scrub');
    }

    function setup() {
      teardown();
      auto = motionAllowed();
      mode = mqDesktop.matches && auto && !!ST() ? 'scroll' : 'manual';
      state = 'idle';
      showLayer(current < 0 ? 0 : current);
      if (current < 0) mark(0);
      setButton2();

      var near = new IntersectionObserver(function (entries) {
        if (entries[entries.length - 1].isIntersecting && (auto || state === 'playing')) { clip.load().catch(function () {}); near.disconnect(); }
      }, { rootMargin: '60% 0px' });
      near.observe(section);
      observers.push(near);

      if (mode === 'scroll') {
        section.classList.add('is-scrub');
        triggers.push(ST().create({
          trigger: list, start: 'top bottom', end: 'bottom top',
          onUpdate: onScroll,
          onRefresh: function (self) { if (self.isActive) onScroll(); },
        }));
        clip.load().then(function () { if (mode === 'scroll') onScroll(); }, function () {});
      } else {
        // Pause when out of view.
        var vis = new IntersectionObserver(function (entries) {
          if (!entries[entries.length - 1].isIntersecting && clip.playing()) { clip.stop(); state = 'idle'; setButton2(); }
        });
        vis.observe(visual);
        observers.push(vis);
        if (auto && !mqDesktop.matches) {
          var once = new IntersectionObserver(function (entries) {
            if (entries[entries.length - 1].isIntersecting && state === 'idle') { once.disconnect(); playFull(0); }
          }, { threshold: 0.6 });
          once.observe(visual);
          observers.push(once);
        } else {
          // Static: the chapter in view shows its poster.
          var pickStatic = function () {
            var line = window.innerHeight * 0.6;
            var idx = 0;
            items.forEach(function (el, k) { if (el.getBoundingClientRect().top <= line) idx = k; });
            if (state !== 'playing') { mark(idx); showLayer(idx); }
          };
          window.addEventListener('scroll', pickStatic, { passive: true });
          triggers.push({ kill: function () { window.removeEventListener('scroll', pickStatic); } });
        }
      }
      refresh();
    }

    if (btn) btn.addEventListener('click', function () {
      if (mode === 'scroll') { setPrefOff(true); return; }
      if (state === 'playing') { clip.stop(); state = 'idle'; setButton2(); return; }
      if (mqDesktop.matches && !mqReduce.matches && prefOff()) { setPrefOff(false); return; }
      playFull(0); // the button always plays the complete clip
    });

    section.addEventListener('click', function (e) {
      var b = e.target.closest('[data-jump]');
      if (!b || !section.contains(b)) return;
      var i = Number(b.getAttribute('data-jump'));
      if (mode === 'scroll') {
        var top = items[i].getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.6 + 2;
        window.scrollTo({ top: top, behavior: 'smooth' });
      } else if (auto) {
        playFull(ranges[i][0]);
      } else {
        clip.stop(); state = 'idle'; mark(i); showLayer(i); setButton2();
      }
    });

    var onChange = function () { setup(); };
    var onHidden = function () { if (document.hidden && clip.playing()) { clip.stop(); state = 'idle'; setButton2(); } };
    mqDesktop.addEventListener('change', onChange);
    mqReduce.addEventListener('change', onChange);
    document.addEventListener('media-motion-change', onChange);
    document.addEventListener('visibilitychange', onHidden);
    setup();

    this.destroy = function () {
      teardown();
      clip.destroy();
      mqDesktop.removeEventListener('change', onChange);
      mqReduce.removeEventListener('change', onChange);
      document.removeEventListener('media-motion-change', onChange);
      document.removeEventListener('visibilitychange', onHidden);
    };
  }

  // ---------------------------------------------------------------------
  var registry = new WeakMap();

  function init(main) {
    destroy(main);
    var list = [];
    each(main.querySelectorAll('[data-stage]'), function (el) { list.push(new HeroStage(el)); });
    each(main.querySelectorAll('[data-seq]'), function (el) {
      list.push(el.hasAttribute('data-continuous') ? new ContinuousTour(el) : new Sequence(el));
    });
    root.classList.toggle('has-stage', !!main.querySelector('[data-stage]'));
    registry.set(main, list);
  }

  function destroy(main) {
    var list = registry.get(main);
    if (!list) return;
    list.forEach(function (c) { c.destroy(); });
    registry.delete(main);
  }

  window.MediaStage = { init: init, destroy: destroy };
})();
