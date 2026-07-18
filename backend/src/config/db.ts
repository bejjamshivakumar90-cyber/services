import dns from "node:dns";
import mongoose from "mongoose";

dns.setServers([
  "1.1.1.1",
  "8.8.8.8",
]);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    console.log("✅ Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
};

export default connectDB;