import { Router } from 'express';
import { createMessage, getMessages } from '../controllers/contact.controller';
import { verifyJWT } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { contactMessageSchema } from '../validators/contact.validator';

const router = Router();

router.post('/', validate(contactMessageSchema), createMessage);
router.get('/', verifyJWT, getMessages);

export default router;
