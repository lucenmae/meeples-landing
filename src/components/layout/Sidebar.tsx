'use client';

import { ChevronLeft, ChevronRight,Clock, Gamepad, Rss, Users } from 'lucide-react';
import Link from 'next/link';

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
  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out flex flex-col fixed left-0 top-0 z-40`}>
      <div className="flex items-center justify-between h-16 px-4">
        <Link href="/admin/dashboard" className="flex items-center">
          {isOpen && <span className="ml-2 text-lg font-bold">Admin Dashboard</span>}
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-gray-700 lg:hidden">
          {isOpen ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
        </button>
      </div>
      <nav className="flex-1 mt-8 overflow-y-auto">
        {navItems.map((item, index) => (
          <Link key={index} href={item.href} className="flex items-center px-4 py-3 hover:bg-gray-700 transition-colors duration-200">
            <item.icon className="w-5 h-5" />
            {isOpen && <span className="ml-4">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
}
