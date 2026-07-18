import { Request, Response } from 'express';
import Booking from '../models/booking';
import asyncHandler from '../utils/asyncHandler';

// GET ALL BOOKINGS
export const getBookings = asyncHandler(async (_req: Request, res: Response) => {
  const bookings = await Booking.find().populate('service');

  res.status(200).json({
    success: true,
    count: bookings.length,
    bookings,
  });
});

// GET BOOKING BY ID
export const getBookingById = asyncHandler(async (req: Request, res: Response) => {
  const booking = await Booking.findById(req.params.id).populate('service');

  if (!booking) {
    const error: any = new Error('Booking not found');
    error.status = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    booking,
  });
});

// CREATE BOOKING
export const createBooking = asyncHandler(async (req: Request, res: Response) => {
  const booking = await Booking.create(req.body);

  res.status(201).json({
    success: true,
    booking,
  });
});

// UPDATE BOOKING
export const updateBooking = asyncHandler(async (req: Request, res: Response) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
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
});

// DELETE BOOKING
export const deleteBooking = asyncHandler(async (req: Request, res: Response) => {
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
});