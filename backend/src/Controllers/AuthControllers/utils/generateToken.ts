import jwt, { SignOptions } from 'jsonwebtoken';

interface TokenPayload {
  userId: number;
}

const generateToken = (userId: number): string => {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET is required in production');
    }
    console.warn('JWT_SECRET not found, using development secret');
  }

  const payload: TokenPayload = { userId };
  
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  const options: SignOptions = { 
    expiresIn: expiresIn as jwt.SignOptions['expiresIn'] 
  };

  return jwt.sign(payload, secret || 'dev-secret-change-in-production', options);
};

export default generateToken;