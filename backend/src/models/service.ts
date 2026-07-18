import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  name: string;
  category: string;
  description: string;
  price: number;
  duration: string;
  image?: string;
  isActive: boolean;
}

const serviceSchema = new Schema<IService>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: '',
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IService>(
  'Service',
  serviceSchema
);