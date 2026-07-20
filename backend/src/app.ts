import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bookingRoutes from './routes/bookings';
import errorHandler from './middleware/erroshandler';
import authRoutes from './routes/auth';
import technicianRoutes from './routes/technicians';

// Routes
import serviceRoutes from './routes/services';

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/technicians', technicianRoutes);

// Root Route
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to ServiceSquare API 🚀',
  });
});

// 404 Route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Error Handling Middleware
app.use(errorHandler);

export default app;