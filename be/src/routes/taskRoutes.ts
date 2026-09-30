import { Router } from "express";

import { createTask, getTasks } from "../controllers/taskController.ts";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);

export default router;
