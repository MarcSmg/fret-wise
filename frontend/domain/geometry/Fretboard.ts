import { createInterval } from "../harmony/Interval";
import { PitchClass } from "../harmony/PitchClass";

class Fretboard {
    // Converts (string, fret) to notes (pitch classes)
    constructor(
        readonly tuning: PitchClass[],
        readonly fretCount: number
    ) {}

    get stringCount() {
        return this.tuning.length;
    }

    pitchAt(stringIndex: number, fret: number) {
        // Get the pitchClass at a specific position on the fretboard

        if (stringIndex < 0 || stringIndex >= this.tuning.length)
            throw new Error("Invalid string index");

        if (fret < 0 || fret > this.fretCount)
            throw new Error("Invalid fret");

        const openStringPitch = this.tuning[stringIndex];
        return openStringPitch.transpose(createInterval(fret));
    }
}

export {Fretboard};