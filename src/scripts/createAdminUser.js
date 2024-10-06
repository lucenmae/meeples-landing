const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

async function createAdminUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');

    const adminPassword = '@M3ep!es'; // Change this to a secure password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const adminUser = {
      username: 'admin_meeples',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: null,
      isActive: true
    };

    const result = await usersCollection.insertOne(adminUser);
    console.log('Admin user created successfully:', result.insertedId);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
  }
}

createAdminUser();