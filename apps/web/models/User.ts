import { Schema, model, models } from 'mongoose';
import type { UserRole } from '@socialecho/shared';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['USER','MOD','ADMIN'], default: 'USER' },
  devices: [{
    ipHash: String,
    uaHash: String,
    lastSeen: String,
    trusted: Boolean
  }]
}, { timestamps: true });

UserSchema.methods.verifyPassword = function (password: string) {
  return bcrypt.compare(password, this.passwordHash);
};

export default models.User || model('User', UserSchema);
