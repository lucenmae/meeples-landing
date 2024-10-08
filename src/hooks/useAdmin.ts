import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string; 
}

interface CustomSession extends Session {
  user: User; // Extend the user type
}

export function useAdmin() {
  const { data: session, status } = useSession() as { data: CustomSession; status: 'loading' | 'authenticated' | 'unauthenticated' }; // Include status type
  const isAdmin = session?.user?.role === 'admin';
  const isLoading = status === 'loading';

  return { isAdmin, isLoading };
}