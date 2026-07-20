import { Router } from 'express';

import { 
  registerUser,
  loginUser,
  getUsers,
  getUserById
} from '../controllers/auth.controller';

import protect from '../middleware/auth';
import admin from '../middleware/admin';

const router = Router();


router.post('/register', registerUser);

router.post('/login', loginUser);


// Admin users list
router.get(
  '/users',
  protect,
  admin,
  getUsers
);

// Single user profile
router.get(
  '/users/:id',
  protect,
  admin,
  getUserById
);



export default router;