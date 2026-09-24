<script lang='ts'>
   let inputValue = $state('');

   type TTask = {
    id: string;
    text: string;
    done: boolean;
   }

   let tasks = $state<string[]>([]);

   function addTask() {
    if (!inputValue.trim()) return;

    tasks.push(inputValue.trim());

    inputValue = '';
   }

   function deleteTask() {

   }

   function editTask() {

   }

   function completedTask() {

   }
</script>

<div class="todo-container">
    <div class="todo">
        <input 
            bind:value={ inputValue } 
            type="text" 
            name="" 
            id="" 
            placeholder="Напиши задачу"
        >

        <button
            onclick={ addTask }
        >
            Додати
        </button>
    </div>

    <div class="tasks-container">
        <h1>
            Ваші завдання
        </h1>

        <div class="tasks">
            {#each tasks as task, i (i)}
                <div class="task">
                    <p>
                        {task}
                    </p>

                    <button onclick={ completedTask }>
                        Виконано
                    </button>

                    <button onclick={ editTask}>
                        Редагувати
                    </button>

                    <button onclick={ deleteTask }>
                        Видалити
                    </button>
                </div>
            {/each}

        </div>
    </div>

</div>

<style lang='postcss'>
    .todo-container {
        /* display: flex; */
        /* align-items: center; */
        /* justify-content: center; */
        height: 100dvh;

        .todo {
            border: .125rem solid white;
            border-radius: 1rem;
            padding: 1rem;
            display: flex;
            
            input {
                display: flex;
                width: 30rem;
                border: .125rem solid white;
                padding: 1rem;
                background-color: grey;
                border-radius: .5rem 0 0 .5rem;

                &::placeholder {
                    color: white;
                }
            }

            button {
                border: .125rem solid white;
                border-radius: 0 .5rem .5rem 0;
                background-color: grey;
                padding: 1rem;
                color: white;
                cursor: pointer;
                transition: opacity .3s;

                &:hover {
                    opacity: .8;
                }
            }
        }
        .tasks-container {
            border: .125rem solid white;
            border-radius: .5rem;
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
                    border-top: .125rem solid white;
                    padding: 1rem;
                    color: white;
                    display: flex;
                    gap: 1rem;

                    p {
                        margin: 0 auto 0 0;
                    }
                }
            }
        }

    }
</style>
