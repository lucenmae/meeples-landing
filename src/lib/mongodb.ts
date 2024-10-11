import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error(
        'MONGODB_URI is not defined in the environment variables',
      );
    }
    await mongoose.connect(process.env.MONGODB_URI);
    // eslint-disable-next-line no-console
  } catch (error) {
  }
};

export default connectMongoDB;
