/* ==========================================================================
   Jomanah Alshammary — portfolio scripts (Assignment 2)
   1. Theme toggle (saved in localStorage)
   2. Mobile navigation
   3. Projects: render from data, filter chips, live search, notes popup
   4. Contact form: validation, saved draft, animated confirmation
   5. Scroll reveal
   6. Footer year
   7. Project image viewer (lightbox)
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
     3. Projects
     The list is built from PROJECTS (js/data.js). The visitor can narrow
     it with a filter chip or by typing; both are combined. Each item has
     a "Process & notes" button that opens a popup with the full write-up.
     ------------------------------------------------------------------ */
  var projectList = document.getElementById('project-list');
  var filterBar = document.getElementById('project-filters');
  var searchInput = document.getElementById('project-search');
  var emptyState = document.getElementById('project-empty');
  var resultCount = document.getElementById('project-count');
  var clearButton = document.getElementById('project-clear');

  var activeFilter = 'All';
  var query = '';

  // Build the filter chips from data so the list and chips stay in sync
  ['All'].concat(PROJECT_FILTERS).forEach(function (name) {
    var chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip' + (name === 'All' ? ' is-active' : '');
    chip.textContent = name;
    chip.dataset.filter = name;
    chip.setAttribute('aria-pressed', String(name === 'All'));
    filterBar.appendChild(chip);
  });

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function projectTemplate(project) {
    var tags = project.tags.map(function (tag) {
      return '<li>' + escapeHtml(tag) + '</li>';
    }).join('');

    return (
      '<article class="card project-card" data-id="' + project.id + '">' +
        '<button type="button" class="project-media" aria-label="View ' + escapeHtml(project.title) + ' full size">' +
          '<img src="' + project.image + '" alt="" width="1200" height="750" loading="lazy">' +
        '</button>' +
        '<div class="project-body">' +
          '<span class="badge' + (project.kind === 'Project' ? ' badge-accent' : '') + '">' + escapeHtml(project.kind) + '</span>' +
          '<h3>' + escapeHtml(project.title) + '</h3>' +
          '<p class="project-summary">' + escapeHtml(project.summary) + '</p>' +
          '<ul class="tags">' + tags + '</ul>' +
          '<button type="button" class="details-toggle" data-notes="' + project.id + '">' +
            '<span>Process &amp; notes</span>' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>' +
          '</button>' +
        '</div>' +
      '</article>'
    );
  }

  function matches(project) {
    var passesFilter = activeFilter === 'All' || project.tags.indexOf(activeFilter) !== -1;
    if (!passesFilter) {
      return false;
    }
    if (!query) {
      return true;
    }
    var haystack = [project.title, project.summary, project.kind]
      .concat(project.tags)
      .join(' ')
      .toLowerCase();
    return haystack.indexOf(query) !== -1;
  }

  function renderProjects() {
    var visible = PROJECTS.filter(matches);

    projectList.innerHTML = visible.map(projectTemplate).join('');

    // Feedback: how many are showing, and an empty state when none match
    var hasQueryOrFilter = query || activeFilter !== 'All';
    emptyState.hidden = visible.length !== 0;
    resultCount.textContent = hasQueryOrFilter
      ? 'Showing ' + visible.length + ' of ' + PROJECTS.length
      : PROJECTS.length + ' pieces of work';
    clearButton.hidden = !hasQueryOrFilter;

    // Stagger the entrance so the change is easy to follow
    Array.prototype.forEach.call(projectList.children, function (item, index) {
      item.style.animationDelay = (index * 60) + 'ms';
    });
  }

  filterBar.addEventListener('click', function (event) {
    var chip = event.target.closest('.chip');
    if (!chip) {
      return;
    }
    activeFilter = chip.dataset.filter;
    Array.prototype.forEach.call(filterBar.children, function (c) {
      var active = c === chip;
      c.classList.toggle('is-active', active);
      c.setAttribute('aria-pressed', String(active));
    });
    renderProjects();
  });

  searchInput.addEventListener('input', function () {
    query = searchInput.value.trim().toLowerCase();
    renderProjects();
  });

  function resetProjectControls() {
    activeFilter = 'All';
    query = '';
    searchInput.value = '';
    Array.prototype.forEach.call(filterBar.children, function (c) {
      var active = c.dataset.filter === 'All';
      c.classList.toggle('is-active', active);
      c.setAttribute('aria-pressed', String(active));
    });
    renderProjects();
  }

  clearButton.addEventListener('click', resetProjectControls);
  document.getElementById('project-empty-reset').addEventListener('click', resetProjectControls);

  renderProjects();

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
  var heroTitle = document.getElementById('hero-title');
  if (heroTitle && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var fullText = heroTitle.textContent.trim();
    var typed = 0;
    heroTitle.setAttribute('aria-label', fullText);
    heroTitle.textContent = '';
    heroTitle.classList.add('is-typing');
    setTimeout(function typeNext() {
      typed += 1;
      heroTitle.textContent = fullText.slice(0, typed);
      if (typed < fullText.length) {
        setTimeout(typeNext, 80);
      }
    }, 400);
  }

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

  projectList.addEventListener('click', function (event) {
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
    // The card may have been re-rendered by a filter while the viewer was open
    if (openedFrom && document.body.contains(openedFrom)) {
      openedFrom.focus();
    }
    openedFrom = null;
  });
})();
