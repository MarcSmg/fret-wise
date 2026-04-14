import { CAGED_PATTERNS } from "../patterns/caged";
import type { Fretboard } from "./Fretboard";

type Fret = number | null;

class Shape {
    // Represents a chord shape
    // Frets go from the lowest (0) to the highest string number

    public score: number = 0;

    private readonly frets: readonly Fret[];

    constructor(frets: readonly Fret[]) {
        this.frets = frets;
    }

    getFrets(): readonly Fret[] {
        // All frets
        return this.frets;
    }

    relativeFrets(): Fret[] {
        const base = this.baseFret();

        return this.frets.map(f => {
            if (f === null) return null;
            if (f === 0) return 0;
            return f - base;
        });
    }
    fretted(): number[] {
        // Fretted frets
        return this.frets.filter( (f): f is number => f != null && f > 0);
    }

    played(): number[] {
        return this.frets.filter( (f): f is number => f != null);
    }

    lowestFret(): number | null {
        // Lowest fretted value
        const fretted = this.fretted();
        return fretted.length ? Math.min(...fretted): null;
    }

    highestFret(): number | null {
        // Highest fretted value
        const fretted = this.fretted();
        return fretted.length ? Math.max(...fretted): null;
    }

    baseFret(): number {
        return this.lowestFret() ?? 1; // If there is no fretted fret (the chord is totally open), the base fret is 1
    }

    averageFret(): number {
        const fretted = this.fretted();
        if (!fretted.length) return 0;
        return fretted.reduce((a, b) => a + b, 0) / fretted.length;
    }

    openStringsCount(): number {
        return this.frets.filter(f => f === 0).length;
    }

    mutedStringsCount(): number {
        return this.frets.filter(f => f == null).length;
    }

    span(): number {
        // Distance between lowest and highest frets
        // Represents the width of the chord on the fretboard

        const lowest = this.lowestFret();
        const highest = this.highestFret();

        if (lowest == null || highest == null) return 0;

        return highest - lowest;
    }

    transpose(n: number): Shape {
        // Transpose a shape to a different starting fret

        const newShapeFrets = this.frets.map(f => f === null ? null : f + n);

        if (newShapeFrets.some(f => f !== null && f < 0)) {
            throw new Error("Shape cannot go below fret 0");
        }

        return new Shape(newShapeFrets);
    }

    cagedSimilarity(): number {
        const frets = this.relativeFrets();
        let bestScore = 0;

        for (const pattern of CAGED_PATTERNS) {
            const score = compare(frets, pattern.frets);
            bestScore = Math.max(bestScore, score);
        }

        return bestScore;
    }
}

function compare(frets: Fret[], pattern: Fret[]): number {
    let score = 0;

    for (let i = 0; i < frets.length; i++) {
        const f = frets[i];
        const p = pattern[i];

        if (f === p) {
            score += 1;
        } 
        else if (f != null && f > 0 && p != null && p > 0) {
            score += 0.5;
        } 
        else if ((f == null && p != null) || (f != null && p == null)) {
            score += 0.2;
        }
    }

    return score / frets.length;
}

function getBassPitchClass(
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

export {Shape};
export type {Fret};