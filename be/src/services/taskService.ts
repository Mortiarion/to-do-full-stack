import type { Task } from "../types/task.ts";

const tasks: Task[] = [];

export function listTasks(): Task[] {
    return tasks;
}

export function addTask(text: string): Task | null {
    const trimmed = text.trim();

    if(!trimmed) return null;

    const task: Task = {
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false
    };

    tasks.push(task);

    return task;
}

export function findTask(id: string): Task | undefined{
    return tasks.find((task) => task.id === id);
}
