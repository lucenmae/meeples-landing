import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

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
    // eslint-disable-next-line no-console
  }
};

export default connectMongoDB;
