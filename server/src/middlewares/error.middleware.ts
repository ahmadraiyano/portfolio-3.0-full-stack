import { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { ApiError } from '../utils/ApiError';

/** Maps a few common Prisma error codes to friendly ApiErrors. */
function normalizeError(err: unknown): ApiError | null {
  if (err instanceof ApiError) return err;

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const field = (err.meta?.target as string[] | undefined)?.[0] || 'field';
      return new ApiError(409, `That ${field} is already in use.`);
    }
    if (err.code === 'P2025') {
      return new ApiError(404, 'Record not found.');
    }
  }

  return null;
}

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  const normalized = normalizeError(err) ?? (err as ApiError);
  const statusCode = normalized.statusCode || 500;
  const message = normalized.isOperational ? normalized.message : 'Internal server error';

  if (!normalized.isOperational) {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(normalized.details ? { details: normalized.details } : {}),
    ...(process.env.NODE_ENV === 'development' && !normalized.isOperational
      ? { stack: (err as Error).stack }
      : {}),
  });
};
