import { app } from './app.ts';

const PORT = 5000;

app.listen(PORT, (error) => {
    if(error) {
        console.error(`Не вдалось знайти порт ${PORT}:`, error);

        return;
    }

    console.log(`Сервер слухає http://localhost:${PORT}`);
})
