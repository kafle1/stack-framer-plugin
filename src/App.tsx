import { framer, useIsAllowedTo } from "@framer/plugin"
import { useState } from "react"
import { addSectionToPage } from "./page"
import { SECTIONS, type Section } from "./sections"
import "./App.css"

framer.showUI({
  position: "top right",
  width: 260,
  height: 320,
})

const IDLE = "Click a section to add it to the page"

export function App() {
  const canInsert = useIsAllowedTo("addDetachedComponentLayers", "setParent", "Node.setAttributes")
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState(IDLE)

  const add = async (section: Section) => {
    setBusy(true)
    setStatus(`Adding ${section.name}…`)
    try {
      await addSectionToPage(section.url)
      setStatus(`Added ${section.name}`)
      framer.notify(`${section.name} added`, { variant: "success" })
    } catch (error) {
      const reason = error instanceof Error ? error.message : "unknown error"
      setStatus(`Could not add ${section.name}`)
      framer.notify(reason, { variant: "error" })
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="sections">
      <ul className="section-list">
        {SECTIONS.map(section => (
          <li key={section.id}>
            <button
              className="section-card"
              onClick={() => add(section)}
              disabled={!canInsert || busy}
            >
              {section.name}
            </button>
          </li>
        ))}
      </ul>
      <p className="status">{canInsert ? status : "You need edit access to this project"}</p>
    </main>
  )
}
