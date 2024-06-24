import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { sequelize, AngleModel } from './models/AngleModel';

describe('AngleModel', (): void => {
  beforeAll(async (): Promise<void> => {
    await sequelize.sync({ force: true });
  });

  afterAll(async (): Promise<void> => {
    await sequelize.close();
  });

  it('should create a new angle record', async (): Promise<void> => {
    const angleRecord = await AngleModel.create({ hour: 3, minute: 0, angle: 90 });
    expect(angleRecord).toBeDefined();
    expect(angleRecord.hour).toBe(3);
    expect(angleRecord.minute).toBe(0);
    expect(angleRecord.angle).toBe(90);
  });

  it('should find an existing angle record', async (): Promise<void> => {
    const angleRecord = await AngleModel.findOne({ where: { hour: 3, minute: 0 } });
    expect(angleRecord).toBeDefined();
    if (angleRecord !== null) {
      expect(angleRecord.hour).toBe(3);
      expect(angleRecord.minute).toBe(0);
      expect(angleRecord.angle).toBe(90);
    }
  });
});
