import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  bggLink: { type: String, required: true },
}, { timestamps: true });

export const Game = mongoose.models.Game || mongoose.model('Game', GameSchema);
