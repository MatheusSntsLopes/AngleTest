import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '@/app';

describe('AngleRouter', () => {
  it('should return "I\'m working" on the root route', async (): Promise<void> => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe("I'm working");
  });

  it('should return the correct angle for /calculate-angle/:hour/:minute', async (): Promise<void> => {
    const res = await request(app).get('/calculate-angle/3/0');
    expect(res.status).toBe(200);
    expect(res.body.angle).toBe(90);
  });
});
