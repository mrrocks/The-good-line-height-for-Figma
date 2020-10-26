figma.showUI(__html__);
figma.ui.resize(240, 168);
let selection = figma.currentPage.selection;
let calculateLineHeight = (size, multiplier, grid) => {
    let lineHeight = Math.ceil((size * multiplier) / grid) * grid;
    return lineHeight;
};
let updateSelection = (event) => {
    selection = figma.currentPage.selection;
    for (let el of selection) {
        figma.loadFontAsync(el.fontName).then(() => {
            let newLineHeight = Object.assign({}, el.lineHeight);
            newLineHeight.value = calculateLineHeight(el.fontSize, event.multiplier, event.grid);
            el.lineHeight = newLineHeight;
        });
    }
};
let enableButton = () => { };
let disableButton = () => { };
figma.on("selectionchange", () => {
    selection = figma.currentPage.selection;
    if (selection.length == 0) {
        console.log("nothing selected");
    }
    else if (selection.length > 0 && selection.every(node => node.type == "TEXT")) {
        console.log(selection);
    }
});
figma.ui.onmessage = (event) => {
    updateSelection(event);
};
