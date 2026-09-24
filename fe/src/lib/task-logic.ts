import type { Task } from '$lib/models/task';

export function addTask(list: Task[], text: string): Task[] {
	const trimmed = text.trim();

	if (!trimmed) return list;

	return [
		...list,
		{
			id: crypto.randomUUID(),
			text: trimmed,
			completed: false
		}
	];
}

export function toggleTask(list: Task[], id: string): Task[] {
	return list.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task));
}

export function deleteTask(list: Task[], id: string): Task[] {
	return list.filter((task) => task.id !== id);
}

export function updateTaskText(list: Task[], id: string, text: string): Task[] {
	const trimmed = text.trim();

	if (!trimmed) return list;

	return list.map((task) => (task.id === id ? { ...task, text: trimmed } : task));
}
