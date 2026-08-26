# Stack Sections

Step 1 of your brief. A panel with three sections, click one and it lands on the canvas.

There's a walkthrough with screenshots in [`docs/walkthrough.pdf`](docs/walkthrough.pdf) if
that's quicker than reading this.

## Run it

```
npm install
npm run dev
```

Then in Framer: menu top left, type `plugin`, open **Plugins**, click **Show Developer Tools**.
The panel opens top right and stays there while you work.

## What it does

Three cards. Click one and the section goes on the canvas through
`addDetachedComponentLayers`, so it comes in as normal editable layers, nothing locked.

Three things confirm an insert: the section on the canvas, a Framer toast, and a
`Last added` line at the bottom of the panel.

Two small things I added because they show up the moment you use it: the buttons go
disabled while an insert is running, so a fast double click can't drop two copies, and a
failed insert puts the real error in the toast instead of doing nothing.

## The three sections

They live in `src/sections.ts` and point at Framer's own public components for now, since
yours aren't built yet. Swap the three `url` fields for your component URLs (Assets, right
click a code component, Copy URL) and nothing else changes.

Same object shape as the catalogue entry in your brief, minus `thumb`, `tier` and
`singleton` because step 1 doesn't use them. Step 2 reads the same objects out of a JSON
file instead of an array.

## What I found running it

**Detaching only works on components drawn in Framer.** A code component throws
`Failed to load component for detaching. It might not be a visual component.` So the
plugin tries detach first and falls back to `addComponentInstance` if the module won't
detach. In the video the first card comes in as editable layers and the other two come in
linked, because the placeholders are Framer's own code components. Your sections are drawn
in Framer, so all three will detach.

**Detached vs linked is worth deciding now.** Detached means they can edit everything, but
those copies never pick up changes you make to the source section later. If the library
keeps growing, that's a real call, not a detail.

**Nothing selected on the canvas**: it still inserts, it just lands beside the frame at a
negative X instead of inside the page. Nothing errors. If you want it to land in the page,
step 2 has to target the frame.

**No insert limit** that I could hit. A dozen inserts in one session, no throttling, no
error.

**Package name.** Your doc says `framer-plugin`. Setting up a plugin today installs
`@framer/plugin` v4, and `framer-plugin` sits at 3.10.3, so it looks like the old one. I
went with v4. Say if your other work is pinned to the old package.

## Not in here

Search, category chips, thumbnails, the catalogue as JSON, the singleton guard, loading and
empty states. That's step 2. The Setup panel, PRO cards and the marketplace submission are
step 3.

## Files

```
src/sections.ts   the three sections
src/App.tsx       the panel, the click, the insert
framer.json       plugin id, name, icon
```
