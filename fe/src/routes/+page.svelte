<script lang="ts">
	import type { Task } from '$lib/models/task';
	import { addTask, deleteTask, updateTaskText, toggleTask } from '$lib/task-logic';

	let inputValue = $state('');

	let tasks = $state<Task[]>([]);

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		tasks = addTask(tasks, inputValue);

		inputValue = '';
	}

	function handleDelete(taskId: Task['id']) {
		tasks = deleteTask(tasks, taskId);
	}

	let editingId = $state<string | null>(null);

	function handleToggle(taskId: Task['id']) {
		tasks = toggleTask(tasks, taskId);
	}

	let left = $derived(tasks.filter((t) => !t.completed).length);

	let draft = $state('');

	function startEdit(task: Task) {
		editingId = task.id;
		draft = task.text;
	}
</script>

<div class="todo-container">
	<div class="todo">
		<form onsubmit={handleSubmit}>
			<label for="new-task">Нова задача</label>

			<input bind:value={inputValue} type="text" id="new-task" placeholder="Напиши задачу" />

			<button type="submit"> Додати </button>
		</form>
	</div>

	<div class="tasks-container">
		<h1>Ваші завдання</h1>
		<span>
			{left} загально
		</span>

		<div class="tasks">
			{#each tasks as task (task.id)}
				<div class="task">
					<p class:done={task.completed}>{task.text}</p>

					{#if editingId === task.id}
						<form
							onsubmit={(e) => {
								e.preventDefault();
								tasks = updateTaskText(tasks, editingId!, draft);
								editingId = null;
							}}
						>
							<label for="edit">Введіть нову задачу</label>
							<input
								onkeydown={(e) => {
									if (e.key === 'Escape') editingId = null;
								}}
								bind:value={draft}
								type="text"
								id="edit"
							/>

							<button type="submit">Додати</button>
							<button
								type="button"
								onclick={() => {
									editingId = null;
									draft = '';
								}}>Відміна</button
							>
						</form>
					{/if}

					<button type="button" onclick={() => handleToggle(task.id)}> Виконано </button>

					<button type="button" onclick={() => startEdit(task)}> Редагувати </button>

					<button type="button" onclick={() => handleDelete(task.id)}> Видалити </button>
				</div>
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
			display: flex;

			input {
				display: flex;
				width: 30rem;
				border: 0.125rem solid white;
				padding: 1rem;
				background-color: grey;
				border-radius: 0.5rem 0 0 0.5rem;

				&::placeholder {
					color: white;
				}
			}

			button {
				border: 0.125rem solid white;
				border-radius: 0 0.5rem 0.5rem 0;
				background-color: grey;
				padding: 1rem;
				color: white;
				cursor: pointer;
				transition: opacity 0.3s;

				&:hover {
					opacity: 0.8;
				}
			}
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

			.tasks {
				.task {
					border-top: 0.125rem solid white;
					padding: 1rem;
					color: white;
					display: flex;
					gap: 1rem;

					p {
						margin: 0 auto 0 0;
					}

					form {
						input {
							border: 0.125rem solid white;
						}
					}

					.done {
						text-decoration: line-through;
						opacity: 0.5;
					}
				}
			}
		}
	}
</style>
