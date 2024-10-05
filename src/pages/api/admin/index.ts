import { NextApiRequest, NextApiResponse } from 'next';
import { AdminService } from '../../../models/Admin';
import connectMongoDB from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongoDB();

  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
      const admin = await AdminService.create(username, password);
      res.status(201).json({ message: 'Admin created successfully', admin: { _id: admin._id, username: admin.username } });
    } catch (error) {
      res.status(500).json({ error: 'Error creating admin' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}