import type { Request, Response } from "express";

import { addTask, findTask, listTasks, removeTask, trimText, updateTask } from "../services/taskService.ts";
import type { TaskChanges } from "../types/task.ts";

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

export function getTaskById(req: Request, res: Response) {
    const raw = req.params.id;

    const id = typeof raw === 'string' ? raw : 'undefined';

    const task = findTask(id);

    if (task === undefined) {
        res.status(404).json({ message: 'Задача не знайдена' });

        return;
    }

    res.json(task);
}

export function updateTasks(req: Request, res: Response) {
    const raw = req.params.id;
    const id = typeof raw === 'string' ? raw : '';

    const changes: TaskChanges = {};

    if(typeof req.body?.completed === 'boolean') changes.completed = req.body.completed;

    if(typeof req.body?.text === 'string') {
        if(!trimText(req.body?.text)) {
            res.status(400).json({message:'Не має бути пустою'});

            return;
        }

        changes.text = trimText(req.body?.text);
    }

    const task = updateTask(id, changes);

    if(task === undefined) {
        res.status(404).json({message: 'Завдання не знайдено'});

        return;
    }

    res.status(200).json(task);
}

export function deleteTask(req: Request, res: Response) {
    const raw = req.params.id;
    const id = typeof raw === 'string' ? raw : '';

    const removed = removeTask(id);

    if(!removed) {
        res.status(404).json({message: 'Завдання не знайдено'})

        return;
    }

    res.status(204).send();
}
