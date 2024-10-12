'use client';

import Link from 'next/link';
import { Session } from 'next-auth';
import { useState } from 'react';

import Sidebar from './Sidebar';
import GameManagement from './GameManagement';

interface DashboardProps {
  session: Session;
}

export default function Dashboard({ session }: DashboardProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 lg:hidden"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">Welcome, {session.user.username}!</span>
              <Link href="/admin/create-blog" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Create Blog
              </Link>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <GameManagement />
          </div>
        </main>
      </div>
    </div>
  );
}
