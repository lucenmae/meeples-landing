import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

export interface IAdmin extends mongoose.Document {
  username: string;
  password: string;
}

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

AdminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

AdminSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const Admin = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);

export class AdminService {
  static async findByUsername(username: string): Promise<IAdmin | null> {
    return Admin.findOne({ username });
  }

  static async create(username: string, password: string): Promise<IAdmin> {
    return Admin.create({ username, password });
  }

  static async authenticate(username: string, password: string): Promise<IAdmin | null> {
    const admin = await this.findByUsername(username);
    if (admin && await admin.comparePassword(password)) {
      return admin;
    }
    return null;
  }
}