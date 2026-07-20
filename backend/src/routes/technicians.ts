import { Router } from 'express';
import {
  registerTechnician,
  loginTechnician,
  getTechnicians,
  getTechnicianById,
  getAssignedBookings,
} from '../controllers/technician.controller';
import protect from '../middleware/auth';

const router = Router();

router.post('/register', registerTechnician);
router.post('/login', loginTechnician);
router.get('/', getTechnicians);
router.get('/bookings',protect,getAssignedBookings);
router.get('/:id', getTechnicianById);

export default router;