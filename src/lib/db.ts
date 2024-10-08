import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Define the type for our cached mongoose connection
interface MongooseConnection {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// Use the cached variable to hold mongoose connection information
let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not defined");
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  if (cached.conn) {
    console.log("Using cached database connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log("Attempting to connect to MongoDB...");
    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("Successfully connected to MongoDB");
        return mongoose.connection;
      })
      .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    console.log("Database connection established");
  } catch (e) {
    console.error("Error in database connection:", e);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
