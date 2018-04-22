import { Router } from 'express';

import { upload } from '../controllers/upload';
import { auth } from '../auth/auth';
const router = Router();

/**
 * @param {Object} req.body
 * @param {String} req.body.imageSrc 
 * @param {Object} res 
 */
router.post('/', auth.required, upload)

module.exports = router;