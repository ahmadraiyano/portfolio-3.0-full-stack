import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import routes from './routes/index';
import { notFound } from './middlewares/notFound.middleware';
import { errorHandler } from './middlewares/error.middleware';

const app: Application = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL?.split(',') || '*',
  })
);
app.use(express.json({ limit: '1mb' }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
}

// Generous general limit, plus a tighter one on the public contact form.
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));
app.use(
  '/api/contact',
  rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: 'Too many messages — please try again later.' })
);

app.get('/api/health', (_req: Request, res: Response) => res.json({ success: true, message: 'OK' }));

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
