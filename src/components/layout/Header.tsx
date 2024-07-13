// header.tsx

import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

import Logo from '@/components/Logo';
import NextImage from '@/components/NextImage';

interface NavigationItem {
  name: string;
  href: string;
}

const navigation: NavigationItem[] = [
  { name: 'Rent', href: '#features' },
  { name: 'Games', href: '#pricing' },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <header className='absolute inset-x-0 top-0 z-50 mt-5'>
      <nav
        className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 relative'
        aria-label='Global'
      >
        <div className='flex items-center justify-start sm:justify-center flex-1'>
          <div className='sm:hidden ml-auto'>
            <button
              type='button'
              className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className='sr-only'>Open main menu</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='hidden sm:flex lg:gap-x-12'>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className='inline-block px-5 py-2.5 text-md font-bold text-center text-black bg-white border-2 border-black rounded-md shadow-[5px_5px_0px_#000] transition-all ease-linear  hover:-translate-y-1 active:shadow-none active:translate-y-1'
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
        <div className='hidden sm:flex justify-center sm:justify-start md:justify-center flex-1'>
          <span className='sr-only'>Meeples</span>
          <Logo />
        </div>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4'>
          <a
            href='#about'
            className='inline-block px-5 py-2.5 text-md font-bold text-center text-black bg-white border-2 border-black rounded-md shadow-[5px_5px_0px_#000] transition-all ease-linear  hover:-translate-y-1 active:shadow-none active:translate-y-1 mr-4'
          >
            About
          </a>
          <a href='#' className='text-sm font-semibold leading-6 text-gray-900'>
            <button className='inline-block px-5 py-2.5 text-xl font-bold text-center text-white bg-indigo-500 border-2 border-black rounded-md shadow-[5px_5px_0px_#000] transition-all ease-linear transform scale-90 hover:bg-white hover:text-indigo-500 hover:border-indigo-500 hover:shadow-[5px_5px_0px_#6366F1] hover:scale-100 active:bg-indigo-500 active:border-gray-800 active:text-white active:shadow-none active:translate-y-1'>
              Join Discord
            </button>
          </a>
        </div>
      </nav>
      <Dialog
        className='lg:hidden'
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <div className='fixed inset-0 z-50' />
        <DialogPanel className='items-center fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center justify-between'>
            <a href='#' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Meeples</span>
              <NextImage
                useSkeleton
                className='h-8 w-auto'
                src='/images/cirquolus.png'
                width='90'
                height='90'
                alt='cirquolus logo'
              />
            </a>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <XMarkIcon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6'>
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                  >
                    {item.name}
                  </a>
                ))}
                <a
                  href='#about'
                  className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                >
                  About
                </a>
              </div>
              <div className='py-6'>
                <a
                  href='#'
                  className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                >
                  <button className='inline-block px-5 py-2.5 text-xl font-bold text-center text-white bg-indigo-500 border-2 border-black rounded-md shadow-[5px_5px_0px_#000] transition-all ease-linear transform scale-90 hover:bg-white hover:text-indigo-500 hover:border-indigo-500 hover:shadow-[5px_5px_0px_#6366F1] hover:scale-100 active:bg-indigo-500 active:border-gray-800 active:text-white active:shadow-none active:translate-y-1'>
                    Join Discord
                  </button>
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
    
  );
};

export default Header;
