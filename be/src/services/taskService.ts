import type { Task, TaskChanges } from "../types/task.ts";

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

export function updateTask(id: string, changes: TaskChanges): Task | undefined {
    const task = findTask(id);

    if(!task) return undefined;

    Object.assign(task, changes);

    return task;
}

export function removeTask(id: string): boolean {
    const index = tasks.findIndex((task) => task.id === id);

    if(index < 0) return false;

    tasks.splice(index, 1);

    return true;
}
