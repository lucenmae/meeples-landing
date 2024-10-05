import cors from 'cors';
// import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import gamesRouter from './routes/games';

// dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => logMessage('Connected to MongoDB'))
  .catch(err => logError('Error connecting to MongoDB:', err));

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Hello from LSU Meeples backend!');
});

app.use('/api/games', gamesRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

function logMessage(message: string) {
  // Implement your logging logic here, e.g., write to a file or use a logging library
  console.log(message); // This can be replaced with a more sophisticated logging mechanism
}

function logError(error: string, err: any) {
  // Implement your error logging logic here
  console.error(error, err); // This can be replaced with a more sophisticated logging mechanism
}