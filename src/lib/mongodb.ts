import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
    }
    if (mongoose.connection.readyState === 1) {
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI);
    // Consider using a logging library or removing this console.log
  } catch (error) {
    // Consider using a logging library or removing this console.error
    throw new Error('Failed to connect to MongoDB');
  }
};

export default connectMongoDB;