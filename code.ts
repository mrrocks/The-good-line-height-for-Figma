figma.showUI(__html__)
figma.ui.resize(240, 168)

const calculateLineHeight = (size: number, multiplier: number, grid: number) => {
  return Math.ceil((size * multiplier) / grid) * grid
}

const updateSelection = (event) => {
  figma.currentPage.selection.forEach((el) => {
    figma.loadFontAsync(el.fontName).then(() => {

      let newLineHeight = { ...el.lineHeight }

      newLineHeight.value = calculateLineHeight(
        el.fontSize,
        event.multiplier,
        event.grid
      )
    })
  })
}

const isTextNode = (node) => node.type == "TEXT"

const checkSelection = () => {
  const selection = figma.currentPage.selection
  
  if (selection.length == 0) {
    figma.ui.postMessage("invalid selection")
  } else if (selection.every(isTextNode)) {
    figma.ui.postMessage("valid selection")
  }
}

checkSelection()

figma.on("selectionchange", checkSelection)

figma.ui.onmessage = updateSelection