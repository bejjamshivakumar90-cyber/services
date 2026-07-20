import { Router } from 'express';

import {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
  assignTechnician,
  acceptBooking,
updateBookingStatus,
getMyBookings,
cancelMyBooking,
getCustomerStats,
} from '../controllers/booking.controller';

import protect from '../middleware/auth';
import admin from '../middleware/admin';


const router = Router();

// =========================
// Customer
// =========================

// Create Booking (Login Required)
router.post('/', protect, createBooking);

// Customer - My Bookings
router.get("/my-bookings", protect, getMyBookings);

router.put(
  "/my-bookings/:id/cancel",
  protect,
  cancelMyBooking
);

// =========================
// Admin
// =========================

// View All Bookings
router.get('/', protect, admin, getBookings);

router.get(
"/customer/:id/stats",
protect,
admin,
getCustomerStats
);

// View Single Booking
router.get('/:id', protect, admin, getBookingById);

// Update Booking
router.put('/:id', protect, admin, updateBooking);

// Delete Booking
router.delete('/:id', protect, admin, deleteBooking);

// Assign Technician
router.put('/:id/assign', protect, admin, assignTechnician);
 
// Technician
router.put('/:id/accept', protect, acceptBooking);

router.put('/:id/status', protect, updateBookingStatus);

export default router;