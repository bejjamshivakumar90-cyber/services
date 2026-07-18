
import dns from 'node:dns';
dns.setServers(['1.1.1.1', '8.8.8.8']);











import dotenv from 'dotenv';
import app from './app';
import connectDB from './config/db';



dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();