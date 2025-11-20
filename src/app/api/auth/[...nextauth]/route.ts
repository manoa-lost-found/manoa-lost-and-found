// src/app/api/auth/[...nextauth]/route.ts
/* eslint-disable import/prefer-default-export */

import NextAuth from 'next-auth';
import authOptions from '@/lib/authOptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
