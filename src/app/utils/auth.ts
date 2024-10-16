import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function verifyToken(token: string): boolean {
  try {
    verify(token, JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
}
