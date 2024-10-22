'use client';

import {Clock, Gamepad, Menu, Rss, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const navItems = [
  { icon: Gamepad, label: "Game Management", href: "/admin/games" },
  { icon: Rss, label: "Blog Management", href: "/admin/blogs" },
  { icon: Users, label: "User Management", href: "/admin/users" },
  { icon: Clock, label: "Activity Log", href: "/admin/activity" },
];

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    if (isLargeScreen) {
      setIsMinimized(!isMinimized);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const sidebarWidth = isLargeScreen ? (isMinimized ? 'w-20' : 'w-64') : 'w-64';

  const toggleButtonClass = "p-2 rounded-full hover:bg-gray-700 transition-colors duration-200 text-white";

  return (
    <>
      {!isLargeScreen && !isOpen && (
        <button
          onClick={toggleSidebar}
          className={`fixed top-4 left-4 z-50 ${toggleButtonClass}`}
        >
          <Menu className="w-6 h-6" color="#000000"/>
        </button>
      )}
      <div className={`${isLargeScreen ? 'translate-x-0' : isOpen ? 'translate-x-0' : '-translate-x-full'} ${sidebarWidth} h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out flex flex-col fixed left-0 top-0 z-40 lg:relative`}>
        <div className="flex items-center justify-between h-16 px-4">
          {(!isLargeScreen || !isMinimized) && (
            <Link href="/admin/dashboard" className="flex items-center">
              <span className="ml-2 text-lg font-bold">Admin Dashboard</span>
            </Link>
          )}
          <button
            onClick={toggleSidebar}
            className={toggleButtonClass}
          >
            {isLargeScreen ? 
              (isMinimized ? <Menu className="w-6 h-6" /> : <Menu className="w-6 h-6" />) : 
              <Menu className="w-6 h-6" />
            }
          </button>
        </div>
        <nav className="flex-1 mt-8 overflow-y-auto">
          {navItems.map((item, index) => (
            <Link key={index} href={item.href} className="flex items-center px-4 py-3 hover:bg-gray-700 transition-colors duration-200">
              <item.icon className="w-5 h-5" />
              {(!isLargeScreen || !isMinimized) && <span className="ml-4">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
