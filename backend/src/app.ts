import cors from "cors";
import type { Express } from "express";
import express from "express";
import helmet from "helmet";
import authRouter from "./modules/auth/auth.routes";
import { config } from "./shared/config/env";
import { errorHandler } from "./shared/middleware/errorHandler";
import { routeHandler } from "./shared/middleware/routeHandler";

const app: Express = express();

app.use(
  cors({
    origin: config.corsOrigin,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(helmet());

app.use(express.json());

app.use(errorHandler);

app.use("/auth", authRouter);

app.use(routeHandler);

export default app;
