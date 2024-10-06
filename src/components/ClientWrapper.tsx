'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { AdminWrapper } from './AdminWrapper';

export const ClientWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SessionProvider>
      <AdminWrapper>
        <div className="relative flex min-h-screen min-w-full flex-col">
          <div>{children}</div>
        </div>
      </AdminWrapper>
    </SessionProvider>
  );
};