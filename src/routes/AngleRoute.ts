// src/routes/AngleRoute.ts
import { Router } from 'express';
import { AngleController } from "../controllers/AngleController";

const router: Router = Router();
const angleController = new AngleController();

router.get('/', (req, res) => res.send("I'm working"));
router.get('/calculate-angle/:hour/:minute', angleController.getAngle.bind(angleController));

export { router as routes };
