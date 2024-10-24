import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';
import connectMongoDB from '@/lib/mongodb';
import { Game } from '@/models/Game';

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

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

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectMongoDB();
    const id = params.id;

    const deletedGame = await Game.findByIdAndDelete(id);

    if (deletedGame) {
      return NextResponse.json({ message: 'Game deleted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Game not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting game:', error);
    return NextResponse.json({ message: 'Error deleting game' }, { status: 500 });
  }
}
