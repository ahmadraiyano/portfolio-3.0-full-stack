import { Router } from 'express';
import { login, me } from '../controllers/auth.controller';
import { verifyJWT } from '../middlewares/auth.middleware';

const router = Router();

router.post('/login', login);
router.get('/me', verifyJWT, me);

export default router;
