<script lang="ts">
	import type { Task } from '$lib/models/task';

	type Props = {
		task: Task;
		onToggle: (id: string) => void;
		onDelete: (id: string) => void;
		onUpdate: (id: string, text: string) => void;
	};

	let { task, onToggle, onDelete, onUpdate }: Props = $props();

	let draft = $state('');
	let isEditing = $state(false);

	function startEdit() {
		isEditing = true;
		draft = task.text;
	}
</script>

<div class="task">
	<p class:done={task.completed}>{task.text}</p>

	{#if isEditing}
		<form
			onsubmit={(e) => {
				e.preventDefault();
				onUpdate(task.id, draft);
				isEditing = false;
			}}
		>
			<label for="task-edit">Введіть нову задачу</label>
			<input
				id="task-edit"
				onkeydown={(e) => {
					if (e.key === 'Escape') isEditing = false;
				}}
				bind:value={draft}
				type="text"
				aria-label="Введіть нову задачу"
			/>

			<button type="submit">Додати</button>
			<button
				type="button"
				onclick={() => {
					isEditing = false;
					draft = '';
				}}>Відміна</button
			>
		</form>
	{/if}

	<button type="button" onclick={() => onToggle(task.id)}> Виконано </button>

	<button type="button" onclick={startEdit}> Редагувати </button>

	<button type="button" onclick={() => onDelete(task.id)}> Видалити </button>
</div>

<style lang="postcss">
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
</style>
