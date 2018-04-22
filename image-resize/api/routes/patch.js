import { Router } from 'express';
import { auth } from '../auth/auth';

import { getOriginalObject, addToOriginalObject, patchOriginalObject } from '../controllers/patch';
const router = Router();

/**
 * @param {Array} res
 */
router.get('/', auth.required, getOriginalObject);

/**
 * @param {Object} req.body
 * @param {String} req.body.name
 * @param {String} req.body.description
 */
router.post('/', auth.required, addToOriginalObject);

/**
 * @param {Object} req.body
 * @param {String} req.body.name
 * @param {String} req.body.description
 */
router.patch('/:id', auth.required, patchOriginalObject)

module.exports = router;