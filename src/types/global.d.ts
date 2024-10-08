import mongoose from 'mongoose';

declare global {
  const mongoose: { 
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  } | undefined;
}

export {};