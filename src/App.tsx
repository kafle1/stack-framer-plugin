import { framer, useIsAllowedTo } from "@framer/plugin"
import { useState } from "react"
import { SECTIONS, type Section } from "./sections"
import "./App.css"

framer.showUI({
  position: "top right",
  width: 260,
  height: 320,
})

export function App() {
  const isAllowed = useIsAllowedTo("addDetachedComponentLayers")
  const [busyId, setBusyId] = useState<string | null>(null)
  const [lastInserted, setLastInserted] = useState<string | null>(null)

  const insert = async (section: Section) => {
    if (busyId) return // one insert at a time, double clicks would stack layers
    setBusyId(section.id)
    try {
      await framer.addDetachedComponentLayers({ url: section.url })
      setLastInserted(section.name)
      framer.notify(`${section.name} added`, { variant: "success" })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not add that section"
      framer.notify(message, { variant: "error" })
    } finally {
      setBusyId(null)
    }
  }

  return (
    <main className="sections">
      <ul className="section-list">
        {SECTIONS.map(section => (
          <li key={section.id}>
            <button
              className="section-card"
              onClick={() => insert(section)}
              disabled={!isAllowed || busyId !== null}
            >
              <span className="section-name">{section.name}</span>
              <span className="section-category">{section.category}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="status">
        {!isAllowed
          ? "You do not have edit access to this project"
          : busyId
            ? "Adding…"
            : lastInserted
              ? `Last added: ${lastInserted}`
              : "Click a section to add it to the canvas"}
      </p>
    </main>
  )
}
