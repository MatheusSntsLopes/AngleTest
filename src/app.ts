// src/app.ts
import express, { json, urlencoded } from "express";
import cors from "cors";
import { routes } from "./routes/AngleRoute";

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

export { app };
