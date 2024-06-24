import { describe, it, expect } from 'vitest';
import { calculateAngle } from "./angleCalculator";

describe('calculateAngle', (): void => {
  it('should calculate the correct angle at 3:00', (): void => {
    expect(calculateAngle(3, 0)).toBe(90);
  });

  it('should calculate the correct angle at 6:00', (): void => {
    expect(calculateAngle(6, 0)).toBe(180);
  });

  it('should calculate the correct angle at 9:00', (): void => {
    expect(calculateAngle(9, 0)).toBe(90);
  });

  it('should calculate the correct angle at 12:30', (): void => {
    expect(calculateAngle(12, 30)).toBe(165);
  });

  it('should throw an error for invalid time', (): void => {
    expect((): number => calculateAngle(-1, 0)).toThrow('Invalid time');
    expect((): number => calculateAngle(13, 0)).toThrow('Invalid time');
    expect((): number => calculateAngle(0, 60)).toThrow('Invalid time');
  });
});
