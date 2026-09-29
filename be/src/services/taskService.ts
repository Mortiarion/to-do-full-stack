import type { Task } from "../types/task.ts";

const tasks: Task[] = [];

export function listTasks(): Task[] {
    return tasks;
}
