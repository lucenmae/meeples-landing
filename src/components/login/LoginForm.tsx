/* eslint-disable unused-imports/no-unused-vars */
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import MeepleButton from '../ui/meeple-button';
import Loading from '@/app/loading';

export default function LoginForm() {
  const router = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (isLogin) {
      try {
        const result = await signIn('credentials', {
          redirect: false,
          usernameOrEmail,
          password,
        });

        if (result?.error) {
          setError('Invalid username/email or password');
          setIsLoading(false);
        } else if (result?.ok) {
          router.push('/admin/game-inventory');
          // Keep isLoading true as we're transitioning to the admin page
        } else {
          setError('An unexpected error occurred');
          setIsLoading(false);
        }
      } catch (error) {
        setError('An error occurred during login');
        setIsLoading(false);
      }
    } else {
      // Handle sign up logic here
      setError('Sign up functionality is not implemented yet');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className='flex flex-col h-screen'>
      <div className='absolute inset-0 w-full bg-[#F3F3F3] z--10 [mask-image:radial-gradient(transparent,white)] pointer-events-none' />

      <div className='flex-grow flex items-center justify-center'>
        <div className='wrapper'>
          <div className='card-switch'>
            <label className='switch'>
              <input
                type='checkbox'
                className='toggle'
                checked={!isLogin}
                onChange={() => setIsLogin(!isLogin)}
              />
              <span className='slider'></span>
              <span className='card-side'></span>
              <div className='flip-card__inner'>
                <div className='flip-card__front'>
                  <div className='flex justify-center'>
                    <Image
                      src='/images/meeples-wordmark.png'
                      alt='Meeples Wordmark'
                      className='mt-4'
                      width={200}
                      height={100}
                    />
                  </div>

                  <div className='title'>Log in</div>

                  <form className='flip-card__form' onSubmit={handleSubmit}>
                    <input
                      className='flip-card__input'
                      name='usernameOrEmail'
                      placeholder='Username or Email'
                      type='text'
                      value={usernameOrEmail}
                      onChange={(e) => setUsernameOrEmail(e.target.value)}
                      required
                    />
                    <input
                      className='flip-card__input'
                      name='password'
                      placeholder='Password'
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {error && (
                      <div className='error-message text-center'>
                        <p className='text-red-500 text-sm mb-0'>{error}</p>
                      </div>
                    )}
                    <MeepleButton
                      type='submit'
                      variant='primary'
                      className='w-full hover:bg-white'
                    >
                      Let's go!
                    </MeepleButton>
                  </form>
                </div>
                <div className='flip-card__back'>
                  {/* <div className="title">Sign up</div> */}
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
                  <div className='coming-soon-message'>
                    <p>Sign up functionality coming soon! ^^</p>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </main>
  );
}
