type Interval = number & {readonly __interval: unique symbol}; // semitones 0–11

function createInterval(n: number): Interval {
    // Normalizes a given number n to a number between 0 and 11
    return ((n % 12) + 12) % 12 as Interval;
}
export type {Interval};
export {createInterval}