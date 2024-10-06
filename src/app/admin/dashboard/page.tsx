'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, {session.user?.name || 'Admin'}</h2>
          <p className="mb-4">This is your admin dashboard. You can manage your site from here.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardCard title="Users" count="1,234" />
            <DashboardCard title="Posts" count="56" />
            <DashboardCard title="Comments" count="789" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, count }: { title: string; count: string }) {
  return (
    <div className="bg-blue-100 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{count}</p>
    </div>
  );
}