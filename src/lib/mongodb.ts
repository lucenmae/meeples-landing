import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

async function connectToDatabase() {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log('Already connected to MongoDB');
      return;
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export default connectToDatabase;