import { verify, JsonWebTokenError } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function verifyToken(token: string): boolean {
  try {
    verify(token, JWT_SECRET);
    return true;
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      console.error('JWT verification failed:', error.message);
    } else {
      console.error('An unexpected error occurred during token verification:', error);
    }
    return false;
  }
}
