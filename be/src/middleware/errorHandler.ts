import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err);

    const status = typeof err?.status === 'number' ? err.status : 500;
    
    res.status(status).json({ 
        message: status < 500 ? 'Некоректний запит' : 'Внутрішня помилка сервера' 
    });
}
