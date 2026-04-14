import { Fretboard } from "../../../domain/geometry/Fretboard";
import { Shape } from "../../../domain/geometry/Shape";
import { Chord } from "../../../domain/harmony/Chord";
import { extractShapePitchClasses } from "./extractShapePitchClasses";
import { hasBarreConflict } from "./playability";

export function filterShapes(
    shapes: Shape[],
    chord: Chord,
    fretboard: Fretboard
): Shape[] {

    const filtered: Shape[] = [];

    for (const shape of shapes) {

        const pitchClasses = extractShapePitchClasses(shape, fretboard);

        const containsRoot = pitchClasses.some(p => p.equals(chord.root));

        if (!containsRoot) continue;

        if (shape.span() > 4) continue;

        if (shape.baseFret() > 12) continue;

        if (shape.mutedStringsCount() > 3) continue;

        if (!isClustered(shape)) continue;

        if (hasLargeJumps(shape)) continue;

        if (density(shape) < 0.5) continue;

        if (hasBarreConflict(shape)) continue;

        filtered.push(shape);
    }

    return filtered;
}

function isClustered(shape: Shape): boolean {
    const fretted = shape.fretted();

    if (fretted.length === 0) return true;

    const min = Math.min(...fretted);
    const max = Math.max(...fretted);

    return (max - min) <= 3; // allow up to 3 frets span
}

function hasLargeJumps(shape: Shape): boolean {
    const frets = shape.getFrets();

    for (let i = 1; i < frets.length; i++) {
        const a = frets[i - 1];
        const b = frets[i];

        if (a != null && b != null) {
            if (Math.abs(a - b) > 3) return true;
        }
    }

    return false;
}

function density(shape: Shape): number {
    const fretted = shape.fretted();
    if (fretted.length === 0) return 0;

    const span = shape.span();
    return fretted.length / (span + 1);
}