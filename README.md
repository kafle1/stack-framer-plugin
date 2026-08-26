# Stack Sections

Step 1 of your brief. A panel with three sections, click one and it lands on the canvas as
editable layers.

- 30 second demo: [`docs/demo.mp4`](docs/demo.mp4)
- Screenshot walkthrough: [`docs/walkthrough.pdf`](docs/walkthrough.pdf)

## Run it

Needs Node 20.19 or newer.

```
npm install
npm run dev
```

Then in Framer, both under the top left menu:

1. Plugins, **Show Developer Tools** (this is per project, so flip it on in each project you test in)
2. Plugins, **Open Development Plugin** (or option cmd L)

The panel opens top right and stays there while you work.

## What it does

Three cards. Click one and the section goes on the canvas through
`addDetachedComponentLayers`, so it arrives as normal editable layers, nothing locked.

Every insert confirms three ways: the section on the canvas, a Framer toast, and the status
line at the bottom of the panel. While an insert is running the cards go disabled, so a fast
double click can't drop two copies, and a failed insert says which section failed instead of
going quiet.

## The three sections

`src/sections.ts` holds three objects, each an id, a name and a component URL. They point at
Framer's own Hero, Gallery and Footer for now, since yours aren't built yet. Swap the three
`url` fields for yours (Assets, right click the component, Copy URL) and nothing else changes.

`category`, `thumb`, `tier` and `singleton` from your catalogue aren't in here, because step 1
has nothing to do with them. Step 2 reads the full objects out of a JSON file.

## What I found running it

**Detaching only works on components drawn in Framer.** A code component throws
`Failed to load component for detaching. It might not be a visual component.` Your sections
are drawn in Framer, so they detach. Worth knowing if you ever point the catalogue at a code
component, it will fail rather than silently insert something different.

**Detached vs linked is worth deciding now.** Detached means they can edit everything, but
those copies never pick up changes you make to the source section later. If the library keeps
growing, that's a real call, not a detail.

**Nothing selected on the canvas**: it still inserts, it just lands beside the frame instead of
inside the page. Nothing errors. If you want it to land in the page, step 2 has to target the
frame.

**No insert limit** that I could hit. A dozen inserts in one session, no throttling, no error.

**Package name.** Your doc says `framer-plugin`. Setting up a plugin today installs
`@framer/plugin` v4, and `framer-plugin` sits at 3.10.3, so it looks like the old one. I went
with v4. Say if your other work is pinned to the old package.

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
