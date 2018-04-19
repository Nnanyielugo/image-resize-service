import { Router } from 'express';
import { auth } from '../auth/auth';

import { login } from '../controllers/users';
const router = Router();

/**
 * @param {username, password} req 
 * @param {token} res 
 */
router.post('/', login)

module.exports = router;