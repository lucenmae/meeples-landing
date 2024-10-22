import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';
import connectMongoDB from '@/lib/mongodb';

import { Game } from '@/models/Game';

export async function GET() {
  await connectMongoDB();
  const games = await Game.find({});
  return NextResponse.json(games);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  await connectMongoDB();
  const { name, description, imageUrl, bggLink } = await request.json();
  const newGame = new Game({ name, description, imageUrl, bggLink });
  try {
    await newGame.save();
    return NextResponse.json(newGame, { status: 201 });
  } catch (error) {
    console.error('Error creating game:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Error creating game', error: error.message, stack: error.stack }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Error creating game', error: 'Unknown error' }, { status: 500 });
    }
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  await connectMongoDB();
  const { name, description, imageUrl, bggLink } = await request.json();
  try {
    const updatedGame = await Game.findByIdAndUpdate(params.id, { name, description, imageUrl, bggLink }, { new: true });
    if (!updatedGame) {
      return NextResponse.json({ message: 'Game not found' }, { status: 404 });
    }
    return NextResponse.json(updatedGame, { status: 200 });
  } catch (error) {
    console.error('Error updating game:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Error updating game', error: error.message, stack: error.stack }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Error updating game', error: 'Unknown error' }, { status: 500 });
    }
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  await connectMongoDB();
  await Game.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Game deleted successfully' });
}