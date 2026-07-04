import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import admin, { isFirebaseAdminConfigured } from '../config/firebase';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';

/**
 * POST /api/auth/login  (public)
 * Body: { idToken } — a Firebase ID token obtained on the client after
 * signInWithEmailAndPassword. We verify it server-side, confirm the email
 * matches the single configured admin (you), then issue our own JWT that
 * protects the rest of the admin API.
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  if (!isFirebaseAdminConfigured) {
    throw new ApiError(503, 'Firebase Admin is not configured on the server yet.');
  }

  const { idToken } = req.body as { idToken?: string };
  if (!idToken) {
    throw new ApiError(400, 'idToken is required');
  }

  let decoded;
  try {
    decoded = await admin.auth().verifyIdToken(idToken);
  } catch {
    throw new ApiError(401, 'Invalid Firebase token');
  }

  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  if (!adminEmail || decoded.email?.toLowerCase() !== adminEmail) {
    throw new ApiError(403, 'This account is not authorized to access the admin dashboard');
  }

  const token = jwt.sign(
    { uid: decoded.uid, email: decoded.email },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as jwt.SignOptions
  );

  res
    .status(200)
    .json(new ApiResponse(200, { token, admin: { uid: decoded.uid, email: decoded.email } }, 'Signed in'));
});

/** GET /api/auth/me  (admin) */
export const me = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json(new ApiResponse(200, req.admin));
});
