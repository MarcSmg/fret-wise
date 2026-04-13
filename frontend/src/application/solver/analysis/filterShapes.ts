import { Fretboard } from "../../../domain/geometry/Fretboard";
import { Shape } from "../../../domain/geometry/Shape";
import { Chord } from "../../../domain/harmony/Chord";
import { extractShapePitchClasses } from "./extractShapePitchClasses";

export function filterShapes(
    shapes: Shape[],
    chord: Chord,
    fretboard: Fretboard
): Shape[] {

    const filteredShapes: Shape[] = [];

    for (const shape of shapes) {
        const containsRoot = extractShapePitchClasses(shape, fretboard).some(p => p.equals(chord.root));
        
        if (containsRoot) {
            filteredShapes.push(shape)
        }
    }

    return filteredShapes;
}