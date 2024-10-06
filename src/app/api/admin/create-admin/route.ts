import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { MongoClient, ObjectId } from 'mongodb';

export async function POST(request: Request) {
  const { username, password } = await request.json();
  const client = new MongoClient(process.env.MONGODB_URI as string);

  try {
    await client.connect();
    const db = client.db('meeples');
    const usersCollection = db.collection('users');

    const existingAdmin = await usersCollection.findOne({ role: 'admin' });

    if (existingAdmin) {
      return NextResponse.json({ error: 'Admin user already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const now = new Date();
    const newAdmin = await usersCollection.insertOne({
      _id: new ObjectId(),
      username,
      password: hashedPassword,
      role: 'admin',
      createdAt: now,
      updatedAt: now,
      lastLogin: null,
      isActive: true,
    });

    return NextResponse.json({
      message: 'Admin user created successfully',
      id: newAdmin.insertedId,
      username,
      createdAt: now,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating admin user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await client.close();
  }
}