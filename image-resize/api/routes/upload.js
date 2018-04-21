import { Router } from 'express';

import { upload } from '../controllers/upload';
import { auth } from '../auth/auth';
const router = Router();

/**
 * @param {imageSrc} req 
 * @param {base64image, imagePath} res 
 */
router.post('/', auth.required, upload)

module.exports = router;