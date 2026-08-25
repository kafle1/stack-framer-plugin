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

## Stuff I'd want answered before step 2

- Your doc says `framer-plugin`. Setting up a plugin today gives you `@framer/plugin` v4 and the old
  package looks dead, so I went with v4.
- Detached vs linked. Detached is editable but never picks up changes you make to your source
  section later. If the library keeps growing that's worth deciding now, not after.
- Inserting with nothing selected on the canvas: see the video.
- Nothing documented about a limit on inserts per session. It'll show up in step 2 if it exists,
  where a page gets built out of 15 sections.
