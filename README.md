### Framer Motion — Beginner Slides

A tiny slide deck with live demos for teaching Framer Motion basics: initial/animate/transition, hover/tap, AnimatePresence, and drag.

### Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000/slides` to present. Use ←/→ or A/D to navigate. There are on-screen Prev/Next buttons for mouse/touch.

### Structure
- `app/page.tsx`: Landing page linking to the slides
- `app/slides/page.tsx`: The slide deck with interactive examples
- `app/layout.tsx`: Global layout and metadata

### What’s inside the deck
- Intro box fade/slide-in
- Hover/Tap button micro-interactions
- AnimatePresence toast
- Draggable dot with constraints

You can add more slides by editing the `slides` array in `app/slides/page.tsx`.
