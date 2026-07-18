import { Router } from 'express';

import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../controllers/service.controller';


import validateRequiredFields from '../middleware/validate';  



const router = Router();


router.post(
  '/',
  validateRequiredFields([
    'name',
    'category',
    'description',
    'price',
    'duration',
  ]),
  createService
);



// GET all services
router.get('/', getServices);

// GET service by ID
router.get('/:id', getServiceById);

// CREATE service
router.post('/', createService);

// UPDATE service
router.put('/:id', updateService);

// DELETE service
router.delete('/:id', deleteService);

export default router;