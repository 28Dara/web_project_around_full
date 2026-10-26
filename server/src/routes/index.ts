import { Router } from 'express';
import { cardsRouter } from './cards.js';
import { usersRouter } from './users.js';

const router = Router();

router.use('/cards', cardsRouter);
router.use('/users', usersRouter);

export default router;
