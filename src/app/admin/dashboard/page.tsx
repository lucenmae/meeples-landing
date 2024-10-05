'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Dashboard from '../../../components/admin/Dashboard';

export default function AdminDashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Dashboard />;
}