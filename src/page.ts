import { framer, isFrameNode, type FrameNode } from "@framer/plugin"

/** The breakpoint frame the page is drawn in, normally the one called Desktop. */
async function getPageFrame(): Promise<FrameNode> {
  const root = await framer.getCanvasRoot()
  const frame = (await root.getChildren()).find(isFrameNode)
  if (!frame) throw new Error("This page has no frame to add sections to")
  return frame
}

/**
 * Adds a section to the bottom of the page instead of loose on the canvas.
 * The frame is switched to a vertical stack once, so every section after the
 * first lands under the previous one.
 */
export async function addSectionToPage(url: string) {
  const frame = await getPageFrame()
  if (frame.layout !== "stack") {
    await frame.setAttributes({
      layout: "stack",
      stackDirection: "vertical",
      stackAlignment: "center",
      gap: "0px",
      height: "fit-content",
    })
  }

  const section = await framer.addDetachedComponentLayers({ url })
  await framer.setParent(section.id, frame.id)
  await section.setAttributes({ position: "relative", width: "100%" })
}
