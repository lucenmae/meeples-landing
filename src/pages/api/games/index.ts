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

  if (req.method === 'GET') {
    try {
      const games = await Game.find({});
      res.status(200).json(games);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching games' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, description, minPlayers, maxPlayers, imageUrl, bggLink } = req.body;
      const newGame = new Game({
        name,
        description,
        minPlayers,
        maxPlayers,
        imageUrl,
        bggLink,
      });
      await newGame.save();
      res.status(201).json(newGame);
    } catch (error) {
      res.status(500).json({ message: 'Error creating game' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
