import { Router } from 'express';
import { auth } from '../auth/auth';

import { login } from '../controllers/users';
const router = Router();

/**
 * @param {Object} req.body
 * @param {String} req.body.username 
 * @param {String} req.body.password 
 * @param {Object} res
 */
router.post('/', login)

module.exports = router;