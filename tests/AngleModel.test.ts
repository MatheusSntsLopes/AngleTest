import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AngleModel } from '../src/models/AngleModel';

describe('AngleModel', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
  });

  it('should create a new angle record', async (): Promise<void> => {
    const mockAngleRecord = AngleModel.build({ hour: 3, minute: 0, angle: 90 });
    const createSpy = vi.spyOn(AngleModel, 'create').mockResolvedValue(mockAngleRecord);

    const angleRecord = await AngleModel.create({ hour: 3, minute: 0, angle: 90 });
    expect(angleRecord).toBeDefined();
    expect(angleRecord.hour).toBe(3);
    expect(angleRecord.minute).toBe(0);
    expect(angleRecord.angle).toBe(90);

    expect(createSpy).toHaveBeenCalled();
    expect(createSpy).toHaveReturnedWith(mockAngleRecord);
  });

  it('should find an existing angle record', async (): Promise<void> => {
    const mockAngleRecord = AngleModel.build({ hour: 3, minute: 0, angle: 90 });
    const findOneSpy = vi.spyOn(AngleModel, 'findOne').mockResolvedValue(mockAngleRecord);

    const angleRecord = await AngleModel.findOne({ where: { hour: 3, minute: 0 } });
    expect(angleRecord).toBeDefined();
    if (angleRecord !== null) {
      expect(angleRecord.hour).toBe(3);
      expect(angleRecord.minute).toBe(0);
      expect(angleRecord.angle).toBe(90);
    }

    expect(findOneSpy).toHaveBeenCalled();
    expect(findOneSpy).toHaveReturnedWith(mockAngleRecord);
  });
});
