/* eslint-disable arrow-body-style */
import { compare } from 'bcrypt';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';

// simple UH email checker
const isHawaiiEmail = (email: string): boolean => {
  return /^[^@\s]+@hawaii\.edu$/i.test(email.trim());
};

// admin whitelist (optional)
const ADMIN_EMAIL_WHITELIST: string[] = (process.env.ADMIN_EMAILS || '')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter((e) => e.length > 0);

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },

  providers: [
    // Normal login
    CredentialsProvider({
      id: 'credentials',
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const email = credentials.email.trim().toLowerCase();
        if (!isHawaiiEmail(email)) throw new Error('InvalidDomain');

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        const valid = await compare(credentials.password, user.password);
        if (!valid) return null;

        if (!user.emailVerified) throw new Error('EmailNotVerified');

        return {
          id: `${user.id}`,
          email: user.email,
          role: user.role,   // <-- FIXED
        };
      },
    }),

    // Admin login
    CredentialsProvider({
      id: 'admin-credentials',
      name: 'Admin Email and Password',
      credentials: {
        email: { label: 'Admin Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const email = credentials.email.trim().toLowerCase();
        if (!isHawaiiEmail(email)) throw new Error('InvalidDomain');

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        const valid = await compare(credentials.password, user.password);
        if (!valid) return null;

        if (!user.emailVerified) throw new Error('EmailNotVerified');

        if (user.role !== 'ADMIN') throw new Error('NotAdmin');

        if (
          ADMIN_EMAIL_WHITELIST.length > 0 &&
          !ADMIN_EMAIL_WHITELIST.includes(email)
        ) {
          throw new Error('NotWhitelisted');
        }

        return {
          id: `${user.id}`,
          email: user.email,
          role: user.role,  // <-- FIXED
        };
      },
    }),
  ],

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },

  callbacks: {
    async signIn({ user }) {
      if (!user?.email) return false;
      return isHawaiiEmail(user.email);
    },

    // FIXED SESSION CALLBACK
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,  // <-- FIXED
        },
      };
    },

    // FIXED JWT CALLBACK
    jwt({ token, user }) {
      if (user) {
        const u = user as any;
        token.id = u.id;
        token.role = u.role; // <-- FIXED
      }
      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
