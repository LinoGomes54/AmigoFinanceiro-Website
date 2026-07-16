import type { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../services/token.service.js';
import { UnauthorizedError } from '../utils/errors.js';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    next(new UnauthorizedError('Token de acesso não informado.'));
    return;
  }

  try {
    const payload = verifyToken(header.slice('Bearer '.length).trim());
    req.userId = payload.sub;
    next();
  } catch (err) {
    next(err);
  }
}
