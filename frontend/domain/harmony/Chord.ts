import { Interval } from "./Interval";
import { PitchClass } from "./PitchClass";

class Chord {
    private constructor(
        public readonly root: PitchClass,
        public readonly intervals: readonly Interval[],
    ) {}

    static create(
        root: PitchClass,
        intervals: Interval[]
    ) {
       return new Chord(
        root,
        intervals
       ) 
    }

    pitchClasses(): PitchClass[] {
        const pcs = [this.root];
        this.intervals.forEach(i => pcs.push(this.root.transpose(i)))
        return pcs;
    }

    contains(pc: PitchClass): boolean {
        return this.pitchClasses().includes(pc);
    }
}

export {Chord};