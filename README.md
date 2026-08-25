# Stack — trial plugin

Step 1 of the Stack brief: a Framer plugin that shows three sections and inserts one on click.

## Run it

```
npm install
npm run dev
```

In Framer: main menu → Plugins → enable Developer Tools, then toolbar → Plugins → Open Development
Plugin. The panel opens top right.

Click a card and the section is inserted with `framer.addDetachedComponentLayers({ url })`. A Framer
toast confirms it and the panel line under the list shows what went in last.

## The three sections

`src/sections.ts`. They point at Framer's own public components right now so the plugin runs before
your URLs arrive. Swap the three `url` values for yours and nothing else changes.

The shape matches the catalogue entry in your brief minus the fields Step 1 does not use
(`thumb`, `tier`, `singleton`), so Step 2 loads the same objects from JSON.

## What is deliberately not here

Search, category filters, thumbnails, singleton handling, loading and empty states. Those are Step 2.

Handled anyway because leaving them out would show up in a demo: the buttons disable while an insert
is in flight, so a double click cannot stack two layers, and a failed insert shows the error in a
toast instead of dying silently.

## What was unclear

1. **Package name.** The brief says `framer-plugin`. That package is on 3.10.3 and the current
   scaffold (`npx create-framer-plugin@latest`) installs `@framer/plugin` v4 instead. I used v4. If
   your other work is pinned to the old package, say so and I will move it back.
2. **Nothing selected on the canvas.** Open question in your brief, and it is answered on the
   recording rather than guessed at here.
3. **Detached vs linked.** Detached is what the brief asks for and what this does. Worth deciding
   before Step 2: a detached copy is fully editable but can never receive an update to your source
   section, so someone who remixed one of your templates keeps whatever shipped that day. Linked
   instances update but cannot be edited inside. If the library will keep changing, that choice
   costs more later than it does now.
4. **Insert limits per session.** Nothing documented. Each click is one API call, so if there is a
   ceiling it will show up in Step 2 where a page gets built out of 10+ sections, not here.
