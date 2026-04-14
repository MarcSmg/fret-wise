import { Shape } from "../../../domain/geometry/Shape";

// TODO: Detect chords that contain two partial or full barres (2 or more notes per fret on two separate frets) that are too far apart from one another (gap >= 3)

export function hasBarreConflict(shape: Shape): boolean {
    const frets = shape.getFrets();

    const counts = new Map<number, number>();

    frets.forEach(f => {
        if (f != null && f > 0) {
            counts.set(f, (counts.get(f) ?? 0) + 1);
        }
    });

    for (const [fret, count] of counts.entries()) {

        let hasLower = false;
        let hasHigher = false;

        for (const f of frets) {
            if (f == null || f === fret) continue;

            if (f < fret) hasLower = true;
            if (f > fret) hasHigher = true;
        }

        if (count >= 2 && hasLower && hasHigher) {
            return true;
        }

        if (count >= 4 && hasLower) {
            return true;
        }
    }

    return false;
}

export function fingerSpread(shape: Shape): number {
    const frets = shape.getFrets();

    let spread = 0;

    for (let i = 1; i < frets.length; i++) {
        const a = frets[i - 1];
        const b = frets[i];

        if (a != null && b != null) {
            spread += Math.abs(a - b);
        }
    }

    return spread;
}

export function hasIsolatedNote(shape: Shape): boolean {
    const fretted = shape.fretted();

    if (fretted.length < 2) return false;

    const avg = fretted.reduce((a, b) => a + b, 0) / fretted.length;

    return fretted.some(f => Math.abs(f - avg) > 2);
}

export function barrePotential(shape: Shape): number {
    const counts = new Map<number, number>();

    for (const f of shape.fretted()) {
        counts.set(f, (counts.get(f) ?? 0) + 1);
    }

    return Math.max(...counts.values());
}