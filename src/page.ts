import { framer, isFrameNode, type FrameNode } from "@framer/plugin"

/**
 * The frame the page is drawn in. A project with breakpoints has one frame per
 * size, and the primary one is the page you are building.
 */
async function getPageFrame(): Promise<FrameNode> {
  const frames = (await (await framer.getCanvasRoot()).getChildren()).filter(isFrameNode)
  const page = frames.find(frame => frame.isPrimaryBreakpoint) ?? frames[0]
  if (!page) throw new Error("This page has no frame to add sections to")
  return page
}

/** Adds a section to the bottom of the page instead of loose on the canvas. */
export async function addSectionToPage(url: string) {
  const page = await getPageFrame()

  // a page built out of sections is a vertical stack, so make it one and let it grow
  if (page.layout !== "stack" || page.stackDirection !== "vertical") {
    await page.setAttributes({
      layout: "stack",
      stackDirection: "vertical",
      stackAlignment: "center",
      gap: "0px",
      height: "fit-content",
    })
  }

  const section = await framer.addDetachedComponentLayers({ url })
  await framer.setParent(section.id, page.id)
  await section.setAttributes({ position: "relative", width: "100%" })
}
