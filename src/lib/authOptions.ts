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
       NORMAL USER LOGIN
    ------------------------------------------------------------ */
    CredentialsProvider({
      id: 'credentials',
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'you@hawaii.edu' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        console.log('➡️ USER LOGIN START', credentials);

        if (!credentials?.email || !credentials.password) {
          console.log('❌ Missing credentials');
          return null;
        }

        const email = credentials.email.trim().toLowerCase();
        console.log('➡️ Normalized email:', email);

        if (!isHawaiiEmail(email)) {
          console.log('❌ Invalid email domain');
          throw new Error('InvalidDomain');
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        console.log('➡️ Prisma user result:', user);

        if (!user) {
          console.log('❌ No user found');
          return null;
        }

        const validPass = await compare(credentials.password, user.password);
        console.log('➡️ Password match:', validPass);

        if (!validPass) {
          console.log('❌ Wrong password');
          return null;
        }

        if (!user.emailVerified) {
          console.log('❌ Email not verified');
          throw new Error('EmailNotVerified');
        }

        if (user.role === 'DISABLED') {
          console.log('❌ User disabled');
          throw new Error('AccountDisabled');
        }

        console.log('✅ USER LOGIN SUCCESS', {
          id: user.id,
          email: user.email,
          role: user.role,
        });

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
      name: 'Admin Login',
      credentials: {
        email: { label: 'Admin Email', type: 'email', placeholder: 'you@hawaii.edu' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        console.log('➡️ ADMIN LOGIN START', credentials);

        if (!credentials?.email || !credentials.password) {
          console.log('❌ Missing credentials');
          return null;
        }

        const email = credentials.email.trim().toLowerCase();
        console.log('➡️ Normalized email:', email);

        if (!isHawaiiEmail(email)) {
          console.log('❌ Invalid email domain for admin');
          throw new Error('InvalidDomain');
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        console.log('➡️ Prisma admin result:', user);

        if (!user) {
          console.log('❌ No admin user found');
          return null;
        }

        const validPass = await compare(credentials.password, user.password);
        console.log('➡️ Admin password match:', validPass);

        if (!validPass) {
          console.log('❌ Wrong admin password');
          return null;
        }

        if (!user.emailVerified) {
          console.log('❌ Admin email not verified');
          throw new Error('EmailNotVerified');
        }

        if (user.role !== 'ADMIN') {
          console.log('❌ Not an admin account');
          throw new Error('NotAdmin');
        }

        console.log('✅ ADMIN LOGIN SUCCESS', {
          id: user.id,
          email: user.email,
          role: user.role,
        });

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
      return !!user?.email;
    },

    /* ---------------------------------------
       SESSION CALLBACK
    --------------------------------------- */
    async session({ session, token }) {
      console.log('➡️ SESSION CALLBACK', { token, session });

      if (token.role === 'DISABLED') {
        console.log('❌ Session blocked: user disabled');
        return {
          ...session,
          user: undefined,
        };
      }

      if (!session.user) return session;

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
    --------------------------------------- */
    async jwt({ token, user }) {
      console.log('➡️ JWT CALLBACK START', { token, user });

      // First login
      if (user) {
        console.log('➡️ JWT first login user object:', user);

        return {
          ...token,
          id: (user as any).id,
          email: (user as any).email,
          role: (user as any).role,
        };
      }

      // Sync role with database every request
      try {
        const userId = token.id ? Number(token.id) : undefined;

        let dbUser = null;

        if (Number.isInteger(userId)) {
          dbUser = await prisma.user.findUnique({ where: { id: userId } });
        } else if (token.email) {
          dbUser = await prisma.user.findUnique({ where: { email: token.email as string } });
        }

        console.log('➡️ JWT DB user:', dbUser);

        if (!dbUser) {
          console.log('❌ JWT user not found → disabling');
          return { ...token, role: 'DISABLED' };
        }

        return {
          ...token,
          id: dbUser.id.toString(),
          email: dbUser.email,
          role: dbUser.role,
        };
      } catch (err) {
        console.log('❌ JWT exception:', err);
        return token;
      }
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
