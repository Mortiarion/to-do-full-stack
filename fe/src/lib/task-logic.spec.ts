import { expect, test } from "vitest";

import { addTask, toggleTask, updateTaskText, deleteTask } from "$lib/task-logic";
import type { Task } from "$lib/models/task";

test.describe('Task logic', () => {
    test('Add new task', () => {
        const list = [
            {
                id: '1',
                text: 'Learn BackEnd',
                completed: false
            }
        ]

        const result = addTask(list, 'Learn Express');

        expect(result).toHaveLength(2);

        expect(result[1].text).toBe('Learn Express');
        expect(result[1].completed).toBe(false);
        expect(addTask([], ' a ')[0].text).toBe('a')
    })

    test('Toggle task', () => {
        const list = [
            {
                id: '1',
                text: 'Learn BackEnd',
                completed: false
            },
            {
                id: '2',
                text: 'Learn Express',
                completed: true
            }
        ]

        const result = toggleTask(list, '2');

        expect(result[0].completed).toBe(false);
        expect(result[1].completed).toBe(false);
    })

    test('Shoud update task text', () => {
        const list = [
            {
                id: '1',
                text: 'Learn BackEnd',
                completed: false
            },
            {
                id: '2',
                text: 'Learn Express',
                completed: true
            }
        ]

        const result = updateTaskText(list, '1', 'Learn Svelte 5');

        expect(result).toEqual([
            {
                id: '1',
                text: 'Learn Svelte 5',
                completed: false
            },
            {
                id: '2',
                text: 'Learn Express',
                completed: true
            }
        ])
    })

    test('shoud Delete task', () => {
        const list = [
            {
                id: '1',
                text: 'Learn BackEnd',
                completed: false
            },
            {
                id: '2',
                text: 'Learn Express',
                completed: true
            },
            {
                id: '3',
                text: 'Tailwind',
                completed: true
            }
        ]

        const result = deleteTask(list, '2');

        expect(result).toHaveLength(2);

        expect(result).toEqual([
            {
                id: '1',
                text: 'Learn BackEnd',
                completed: false
            },
            {
                id: '3',
                text: 'Tailwind',
                completed: true
            }
        ])
    })

    test('should not mutate original list', () => {
        const list = [
            {
                id: '1',
                text: 'Learn BackEnd',
                completed: false
            }
        ]

        const result = toggleTask(list, '1');

        expect(list[0].completed).toBe(false);
        expect(result[0].completed).toBe(true);
    })

    test('Should return unchanged list when task does not exist', () => {
        const list = [
            {
                id: '1',
                text: 'Learn BackEnd',
                completed: false
            }
        ]

        const result = updateTaskText(list, '98', 'Svelte');

        expect(result).toEqual(list);
    })

    test('Should not add task whith empty text', () => {
        const list: Task[] = [];

        const result = addTask(list, '');

        expect(result).toEqual(list);
    })

    test('Should not add task with whitespace-only text', () => {
        const list: Task[] = [];

        const result = addTask(list, ' ');

        expect(result).toEqual(list);
    })

    test('Add tasks return a new array', () => {
        const list: Task[] = [];

        const result = addTask(list, 'test');

        expect(result).not.toBe(list);
    })
});
