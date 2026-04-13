import type { Interval } from "./Interval";
import { PitchClass } from "./PitchClass";

class Chord {

    public readonly root: PitchClass;
    public readonly intervals: readonly Interval[]

    private constructor(
        root: PitchClass,
        intervals: readonly Interval[],
    ) {
        this.root = root;
        this.intervals = intervals;
    }

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
        return this.pitchClasses().some((p: PitchClass) => p.equals(pc));
    }
}

export {Chord};