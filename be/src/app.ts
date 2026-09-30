import express, { type Express} from "express";

import { logger } from "./middleware/logger.ts";
import { notFound } from "./middleware/notFound.ts";
import taskRoutes from './routes/taskRoutes.ts';
import { errorHandler } from "./middleware/errorHandler.ts";

export const app: Express = express();

app.use(logger);
app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.use(notFound);
app.use(errorHandler);
