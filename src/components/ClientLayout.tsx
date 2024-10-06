'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

import { AdminWrapper } from '@/components/AdminWrapper';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminWrapper>
        <div className="relative flex min-h-screen min-w-full flex-col">
          <div>{children}</div>
        </div>
      </AdminWrapper>
    </SessionProvider>
  );
}