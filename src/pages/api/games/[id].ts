import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectMongoDB from '@/lib/mongodb';
import { Game } from '@/models/Game';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  await connectMongoDB();

  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      await Game.findByIdAndDelete(id);
      res.status(200).json({ message: 'Game deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting game' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
