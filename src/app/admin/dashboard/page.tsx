import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';

import Dashboard from '@/components/admin/Dashboard';

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== 'admin') {
    redirect('/login');
  }

  return <Dashboard session={session} />;
}