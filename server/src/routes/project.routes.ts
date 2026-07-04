import { Router } from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller';
import { verifyJWT } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createProjectSchema, updateProjectSchema } from '../validators/project.validator';

const router = Router();

router.get('/', getProjects);
router.get('/:idOrSlug', getProject);
router.post('/', verifyJWT, validate(createProjectSchema), createProject);
router.put('/:id', verifyJWT, validate(updateProjectSchema), updateProject);
router.delete('/:id', verifyJWT, deleteProject);

export default router;
