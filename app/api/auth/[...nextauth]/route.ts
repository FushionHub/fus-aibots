import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import EmailProvider from 'next-auth/providers/email';
import prisma from '@/lib/prisma';

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // Add user ID and credits to the session object
      if (session.user) {
        session.user.id = user.id;
        const userCredits = await prisma.credit.findUnique({
          where: { userId: user.id },
        });
        // @ts-ignore
        session.user.credits = userCredits?.credits ?? 0;
      }
      return session;
    },
  },
  events: {
    async createUser(message) {
      // Create a credit entry for the new user
      await prisma.credit.create({
        data: {
          userId: message.user.id,
          credits: 10, // Give 10 free credits on sign up
        },
      });
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request', // (e.g. a page telling the user to check their email for a verification link)
    error: '/auth/error', // Error code passed in query string as ?error=
  },
});

export { handler as GET, handler as POST };
