import type {Shape} from "../../../domain/geometry/Shape"
import type { Fretboard } from "../../../domain/geometry/Fretboard";
import type { PitchClass } from "../../../domain/harmony/PitchClass";

export function extractShapePitchClasses(
    shape: Shape,
    fretboard: Fretboard
): PitchClass[] {

    // Extracts the pitchClasses from a given shape and returns them in an array

    if (shape.getFrets().length !== fretboard.tuning.length) {
        throw new Error("Shape and fretboard string count mismatch");
    }

    const pcs = new Set<PitchClass>();
    
    for (const [stringIndex, fret] of shape.getFrets().entries()) {
        if (fret !== null) {
            pcs.add(
                fretboard.pitchAt(stringIndex, fret)
            );
        }
    }

    return [...pcs];
}