import bcrypt from 'bcryptjs';
import dbConnect from '../src/lib/mongodb';
import User from '../src/models/User';

export async function createAdminUser() {
  await dbConnect();

  const adminUsername = 'admin';
  const adminPassword = 'password123'; // Change this to a secure password

  const existingAdmin = await User.findOne({ username: adminUsername });

  if (existingAdmin) {
    console.log('Admin user already exists');
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const newAdmin = new User({
    username: adminUsername,
    password: hashedPassword,
    isAdmin: true,
  });

  await newAdmin.save();

  console.log('Admin user created successfully');
}

// This line makes it a module
export {};