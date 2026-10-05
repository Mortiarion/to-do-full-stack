import { Router } from "express";

import { createTask, getTasks, getTaskById, updateTasks, deleteTask } from "../controllers/taskController.ts";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.get("/:id", getTaskById);
router.patch('/:id', updateTasks);
router.delete('/:id', deleteTask);

export default router;
