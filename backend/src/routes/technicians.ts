import { Router } from 'express';
import multer from 'multer';
import {
  registerTechnician,
  loginTechnician,
  createTechnician,
  getTechnicians,
  getTechnicianById,
  getAssignedBookings,
  getMyBookings,
} from '../controllers/technician.controller';
import protect from '../middleware/auth';

const upload = multer();

const router = Router();

router.post('/register', registerTechnician);
router.post('/login', loginTechnician);

router.get("/my-bookings",protect,getMyBookings);
router.get('/bookings',protect,getAssignedBookings);

router.post(
  "/",
  upload.single("photo"),
  createTechnician
);
router.get('/', getTechnicians);
router.get('/:id', getTechnicianById);


export default router;