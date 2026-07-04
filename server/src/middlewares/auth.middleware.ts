import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError';
import { asyncHandler } from '../utils/asyncHandler';
import { AdminTokenPayload } from '../types/express';

/** Protects /admin-only routes. Expects `Authorization: Bearer <jwt>`. */
export const verifyJWT = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    throw new ApiError(401, 'Authentication required');
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as AdminTokenPayload;
    req.admin = payload;
    next();
  } catch {
    throw new ApiError(401, 'Invalid or expired session — please sign in again');
  }
});
