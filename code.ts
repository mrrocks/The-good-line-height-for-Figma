figma.showUI(__html__, { width: 240, height: 168 });

const calculateLineHeight = (
  size: number,
  multiplier: number,
  grid: number
): number => {
  return Math.round((size * multiplier) / grid) * grid;
};

const updateSelection = async (event: { multiplier: number; grid: number }) => {
  const selection = figma.currentPage.selection;

  for (const el of selection) {
    if (el.type === "TEXT") {
      if (el.fontName === figma.mixed) continue;
      await figma.loadFontAsync(el.fontName as FontName);

      if (el.fontSize === figma.mixed) continue;
      const newLineHeightValue = calculateLineHeight(
        el.fontSize as number,
        event.multiplier,
        event.grid
      );

      if (el.lineHeight !== figma.mixed) {
        el.lineHeight =
          el.lineHeight.unit === "AUTO"
            ? { unit: "PIXELS", value: newLineHeightValue }
            : { ...el.lineHeight, value: newLineHeightValue };
      }
    }
  }
};

const checkSelection = () => {
  const selection = figma.currentPage.selection;
  const message =
    selection.length === 0 || !selection.every((el) => el.type === "TEXT")
      ? "invalid selection"
      : "valid selection";
  figma.ui.postMessage(message);
};

checkSelection();

figma.on("selectionchange", checkSelection);

figma.ui.onmessage = (msg) => updateSelection(msg);
