import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ZodTypeAny } from 'zod';
import { ApiError } from '../utils/ApiError';

/** Validates req.body against a Zod schema and replaces it with the parsed result. */
export const validate =
  (schema: ZodTypeAny): RequestHandler =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return next(new ApiError(400, 'Validation failed', details));
    }
    req.body = result.data;
    next();
  };
