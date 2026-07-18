import mongoose, { Schema, Document } from 'mongoose';

export interface ITechnician extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  profession: string;
  experience: number;
  city: string;
  isAvailable: boolean;
  rating: number;
  role: 'technician';
}

const technicianSchema = new Schema<ITechnician>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    profession: {
      type: String,
      required: true,
    },

    experience: {
      type: Number,
      default: 0,
    },

    city: {
      type: String,
      required: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    role: {
      type: String,
      default: 'technician',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITechnician>(
  'Technician',
  technicianSchema
);