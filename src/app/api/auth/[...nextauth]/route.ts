/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import connectToDatabase from '@/lib/mongodb';

// Extend the built-in session types
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: 'user' | 'admin';
    } & DefaultSession['user']
  }
}

// Extend the built-in JWT types
declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'user' | 'admin';
  }
}

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        await connectToDatabase();
        const user = await User.findOne({ username: credentials.username });

        if (!user) {
          return null;
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordCorrect) {
          return null;
        }

        return {
          id: user._id.toString(),
          username: user.username,
          role: user.role as 'user' | 'admin',
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login', // Update this line
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };