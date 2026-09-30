# Technical Documentation – Assignment 1

## Overview

A single-page static website. There is no build step and no dependency. Everything is in
`index.html`, `css/styles.css`, `js/script.js`, `assets/fonts/` and `assets/images/`.

## HTML structure

```
<header class="header">          logo, navigation, theme button, menu button
<main>
  <section id="home">            hero: greeting, name, typed tagline, bio, buttons, social links
  <section id="projects">        six <article class="card project-card">
  <section id="skills">          four service cards
  <section id="experience">      feature box with education and volunteering
  <section id="certificates">    three certificate cards
  <section id="contact">         contact list and <form id="contact-form">
<footer class="footer">          social links and copyright
<dialog id="lightbox">           full-size image viewer
```

Each section has an `id` that the navigation links to. Icons are inline SVG, so no icon font
is loaded. Every project cover is a `<button class="project-media">` wrapping the image so it
can be opened with the keyboard as well as the mouse.

## CSS

`styles.css` is organised top to bottom:

1. `@font-face` for Montserrat (variable font, served from `assets/fonts`).
2. Variables on `:root`: colours, font, radius, shadow, header height. The dark palette is a
   set of overrides on `[data-theme="dark"]`, repeated under
   `@media (prefers-color-scheme: dark)` for visitors who have not chosen a theme yet.
   `color-scheme` is set per theme so native controls follow it.
3. Base rules, typography, `.container`, `.section`, `.section-title`.
4. Components: `.btn` (pill buttons), `.icon-btn`, `.card`, `.badge`, `.tags`.
5. One block per section: header, hero, portfolio, skills, background, certificates, contact,
   footer, lightbox.
6. Responsive rules at 992px, 768px and 480px, and a `prefers-reduced-motion` block.

Layout notes

- CSS Grid is used for the project grid (`repeat(3, 1fr)`, then 2, then 1), the skill cards,
  the feature box, the certificates and the two-column contact area.
- Flexbox is used for the header bar, the navigation, button rows, tag lists and social icons.
- A project card is a flex column. The caption box overlaps the bottom of the image with a
  negative margin and stretches to the row height so cards in a row line up.
- Images use `aspect-ratio: 4 / 3` and `object-fit: cover`, with `width` and `height`
  attributes to avoid layout shift.

## JavaScript

`script.js` is wrapped in a function so nothing is added to the global scope. It has six
parts:

| Part | What it does |
| --- | --- |
| Theme toggle | Reads the current theme from `<html data-theme>` (falling back to the system setting), switches it on click, saves it to `localStorage` and updates the button label. |
| Mobile navigation | Toggles the `is-open` class on the nav, keeps `aria-expanded` in sync, closes on link click or Escape. |
| Typing effect | Types the hero tagline one character every 80 ms and shows a blinking cursor with CSS. Skipped when `prefers-reduced-motion` is set. The full text stays in the HTML. |
| Contact form | Stops the default submit, checks that all three fields are filled and that the email looks valid, then writes an error or a confirmation into a live region. |
| Footer year | Inserts the current year. |
| Image viewer | Opens the clicked cover in the `<dialog>` with `showModal()`, adds previous / next (buttons and arrow keys), a position counter, click outside to close and focus return to the cover. |

A three-line inline script in `<head>` applies the saved theme before the stylesheet paints,
so reloading in dark mode does not flash light.

## Assets

- `assets/images`: six project covers, JPEG, no wider than 1200px, about 1.1 MB in total.
- `assets/fonts`: Montserrat as one variable `.woff2` file (latin subset, 38 KB).

## Browser support

Tested in current Chrome and Edge at 1440px, 820px and 390px in both themes. The CSS uses
Grid, Flexbox, custom properties, `aspect-ratio` and `<dialog>`, all supported in browsers
released since 2022.

## Known limitations

- The contact form does not send anything. A backend is not part of this assignment.
