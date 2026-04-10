import { Diagram } from "./shapeToDiagram";

type Constraints = {
    margin: number,
    stringSpacing: number,
    fretSpacing: number,
    width: number,
    height: number
}

function renderDiagram(diagram: Diagram) {
    const stringCount = diagram.stringCount
    const fretCount = 5;
    const margin = 25;
    const stringSpacing = 25;
    const fretSpacing = 45;

    const constraints: Constraints = {
        margin,
        stringSpacing,
        fretSpacing,
        width: margin * 2 + (stringCount - 1) * stringSpacing,
        height: margin * 2 + fretCount * fretSpacing
    };
}

function drawStrings(constraints: Constraints) {

}
function drawFrets(constraints: Constraints) {

}
function drawDots(constraints: Constraints) {

}
function drawMutedStrings(constraints: Constraints) {

}