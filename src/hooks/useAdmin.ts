import { useSession } from 'next-auth/react';

export function useAdmin() {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.isAdmin ?? false;
  const isLoading = status === 'loading';

  return { isAdmin, isLoading };
}