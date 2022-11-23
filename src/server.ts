import "express-async-errors";
import express, { NextFunction, Request, Response } from 'express';
import { routes } from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  return response.json({
    status: "Error",
    message: error.message,
  });
})

app.listen(3333, () => console.log('listening on port 3333'));