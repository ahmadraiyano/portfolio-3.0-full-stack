import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';

/** POST /api/contact  (public) */
export const createMessage = asyncHandler(async (req: Request, res: Response) => {
  const message = await prisma.contactMessage.create({ data: req.body });
  res
    .status(201)
    .json(new ApiResponse(201, message, "Thanks for reaching out — I'll get back to you soon."));
});

/** GET /api/contact  (admin) */
export const getMessages = asyncHandler(async (_req: Request, res: Response) => {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.status(200).json(new ApiResponse(200, messages));
});
