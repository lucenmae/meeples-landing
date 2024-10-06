/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { DefaultSession, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';

// Extend the built-in session types
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      isAdmin: boolean;
    } & DefaultSession['user']
  }
}

// Extend the built-in JWT types
declare module 'next-auth/jwt' {
  interface JWT {
    isAdmin: boolean;
  }
}

export const authOptions = {
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

        // Temporary admin credentials
        const tempAdminUsername = 'admin';
        const tempAdminPassword = 'password123';

        if (
          credentials.username === tempAdminUsername &&
          credentials.password === tempAdminPassword
        ) {
          return { id: '1', name: 'Admin', isAdmin: true } as User;
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User | undefined }) {
      if (user) {
        token.isAdmin = (user as User & { isAdmin: boolean }).isAdmin;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };