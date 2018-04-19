import { Router } from 'express';

const router = Router()

router.use('/upload', require('./upload'));


export default router;