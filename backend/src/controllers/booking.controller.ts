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
// CUSTOMER - MY BOOKINGS
// =============================
export const getMyBookings = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate(
        "service",
        "name category price image"
      )
      .populate(
        "technician",
        "name phone profession rating"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });

  }
);


// =============================
// CUSTOMER CANCEL BOOKING
// =============================
export const cancelMyBooking = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      res.status(404).json({
        success: false,
        message: "Booking not found",
      });
      return;
    }

    // Customer can cancel only their own booking
    if (booking.user.toString() !== req.user._id.toString()) {
      res.status(403).json({
        success: false,
        message: "You cannot cancel this booking",
      });
      return;
    }

    // Prevent cancelling completed bookings
    if (booking.status === "Completed") {
      res.status(400).json({
        success: false,
        message: "Completed bookings cannot be cancelled",
      });
      return;
    }

    // Prevent duplicate cancellation
    if (booking.status === "Cancelled") {
      res.status(400).json({
        success: false,
        message: "Booking already cancelled",
      });
      return;
    }

    booking.status = "Cancelled";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
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
import Technician from '../models/technician';
import booking from '../models/booking';

export const assignTechnician = asyncHandler(
  async (req: Request, res: Response) => {
    const { technicianId } = req.body;

    // Technician ID required
    if (!technicianId) {
      res.status(400).json({
        success: false,
        message: 'Technician ID is required',
      });
      return;
    }

    // Find booking
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
      return;
    }

    // Prevent reassignment of finished bookings
    if (
      booking.status === 'Completed' ||
      booking.status === 'Cancelled'
    ) {
      res.status(400).json({
        success: false,
        message: `Cannot assign technician. Booking is already ${booking.status}.`,
      });
      return;
    }

    // Find technician
    const technician = await Technician.findById(technicianId);

    if (!technician) {
      res.status(404).json({
        success: false,
        message: 'Technician not found',
      });
      return;
    }

    // Technician availability
    if (!technician.isAvailable) {
      res.status(400).json({
        success: false,
        message: 'Technician is currently unavailable',
      });
      return;
    }

    // Assign technician
    booking.technician = technician._id;
    booking.status = 'Assigned';

    await booking.save();

    await booking.populate([
      {
        path: 'user',
        select: 'name email phone',
      },
      {
        path: 'service',
        select: 'name category price duration image',
      },
      {
        path: 'technician',
        select: 'name phone profession city rating isAvailable',
      },
    ]);

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
  async (req: AuthRequest, res: Response) => {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      res.status(404).json({
        success: false,
        message: "Booking not found",
      });
      return;
    }

    // Booking must be assigned first
    if (!booking.technician) {
      res.status(400).json({
        success: false,
        message: "Booking has not been assigned",
      });
      return;
    }

    // Only assigned technician can accept
    if (
      booking.technician.toString() !==
      req.user._id.toString()
    ) {
      res.status(403).json({
        success: false,
        message: "You are not assigned to this booking",
      });
      return;
    }

    booking.status = "Accepted";

    await booking.save();

    await booking.populate([
      {
        path: "user",
        select: "name email phone",
      },
      {
        path: "service",
        select: "name category",
      },
      {
        path: "technician",
        select: "name profession",
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Booking accepted",
      booking,
    });

  }
);

// =============================
// UPDATE BOOKING STATUS
// =============================
export const updateBookingStatus = asyncHandler(
  async (req: AuthRequest, res: Response) => {
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

    const booking = await Booking.findById(req.params.id);

if (!booking) {
  res.status(404).json({
    success: false,
    message: "Booking not found",
  });
  return;
}

// Only assigned technician can update
if (
  booking.technician?.toString() !==
  req.user._id.toString()
) {
  res.status(403).json({
    success: false,
    message: "You are not assigned to this booking",
  });
  return;
}

// Don't allow updates after completion
if (
  booking.status === "Completed" ||
  booking.status === "Cancelled"
) {
  res.status(400).json({
    success: false,
    message: `Booking already ${booking.status}`,
  });
  return;
}

// Update status
booking.status = status;

await booking.save();

await booking.populate([
  {
    path: "user",
    select: "name email phone",
  },
  {
    path: "service",
    select: "name category",
  },
  {
    path: "technician",
    select: "name profession",
  },
]);

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

export const getCustomerStats = async (
  req: Request,
  res: Response
) => {
  try {

    const customerId = req.params.id;

    const bookings = await Booking.find({
      user: customerId,
    });

    const totalBookings = bookings.length;

    const completed = bookings.filter(
      booking => booking.status === "Completed"
    ).length;

    const cancelled = bookings.filter(
      booking => booking.status === "Cancelled"
    ).length;

    res.json({
      success: true,
      stats: {
        totalBookings,
        completed,
        cancelled
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};
