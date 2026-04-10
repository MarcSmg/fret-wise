import { Fretboard } from "../../domain/geometry/Fretboard";
import { Chord } from "../../domain/harmony/Chord";
import { generateShapes } from "./generateShapes";
import { matchesChord } from "../analysis/matchesChord";
import { scoreShapes } from "../analysis/scoreShapes";
import { filterShapes } from "../analysis/filterShapes";
import { Shape } from "../../domain/geometry/Shape";

export function findChordShapes(chord: Chord, fretboard: Fretboard) {
    
    // This function is the processing unit of the chord shape generation
    // It Generates shapes, selects those that match the chord, filters, scores and sorts them

    const candidates: Shape[] = generateShapes(chord, fretboard); // generates all theoretically valid chord shapes

    const validShapes: Shape[] = candidates.filter(s => matchesChord(s, chord, fretboard));

    const filtered: Shape[] = filterShapes(validShapes, chord, fretboard);

    const scored: Shape[] = scoreShapes(filtered);

    scored.sort((a,b) => b.score - a.score);
    
    return scored.slice(0, 20);
}