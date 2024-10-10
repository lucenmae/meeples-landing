/* eslint-disable unused-imports/no-unused-vars */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        usernameOrEmail,
        password,
      });

      console.log('SignIn result:', result);

      if (result?.error) {
        setError('Invalid username/email or password');
        console.error('SignIn error:', result.error);
      } else if (result?.ok) {
        router.push('/admin/dashboard');
      } else {
        setError('An unexpected error occurred');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <section className="bg-white">
          <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
            <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
              <Image
                alt="Pattern"
                src="/images/hero-image.jpg"
                className="absolute inset-0 h-full w-full object-cover"
                width={1000}
                height={1000}
              />
            </aside>

            <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
              <div className="max-w-xl lg:max-w-3xl">
                <a className="block text-blue-600" href="/">
                  <span className="sr-only">Home</span>
                  <Image src="/images/meeples-logo.png" alt="Meeples Logo" width={150} height={150} />
                </a>

                <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Welcome back to Meeples
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                  Log in to access the admin dashboard and manage your tabletop gaming community.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
                  <div className="col-span-6">
                    <label htmlFor="UsernameOrEmail" className="block text-sm font-medium text-gray-700">
                      Username or Email
                    </label>

                    <input
                      type="text"
                      id="UsernameOrEmail"
                      name="usernameOrEmail"
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                      value={usernameOrEmail}
                      onChange={(e) => setUsernameOrEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>

                    <input
                      type="password"
                      id="Password"
                      name="password"
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {error && (
                    <div className="col-span-6">
                      <p className="text-red-500">{error}</p>
                    </div>
                  )}

                  <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                    <button
                      className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                      type="submit"
                    >
                      Log in
                    </button>

                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                      Don&apos;t have an account?
                      <Link href="/" className="text-gray-700 underline">
                        Contact admin
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </main>
          </div>
        </section>
      </div>
    </main>
  );
}