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
    // Removed console.log statement
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectMongoDB;