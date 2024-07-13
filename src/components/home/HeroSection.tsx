import { useEffect, useState } from 'react';

import Button from '@/components/buttons/Button';
import Modal from '@/components/modals/Modal';

export default function HeroSection() {
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
      <div className='relative isolate px-6 pt-14 lg:px-8'>
        <div
          className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
          aria-hidden='true'
        >
          <div
            className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <section className='flex items-center justify-center min-h-[50vh] py-32'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center items-center'>
            <h1 className='max-w-2xl mx-auto text-center font-manrope font-bold text-3xl text-gray-900 mb-5 md:text-4xl lg:text-5xl leading-snug md:leading-normal'>
              Transform Your Business with{' '}
              <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-red-400 to-orange-500'>
                Cirquolus{' '}
              </span>
            </h1>
            <p className='max-w-md mx-auto text-center text-base font-normal leading-7 text-gray-600 mb-9'>
              Simplify and improve business operations with our <br />
              <span className='font-bold'>
                all-in-one management solution
              </span>{' '}
              for modern enterprises.
            </p>

            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Button
                variant='primary'
                className='px-4'
                onClick={() => setIsModalOpen(true)}
              >
                Request Demo
              </Button>
            </div>
          </div>
          <Modal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            title='Request a Demo'
            description='Contact Us'
            primaryAction={handlePrimaryAction}
            primaryLabel='Confirm'
          />
        </section>

        <div
          className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
          aria-hidden='true'
        >
          <div
            className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
