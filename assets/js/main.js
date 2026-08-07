/* ==========================================================================
   ASRAYA HOMESTAY — main.js
   Vanilla, no dependencies. Every behaviour degrades to a usable page if
   this file fails to load: nav is real links, forms have a mailto fallback,
   the gallery is a plain grid, and revealed content starts visible via the
   .no-js guard below.
   ========================================================================== */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 01  Header: transparent at top, solid once scrolled -------------- */

  var header = document.getElementById('header');

  function onScrollHeader() {
    if (!header) return;
    header.classList.toggle('header--solid', window.scrollY > 40);
  }


  /* ---- 02  Mobile drawer ------------------------------------------------
     Focus-trapped, ESC to close, scroll locked behind it, focus returned to
     the burger on close.
     --------------------------------------------------------------------- */

  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');

  function setDrawer(open) {
    if (!drawer || !burger || !header) return;
    drawer.setAttribute('data-open', String(open));
    drawer.setAttribute('aria-hidden', String(!open));
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    header.classList.toggle('header--open', open);
    document.documentElement.classList.toggle('is-locked', open);
    document.body.classList.toggle('is-locked', open);
    if (open) {
      var first = drawer.querySelector('a');
      if (first) first.focus();
    } else {
      burger.focus();
    }
  }

  if (burger && drawer) {
    burger.addEventListener('click', function () {
      setDrawer(drawer.getAttribute('data-open') !== 'true');
    });

    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) setDrawer(false);
    });

    // focus trap
    drawer.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var items = drawer.querySelectorAll('a, button');
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (drawer && drawer.getAttribute('data-open') === 'true') setDrawer(false);
    var lb = document.getElementById('lightbox');
    if (lb && lb.getAttribute('data-open') === 'true') closeLightbox();
  });


  /* ---- 03  Scroll reveal ------------------------------------------------ */

  var revealTargets = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');

  if (reduced || !('IntersectionObserver' in window)) {
    revealTargets.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });

    revealTargets.forEach(function (el) { io.observe(el); });
  }


  /* ---- 04  Parallax inside the arch/mount frames ------------------------
     The photograph drifts at ~94% of page speed while its gold frame holds
     still, so the frame reads as an opening rather than a border.
     --------------------------------------------------------------------- */

  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  var ticking = false;

  function applyParallax() {
    var vh = window.innerHeight;
    parallaxEls.forEach(function (img) {
      var frame = img.parentElement;
      var r = frame.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      // -1 (below fold) .. 1 (above fold)
      var progress = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      var shift = Math.max(-1, Math.min(1, progress)) * -18;
      img.style.transform = 'translate3d(0,' + shift.toFixed(2) + 'px,0)';
    });
    ticking = false;
  }

  function requestParallax() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(applyParallax);
  }


  /* ---- 05  Floating WhatsApp: appear after a little scroll -------------- */

  var wa = document.getElementById('wa');

  function onScrollWa() {
    if (!wa) return;
    wa.setAttribute('data-visible', String(window.scrollY > 320));
  }


  /* ---- 06  Scroll dispatcher -------------------------------------------- */

  function onScroll() {
    onScrollHeader();
    onScrollWa();
    if (!reduced && parallaxEls.length) requestParallax();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () {
    if (!reduced && parallaxEls.length) requestParallax();
  }, { passive: true });
  onScroll();


  /* ---- 07  Hero load sequence -------------------------------------------
     One orchestrated moment: the arch opens from a slit while the headline
     lines rise behind it. Everything else on the site stays quiet.
     --------------------------------------------------------------------- */

  var heroArch = document.getElementById('hero-arch');
  var heroTitle = document.getElementById('hero-title');

  if (heroArch && !reduced) {
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        heroArch.classList.add('is-open');
        if (heroTitle) heroTitle.classList.add('is-open');
      });
    });
  } else {
    if (heroArch) heroArch.classList.add('is-open');
    if (heroTitle) heroTitle.classList.add('is-open');
  }


  /* ---- 08  Gallery: filter + lightbox ------------------------------------
     Filtering uses the [hidden] attribute so the grid degrades to "all
     photos visible" with JS off.
     --------------------------------------------------------------------- */

  var filterBar = document.getElementById('filters');
  var tiles = Array.prototype.slice.call(document.querySelectorAll('.gtile'));

  if (filterBar && tiles.length) {
    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter');
      if (!btn) return;

      var cat = btn.getAttribute('data-filter');

      filterBar.querySelectorAll('.filter').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      moveIndicator(btn);

      tiles.forEach(function (tile) {
        var cats = (tile.getAttribute('data-cat') || '').split(' ');
        var show = cat === 'all' || cats.indexOf(cat) > -1;
        tile.hidden = !show;
      });

      // The bento spans only tile into a flush rectangle with all twelve
      // present, so a filtered view falls back to a uniform grid.
      var grid = document.getElementById('mosaic');
      if (grid) grid.setAttribute('data-filtered', String(cat !== 'all'));

      var count = tiles.filter(function (t) { return !t.hidden; }).length;
      var live = document.getElementById('filter-status');
      if (live) {
        live.textContent = count + (count === 1 ? ' photograph' : ' photographs') + ' shown';
      }
    });

    // the gold pill slides to sit behind the active filter
    var indicator = filterBar.querySelector('.filter-ind');

    function moveIndicator(btn) {
      if (!indicator || !btn) return;
      indicator.style.width = btn.offsetWidth + 'px';
      indicator.style.transform = 'translateX(' + btn.offsetLeft + 'px)';
    }

    var active = filterBar.querySelector('.filter[aria-pressed="true"]');
    moveIndicator(active);
    window.addEventListener('resize', function () {
      moveIndicator(filterBar.querySelector('.filter[aria-pressed="true"]'));
    }, { passive: true });

    // Retract the pill once the photographs are off screen, so it stops
    // floating over the booking band and footer.
    var mosaic = document.getElementById('mosaic');
    if (mosaic && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        filterBar.setAttribute('data-away', String(!entries[0].isIntersecting));
      }, { rootMargin: '-10% 0px -10% 0px' }).observe(mosaic);
    }
  }

  /* ---- lightbox ---- */

  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightbox-img');
  var lbCap = document.getElementById('lightbox-cap');
  var lbCount = document.getElementById('lightbox-count');
  var lastFocused = null;
  var lbIndex = 0;

  function visibleTiles() {
    return tiles.filter(function (t) { return !t.hidden; });
  }

  function showLightbox(i) {
    var list = visibleTiles();
    if (!list.length) return;
    lbIndex = (i + list.length) % list.length;

    var tile = list[lbIndex];
    var img = tile.querySelector('img');
    var full = tile.getAttribute('data-full') || img.src;

    lbImg.src = full;
    lbImg.alt = img.alt;
    lbCap.textContent = tile.getAttribute('data-cap') || '';
    lbCount.textContent = String(lbIndex + 1).padStart(2, '0') + ' / ' +
                          String(list.length).padStart(2, '0');
  }

  function openLightbox(i) {
    if (!lb) return;
    lastFocused = document.activeElement;
    showLightbox(i);
    lb.setAttribute('data-open', 'true');
    lb.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('is-locked');
    document.body.classList.add('is-locked');
    var close = lb.querySelector('.lb__close');
    if (close) close.focus();
  }

  function closeLightbox() {
    if (!lb) return;
    lb.setAttribute('data-open', 'false');
    lb.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('is-locked');
    document.body.classList.remove('is-locked');
    if (lastFocused) lastFocused.focus();
  }

  if (lb && tiles.length) {
    tiles.forEach(function (tile) {
      tile.addEventListener('click', function (e) {
        e.preventDefault();
        openLightbox(visibleTiles().indexOf(tile));
      });
    });

    lb.addEventListener('click', function (e) {
      if (e.target.closest('.lb__close') || e.target === lb || e.target.classList.contains('lb__stage')) {
        closeLightbox();
      }
      if (e.target.closest('.lb__prev')) showLightbox(lbIndex - 1);
      if (e.target.closest('.lb__next')) showLightbox(lbIndex + 1);
    });

    document.addEventListener('keydown', function (e) {
      if (lb.getAttribute('data-open') !== 'true') return;
      if (e.key === 'ArrowLeft')  showLightbox(lbIndex - 1);
      if (e.key === 'ArrowRight') showLightbox(lbIndex + 1);
      if (e.key === 'Tab') {
        var items = lb.querySelectorAll('button');
        if (!items.length) return;
        var first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    // swipe
    var touchX = null;
    lb.addEventListener('touchstart', function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 45) showLightbox(lbIndex + (dx < 0 ? 1 : -1));
      touchX = null;
    }, { passive: true });
  }


  /* ---- 09  Enquiry form → WhatsApp ---------------------------------------
     GitHub Pages is static, so there is no server to post to. The form
     validates, builds a readable message, and hands off to WhatsApp. If the
     browser blocks the popup, an inline link is revealed instead.
     --------------------------------------------------------------------- */

  var WA_NUMBER = '919002153003';
  var form = document.getElementById('enquiry');

  function fieldError(input, message) {
    var wrap = input.closest('.field');
    if (!wrap) return;
    var msg = wrap.querySelector('.field__error');
    if (msg) msg.textContent = message || '';
    wrap.classList.toggle('field--invalid', Boolean(message));
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  function validate(form) {
    var ok = true;
    var firstBad = null;

    form.querySelectorAll('[data-required]').forEach(function (input) {
      var value = input.value.trim();
      var message = '';

      if (!value) {
        // say what is missing, in the field's own terms
        if (input.tagName === 'SELECT')          message = 'Please choose a room.';
        else if (input.type === 'date')          message = 'Please pick a date.';
        else                                     message = 'Please fill this in.';
      } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        message = 'That email address does not look right.';
      } else if (input.type === 'tel' && value.replace(/\D/g, '').length < 7) {
        message = 'Please enter a number we can reach you on.';
      } else if (input.type === 'number') {
        var n = Number(value);
        var max = Number(input.max) || Infinity;
        var min = Number(input.min) || 1;
        if (!Number.isInteger(n) || n < min) message = 'Please enter how many guests are coming.';
        else if (n > max) message = 'We can host up to ' + max + ' guests across the four rooms.';
      } else if (input.type === 'date') {
        // a stay cannot start in the past
        var today = new Date(); today.setHours(0, 0, 0, 0);
        if (input.name === 'checkin' && new Date(value + 'T00:00:00') < today) {
          message = 'Check-in cannot be in the past.';
        }
      }

      fieldError(input, message);
      if (message) { ok = false; if (!firstBad) firstBad = input; }
    });

    // check-out cannot precede check-in
    var ci = form.querySelector('[name="checkin"]');
    var co = form.querySelector('[name="checkout"]');
    if (ci && co && ci.value && co.value && co.value < ci.value) {
      fieldError(co, 'Check-out must be after check-in.');
      ok = false;
      if (!firstBad) firstBad = co;
    }

    if (firstBad) firstBad.focus();
    return ok;
  }

  function prettyDate(value) {
    if (!value) return '';
    var parts = value.split('-');
    if (parts.length !== 3) return value;
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return Number(parts[2]) + ' ' + months[Number(parts[1]) - 1] + ' ' + parts[0];
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(form)) return;

      var d = Object.fromEntries(new FormData(form).entries());
      var lines = ['Hello Asraya Homestay, I’d like to enquire about a stay.', ''];

      if (d.name)     lines.push('Name: ' + d.name);
      if (d.phone)    lines.push('Phone: ' + d.phone);
      if (d.email)    lines.push('Email: ' + d.email);
      if (d.checkin)  lines.push('Check in: ' + prettyDate(d.checkin));
      if (d.checkout) lines.push('Check out: ' + prettyDate(d.checkout));
      if (d.guests)   lines.push('Guests: ' + d.guests);
      if (d.room)     lines.push('Room: ' + d.room);
      if (d.message)  lines.push('', d.message);

      var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
      var win = window.open(url, '_blank', 'noopener');

      var fallback = document.getElementById('wa-fallback');
      if (fallback) {
        if (!win || win.closed || typeof win.closed === 'undefined') {
          // popup blocked — give them something to click
          var link = fallback.querySelector('a');
          if (link) link.href = url;
          fallback.hidden = false;
        } else {
          fallback.hidden = true;
        }
      }

      var done = document.getElementById('form-status');
      if (done) done.textContent = 'Opening WhatsApp with your enquiry.';
    });

    // clear an error as soon as the guest starts fixing it
    form.addEventListener('input', function (e) {
      if (e.target.matches('[data-required]') && e.target.closest('.field--invalid')) {
        fieldError(e.target, '');
      }
    });

    // deep link: rooms.html "Book now" prefills which room
    var room = new URLSearchParams(window.location.search).get('room');
    var roomField = form.querySelector('[name="room"]');
    if (room && roomField) {
      var match = Array.prototype.slice.call(roomField.options).filter(function (o) {
        return o.value.toLowerCase() === room.toLowerCase();
      })[0];
      if (match) roomField.value = match.value;
    }
  }


  /* ---- 10  Footer year --------------------------------------------------- */

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

})();
