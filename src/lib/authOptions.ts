/* eslint-disable arrow-body-style */
import { compare } from 'bcrypt';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';

// Simple helper to enforce UH emails
const isHawaiiEmail = (email: string): boolean => {
  return /^[^@\s]+@hawaii\.edu$/i.test(email.trim());
};

// Comma-separated list of admin emails in env, e.g.
// ADMIN_EMAILS="admin1@hawaii.edu,admin2@hawaii.edu"
const ADMIN_EMAIL_WHITELIST: string[] = (process.env.ADMIN_EMAILS || '')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter((e) => e.length > 0);

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    // Normal user sign-in
    CredentialsProvider({
      id: 'credentials',
      name: 'Email and Password',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'you@hawaii.edu',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const email = credentials.email.trim().toLowerCase();

        if (!isHawaiiEmail(email)) {
          // Block non-UH emails
          throw new Error('InvalidDomain');
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password,
        );
        if (!isPasswordValid) {
          return null;
        }

        if (!user.emailVerified) {
          // NextAuth will surface this error string to the client
          throw new Error('EmailNotVerified');
        }

        return {
          id: `${user.id}`,
          email: user.email,
          randomKey: user.role,
        };
      },
    }),

    // Admin-only sign-in (whitelist + role check)
    CredentialsProvider({
      id: 'admin-credentials',
      name: 'Admin Email and Password',
      credentials: {
        email: {
          label: 'Admin Email',
          type: 'email',
          placeholder: 'you@hawaii.edu',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const email = credentials.email.trim().toLowerCase();

        if (!isHawaiiEmail(email)) {
          throw new Error('InvalidDomain');
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password,
        );
        if (!isPasswordValid) {
          return null;
        }

        if (!user.emailVerified) {
          throw new Error('EmailNotVerified');
        }

        // Must be admin role in the DB
        if (user.role !== 'ADMIN') {
          throw new Error('NotAdmin');
        }

        // Must be on the whitelist if one is configured
        if (
          ADMIN_EMAIL_WHITELIST.length > 0
          && !ADMIN_EMAIL_WHITELIST.includes(email)
        ) {
          throw new Error('NotWhitelisted');
        }

        return {
          id: `${user.id}`,
          email: user.email,
          randomKey: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  callbacks: {
    // Extra safety: block non-UH emails
    async signIn({ user }) {
      if (!user?.email) {
        return false;
      }
      return isHawaiiEmail(user.email);
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
