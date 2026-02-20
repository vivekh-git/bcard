# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev    # start dev server at http://localhost:3000
npm run build  # production build
npm start      # production server (requires build first)
```

## Architecture

**Stack:** Next.js 14 (pages router), React 18, CSS Modules. No external UI libraries.

**Key files:**
- `pages/index.js` — entire app lives here: `generateMessage()` template logic, `Home` page, `Field` input helper, `BirthdayCard` display component
- `styles/Home.module.css` — all page and card styles
- `styles/globals.css` — minimal CSS reset

**Data flow:** All state is client-side. Form submission runs `generateMessage(name, age, hobby)` synchronously, prepends a new card object to the `cards` array (newest first), and the right-hand column renders all accumulated cards. No API routes or server state.

**Message generation (`generateMessage`):** Returns `{ ageComment, hobbyComment, closing }` using age-bucket conditionals and hobby keyword regex matching. Lives entirely in `pages/index.js`.

**Styling conventions:** CSS Modules only. Festive dark-purple gradient page background, animated shimmer title, 5 rotating color schemes for cards (`SCHEMES` array in `index.js`), sticky form sidebar on desktop, single-column stacked layout below 780 px.
