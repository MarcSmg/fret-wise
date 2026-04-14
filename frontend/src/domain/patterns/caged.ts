import type { Fret } from "../geometry/Shape"

type CagedPattern = {
    name: "C" | "A" | "G" | "E" | "D",
    frets: (Fret | null)[]
}

const CAGED_PATTERNS: CagedPattern[] = [
  { name: "C", frets: [null, 3, 2, 0, 1, 0] },
  { name: "A", frets: [null, 0, 2, 2, 2, 0] },
  { name: "G", frets: [3, 2, 0, 0, 0, 3] },
  { name: "E", frets: [0, 2, 2, 1, 0, 0] },
  { name: "D", frets: [null, null, 0, 2, 3, 2] },
];

export type {CagedPattern};
export {CAGED_PATTERNS};