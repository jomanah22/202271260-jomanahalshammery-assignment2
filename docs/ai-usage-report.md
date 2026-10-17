# AI Usage Report – Assignment 2

## Tools used and use cases

**Claude (AI assistant)**

- Data structure. I described the six projects and asked how to store them so the list, the
  filter buttons and the popup could all use one source. The suggestion was an array of plain
  objects with a `tags` list plus a separate list of filter names. I kept that idea and put the
  data in its own file, `js/data.js`.
- Filtering logic. My first attempt handled the filter buttons and the search box separately
  and they kept overwriting each other. I asked for a cleaner approach and ended up with one
  `matches(project)` function that checks both, which is what the page uses now.
- The `<dialog>` element. I wanted the notes in a popup rather than under the card. Claude
  explained what `showModal()` gives for free (backdrop, focus trap, Escape) and what I still
  had to write (filling the content, closing on a backdrop click, returning focus).
- Accessibility review of the form: `aria-pressed` on the filter buttons, `aria-invalid` and
  `aria-describedby` on the fields, and moving focus to the first invalid field on submit.

**Browser DevTools** (not AI) for testing at three widths and for checking `localStorage`.

## Benefits and challenges

Benefits

- Quicker iteration on logic. I could try something, describe what went wrong and get a fix
  to test within minutes.
- I learned features I would not have found on my own, like the native dialog element.
- The review caught accessibility gaps that DevTools alone does not show.

Challenges

- Generated code mixed styles (arrow functions, template strings) that did not match the rest
  of my file, so I rewrote it to match.
- It liked to add extra features. I removed a suggested sort control because it was not part of
  this assignment.
- Suggested user messages were vague ("Something went wrong"). I rewrote every message so it
  says what happened and what to do.

## Learning outcomes

- Rendering HTML from an array of data with a template function, and why text must be escaped
  even when it is my own.
- Event delegation: one click listener on the list instead of one per button, so re-rendering
  does not break anything.
- Combining several conditions in one predicate function.
- `IntersectionObserver` for scroll effects, including the case where the page is reloaded
  half way down.
- Saving structured data in `localStorage` with `JSON.stringify` and `JSON.parse`, and
  debouncing input events so the draft is not written on every keystroke.

## Responsible use and modifications

- All project text is my own, taken from my project documentation. The AI only helped
  organise it into a data structure.
- Every function was reviewed, renamed to fit my conventions and commented in my own words.
- Where suggestions were more complex than needed they were simplified; where feedback for the
  visitor was missing (empty state, storage failure) I added it.
- I can explain the filtering, the popup, the draft saving and the reveal effect without the
  tool.
