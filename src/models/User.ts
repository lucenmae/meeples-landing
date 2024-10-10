import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ['Admin', 'Member', 'Guest'],
    default: 'Guest',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: null },
  isActive: { type: Boolean, default: true },
});

UserSchema.pre('save', function(next) {
  if (!this.userName) {
    this.userName = this.email;
  }
  next();
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
