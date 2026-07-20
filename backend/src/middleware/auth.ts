import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import Technician from '../models/technician';

export interface AuthRequest extends Request {
  user?: any;
}

const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Not authorized, token missing',
      });
      return;
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: string };

    const user = await User.findById(decoded.id).select('-password');

if (user) {
  req.user = user;
  return next();
}

const technician = await Technician.findById(decoded.id).select('-password');

if (technician) {
  req.user = technician;
  return next();
}

res.status(401).json({
  success: false,
  message: 'Account not found',
});
return;

    next();

  } catch (error) {

    res.status(401).json({
      success: false,
      message: 'Invalid token',
    });

  }
};

export default protect;