'use client';

import {Clock, Gamepad, Menu, Rss, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
  isMinimized: boolean;
}

const navItems = [
  { icon: Gamepad, label: "Game Management", href: "/admin/games" },
  { icon: Rss, label: "Blog Management", href: "/admin/blogs" },
  { icon: Users, label: "User Management", href: "/admin/users" },
  { icon: Clock, label: "Activity Log", href: "/admin/activity" },
];

export default function Sidebar({ isOpen, setIsOpen, toggleSidebar, isMinimized }: SidebarProps) {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const sidebarWidth = isLargeScreen ? (isMinimized ? 'w-20' : 'w-64') : 'w-64';

  const toggleButtonClass = "p-2 rounded-md bg-meeple-primary border-2 border-black hover:translate-x-1 hover:-translate-y-1 transition-transform duration-200 text-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";

  return (
    <>
      <div className={`${isLargeScreen ? 'translate-x-0' : isOpen ? 'translate-x-0' : '-translate-x-full'} ${sidebarWidth} h-screen bg-meeple-primary text-black font-bold transition-all duration-300 ease-in-out flex flex-col fixed left-0 top-0 z-40 lg:relative border-r-4 border-b-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
        <div className="flex items-center justify-between h-16 px-4 border-b-2 border-black">
          {(!isLargeScreen || !isMinimized) && (
            <Link href="/admin/dashboard" className="flex items-center">
              <span className="ml-2 text-lg font-bold">Admin Dashboard</span>
            </Link>
          )}
          <button
            onClick={toggleSidebar}
            className={`${toggleButtonClass} ml-2 ${isLargeScreen ? '' : ''}`}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 mt-4 overflow-y-auto">
          {navItems.map((item, index) => (
            <Link key={index} href={item.href} className="flex items-center px-4 py-3 m-2 bg-meeple-primary border-2 border-black rounded-md hover:translate-x-1 hover:-translate-y-1 transition-transform duration-200">
              <item.icon className="w-5 h-5" />
              {(!isLargeScreen || !isMinimized) && <span className="ml-4">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
