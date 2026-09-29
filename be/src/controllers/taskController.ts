import type { Request, Response } from "express";

import { listTasks } from "../services/taskService.ts";

export function getTasks(req: Request, res: Response) {
    res.json(listTasks());
}
