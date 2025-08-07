import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  coverPicture: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  razorpayid: { type: String, default: '' },
  razorpaysecret: { type: String, default: '' },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model('User', userSchema);
