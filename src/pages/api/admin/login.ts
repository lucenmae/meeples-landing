import { NextApiRequest, NextApiResponse } from 'next';
import { AdminService } from '../../../models/Admin';
import jwt from 'jsonwebtoken';
import connectMongoDB from '../../../lib/mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await connectMongoDB();

	if (req.method === 'POST') {
		const { username, password } = req.body;

		if (!username || !password) {
			return res.status(400).json({ error: 'Username and password are required' });
		}

		try {
			const admin = await AdminService.authenticate(username, password);
			if (admin) {
				const token = jwt.sign({ id: admin._id, username: admin.username }, JWT_SECRET, { expiresIn: '1h' });
				res.status(200).json({ token });
			} else {
				res.status(401).json({ error: 'Invalid credentials' });
			}
		} catch (error) {
			res.status(500).json({ error: 'Error during login' });
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}