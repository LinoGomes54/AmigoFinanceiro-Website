import type { NextFunction, Request, Response } from 'express';
import * as authService from '../services/auth.service.js';
import { UnauthorizedError } from '../utils/errors.js';

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function me(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.userId) throw new UnauthorizedError();
    const user = await authService.getUserById(req.userId);
    res.json({ user });
  } catch (err) {
    next(err);
  }
}
