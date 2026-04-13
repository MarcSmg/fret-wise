import { createInterval } from "../../domain/harmony/Interval";
import { Chord } from "../../domain/harmony/Chord";
import { isQualityAlias, QUALITY_ALIASES, QUALITY_PATTERNS } from "./chordQualities";
import { isNote, NOTE_MAP } from "./notemap";
import { PitchClass } from "../../domain/harmony/PitchClass";

function parseChordSymbol(raw: string) {

    const match = raw.match(/^([A-Ga-g](?:#|b)?)(.*)$/); // returns the root note and the rest

    if (!match) {
        throw new Error(`Invalid chord symbol: ${raw}`);
    }

    const [, rootToken, qualityToken] = match;

    if (!isNote(rootToken.toUpperCase())) {
        throw new Error(`Unknown root: ${rootToken}`);
    }
    
    const rootSemitone = NOTE_MAP[rootToken.toUpperCase()];

    if (!isQualityAlias(qualityToken)) {
        throw new Error(`Unknown chord quality: ${qualityToken}`);
    }

    const canonical = QUALITY_ALIASES[qualityToken];
    const semitones = QUALITY_PATTERNS[canonical];

    return {
        value: Chord.create(
            PitchClass.create(rootSemitone),
            semitones.map(createInterval)
        ),
        symbol: raw
    };
}

export {parseChordSymbol};