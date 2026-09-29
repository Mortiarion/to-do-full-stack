import { Router } from "express";

import { getTasks } from "../controllers/taskController.ts";

const router = Router();

router.get('/', getTasks);

export default router;
