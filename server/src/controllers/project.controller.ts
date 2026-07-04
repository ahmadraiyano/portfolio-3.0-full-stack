import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';

/** GET /api/projects  (public) — supports ?featured=true */
export const getProjects = asyncHandler(async (req: Request, res: Response) => {
  const where = req.query.featured === 'true' ? { featured: true } : {};

  const projects = await prisma.project.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  res.status(200).json(new ApiResponse(200, projects));
});

/** GET /api/projects/:idOrSlug  (public) — resolves by slug or id. */
export const getProject = asyncHandler(async (req: Request, res: Response) => {
  const { idOrSlug } = req.params;

  const project = await prisma.project.findFirst({
    where: { OR: [{ slug: idOrSlug }, { id: idOrSlug }] },
  });

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  res.status(200).json(new ApiResponse(200, project));
});

/** POST /api/projects  (admin) */
export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await prisma.project.create({ data: req.body });
  res.status(201).json(new ApiResponse(201, project, 'Project created'));
});

/** PUT /api/projects/:id  (admin) */
export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await prisma.project.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.status(200).json(new ApiResponse(200, project, 'Project updated'));
});

/** DELETE /api/projects/:id  (admin) */
export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  await prisma.project.delete({ where: { id: req.params.id } });
  res.status(200).json(new ApiResponse(200, null, 'Project deleted'));
});
