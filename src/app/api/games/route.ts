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
