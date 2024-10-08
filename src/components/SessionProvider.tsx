'use client';

import { Session } from 'next-auth';
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';

interface CustomSession extends Session {
  user: {
    id: string;
    username: string;
    role: string;
  };
}

interface SessionProviderProps {
  children: React.ReactNode;
  session: CustomSession | null;
}

export default function SessionProvider({ children, session }: SessionProviderProps) {
  return (
    <NextAuthSessionProvider session={session as Session | null}>
      {children}
    </NextAuthSessionProvider>
  );
}