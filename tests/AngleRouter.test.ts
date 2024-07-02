import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { AngleModel } from '../src/models/AngleModel';

describe('AngleRouter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return "I\'m working" on the root route', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe("I'm working");
  });

  it('should return the correct angle for /calculate-angle/:hour/:minute', async () => {
    const mockAngleRecord = AngleModel.build({ hour: 3, minute: 0, angle: 90 });
    const findOneSpy = vi.spyOn(AngleModel, 'findOne').mockResolvedValue(mockAngleRecord);

    const res = await request(app).get('/calculate-angle/3/0');
    expect(res.status).toBe(200);
    expect(res.body.angle).toBe(90);

    expect(findOneSpy).toHaveBeenCalled();
    expect(findOneSpy).toHaveReturnedWith(mockAngleRecord);
  });
});
