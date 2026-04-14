import { Shape } from "../../../domain/geometry/Shape";
import { Fretboard } from "../../../domain/geometry/Fretboard";
import { Chord } from "../../../domain/harmony/Chord";

export function getBassPitchClass(
    shape: Shape,
    fretboard: Fretboard
) {
    const frets = shape.getFrets();

    for (let i = 0; i < frets.length; i++) {
        const fret = frets[i];

        if (fret != null) {
            return fretboard.pitchAt(i, fret);
        }
    }

    return null;
}

export function hasRootInBass(
    shape: Shape,
    chord: Chord,
    fretboard: Fretboard
): boolean {
    const bass = getBassPitchClass(shape, fretboard);
    return bass ? bass.equals(chord.root) : false;
}