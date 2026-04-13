export const NOTE_MAP: Record<string, number> = {
  "C": 0,
  "C#": 1, "Db": 1,
  "D": 2,
  "D#": 3, "Eb": 3,
  "E": 4,
  "F": 5,
  "F#": 6, "Gb": 6,
  "G": 7,
  "G#": 8, "Ab": 8,
  "A": 9,
  "A#": 10, "Bb": 10,
  "B": 11,
} as const;

function isNote(value: string): value is Note {
  console.log(value)
  return value in NOTE_MAP;
}

export type Note = keyof typeof NOTE_MAP;
export {isNote};