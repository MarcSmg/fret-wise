import { Fretboard } from "../../domain/geometry/Fretboard";
import { Fret, Shape } from "../../domain/geometry/Shape";
import { Chord } from "../../domain/harmony/Chord";

type Constraints = {
    maxSpan: number,
    minNotes: number,
    maxStrings: number
}

export function generateShapes(
    chord: Chord, 
    fretboard: Fretboard
): Shape[] {

    // This function generates every possible shapes that respect the base contraints of chord structure and the fretboard

    const constraints: Constraints = {
        maxSpan: 4,
        minNotes: 3,
        maxStrings: 6
    }

    const maxFret = fretboard.fretCount;
    
    const options: Fret[][] = [];

    // Look on every string and select frets where the pitchClass is contained in the chord 
    for (let i=0; i < fretboard.stringCount; i++) {
        
        const validFrets: Fret[] = [null];

        for (let j=0; j < fretboard.fretCount; j++) {
            const pc = fretboard.pitchAt(i, j);
            
            if (chord.contains(pc)) validFrets.push(j);
        }
        options.push(validFrets);
    }

    const candidateShapes: Shape[] = [];

    explore(0, [], options, candidateShapes, constraints);

    return candidateShapes;
}

function explore(
    stringIndex: number, 
    currentShape: Fret[], 
    options: Fret[][], 
    results: Shape[],
    constraints: Constraints
) {
    if (stringIndex == options.length) {

        const newShape = new Shape([...currentShape]);

        const isInvalidShape: boolean = 
        (newShape.span() > constraints.maxSpan) || 
        (newShape.fretted().length < constraints.minNotes)||
        (newShape.fretted().length >= constraints.maxStrings);

        if (!isInvalidShape) {
            results.push(newShape);
        }
        return;
    }

    for (const fret of options[stringIndex]) {
        currentShape.push(fret);

        const partialShape = new Shape([...currentShape])
        const remainingStrings = options.length - (stringIndex - 1);
        const maxPossibleNotes = partialShape.fretted().length + remainingStrings;

        const spanTooLarge = partialShape.span() > constraints.maxSpan;
        const cannotReachMinNotes = maxPossibleNotes < constraints.minNotes;

        if (!spanTooLarge && !cannotReachMinNotes ) {
            explore(stringIndex + 1, currentShape, options, results, constraints);
        }

        currentShape.pop();
    }
}