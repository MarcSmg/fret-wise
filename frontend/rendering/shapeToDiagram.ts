import { Fret, Shape } from "../domain/geometry/Shape"

type Dot = {
    stringIndex: number,
    fret: number
}

type Diagram = {
    stringCount: number,
    baseFret: number,
    dots: Dot[],
    openStrings: number[],
    mutedStrings: number[]
}

function shapeToDiagram(shape: Shape): Diagram {
    const baseFret = shape.lowestFret() ?? 1; // If there is no fretted fret (the chord is totally open), the base fret is 1

    let frets = [...shape.getFrets()];

    const stringCount = frets.length;

    if (baseFret !== 1){
        frets = frets.map(f => {
            if (f != null && f != 0) return f - baseFret;
            else return f;
        }); // makes fret numbers relative to the base fret 
    }

    const dots: Dot[] = [];
    const openStrings: number[] = [];
    const mutedStrings: number[] = [];

    for (const [stringIndex, fret] of frets.entries()) {

        if (fret == null) {
            mutedStrings.push(stringIndex);

        } else if (fret === 0) {
           openStrings.push(stringIndex); 

        } else {
            dots.push({
                stringIndex,
                fret
            });

        }
        
    }

    return {
        stringCount,
        baseFret,
        dots,
        openStrings,
        mutedStrings
    };
}

export type {Diagram};
export {shapeToDiagram};