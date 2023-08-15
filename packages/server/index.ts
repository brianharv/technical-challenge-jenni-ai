import express, { Response, NextFunction, Application } from 'express';
import cors from 'cors';

const app: Application = express();

app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/health', (_, res: Response, next: NextFunction) => {
  res.json({ data: 'health check' }).status(200);
  next();
});

app.listen(4000, () => console.log('Server running on port 4000'));
