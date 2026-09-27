<script lang="ts">
	type Props = {
		onAdd: (text: string) => void;
	};

	let { onAdd }: Props = $props();

	let inputValue = $state('');

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		onAdd(inputValue);

		inputValue = '';
	}
</script>

<form onsubmit={handleSubmit}>
	<label for="new-task">Нова задача</label>

	<input bind:value={inputValue} type="text" id="new-task" placeholder="Напиши задачу" />

	<button type="submit"> Додати </button>
</form>

<style lang="postcss">
	form {
		display: flex;

		input {
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
</style>
