'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateAdminPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isCreated, setIsCreated] = useState(false);
  const router = useRouter();

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Creating admin user...');
    try {
      const response = await fetch('/api/admin/create-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setMessage('Admin user created successfully!');
        setIsCreated(true);
      } else {
        const data = await response.json();
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error creating admin:', error);
      setMessage('An error occurred while creating the admin user.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Create Admin User</h1>
      {!isCreated ? (
        <form onSubmit={handleCreateAdmin} className="w-full max-w-xs">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            Create Admin User
          </button>
        </form>
      ) : (
        <div className="text-center">
          <p className="mb-4">Admin user created successfully!</p>
          <Link href="/admin/login" className="px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline">
            Go to Login Page
          </Link>
        </div>
      )}
      {message && <p className="mt-4 text-lg">{message}</p>}
    </div>
  );
}