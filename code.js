var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__, { width: 240, height: 168 });
const calculateLineHeight = (size, multiplier, grid) => {
    return Math.round((size * multiplier) / grid) * grid;
};
const updateSelection = (event) => __awaiter(this, void 0, void 0, function* () {
    const selection = figma.currentPage.selection;
    for (const el of selection) {
        if (el.type === "TEXT") {
            if (el.fontName === figma.mixed)
                continue;
            yield figma.loadFontAsync(el.fontName);
            if (el.fontSize === figma.mixed)
                continue;
            const newLineHeightValue = calculateLineHeight(el.fontSize, event.multiplier, event.grid);
            if (el.lineHeight !== figma.mixed) {
                el.lineHeight =
                    el.lineHeight.unit === "AUTO"
                        ? { unit: "PIXELS", value: newLineHeightValue }
                        : Object.assign(Object.assign({}, el.lineHeight), { value: newLineHeightValue });
            }
        }
    }
});
const checkSelection = () => {
    const selection = figma.currentPage.selection;
    const message = selection.length === 0 || !selection.every((el) => el.type === "TEXT")
        ? "invalid selection"
        : "valid selection";
    figma.ui.postMessage(message);
};
checkSelection();
figma.on("selectionchange", checkSelection);
figma.ui.onmessage = (msg) => updateSelection(msg);
