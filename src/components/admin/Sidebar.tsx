'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out flex flex-col`}>
      <div className="flex items-center justify-between h-16 px-4">
        <Link href="#" className="flex items-center">
          {isOpen && <span className="ml-2 text-lg font-bold">Admin Dashboard</span>}
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <nav className="flex-1 mt-8">
        <Link href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors duration-200">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          {isOpen && <span className="ml-2">Dashboard</span>}
        </Link>
        {/* Add more menu items here */}
      </nav>
      <div className="px-4 py-2 mt-auto">
        <button
          onClick={() => signOut()}
          className="flex items-center w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}