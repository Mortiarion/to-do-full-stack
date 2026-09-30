import type { Request, Response } from "express";

import { addTask, listTasks } from "../services/taskService.ts";

export function getTasks(req: Request, res: Response) {
    res.json(listTasks());
}

export function createTask(req: Request, res: Response) {
    const text = req.body?.text;

    if(typeof text !== 'string') {
        res.status(400).json({ message: 'Вводьте тільки текст' });

        return;
    }

    const task = addTask(text);

    if(task === null) {
        res.status(400).json({ message: 'Це поле не може бути пустим' });

        return;
    }

    res.status(201).json(task);
}
