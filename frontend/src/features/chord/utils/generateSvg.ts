import { shapeToDiagram } from "../../../application/diagram/shapeToDiagram";
import { parseChordSymbol } from "../../../application/notation/parseChordSymbol";
import { findChordShapes } from "../../../application/solver/generation/findChordShapes";
import type { Fretboard } from "../../../domain/geometry/Fretboard";
import { renderDiagram } from "../../../rendering/renderDiagram";

function generateSvg(input: string, fretboard: Fretboard): string[] {
    const {value: chord,} = parseChordSymbol(input);

    const shapes = findChordShapes(chord, fretboard);

    const diagrams = shapes.map(shape => {
      const diagram = shapeToDiagram(shape);
      return renderDiagram(diagram, input);
    });

    return diagrams;
}

export default generateSvg;