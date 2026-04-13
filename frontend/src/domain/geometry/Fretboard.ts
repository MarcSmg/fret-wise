import { createInterval } from "../harmony/Interval";
import { PitchClass } from "../harmony/PitchClass";

class Fretboard {
    // Converts (string, fret) to notes (pitch classes)
    
    readonly tuning: PitchClass[];
    readonly fretCount: number;

    constructor(
        fretCount: number,
        tuning?: PitchClass[]
    ) {
        this.tuning = tuning ?? createTuning([4,9,2,7,11,4]);
        this.fretCount = fretCount;
    }

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

function createTuning(arr: number[]): PitchClass[] {
    return arr.map(PitchClass.create);
}

export {Fretboard};