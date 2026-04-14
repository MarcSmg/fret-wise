const QUALITY_PATTERNS = {
    major:      [0, 4, 7],
    minor:      [0, 3, 7],
    major7:     [0, 4, 7, 11],
    minor7:     [0, 3, 7, 10],
    dominant7:  [0, 4, 7, 10],
    diminished: [0, 3, 6],
    augmented:  [0, 4, 8],

    maj9:       [0, 4, 7, 11, 2],
    m9:         [0, 3, 7, 10, 2],
    m7b5:       [0, 3, 6, 10],
    dim7:       [0, 3, 6, 9],
    add9:       [0, 4, 7, 2],
    minadd9:    [0, 3, 7, 2],
    maj7sharp11:[0, 4, 7, 11, 6], // #11 = +6 semitones
    maj11:      [0, 4, 7, 11, 5],
    min11:      [0, 3, 7, 10, 5],
} as const;

const QUALITY_ALIASES = {
    "":        "major",
    "maj":     "major",
    "m":       "minor",
    "min":     "minor",

    "7":       "dominant7",
    "maj7":    "major7",
    "M7":      "major7",
    "m7":      "minor7",
    "min7":    "minor7",

    "dim":     "diminished",
    "°":       "diminished",
    "aug":     "augmented",

    "maj9":    "maj9",
    "M9":      "maj9",

    "m9":      "m9",
    "min9":    "m9",

    "m7b5":    "m7b5",
    "ø":       "m7b5",

    "dim7":    "dim7",
    "°7":      "dim7",

    "add9":    "add9",
    "minadd9": "minadd9",
    "madd9":   "minadd9",

    "maj7#11": "maj7sharp11",
    "M7#11":   "maj7sharp11",

    "maj11":   "maj11",
    "M11":     "maj11",

    "m11":     "min11",
    "min11":   "min11",
} as const;

function isQualityAlias(value: string): value is QualityAlias {
    return value in QUALITY_ALIASES;
}

export type QualityAlias = keyof typeof QUALITY_ALIASES;
export {QUALITY_ALIASES, QUALITY_PATTERNS, isQualityAlias}