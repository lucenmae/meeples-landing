import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  bggLink: String,
});

export default mongoose.model('Game', gameSchema);