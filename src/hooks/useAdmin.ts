import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

export function useAdmin() {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === 'admin';
  const isLoading = status === 'loading';

  return { isAdmin, isLoading };
}