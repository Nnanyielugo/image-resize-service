import { Router } from 'express';

const router = Router()

router.use('/upload', require('./upload'));
router.use('/login', require('./users'));
router.use('/patch', require('./patch'));


export default router;