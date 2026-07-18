import { Router } from 'express';

import {
  registerUser,
  loginUser,
} from '../controllers/auth.controller';

const router = Router();


// Register
router.post('/register', registerUser);


// Login
router.post('/login', loginUser);


export default router;