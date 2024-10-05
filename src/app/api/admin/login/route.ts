import { NextResponse } from 'next/server';
import { AdminService } from '../../../models/Admin';
import jwt from 'jsonwebtoken';
import connectMongoDB from '../../../../lib/mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
  await connectMongoDB();

  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
  }

  try {
    const admin = await AdminService.authenticate(username, password);
    if (admin) {
      const token = jwt.sign({ id: admin._id, username: admin.username }, JWT_SECRET, { expiresIn: '1h' });
      return NextResponse.json({ token });
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error during login' }, { status: 500 });
  }
}