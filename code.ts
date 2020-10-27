figma.showUI(__html__)
figma.ui.resize(240, 168)

let calculateLineHeight = (size: number, multiplier: number, grid: number) => {
  return Math.ceil((size * multiplier) / grid) * grid
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

  if (selection.every((node) => node.type == "TEXT")) {
    figma.ui.postMessage("valid selection")
  } else {
    figma.ui.postMessage("invalid selection")
  }
}

checkSelection()

figma.on("selectionchange", checkSelection)

figma.ui.onmessage = updateSelection