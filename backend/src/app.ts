import cookieParser from "cookie-parser";
import cors from "cors";
import type { Express } from "express";
import express from "express";
import helmet from "helmet";
import authRouter from "./modules/auth/auth.routes.js";
import edgeRouter from "./modules/edge/edge.routes.js";
import nodeRouter from "./modules/node/node.routes.js";
import questRouter from "./modules/quest/quest.routes.js";
import { config } from "./shared/config/env.js";
import { authGuard } from "./shared/middleware/authGuard.js";
import { errorHandler } from "./shared/middleware/errorHandler.js";
import { routeHandler } from "./shared/middleware/routeHandler.js";

const app: Express = express();

app.use(
  cors({
    origin: config.corsOrigin,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(helmet());

app.use(express.json());

app.use(cookieParser());

app.set("etag", false);

app.use("/auth", authRouter);

app.use("/quests", authGuard, questRouter);

app.use("/", authGuard, nodeRouter);

app.use("/", authGuard, edgeRouter);

app.use(routeHandler);

app.use(errorHandler);

export default app;
