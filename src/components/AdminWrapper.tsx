'use client';

import { useAdmin } from '@/hooks/useAdmin';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AdminWrapperProps {
  children: ReactNode;
}

export function AdminWrapper({ children }: AdminWrapperProps) {
  const { isAdmin, isLoading } = useAdmin();
  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Remove the redirect for non-admin users
  // if (!isAdmin) {
  //   router.push('/auth/login');
  //   return null;
  // }

  return <>{children}</>;
}