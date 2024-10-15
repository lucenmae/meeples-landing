import { Metadata } from 'next';
import dynamic from 'next/dynamic';

import Navbar from '@/components/layout/Navbar';

import LoginForm from '../../components/login/LoginForm';


export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

const DynamicBoxes = dynamic(() => import('@/components/ui/background-boxes').then(mod => mod.Boxes), {
  ssr: false,
  loading: () => <div className="fixed left-0 top-0 w-full h-full bg-[#F3F3F3]" />
});

export default function LoginPage() {
  return (
    <>
      <DynamicBoxes />
      <Navbar 
        buttonClassName="cursor-pointer" 
        logoClassName="cursor-pointer"
      />
      <LoginForm />
    </>
  );
}
