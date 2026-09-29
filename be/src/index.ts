import express, { type Express, type Request, type Response } from 'express';

// ну з типами все понятно щоб не віддправити те що не тре і побачити помилку
type Task = {
    id: string;
    text: string;
    completed: boolean;
}
// тут теж типізований Task і іншого туди нізя
const tasks: Task[] = [];
// тут що ша програмка буде типізована як експресс і мати її функції і методи
const app: Express = express();
// просто порт ящичок де храниться
const PORT = 5000;
// тут якщо приходе донас запрос (адреса, запит, відповідь) аж тоді виконувати функцію всередині
app.get('/api/tasks', (req: Request, res: Response) => {
    // тут ми наче побачим метод використаний і адресу що питали
    console.log(req.method, req.url);
    // тут відповідь сервера
    res.json(tasks);
})
// тут не зовсім розмію як він має спрацьовувати для запитів які не були оброблені. запити ж мають бути оброблені
app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Не знайдено' });
})
// тут просто запуск сервера на порту і провірка чи він працює чи впав
app.listen(PORT, (error) => {
    if(error) {
        console.error(`Не вдалось знайти порт ${PORT}:`, error);

        return;
    }

    console.log(`Сервер слухає http://localhost:${PORT}`);
})
