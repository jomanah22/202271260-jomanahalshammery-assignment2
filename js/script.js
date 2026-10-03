/* ==========================================================================
   Jomanah Alshammary — portfolio scripts (Assignment 2)
   1. Theme toggle (saved in localStorage)
   2. Mobile navigation
   3. Typing effect for the hero title
   4. Contact form feedback (no backend)
   5. Footer year
   6. Project image viewer (lightbox)
   ========================================================================== */

(function () {
  'use strict';

  var root = document.documentElement;

  /* ------------------------------------------------------------------
     1. Theme toggle
     ------------------------------------------------------------------ */
  var themeToggle = document.getElementById('theme-toggle');

  function currentTheme() {
    var explicit = root.getAttribute('data-theme');
    if (explicit) {
      return explicit;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
    );
  }

  themeToggle.addEventListener('click', function () {
    applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  });

  themeToggle.setAttribute(
    'aria-label',
    currentTheme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
  );

  /* ------------------------------------------------------------------
     2. Mobile navigation
     ------------------------------------------------------------------ */
  var menuToggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('site-nav');

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  menuToggle.addEventListener('click', function () {
    setMenu(!nav.classList.contains('is-open'));
  });

  nav.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      setMenu(false);
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      menuToggle.focus();
    }
  });

  /* ------------------------------------------------------------------
     3. Typing effect
     Types the hero title one character at a time, then keeps a
     blinking cursor. The full text stays in the markup so the page
     reads correctly without JavaScript and for screen readers.
     ------------------------------------------------------------------ */
  var heroTitle = document.getElementById('hero-title');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (heroTitle && !reduceMotion) {
    var fullText = heroTitle.textContent.trim();
    var index = 0;

    heroTitle.setAttribute('aria-label', fullText);
    heroTitle.textContent = '';
    heroTitle.classList.add('is-typing');

    function typeNext() {
      heroTitle.textContent = fullText.slice(0, index + 1);
      index += 1;
      if (index < fullText.length) {
        setTimeout(typeNext, 80);
      }
    }

    setTimeout(typeNext, 400);
  }

  /* ------------------------------------------------------------------
     4. Contact form
     No backend for this assignment: check the fields are filled in and
     the email looks valid, then show a confirmation message.
     ------------------------------------------------------------------ */
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var name = form.elements.name.value.trim();
    var email = form.elements.email.value.trim();
    var message = form.elements.message.value.trim();

    status.classList.remove('is-success', 'is-error');

    if (!name || !email || !message) {
      status.textContent = 'Please fill in your name, email and message before sending.';
      status.classList.add('is-error');
      return;
    }

    // Simple shape check: something@something.something
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = 'Please enter a valid email address.';
      status.classList.add('is-error');
      return;
    }

    status.textContent = 'Thank you, ' + name + '! Your message has been received. I will get back to you at ' + email + '.';
    status.classList.add('is-success');
    form.reset();
  });

  /* ------------------------------------------------------------------
     5. Footer year
     ------------------------------------------------------------------ */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------
     6. Project image viewer
     Each project cover is a button. Clicking it shows that picture full
     size in a native <dialog>: showModal() gives the backdrop, the focus
     trap and Escape to close. On top of that we add the caption, previous
     / next (buttons and the arrow keys), a click outside the picture to
     close, and returning focus to the cover that opened the viewer.
     ------------------------------------------------------------------ */
  var lightbox = document.getElementById('lightbox');
  var lightboxImage = document.getElementById('lightbox-image');
  var lightboxTitle = document.getElementById('lightbox-title');
  var lightboxPosition = document.getElementById('lightbox-position');
  var lightboxPrev = document.getElementById('lightbox-prev');
  var lightboxNext = document.getElementById('lightbox-next');
  var covers = [];
  var coverIndex = 0;
  var openedFrom = null;

  function coverTitle(button) {
    var card = button.closest('.project-card');
    var heading = card ? card.querySelector('h3') : null;
    return heading ? heading.textContent.trim() : '';
  }

  function showCover(index) {
    if (!covers.length) {
      return;
    }
    // Wrap around, so the arrows never dead-end
    coverIndex = (index + covers.length) % covers.length;

    var button = covers[coverIndex];
    var image = button.querySelector('img');
    var title = coverTitle(button);

    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = title ? 'Cover image for ' + title : '';
    lightboxTitle.textContent = title;
    lightboxPosition.textContent = (coverIndex + 1) + ' of ' + covers.length;

    // One picture on its own needs no navigation
    var single = covers.length < 2;
    lightboxPrev.hidden = single;
    lightboxNext.hidden = single;
  }

  function openLightbox(button) {
    covers = Array.prototype.slice.call(document.querySelectorAll('.project-media'));
    var index = covers.indexOf(button);
    if (index === -1) {
      return;
    }
    openedFrom = button;
    showCover(index);
    if (!lightbox.open) {
      lightbox.showModal();
      document.body.classList.add('has-lightbox');
    }
  }

  document.querySelector('.project-grid').addEventListener('click', function (event) {
    var button = event.target.closest('.project-media');
    if (button) {
      openLightbox(button);
    }
  });

  document.getElementById('lightbox-close').addEventListener('click', function () {
    lightbox.close();
  });
  lightboxPrev.addEventListener('click', function () { showCover(coverIndex - 1); });
  lightboxNext.addEventListener('click', function () { showCover(coverIndex + 1); });

  // Anything outside the picture itself is backdrop, so a click there closes
  lightbox.addEventListener('click', function (event) {
    var target = event.target;
    if (
      target === lightbox ||
      target.classList.contains('lightbox-inner') ||
      target.classList.contains('lightbox-figure')
    ) {
      lightbox.close();
    }
  });

  lightbox.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
      showCover(coverIndex - 1);
    }
    if (event.key === 'ArrowRight') {
      showCover(coverIndex + 1);
    }
  });

  lightbox.addEventListener('close', function () {
    document.body.classList.remove('has-lightbox');
    if (openedFrom && document.body.contains(openedFrom)) {
      openedFrom.focus();
    }
    openedFrom = null;
  });
})();
