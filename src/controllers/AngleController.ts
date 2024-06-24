// src/controllers/AngleController.ts'
import { type Request, type Response } from "express";
import { AngleModel } from "../models/AngleModel";
import { calculateAngle } from "../angleCalculator";

export class AngleController {
  public async getAngle(req: Request, res: Response): Promise<void> {
    const { hour, minute } = req.params;

    const hourInt: number = parseInt(hour, 10);
    const minuteInt: number = parseInt(minute, 10);

    if (isNaN(hourInt) || isNaN(minuteInt) || hourInt < 0 || hourInt > 12 || minuteInt < 0 || minuteInt > 59) {
      res.status(400).json({ error: 'Invalid time' });
      return;
    }

    try {
      const existingRequest = await AngleModel.findOne({
        where: { hour: hourInt, minute: minuteInt }
      });

      if (existingRequest !== null) {
        res.json({ angle: existingRequest.angle });
        return;
      }

      const angle: number = calculateAngle(hourInt, minuteInt);

      await AngleModel.create({
        hour: hourInt,
        minute: minuteInt,
        angle
      });

      res.json({ angle });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
