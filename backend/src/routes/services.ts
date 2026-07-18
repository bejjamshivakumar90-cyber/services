import { Router } from 'express';

import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../controllers/service.controller';

import validateRequiredFields from '../middleware/validate';
import protect from '../middleware/auth';
import admin from '../middleware/admin';


const router = Router();


// GET all services (Public)
router.get('/', getServices);


// GET service by ID (Public)
router.get('/:id', getServiceById);


// CREATE service (Protected)
router.post(
  '/',
  protect,
  admin,
  validateRequiredFields([
    'name',
    'category',
    'description',
    'price',
    'duration',
  ]),
  createService
);


router.put(
  '/:id',
  protect,
  admin,
  updateService
);


router.delete(
  '/:id',
  protect,
  admin,
  deleteService
);

export default router;