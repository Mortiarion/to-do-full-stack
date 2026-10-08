import type { Task, TaskChanges } from "../types/task.ts";

const tasks: Task[] = [];

export function listTasks(): Task[] {
    return tasks.map((task) => ({...task}));
}

export function trimText(text: string) {
    return text.trim();
}

export function addTask(text: string): Task | null {
    const value = trimText(text);

    if(!value) return null;

    const task: Task = {
        id: crypto.randomUUID(),
        text: value,
        completed: false
    };

    tasks.push(task);

    return task;
}

function findTask(id: string): Task | undefined{
    return tasks.find((task) => task.id === id);
}

export function readTask(id: string): Task | undefined {
    const task = findTask(id);

    if(!task) return undefined;

    return {...task};
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
