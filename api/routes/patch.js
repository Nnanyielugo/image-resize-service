import { Router } from 'express';
import { auth } from '../auth/auth';

import { getOriginalObject, addToOriginalObject, patchOriginalObject } from '../controllers/patch';
const router = Router();

/**
 * @param {array of objects} res 
 */
router.get('/', auth.required, getOriginalObject);

/**
 * @param {name, description} req
 * @param {array of objects containing newly created object} res
 */
router.post('/', auth.required, addToOriginalObject);

/**
 * @param {name, description} req
 * @param {updated object}
 */
router.patch('/:id', auth.required, patchOriginalObject)

module.exports = router;