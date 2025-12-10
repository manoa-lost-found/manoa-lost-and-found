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

        const validPass = await compare(credentials.password, user.password);
        if (!validPass) return null;

        if (!user.emailVerified) {
          throw new Error('EmailNotVerified');
        }

        // Block disabled accounts at login
        if (user.role === 'DISABLED') {
          throw new Error('AccountDisabled');
        }

        return {
          id: `${user.id}`,
          email: user.email,
          role: user.role,
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

        const validPass = await compare(credentials.password, user.password);
        if (!validPass) return null;

        if (!user.emailVerified) {
          throw new Error('EmailNotVerified');
        }

        // Must be admin
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
       SIGN-IN CHECK
    --------------------------------------- */
    async signIn({ user }) {
      if (!user?.email) return false;
      return true;
    },

    /* ---------------------------------------
       SESSION CALLBACK
    --------------------------------------- */
    async session({ session, token }) {
      // If token says DISABLED, strip user info from session
      if (token.role === 'DISABLED') {
        return {
          ...session,
          user: undefined,
        };
      }

      if (!session.user) {
        return session;
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        },
      };
    },

    /* ---------------------------------------
       JWT CALLBACK
       - Runs on every request
       - Keeps token in sync with DB (role changes, disabling, etc.)
    --------------------------------------- */
    async jwt({ token, user }) {
      // First time (login) - user comes from authorize()
      if (user) {
        const u = user as any;
        return {
          ...token,
          id: u.id,
          email: u.email,
          role: u.role,
        };
      }

      // Subsequent calls: keep token role in sync with DB
      try {
        const userId = token.id ? Number(token.id) : undefined;
        let dbUser = null;

        if (Number.isInteger(userId)) {
          dbUser = await prisma.user.findUnique({
            where: { id: userId },
          });
        } else if (token.email) {
          dbUser = await prisma.user.findUnique({
            where: { email: token.email as string },
          });
        }

        if (!dbUser) {
          // If the user no longer exists, treat them as disabled
          return {
            ...token,
            role: 'DISABLED',
          };
        }

        // Sync latest role & email from DB
        return {
          ...token,
          id: dbUser.id.toString(),
          email: dbUser.email,
          role: dbUser.role,
        };
      } catch (err) {
        // On any DB error, do not break auth; just return token as-is
        return token;
      }
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
