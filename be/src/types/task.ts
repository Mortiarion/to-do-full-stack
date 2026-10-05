export type Task = {
    id: string;
    text: string;
    completed: boolean;
}

export type TaskChanges = {
    text?: string;
    completed?: boolean;
}
