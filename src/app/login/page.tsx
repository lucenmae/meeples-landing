import { Metadata } from 'next';

import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <LoginForm />
    </main>
  );
}