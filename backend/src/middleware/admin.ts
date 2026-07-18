import { Response, NextFunction } from 'express';
import { Request } from 'express';


interface AuthRequest extends Request {
  user?: any;
}


const admin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {

  if (req.user && req.user.role === 'admin') {
    next();
    return;
  }

  res.status(403).json({
    success: false,
    message: 'Admin access required',
  });
};


export default admin;