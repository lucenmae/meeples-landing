import User from '@/models/User';

export async function findUserByRole(role: string): Promise<typeof User | null> {
  return await User.findOne({ role });
}

export async function createUser(userData: {
  username: string;
  password: string;
  role: string;
}): Promise<typeof User> {
  const newUser = new User(userData);
  return await newUser.save();
}