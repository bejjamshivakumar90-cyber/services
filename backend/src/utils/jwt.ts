import jwt, { SignOptions } from 'jsonwebtoken';

const generateToken = (id: string): string => {

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is missing');
  }

  const options: SignOptions = {
    expiresIn: '7d' as jwt.SignOptions['expiresIn'],
  };

  return jwt.sign(
    { id },
    secret,
    options
  );
};

export default generateToken;