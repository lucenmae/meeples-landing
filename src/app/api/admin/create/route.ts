import { NextResponse } from 'next/server';

import connectMongoDB from '../../../../lib/mongodb';
import { AdminService } from '../../../models/Admin';

export async function POST(request: Request) {
  await connectMongoDB();

  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
  }

  try {
    const admin = await AdminService.create(username, password);
    return NextResponse.json({ message: 'Admin created successfully', admin: { _id: admin._id, username: admin.username } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating admin' }, { status: 500 });
  }
}