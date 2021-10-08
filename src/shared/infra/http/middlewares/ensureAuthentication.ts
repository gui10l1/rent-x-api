import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/authConfig';

import AppError from '@shared/errors/AppError';

interface IPayloadToken {
  sub: string;
  exp: number;
  iat?: number;
  admin?: boolean;
}

export default function ensureAuthentication(
  req: Request,
  _: Response,
  next: NextFunction,
): void {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    throw new AppError(
      'Token de autenticação necessária para esta requisição!',
      401,
    );
  }

  const [, token] = bearerToken.split(' ');

  try {
    const payload = verify(token, authConfig.secret) as IPayloadToken;

    req.user = {
      id: payload.sub,
      admin: payload.admin,
    };

    next();
  } catch {
    throw new AppError('Token de autenticação inválido');
  }
}
