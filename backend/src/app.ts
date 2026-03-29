import cookieParser from "cookie-parser";
import cors from "cors";
import type { Express } from "express";
import express from "express";
import helmet from "helmet";
import authRouter from "./modules/auth/auth.routes";
import edgeRouter from "./modules/edge/edge.routes";
import nodeRouter from "./modules/node/node.routes";
import questRouter from "./modules/quest/quest.routes";
import { config } from "./shared/config/env";
import { authGuard } from "./shared/middleware/authGuard";
import { errorHandler } from "./shared/middleware/errorHandler";
import { routeHandler } from "./shared/middleware/routeHandler";

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

app.use(errorHandler);

app.use(routeHandler);

export default app;
