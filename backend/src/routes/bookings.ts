import { Router } from 'express';

import {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} from '../controllers/booking.controller';





import validateRequiredFields from '../middleware/validate';    


const router = Router();


router.post(
  '/',
  validateRequiredFields([
    'customerName',
    'email',
    'phone',
    'service',
    'address',
    'city',
    'pincode',
    'bookingDate',
    'bookingTime',
    'problem',
  ]),
  createBooking
);

// GET all bookings
router.get('/', getBookings);

// GET booking by ID
router.get('/:id', getBookingById);

// CREATE booking
router.post('/', createBooking);

// UPDATE booking
router.put('/:id', updateBooking);

// DELETE booking
router.delete('/:id', deleteBooking);

export default router;