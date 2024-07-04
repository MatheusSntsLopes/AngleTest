import { describe, it, expect, vi, beforeEach, type SpyInstance, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { AngleModel } from '../src/models/AngleModel';
import { Mock } from './mock';

describe('AngleController', () => {
  let findOneSpy: SpyInstance;
  let createSpy: SpyInstance;

  beforeAll(() => {
    findOneSpy = vi.spyOn(AngleModel, 'findOne');
    createSpy = vi.spyOn(AngleModel, 'create');
  });

  beforeEach(() => {
    vi.clearAllMocks();
    findOneSpy.mockResolvedValue(null);
  });

  it('should return the correct angle for a given time', async () => {
    createSpy.mockResolvedValueOnce(Mock);

    const res = await request(app).get('/calculate-angle/3/0');
    expect(res.status).toBe(200);
    expect(res.body.angle).toBe(90);

    expect(findOneSpy).toHaveBeenCalled();
    expect(createSpy).toHaveBeenCalled();
  });

  it('should return a cached angle if it exists', async () => {
    findOneSpy.mockResolvedValueOnce(Mock);

    const res = await request(app).get('/calculate-angle/3/0');
    expect(res.status).toBe(200);
    expect(res.body.angle).toBe(90);

    expect(findOneSpy).toHaveBeenCalled();
    expect(findOneSpy).toHaveReturnedWith(Mock);
  });

  it('should return an error for invalid time', async () => {
    const res = await request(app).get('/calculate-angle/13/0');
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid time');
  });
});
