import { Fretboard } from "../../../domain/geometry/Fretboard";
import { Shape } from "../../../domain/geometry/Shape";
import { Chord } from "../../../domain/harmony/Chord";
import { extractShapePitchClasses } from "./extractShapePitchClasses";

export function matchesChord(shape: Shape, chord: Chord, fretboard: Fretboard): boolean {
    
    // This function checks if the given shape has at least every note of a chord

    const chordPitchClasses = chord.pitchClasses(); 

    const shapePitchClasses = extractShapePitchClasses(shape, fretboard);

    return chordPitchClasses.every(pc =>
    shapePitchClasses.some(p => p.equals(pc))
);
}