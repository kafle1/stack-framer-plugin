# Stack — trial

Step 1 of the brief. Plugin shows three sections, you click one and it goes on the canvas.

## Run it

```
npm install
npm run dev
```

Then in Framer: main menu, Plugins, turn on Developer Tools. Toolbar, Plugins, Open Development
Plugin. Panel opens top right.

## The three sections

They live in `src/sections.ts`. They point at Framer's own public components for now since yours
aren't built yet. When you send yours it's three URLs to swap and nothing else changes.

Same object shape as the catalogue entry in your brief, minus `thumb`, `tier` and `singleton`
because step 1 doesn't use them. Step 2 reads the same objects out of a JSON file.

## How it inserts

`addDetachedComponentLayers`, so a section lands as normal editable layers. Nothing is locked, the
person can change text, colours, spacing, anything.

## Not in here

Search, filters, categories, thumbnails, singleton handling, loading and empty states. That's step 2.

Two things I did anyway because they'd show up in the video: the buttons go disabled while an insert
is running so a fast double click can't drop two copies, and a failed insert puts the error in a
toast instead of just doing nothing.

## What I found running it

- **Detached insert only works for components you drew in Framer.** A code component
  throws "Failed to load component for detaching. It might not be a visual component."
  So the plugin tries `addDetachedComponentLayers` first and falls back to
  `addComponentInstance` if the module isn't detachable. In the video the first card
  comes in as editable layers, the other two come in as linked instances, because the
  placeholders are Framer's own code components. With your real sections all three
  will detach.
- **Nothing selected on the canvas**: the section still inserts, it just lands beside
  the frame at a negative X, not inside it. Nothing errors. If you want it to land in
  the page you'd have to target the frame yourself, worth deciding in step 2.
- **Package name.** Your doc says `framer-plugin`. The current scaffold installs
  `@framer/plugin` v4, `framer-plugin` sits at 3.10.3 and looks like the old one. I went
  with v4.
- **Insert limit**: none that I hit. I ran a dozen inserts in one session with no
  throttling or error.

## Placeholders

`src/sections.ts` points at Framer's own public components (Page, Ticker, Embed) since
your sections aren't built yet. Three URLs to swap, nothing else changes.
