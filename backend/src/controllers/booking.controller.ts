import { Request, Response } from 'express';
import Booking from '../models/booking';
import asyncHandler from '../utils/asyncHandler';

interface AuthRequest extends Request {
  user?: any;
}

// =============================
// GET ALL BOOKINGS
// =============================
export const getBookings = asyncHandler(
  async (_req: Request, res: Response) => {
    const bookings = await Booking.find()
      .populate('user', 'name email phone')
      .populate('service', 'name category price duration image')
      .populate(
        'technician',
        'name phone profession city isAvailable rating'
      );

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  }
);

// =============================
// GET BOOKING BY ID
// =============================
export const getBookingById = asyncHandler(
  async (req: Request, res: Response) => {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('service', 'name category price duration image')
      .populate(
        'technician',
        'name phone profession city isAvailable rating'
      );

    if (!booking) {
      const error: any = new Error('Booking not found');
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      booking,
    });
  }
);

// =============================
// CREATE BOOKING
// =============================
export const createBooking = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const booking = await Booking.create({
      ...req.body,
      user: req.user?._id,
    });

    res.status(201).json({
      success: true,
      booking,
    });
  }
);

// =============================
// UPDATE BOOKING
// =============================
export const updateBooking = asyncHandler(
  async (req: Request, res: Response) => {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate('user', 'name email phone')
      .populate('service', 'name category price duration image')
      .populate(
        'technician',
        'name phone profession city isAvailable rating'
      );

    if (!booking) {
      const error: any = new Error('Booking not found');
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      booking,
    });
  }
);

// =============================
// ASSIGN TECHNICIAN
// =============================
export const assignTechnician = asyncHandler(
  async (req: Request, res: Response) => {
    const { technicianId } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        technician: technicianId,
        status: 'Assigned',
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate('user', 'name email phone')
      .populate('service', 'name category price duration image')
      .populate(
        'technician',
        'name phone profession city isAvailable rating'
      );

    if (!booking) {
      const error: any = new Error('Booking not found');
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: 'Technician assigned successfully',
      booking,
    });
  }
);

// =============================
// TECHNICIAN ACCEPTS BOOKING
// =============================
export const acceptBooking = asyncHandler(
  async (req: Request, res: Response) => {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'Accepted' },
      { new: true, runValidators: true }
    )
      .populate('user', 'name email phone')
      .populate('service', 'name category')
      .populate('technician', 'name profession');

    if (!booking) {
      const error: any = new Error('Booking not found');
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: 'Booking accepted',
      booking,
    });
  }
);

// =============================
// UPDATE BOOKING STATUS
// =============================
export const updateBookingStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { status } = req.body;

    const allowedStatuses = [
      'On The Way',
      'In Progress',
      'Completed',
      'Cancelled',
    ];

    if (!allowedStatuses.includes(status)) {
      res.status(400).json({
        success: false,
        message: 'Invalid booking status',
      });
      return;
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )
      .populate('user', 'name email phone')
      .populate('service', 'name category')
      .populate('technician', 'name profession');

    if (!booking) {
      const error: any = new Error('Booking not found');
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: 'Booking status updated',
      booking,
    });
  }
);

// =============================
// DELETE BOOKING
// =============================
export const deleteBooking = asyncHandler(
  async (req: Request, res: Response) => {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      const error: any = new Error('Booking not found');
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully',
    });
  }
);