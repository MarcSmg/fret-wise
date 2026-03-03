import { createPitchClass, PitchClass } from "./pitchClass";

type Interval = number & {readonly __interval: unique symbol}; // semitones 0–11

interface CanonicalChord {
    rootPitchClass: PitchClass,
    intervals: Interval[]
}

function createInterval(n: number): Interval {
    // Normalizes a given number n to a number between 0 and 11
    return ((n % 12) + 12) % 12 as Interval;
}

function createCanonicalChord(
    root: number,
    intervals: number[]
): CanonicalChord {
    return {
        rootPitchClass: createPitchClass(root),
        intervals: intervals.map(createInterval)
    } as CanonicalChord
}

export type {CanonicalChord, Interval};
export {createCanonicalChord, createInterval}