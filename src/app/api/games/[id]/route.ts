import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';
import connectMongoDB from '@/lib/mongodb';
import { Game } from '@/models/Game';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { name, description, imageUrl, bggLink } = await request.json();

  try {
    await connectMongoDB();
    const updatedGame = await Game.findByIdAndUpdate(
      id,
      { name, description, imageUrl, bggLink },
      { new: true }
    );

    if (!updatedGame) {
      return NextResponse.json({ message: 'Game not found' }, { status: 404 });
    }

    return NextResponse.json(updatedGame);
  } catch (error) {
    console.error('Error updating game:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}