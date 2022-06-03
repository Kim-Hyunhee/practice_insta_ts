import express from "express";
import cors from "cors";
import logger from "morgan";

import indexRouter from "./routers/index";
import { swaggerUi, specs } from "./swagger/index";

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/", indexRouter);

export default app;
