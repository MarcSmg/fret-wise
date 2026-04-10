import { Interval } from "./Interval";

class PitchClass {
    private constructor(private readonly value: number) {}

    static create(n: number): PitchClass {
        return new PitchClass(((n % 12) + 12) % 12);
    }

    transpose(semitones: Interval): PitchClass {
        return PitchClass.create(this.value + semitones);
    }

    equals(other: PitchClass): boolean {
        return this.value === other.value;
    }
    
    toNumber(): number {
        return this.value;
    }
}

export {PitchClass};