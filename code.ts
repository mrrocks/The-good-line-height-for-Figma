figma.showUI(__html__)
figma.ui.resize(240, 168)

let calculateLineHeight = (size: number, multiplier: number, grid: number) => {
  return Math.ceil((size * multiplier) / grid) * grid
}

let updateSelection = (event) => {
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

let isTextNode = (node) => node.type == "TEXT"

let checkSelection = () => {
  if (figma.currentPage.selection.every(isTextNode)) {
    figma.ui.postMessage("valid selection")
  } else {
    figma.ui.postMessage("invalid selection")
  }
}

checkSelection()

figma.on("selectionchange", checkSelection)

figma.ui.onmessage = updateSelection