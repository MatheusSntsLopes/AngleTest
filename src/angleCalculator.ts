// src/angleCalculator.ts
export function calculateAngle(hour: number, minute: number): number {
  if (hour < 0 || hour > 12 || minute < 0 || minute > 59) {
    throw new Error("Invalid time");
  }

  if (hour === 12) hour = 0;

  const hourAngle = (hour * 30) + (minute * 0.5);
  const minuteAngle = minute * 6;

  let angle = Math.abs(hourAngle - minuteAngle);
  if (angle > 180) {
    angle = 360 - angle;
  }

  return angle;
}
