import { Router } from 'express';

import { upload } from '../controllers/upload';
const router = Router();

router.post('/', upload)

module.exports = router;