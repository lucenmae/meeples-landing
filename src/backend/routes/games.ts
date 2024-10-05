import express from 'express';

import Game from '../models/Game';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching games' });
  }
});

export default router;