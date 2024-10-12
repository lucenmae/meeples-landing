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
  const data = await request.json();
  const newGame = new Game(data);
  await newGame.save();
  return NextResponse.json(newGame, { status: 201 });
}
