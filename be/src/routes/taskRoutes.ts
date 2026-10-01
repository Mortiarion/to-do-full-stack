import { Router } from "express";

import { createTask, getTasks, getTaskById } from "../controllers/taskController.ts";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.get("/:id", getTaskById);

export default router;
