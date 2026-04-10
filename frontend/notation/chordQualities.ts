const QUALITY_PATTERNS = {
    major:      [0,4,7],
    minor:      [0,3,7],
    major7:     [0, 4, 7, 11],
    minor7:     [0,3,7,10],
    dominant7:  [0, 4, 7, 10],
    diminished: [0, 3, 6],
    augmented:  [0, 4, 8],
} as const;

const QUALITY_ALIASES = {
    "":      "major",
    "maj":   "major",
    "m":     "minor",
    "min":   "minor",
    "7":     "dominant7",
    "maj7":  "major7",
    "m7":    "minor7",
    "dim":   "diminished",
    "°":     "diminished",
    "aug":   "augmented"
} as const;

function isQualityAlias(value: string): value is QualityAlias {
    return value in QUALITY_ALIASES;
}

export type QualityAlias = keyof typeof QUALITY_ALIASES;
export {QUALITY_ALIASES, QUALITY_PATTERNS, isQualityAlias}