# Jomanah Alshammary – Portfolio Website (Assignment 1)

This is my personal portfolio website, built for SWE 363 (Web Engineering) at KFUPM.
It is a single page written in plain HTML, CSS and JavaScript. No frameworks or libraries
are used.

Live site: https://202271260-jomanahalshammery-assignment-2.vercel.app
## What the page contains

| Section | Content |
| --- | --- |
| Hero | My name, a typed tagline, a short bio, two buttons (View Portfolio, Get In Touch) and links to my GitHub, LinkedIn, WhatsApp and email |
| Projects | Six pieces of work: Hidden Gate Game, UniDine, The Hero Journey, Taif Rose Perfume Branding, 3D Hotel – Letter H Concept and Tarout Palm Island. Clicking a cover opens it full size |
| Skills | Four cards: Design, 3D & Visualization, Games & Interactive, Web |
| Background | My degree at KFUPM and three volunteering roles |
| Certificates | Three certificates of appreciation |
| Get In Touch | Contact details on the left and a Name / Email / Message form on the right |

All text comes from my CV and my own project documentation.

## Features

- Responsive layout built with CSS Grid and Flexbox. The project grid is three columns on
  desktop, two on tablets and one on phones.
- Light and dark mode. The toggle is in the header, the choice is saved in `localStorage`,
  and it is applied before the page paints so there is no flash. Before a choice is made the
  site follows the system setting.
- Typing effect on the hero tagline (skipped if the visitor prefers reduced motion).
- Mobile navigation that opens as a dropdown and closes when a link is clicked or Escape is pressed.
- Image viewer for the project covers with previous / next buttons and keyboard support.
- Contact form check in JavaScript: empty fields and invalid emails show a message, a complete
  form shows a confirmation. Nothing is sent, there is no backend.
- Semantic HTML with labelled controls and visible focus styles.

## Project structure

```
assignment-1/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   ├── fonts/            Montserrat (served locally)
│   └── images/           project covers
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
```

## Running the site locally

Nothing needs to be installed. Either:

1. Open `index.html` in a browser, or
2. serve the folder so paths behave exactly like on a real server:

```bash
# inside the assignment-1 folder, pick one
npx serve .
python -m http.server 8000
```

Then open `http://localhost:3000` (serve) or `http://localhost:8000` (Python).

The site works offline. The font is included in the repository, so there are no
requests to outside services.

## AI use

I used Claude as an assistant while building this assignment: for explanations of CSS I
had not used before, for reviewing my HTML for accessibility problems, and for a second
opinion on wording. Everything it suggested was checked in the browser and edited before
I kept it. Details are in [docs/ai-usage-report.md](docs/ai-usage-report.md).

## Technical notes

See [docs/technical-documentation.md](docs/technical-documentation.md).
