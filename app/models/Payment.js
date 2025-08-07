import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const paymentSchema = new Schema({
  name: {
    type: String,
    default: 'Anonymous',
  },
  to_user: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  order_id: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },

  done: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.Payment ||
  mongoose.model('Payment', paymentSchema);
