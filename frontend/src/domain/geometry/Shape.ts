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

    fretted(): number[] {
        // Fretted frets
        return this.frets.filter( (f): f is number => f != null && f > 0);
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

    averageFret(): number {
        const lowest = this.lowestFret();
        const highest = this.highestFret();

        if (lowest == null || highest == null) return 0;

        return (highest - lowest) / 2
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
}

export {Shape};
export type {Fret};