import { useEffect, useState } from 'react';

import Button from '@/components/buttons/Button';
import Modal from '@/components/modals/Modal';
import NextImage from '@/components/NextImage';

export default function Example() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    modalRoot.addEventListener('keydown', handleEscape);

    return () => {
      modalRoot.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handlePrimaryAction = () => {
    setIsModalOpen(false);
    // Additional primary action logic here
  };

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8'>
        <div className='mb-14 text-center'>
          <span className='text-md font-medium text-black text-center'>
            Cirquolus App Screenshot
          </span>
        </div>
        <div className='relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0'>
          <svg
            viewBox='0 0 1024 1024'
            className='absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0'
            aria-hidden='true'
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill='url(#759c1415-0410-454c-8f7c-9a820de03641)'
              fillOpacity='0.7'
            />
            <defs>
              <radialGradient id='759c1415-0410-454c-8f7c-9a820de03641'>
                <stop stopColor='#7775D6' />
                <stop offset={1} stopColor='#E935C1' />
              </radialGradient>
            </defs>
          </svg>
          <div className='mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left'>
            <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
              <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-red-400 to-orange-500'>
                Boost your productivity.{' '}
              </span>
              <br />
              Start using our platform today.
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-300'>
              Cirquolus is designed to simplify and enhance your business
              operations.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6 lg:justify-start '>
              <Button
                variant='primary'
                className='px-4'
                onClick={() => setIsModalOpen(true)}
              >
                Request Demo
              </Button>
            </div>
            <Modal
              isOpen={isModalOpen}
              setIsOpen={setIsModalOpen}
              title='Request a Demo'
              description='Contact Us'
              primaryAction={handlePrimaryAction}
              primaryLabel='Confirm'
            />
          </div>
          <div className='relative mt-16 h-80 lg:mt-8'>
            <NextImage
              className='absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10'
              src='/images/demo-section/demo.png'
              alt='Cirquolus App screenshot'
              width={1824}
              height={1080}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
