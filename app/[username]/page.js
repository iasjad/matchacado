import React from 'react';
import PaymentPage from '@/components/PaymentPage';
import { notFound } from 'next/navigation';
import connectDB from '@/app/db/connectDB';
import User from '@/app/models/User';

const Username = async ({ params }) => {
  const decodedUsername = decodeURIComponent(params.username);

  await connectDB();
  let u = await User.findOne({ username: decodedUsername });
  if (!u) {
    notFound();
  }
  return (
    <>
      <PaymentPage username={decodedUsername} />
    </>
  );
};

export default Username;
export async function generateMetadata({ params }) {
  const decodedUsername = decodeURIComponent(params.username);
  return {
    title: `${decodedUsername} - MatchaCado`,
  };
}
