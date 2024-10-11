/* eslint-disable unused-imports/no-unused-vars */
'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      try {
        const result = await signIn('credentials', {
          redirect: false,
          usernameOrEmail,
          password,
        });

        if (result?.error) {
          setError('Invalid username/email or password');
        } else if (result?.ok) {
          router.push('/admin/dashboard');
        } else {
          setError('An unexpected error occurred');
        }
      } catch (error) {
        setError('An error occurred during login');
      }
    } else {
      // Handle sign up logic here
      setError('Sign up functionality is not implemented yet');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="wrapper">
        <div className="card-switch">
          <label className="switch">
            <input
              type="checkbox"
              className="toggle"
              checked={!isLogin}
              onChange={() => setIsLogin(!isLogin)}
            />
            <span className="slider"></span>
            <span className="card-side"></span>
            <div className="flip-card__inner">
              <div className="flip-card__front">
                <div className="title">Log in</div>
                <form className="flip-card__form" onSubmit={handleSubmit}>
                  <input
                    className="flip-card__input"
                    name="usernameOrEmail"
                    placeholder="Username or Email"
                    type="text"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    required
                  />
                  <input
                    className="flip-card__input"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button className="flip-card__btn" type="submit">Let's go!</button>
                </form>
              </div>
              <div className="flip-card__back">
                <div className="title">Sign up</div>
                {/* Commented out sign-up form */}
                {/*
                <form className="flip-card__form" onSubmit={handleSubmit}>
                  <input
                    className="flip-card__input"
                    placeholder="Name"
                    type="text"
                    required
                  />
                  <input
                    className="flip-card__input"
                    name="email"
                    placeholder="Email"
                    type="email"
                    required
                  />
                  <input
                    className="flip-card__input"
                    name="password"
                    placeholder="Password"
                    type="password"
                    required
                  />
                  <button className="flip-card__btn" type="submit">Confirm!</button>
                </form>
                */}
                <div className="coming-soon-message">
                  <p>Sign up functionality coming soon!</p>
                  <p>Please check back later.</p>
                </div>
              </div>
            </div>
          </label>
        </div>
        {error && (
          <div className="error-message">
            <p className="text-red-500">{error}</p>
          </div>
        )}
      </div>
    </main>
  );
}