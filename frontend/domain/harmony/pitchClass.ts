type PitchClass = number & {readonly __pitchClass: unique symbol}; //0-11

// PicthClasses must be created only with this function
function createPitchClass(n: number): PitchClass {
    // Normalizes a given number n to a number between 0 and 11
    return ((n % 12) + 12) % 12 as PitchClass;
}

export type {PitchClass};
export {createPitchClass};