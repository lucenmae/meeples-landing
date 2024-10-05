import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { verifyToken } from '../../../utils/auth';
import connectMongoDB from '../../../lib/mongodb';

const GameSchema = new mongoose.Schema({
  name: String,
  description: String,
  minPlayers: Number,
  maxPlayers: Number,
});

const Game = mongoose.models.Game || mongoose.model('Game', GameSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongoDB();

  const { method } = req;

  // Verify the admin token
  const token = req.headers.authorization?.split(' ')[1];
  if (!token || !verifyToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  switch (method) {
    case 'GET':
      try {
        const games = await Game.find({});
        res.status(200).json(games);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching games' });
      }
      break;

    case 'POST':
      try {
        const { name, description, minPlayers, maxPlayers } = req.body;
        const game = await Game.create({ name, description, minPlayers, maxPlayers });
        res.status(201).json({ message: 'Game created successfully', gameId: game._id });
      } catch (error) {
        res.status(500).json({ error: 'Error creating game' });
      }
      break;

    case 'PUT':
      try {
        const { id, ...updateData } = req.body;
        const game = await Game.findByIdAndUpdate(id, updateData, { new: true });
        if (!game) {
          res.status(404).json({ error: 'Game not found' });
        } else {
          res.status(200).json({ message: 'Game updated successfully', game });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error updating game' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        const game = await Game.findByIdAndDelete(id);
        if (!game) {
          res.status(404).json({ error: 'Game not found' });
        } else {
          res.status(200).json({ message: 'Game deleted successfully' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error deleting game' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}