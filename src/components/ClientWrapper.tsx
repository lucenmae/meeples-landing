'use client';

import React from 'react';

import ScrollToTopButton from './ScrollToTop';

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
  return (
    <>
      {children}
      <ScrollToTopButton />
    </>
  );
};

export default ClientWrapper;
