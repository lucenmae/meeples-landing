import { Metadata } from 'next';
import dynamic from 'next/dynamic';

import Loading from '@/app/loading';
import Navbar from '@/components/layout/Navbar';

import LoginForm from '../../components/login/LoginForm';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

const DynamicBoxes = dynamic(
  () => import('@/components/ui/background-boxes').then((mod) => mod.Boxes),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

export default function LoginPage() {
  return (
    <>
      <DynamicBoxes />
      <Navbar buttonClassName='cursor-pointer' logoClassName='cursor-pointer' />
      <LoginForm />
    </>
  );
}
