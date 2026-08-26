export interface Section {
  id: string
  name: string
  category: string
  /** Framer code component module URL, from Assets -> Code Component -> Copy URL */
  url: string
}

// Placeholders so the plugin runs today. Swap these three for Dom's component URLs.
export const SECTIONS: Section[] = [
  {
    id: "hero-split",
    name: "Hero split",
    category: "Hero",
    url: "https://framer.com/m/framer/Page.js",
  },
  {
    id: "feature-grid",
    name: "Feature grid",
    category: "Features",
    url: "https://framer.com/m/framer/Ticker.js",
  },
  {
    id: "footer-simple",
    name: "Footer simple",
    category: "Footer",
    url: "https://framer.com/m/framer/Embed.js",
  },
]
