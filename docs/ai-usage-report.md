# AI Usage Report – Assignment 1

## Tools used and use cases

**Claude (AI assistant)**

I used Claude in three ways during this assignment:

1. Explaining things I did not know yet. Examples: how `scroll-padding-top` works with a
   sticky header, why a `visibility` transition is needed to animate the mobile menu, and how
   to make a `<dialog>` close when the backdrop is clicked.
2. Reviewing my HTML for accessibility. It pointed out that the menu button needed
   `aria-expanded`, that the form status text should be a live region so screen readers
   announce it, and that decorative project images should have empty `alt` attributes since
   the heading next to them already names the project. I applied all three.
3. Drafting first versions of the README and this report from my notes, which I then rewrote
   in my own words.

I also used the browser DevTools (not an AI tool) to test every change on desktop, tablet and
phone widths.

## Benefits and challenges

Benefits

- Faster learning. When something did not work I could ask why instead of guessing.
- The accessibility review caught real problems I would have missed.
- Good for naming things consistently and for spotting unused CSS.

Challenges

- Some suggestions were more complicated than what my page needed, so I simplified them or
  left them out.
- It is easy to accept code you do not fully understand. My rule was that nothing stays in the
  project unless I can explain it.
- Suggested text often sounded generic. I rewrote all of the visible wording myself.

## Learning outcomes

- Organising a stylesheet around CSS variables so that dark mode is just a different set of
  values rather than duplicated rules.
- The difference between `display: none` and `visibility: hidden` when animating a menu.
- Using `IntersectionObserver` is not needed for everything; for this assignment plain event
  listeners were enough.
- How the native `<dialog>` element works and what it gives for free (focus trap, Escape,
  backdrop).
- A working routine: ask a small question, read the answer, test it, then decide.

## Responsible use and modifications

- All content on the site (bio, projects, skills, background, certificates, contact details) is
  my own, taken from my CV and my project documentation.
- Code suggestions were reviewed line by line and edited to fit my structure and naming.
  Where a suggestion did more than needed it was cut down.
- The design decisions (layout, colours, typography, section order) are mine.
- I can explain every part of `script.js` and `styles.css` without help.
