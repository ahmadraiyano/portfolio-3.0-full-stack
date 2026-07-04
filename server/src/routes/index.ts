import { Router } from 'express';
import projectRoutes from './project.routes';
import contactRoutes from './contact.routes';
import authRoutes from './auth.routes';

const router = Router();

router.use('/projects', projectRoutes);
router.use('/contact', contactRoutes);
router.use('/auth', authRoutes);

export default router;
