import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

interface AuthRequest extends Request {
  user?: any;
}

const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {

  try {

    const token =
      req.headers.authorization?.split(' ')[1];


    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Not authorized, token missing',
      });
      return;
    }


    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: string };


    const user = await User.findById(
      decoded.id
    ).select('-password');


    if (!user) {
      res.status(401).json({
        success: false,
        message: 'User not found',
      });
      return;
    }


    req.user = user;

    next();


  } catch (error) {

    res.status(401).json({
      success: false,
      message: 'Invalid token',
    });

  }
};


export default protect;