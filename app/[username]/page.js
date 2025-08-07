import React from 'react';
import PaymentPage from '@/components/PaymentPage';
import { notFound } from 'next/navigation';
import connectDB from '@/app/db/connectDB';
import User from '@/app/models/User';

const Username = async ({ params }) => {
  const { username } = await params;

  await connectDB();
  let u = await User.findOne({ username: username });
  if (!u) {
    notFound();
  }
  return (
    <>
      <PaymentPage username={username} />
    </>
  );
};

export default Username;
export async function generateMetadata({ params }) {
  const { username } = await params;
  return {
    title: `${username} - MatchaCado`,
  };
}
