<script lang="ts">
	import TaskForm from '$lib/components/TaskForm.svelte';
	import TaskItem from '$lib/components/TaskItem.svelte';
	import type { Task } from '$lib/models/task';
	import { addTask, deleteTask, updateTaskText, toggleTask } from '$lib/task-logic';

	let tasks = $state<Task[]>([]);
	let left = $derived(tasks.filter((t) => !t.completed).length);

	function handleDelete(taskId: Task['id']) {
		tasks = deleteTask(tasks, taskId);
	}

	function handleToggle(taskId: Task['id']) {
		tasks = toggleTask(tasks, taskId);
	}

	function handleAdd(text: string) {
		tasks = addTask(tasks, text);
	}

	function handleUpdateText(id: string, text: string) {
		tasks = updateTaskText(tasks, id, text);
	}
</script>

<div class="todo-container">
	<div class="todo">
		<TaskForm onAdd={handleAdd} />
	</div>

	<div class="tasks-container">
		<h1>Ваші завдання</h1>

		<span>
			Залишилось: {left}
		</span>

		<div class="tasks">
			{#each tasks as task (task.id)}
				<TaskItem
					{task}
					onDelete={handleDelete}
					onToggle={handleToggle}
					onUpdate={handleUpdateText}
				/>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">
	.todo-container {
		height: 100dvh;

		.todo {
			border: 0.125rem solid white;
			border-radius: 1rem;
			padding: 1rem;
		}

		.tasks-container {
			border: 0.125rem solid white;
			border-radius: 0.5rem;
			margin: 1rem 0 0 0;
			display: flex;
			flex-direction: column;

			h1 {
				color: white;
				text-transform: uppercase;
				font-weight: 600;
				font-size: 2rem;
				margin: 0 auto;
			}
		}
	}
</style>
