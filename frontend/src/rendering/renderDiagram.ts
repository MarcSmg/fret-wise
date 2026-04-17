import type { Diagram, Dot } from "../application/diagram/shapeToDiagram";

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

// type RenderedDiagram = {

// }

function createConstraints(diagram: Diagram): Constraints {
    const stringCount = diagram.stringCount
    const fretCount = 5;

    const topOffset = diagram.mutedStrings.length !== 0 || diagram.openStrings.length !== 0 ? 40 : 25;
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

function renderDiagram(diagram: Diagram, label?: string) {

    const constraints = createConstraints(diagram);

    const parts: string[] = [
        `<rect width="100%" height="100%" fill="white" />`,
        ...(label ? [drawChordName(constraints, label)] : []),
        drawStrings(constraints),
        drawFrets(constraints, diagram.baseFret),
        drawDots(constraints, diagram),
        drawOpenStrings(constraints, diagram),
        drawMutedStrings(constraints, diagram),
    ]

    let svg = `<svg width="${constraints.width}" height="${constraints.height}" viewBox="0 0 ${constraints.width} ${constraints.height}" stroke="black" fill="none">`;

    return svg + `${parts.join("")}</svg>`;

}

function line(x1: number, y1: number, x2: number, y2: number, strokeWidth?: number): string {
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke-width="${strokeWidth ?? 2}" />`;
}
function circle(cx: number, cy: number, r: number, fill: string = "black"): string {
    return `<circle cx="${cx}" cy="${cy}" r="${r}" stroke-width="3" fill="${fill}" />`;
}
function text(x: number, y: number, content: string | number, fontSize?: number ): string {
    return `<text x="${x}" y="${y}" font-family="Arial" font-size="${fontSize ?? 20}" text-anchor="middle" dominant-baseline="middle" fill="black">${content}</text>`;
}

function drawStrings(c: Constraints): string {

    let parts: string[] = [];

    const y1 = c.originY;
    const y2 = y1 + c.fretCount * c.fretSpacing;

    for (let i = 0; i < c.stringCount; i++) {
        const x = c.originX + i * c.stringSpacing;

        parts.push(line(x, y1, x, y2));
    }

    return parts.join("");
}

function drawFrets(c: Constraints, baseFret: number): string {

    let parts: string[] = [];

    const x1 = c.originX;
    const x2 = x1 + (c.stringCount - 1) * c.stringSpacing;
    const originY = c.originY;
    
    const nutStrokeWidth = baseFret === 1 ? c.nutHeight : undefined;

    if (baseFret > 1) {
        parts.push(text(
            c.originX - c.stringSpacing,
            c.originY + c.fretSpacing / 2,
            baseFret
        ));
    }

    parts.push(line(x1, originY, x2, originY, nutStrokeWidth));

    for (let i = 1; i <= c.fretCount; i++ ) {
        const y = originY + i * c.fretSpacing;

        parts.push(line(x1, y, x2, y));
    }

    return parts.join("");
}

function drawDots(c: Constraints, diagram: Diagram): string {
    const parts = diagram.dots.map((dot: Dot) => {
        return circle(
            c.originX + dot.stringIndex * c.stringSpacing,
            c.originY + (dot.fret - 1) * c.fretSpacing + c.fretSpacing / 2,
            6,
            "black"
        );
    })
    return parts.join("");
}

function drawOpenStrings(c: Constraints, diagram: Diagram): string {
    const markerY = c.originY - 0.4 * c.fretSpacing;
    const parts = diagram.openStrings.map((stringIndex: number) => {
        return circle(
            c.originX + stringIndex * c.stringSpacing,
            markerY,
            5,
            "none"
        )
    })
    return parts.join("");
}

function drawMutedStrings(c: Constraints, diagram: Diagram): string {
    const markerY = c.originY - 0.4 * c.fretSpacing;
    const parts = diagram.mutedStrings.map((stringIndex: number) => {
        return text(
            c.originX + stringIndex * c.stringSpacing,
            markerY,
            "x"
        )
    })
    return parts.join("");
}

function drawChordName(c: Constraints, label: string): string {
    const centerX = c.originX + ((c.stringCount - 1) * c.stringSpacing) / 2;
    const y = c.originY - c.topOffset - 5;

    return text(centerX, y, label);
}

export {renderDiagram};