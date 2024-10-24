import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true, // Add this line to create an index on the name field
  },
  description: String,
  minPlayers: Number,
  maxPlayers: Number,
  imageUrl: String,
  bggLink: String,
}, { timestamps: true });

export const Game = mongoose.models.Game || mongoose.model('Game', GameSchema);
