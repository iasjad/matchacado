'use server';

import Razorpay from 'razorpay';
import connectDB from '@/app/db/connectDB';
import User from '@/app/models/User';
import Payment from '@/app/models/Payment';

export const createPayment = async (amount, to_username, paymentform) => {
  await connectDB();
  let user = await User.findOne({ username: to_username });
  const secret = user.razorpaysecret;
  const key = user.razorpayid;
  var instance = new Razorpay({
    key_id: key,
    key_secret: secret,
  });

  let options = {
    amount: Number.parseInt(amount),
    currency: 'INR',
  };
  let x = await instance.orders.create(options);

  await Payment.create({
    amount: amount / 100,
    name: paymentform.name || 'Anonymous',
    email: paymentform.email || '',
    message: paymentform.message || '',
    to_user: to_username,
    order_id: x.id,
  });

  return x;
};

export const fetchuser = async (identifier) => {
  await connectDB();
  const isEmail = identifier.includes('@');
  const query = isEmail ? { email: identifier } : { username: identifier };

  let u = await User.findOne(query);

  if (!u) {
    return null;
  }
  let user = u.toObject({ flattenObjectIds: true });
  return user;
};

export const fetchpayments = async (username) => {
  await connectDB();
  let p = await Payment.find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .lean();

  if (!p || p.length === 0) {
    return [];
  }

  return p.map((payment) => ({
    ...payment,
    _id: payment._id.toString(),
    createdAt: payment.createdAt.toISOString(),
    updatedAt: payment.updatedAt.toISOString(),
  }));
};

export const updateProfile = async (data, oldUsername) => {
  await connectDB();
  let ndata = Object.fromEntries(data);
  if (oldUsername !== ndata.username) {
    let u = await User.findOne({ username: ndata.username });
    if (u) {
      return { error: 'Username already exists' };
    }
    await User.updateOne({ email: ndata.email }, ndata);
    await Payment.updateMany(
      { to_user: oldUsername },
      { to_user: ndata.username }
    );
  } else {
    await User.updateOne({ email: ndata.email }, ndata);
  }
};
