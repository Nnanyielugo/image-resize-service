import { Router } from 'express';
import { auth } from '../auth/auth';

import { getOriginalObject, addToOriginalObject, patchOriginalObject } from '../controllers/patch';
const router = Router();

/**
 * @param {username, password} req 
 * @param {token} res 
 */
router.get('/', auth.required, getOriginalObject);
router.post('/', auth.required, addToOriginalObject);
router.patch('/:id', auth.required, patchOriginalObject)

module.exports = router;