figma.showUI(__html__)
figma.ui.resize(240, 168)

let calculateLineHeight = (size: number, multiplier: number, grid: number) => {
  let lineHeight = Math.ceil((size * multiplier) / grid) * grid

  return lineHeight
}

let updateSelection = (event) => {
  let selection = figma.currentPage.selection

  for (let el of selection) {
    figma.loadFontAsync(el.fontName).then(() => {
      let newLineHeight = { ...el.lineHeight }

      newLineHeight.value = calculateLineHeight(
        el.fontSize,
        event.multiplier,
        event.grid
      )

      el.lineHeight = newLineHeight
    })
  }
}

let checkSelection = () => {
  let selection = figma.currentPage.selection

  if (selection.length == 0) {
    figma.ui.postMessage("invalid selection")
  } else if (
    selection.length > 0 &&
    selection.every((node) => node.type == "TEXT")
  ) {
    figma.ui.postMessage("valid selection")
  } 
}

checkSelection()

figma.on("selectionchange", checkSelection)

figma.ui.onmessage = updateSelection