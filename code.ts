figma.showUI(__html__)
figma.ui.resize(240, 168)

const calculateLineHeight = (size: number, multiplier: number, grid: number) => {
  return Math.ceil((size * multiplier) / grid) * grid
}

const updateSelection = (event) => {
  figma.currentPage.selection.forEach((el) => {
    figma.loadFontAsync(el.fontName).then(() => {
      el.lineHeight.value = calculateLineHeight(
        el.fontSize,
        event.multiplier,
        event.grid
      )
    })
  })
}

const isTextNode = (node) => node.type == "TEXT"

const checkSelection = () => {
  if (figma.currentPage.selection.every(isTextNode)) {
    figma.ui.postMessage("valid selection")
  } else {
    figma.ui.postMessage("invalid selection")
  }
}

checkSelection()

figma.on("selectionchange", checkSelection)

figma.ui.onmessage = updateSelection