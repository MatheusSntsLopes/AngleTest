import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { AngleModel } from '../src/models/AngleModel';

describe('AngleController', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return the correct angle for a given time', async () => {
    const mockAngleRecord = AngleModel.build({ hour: 3, minute: 0, angle: 90 });
    const findOneSpy = vi.spyOn(AngleModel, 'findOne').mockResolvedValue(null);
    const createSpy = vi.spyOn(AngleModel, 'create').mockResolvedValue(mockAngleRecord);

    const res = await request(app).get('/calculate-angle/3/0');
    expect(res.status).toBe(200);
    expect(res.body.angle).toBe(90);

    expect(findOneSpy).toHaveBeenCalled();
    expect(createSpy).toHaveBeenCalled();
  });

  it('should return a cached angle if it exists', async () => {
    const mockAngleRecord = AngleModel.build({ hour: 3, minute: 0, angle: 90 });
    const findOneSpy = vi.spyOn(AngleModel, 'findOne').mockResolvedValue(mockAngleRecord);

    const res = await request(app).get('/calculate-angle/3/0');
    expect(res.status).toBe(200);
    expect(res.body.angle).toBe(90);

    expect(findOneSpy).toHaveBeenCalled();
    expect(findOneSpy).toHaveReturnedWith(mockAngleRecord);
  });

  it('should return an error for invalid time', async () => {
    const res = await request(app).get('/calculate-angle/13/0');
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid time');
  });
});
