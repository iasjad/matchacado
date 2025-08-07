import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import mongoose from 'mongoose';
import User from '@/app/models/User';
import Payment from '@/app/models/Payment';
import connectDB from '@/app/db/connectDB';

const authOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === 'github' || account.provider === 'google') {
        try {
          await connectDB();
          const currentUser = await User.findOne({ email: user.email });

          if (!currentUser) {
            const newUser = new User({
              email: user.email,
              name: user.name,
              profilePicture: user.image || '',
              username: user.name || user.email.split('@')[0],
            });
            await newUser.save();
          }
          return true;
        } catch (error) {
          console.error('SignIn error:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        try {
          await connectDB();
          const dbUser = await User.findOne({ email: session.user.email });
          if (dbUser) {
            session.user.id = dbUser._id.toString();
            session.user.username = dbUser.username;
          }
        } catch (error) {
          console.error('Session error:', error);
        }
      }
      return session;
    },
  },
});

export { authOptions as GET, authOptions as HEAD, authOptions as POST };
