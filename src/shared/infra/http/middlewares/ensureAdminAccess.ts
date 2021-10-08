import { NextFunction, Request, Response } from 'express';

import AppError from '@shared/errors/AppError';

export default function ensureAdminAccess(
  req: Request,
  _: Response,
  next: NextFunction,
): void {
  const { admin } = req.user;

  if (admin === true) {
    return next();
  }

  throw new AppError('Acesso negado!', 401);
}
