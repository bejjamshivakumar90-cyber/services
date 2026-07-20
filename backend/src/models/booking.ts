import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;

  customerName: string;
  email: string;
  phone: string;

  service: mongoose.Types.ObjectId;
  technician?: mongoose.Types.ObjectId;

  address: string;
  city: string;
  pincode: string;

  bookingDate: Date;
  bookingTime: string;

  problem: string;
  image?: string;

  status: string;
}



const bookingSchema = new Schema<IBooking>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },

    technician: {
      type: Schema.Types.ObjectId,
      ref: 'Technician',
      default: null,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },

    bookingDate: {
      type: Date,
      required: true,
    },

    bookingTime: {
      type: String,
      required: true,
    },

    problem: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: '',
    },

    status: {
      type: String,
      enum: [
        'Pending',
        'Assigned',
        'Accepted',
        'On The Way',
        'In Progress',
        'Completed',
        'Cancelled',
      ],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBooking>(
  'Booking',
  bookingSchema
);