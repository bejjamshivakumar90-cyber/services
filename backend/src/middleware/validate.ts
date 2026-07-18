import { Request, Response, NextFunction } from 'express';

const validateRequiredFields = (fields: string[]) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {

    const missingFields = fields.filter(
      (field) =>
        req.body[field] === undefined ||
        req.body[field] === null ||
        req.body[field] === ''
    );

    if (missingFields.length > 0) {
      res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
      });
      return;
    }

    next();
  };
};

export default validateRequiredFields;