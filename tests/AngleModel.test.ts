import { describe, it, expect, vi, beforeEach, type SpyInstance } from 'vitest';
import { AngleModel } from '../src/models/AngleModel';
import { Mock } from './mock';

describe('AngleModel', (): void => {
  let createSpy: SpyInstance;
  let findOneSpy: SpyInstance;

  beforeEach((): void => {
    vi.clearAllMocks();
    createSpy = vi.spyOn(AngleModel, 'create');
    findOneSpy = vi.spyOn(AngleModel, 'findOne');
  });

  it('should create a new angle record', async (): Promise<void> => {
    createSpy.mockResolvedValue(Mock);

    const angleRecord = await AngleModel.create({ hour: 3, minute: 0, angle: 90 });
    expect(angleRecord).toBeDefined();
    expect(angleRecord.hour).toBe(3);
    expect(angleRecord.minute).toBe(0);
    expect(angleRecord.angle).toBe(90);

    expect(createSpy).toHaveBeenCalled();
    expect(createSpy).toHaveReturnedWith(Mock);
  });

  it('should find an existing angle record', async (): Promise<void> => {
    findOneSpy.mockResolvedValue(Mock);

    const angleRecord = await AngleModel.findOne({ where: { hour: 3, minute: 0 } });
    expect(angleRecord).toBeDefined();
    if (angleRecord !== null) {
      expect(angleRecord.hour).toBe(3);
      expect(angleRecord.minute).toBe(0);
      expect(angleRecord.angle).toBe(90);
    }

    expect(findOneSpy).toHaveBeenCalled();
    expect(findOneSpy).toHaveReturnedWith(Mock);
  });
});
