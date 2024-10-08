import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  name: String,
  description: String,
  minPlayers: Number,
  maxPlayers: Number,
});

export const Game = mongoose.models.Game || mongoose.model('Game', GameSchema);