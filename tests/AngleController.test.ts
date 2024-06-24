import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { sequelize } from '@/models/AngleModel';

describe('AngleController', (): void => {
  beforeAll(async (): Promise<void> => {
    await sequelize.sync({ force: true });
  });

  afterAll(async (): Promise<void> => {
    await sequelize.close();
  });

  it('should return the correct angle for a given time', async (): Promise<void> => {
    const res = await request(app).get('/calculate-angle/3/0');
    expect(res.status).toBe(200);
    expect(res.body.angle).toBe(90);
  });

  it('should return a cached angle if it exists', async (): Promise<void> => {
    const res = await request(app).get('/calculate-angle/3/0');
    expect(res.status).toBe(200);
    expect(res.body.angle).toBe(90);
  });

  it('should return an error for invalid time', async (): Promise<void> => {
    const res = await request(app).get('/calculate-angle/13/0');
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid time');
  });
});
