import { Diagram } from "./shapeToDiagram";

type Constraints = {
    margin: number,
    stringSpacing: number,
    fretSpacing: number,
    width: number,
    height: number,
    originX: number,
    originY: number,
    stringCount: number,
    fretCount: number,
    topOffset: number,
    nutHeight: number
}

function createConstraints(diagram: Diagram): Constraints {
    const stringCount = diagram.stringCount
    const fretCount = 5;

    const topOffset = 30;
    const leftOffset = diagram.baseFret > 1 ? 20 : 0;

    const margin = 25;
    const stringSpacing = 25; // horizontal gap
    const fretSpacing = 45; // vertical gap

    const originX = margin + leftOffset;
    const originY = margin + topOffset;
    const nutHeight = 6;

    return {
        margin,
        stringSpacing,
        fretSpacing,
        width: originX + (stringCount - 1) * stringSpacing + margin,
        height: margin * 2 + topOffset + fretCount * fretSpacing,
        originX,
        originY,
        stringCount,
        fretCount,
        topOffset,
        nutHeight
    };
}

function renderDiagram(diagram: Diagram) {

    const constraints = createConstraints(diagram);

    const parts: string[] = [
        drawStrings(constraints),
        drawFrets(constraints),
        drawBaseFret(constraints, diagram.baseFret),
        drawDots(constraints, diagram),
        drawOpenStrings(constraints, diagram),
        drawMutedStrings(constraints, diagram),
    ]

    let svg = `<svg width="${constraints.width}" height="${constraints.height}" viewBox="0 0 ${constraints.width} ${constraints.height}" stroke="black" fill="none"">`;

    return svg + `${parts.join("")}</svg>`;

}

function line(x1: number, y1: number, x2: number, y2: number, strokeWidth: number = 2): string {
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke-width="${strokeWidth}" />`;
}
function circle(cx: number, cy: number, r: number, fill: string = "black"): string {
    return `<circle cx="${cx}" cy="${cy}" r="${r}" stroke-width="3" fill="${fill}" />`;
}
function text(x: number, y: number, content: string | number): string {
    return `<text x="${x}" y="${y}" font-family="Arial" font-size="20" text-anchor="middle" dominant-baseline="middle" fill="black">${content}</text>`;
}

function drawStrings(constraints: Constraints): string {
    return "";
}
function drawFrets(constraints: Constraints): string {
    return "";
}
function drawBaseFret(constraints: Constraints, baseFret: number): string {
    return "";
}
function drawDots(constraints: Constraints, diagram: Diagram): string {
    return "";
}
function drawOpenStrings(constraints: Constraints, diagram: Diagram): string {
    return "";
}
function drawMutedStrings(constraints: Constraints, diagram: Diagram): string {
    return "";
}