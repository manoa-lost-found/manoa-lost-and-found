/* eslint-disable arrow-body-style */
import { compare } from 'bcrypt';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';

// Only allow @hawaii.edu emails
const isHawaiiEmail = (email: string): boolean => {
  return /^[^@\s]+@hawaii\.edu$/i.test(email.trim());
};

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },

  providers: [
    /* ------------------------------------------------------------
       NORMAL LOGIN
    ------------------------------------------------------------ */
    CredentialsProvider({
      id: 'credentials',
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'you@hawaii.edu' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

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

        // BLOCK DISABLED ACCOUNTS
        if (user.role === 'DISABLED') {
          throw new Error('AccountDisabled');
        }

        return {
          id: `${user.id}`,
          email: user.email,
          role: user.role, // <-- REAL ROLE FIELD
        };
      },
    }),

    /* ------------------------------------------------------------
       ADMIN LOGIN
    ------------------------------------------------------------ */
    CredentialsProvider({
      id: 'admin-credentials',
      name: 'Admin Only Login',
      credentials: {
        email: { label: 'Admin Email', type: 'email', placeholder: 'you@hawaii.edu' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

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

        if (user.role !== 'ADMIN') {
          throw new Error('NotAdmin');
        }

        return {
          id: `${user.id}`,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },

  callbacks: {
    /* ---------------------------------------
       BLOCK DISABLED USERS AT SIGN-IN
    --------------------------------------- */
    async signIn({ user }) {
      if (!user?.email) return false;
      return true;
    },

    /* ---------------------------------------
       ATTACH ROLE + ID INTO SESSION
    --------------------------------------- */
    session: ({ session, token }) => {
      // If a DISABLED account somehow has a token → wipe session (forces logout)
      if (token.role === 'DISABLED') {
        return {
          ...session,
          user: undefined,
        };
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role, // <-- REAL ROLE
        },
      };
    },

    /* ---------------------------------------
       ATTACH ROLE + ID INTO JWT
    --------------------------------------- */
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: (user as any).role,
        };
      }
      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
