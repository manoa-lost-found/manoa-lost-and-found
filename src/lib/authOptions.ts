/* eslint-disable arrow-body-style */
import { compare } from 'bcrypt';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';

// Allow only @hawaii.edu emails
const isHawaiiEmail = (email: string): boolean => {
  return /^[^@\s]+@hawaii\.edu$/i.test(email.trim());
};

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
          throw new Error('InvalidDomain');
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) return null;

        const isPasswordValid = await compare(credentials.password, user.password);
        if (!isPasswordValid) return null;

        if (!user.emailVerified) {
          throw new Error('EmailNotVerified');
        }

        return {
          id: `${user.id}`,
          email: user.email,
          randomKey: user.role, // ADMIN or USER
        };
      },
    }),

    // Admin login (NO WHITELIST)
    CredentialsProvider({
      id: 'admin-credentials',
      name: 'Admin Only Login',
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
        if (!user) return null;

        const isPasswordValid = await compare(credentials.password, user.password);
        if (!isPasswordValid) return null;

        if (!user.emailVerified) {
          throw new Error('EmailNotVerified');
        }

        // ONLY check DB role (no whitelist)
        if (user.role !== 'ADMIN') {
          throw new Error('NotAdmin');
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
    async signIn({ user }) {
      if (!user?.email) return false;
      return isHawaiiEmail(user.email);
    },

    session: ({ session, token }) => {
      const newSession = {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
      return newSession;
    },

    jwt: ({ token, user }) => {
      if (user) {
        const u: any = user;
        const newToken = {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
        return newToken;
      }
      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
