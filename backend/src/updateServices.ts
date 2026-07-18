import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Service from './models/service';

dotenv.config();

const updateServices = async () => {
  await mongoose.connect(process.env.MONGODB_URI!);

  const result = await Service.updateMany(
    {},
    {
      $set: {
        isActive: true,
      },
    }
  );

  console.log(result);

  await mongoose.disconnect();
};

updateServices();