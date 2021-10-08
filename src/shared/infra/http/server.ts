import 'reflect-metadata';

import 'express-async-errors';
import 'dotenv/config';

import { CelebrateError, errors } from 'celebrate';
import express, { NextFunction, Request, Response } from 'express';

import uploadConfig from '@config/uploadConfig';

import AppError from '@shared/errors/AppError';

import '../../containers/index';
import routes from './routes/index.routes';

import '../typeorm/connection';

const app = express();

app.use(express.json());
app.use(routes);
app.use('/files', express.static(uploadConfig.uploadFolder));
if (process.env.APP_PRODUCTION === 'false') {
  app.use(errors());
}
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.code).json({ type: 'error', message: err.message });
  }

  if (err instanceof CelebrateError) {
    return res.status(400).json({ type: 'error', message: 'Validation error' });
  }

  console.error(err);

  return res
    .status(500)
    .json({ type: 'error', message: 'Internal server error!' });
});

app.listen(3333, () => {
  console.log('RentX API started on port 3333');
});
