export interface Section {
  id: string
  name: string
  /** Framer component module URL, from Assets -> right click the component -> Copy URL */
  url: string
}

// Framer's own sections, standing in until yours are built. Detaching only works on
// components drawn in Framer, so these are design components, not code components.
export const SECTIONS: Section[] = [
  { id: "hero", name: "Hero", url: "https://framer.com/m/framer/Hero.js" },
  { id: "gallery", name: "Gallery", url: "https://framer.com/m/framer/Gallery.js" },
  { id: "footer", name: "Footer", url: "https://framer.com/m/framer/Footer.js" },
]
