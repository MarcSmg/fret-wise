import { Fretboard } from "../../../domain/geometry/Fretboard";
import { Shape } from "../../../domain/geometry/Shape";
import { Chord } from "../../../domain/harmony/Chord";
import { extractShapePitchClasses } from "./extractShapePitchClasses";

export function matchesChord(shape: Shape, chord: Chord, fretboard: Fretboard): boolean {
    
    // This function checks if the given shape has at least every note of a chord

    const shapePitchClasses = extractShapePitchClasses(shape, fretboard);
    
    const chordPitchClasses = chord.pitchClasses();

    const shapeSet = new Set(shapePitchClasses);

    return chordPitchClasses.every(pc => [...shapeSet].some(p => p.equals(pc)));
}