import React, { useEffect, useState } from 'react';

import Button from '@/components/buttons/Button';
import Modal from '@/components/modals/Modal';

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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

  const faqs = [
    {
      question: 'How do I update my billing information?',
      answer:
        "To contact customer support, look for a 'Contact us' or 'Help' button or link on the website or platform. You may be able to email, call, or chat with customer support for assistance.",
    },
    {
      question: 'How can I contact customer support?',
      answer:
        "To contact customer support, look for a 'Contact us' or 'Help' button or link on the website or platform. You may be able to email, call, or chat with customer support for assistance.",
    },
    {
      question: 'How do I update my profile information?',
      answer:
        "To contact customer support, look for a 'Contact us' or 'Help' button or link on the website or platform. You may be able to email, call, or chat with customer support for assistance.",
    },
    {
      question: 'How do I find my purchase history?',
      answer:
        "To contact customer support, look for a 'Contact us' or 'Help' button or link on the website or platform. You may be able to email, call, or chat with customer support for assistance.",
    },
  ];

  return (
    <section className='py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-16 text-center'>
          <span className='text-md font-medium text-black text-center'>
            Frequently Asked Questions
          </span>
          <h2 className='text-4xl font-manrope font-bold text-gray-900 leading-[3.25rem]'>
            <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-red-400 to-orange-500'>
              Looking for Answers?
            </span>
          </h2>
        </div>

        <div className='accordion-group' data-accordion='default-accordion'>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`accordion py-8 px-6 border-b border-solid border-gray-200 transition-all duration-500 rounded-2xl hover:bg-indigo-50 ${
                activeIndex === index ? 'bg-indigo-50' : ''
              }`}
            >
              <button
                className={`accordion-toggle group inline-flex items-center justify-between leading-8 text-gray-900 w-full transition duration-500 text-left hover:text-indigo-600 ${
                  activeIndex === index ? 'font-medium text-indigo-600' : ''
                }`}
                onClick={() => handleToggle(index)}
                aria-controls={`basic-collapse-${index}-with-arrow`}
              >
                <h5>{faq.question}</h5>
                <svg
                  className={`text-gray-500 transition duration-500 group-hover:text-indigo-600 ${
                    activeIndex === index ? 'text-indigo-600 rotate-180' : ''
                  }`}
                  width='22'
                  height='22'
                  viewBox='0 0 22 22'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25'
                    stroke='currentColor'
                    strokeWidth='1.6'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                </svg>
              </button>
              <div
                id={`basic-collapse-${index}-with-arrow`}
                className={`accordion-content w-full px-0 overflow-hidden transition-max-height duration-500 ease-in-out ${
                  activeIndex === index ? 'max-h-screen' : 'max-h-0'
                }`}
                aria-labelledby={`basic-heading-${index}-with-arrow`}
              >
                <p className='text-base text-gray-900 leading-6'>
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className='my-4 pt-4 text-center'>
          <span className='text-md font-medium text-black text-center'>
            Didn't find the answer you were looking for?
          </span>
        </div>
        <div className='text-center'>
          <Button
            variant='primary'
            className='px-4'
            onClick={() => setIsModalOpen(true)}
          >
            Contact Us
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
    </section>
  );
};

export default FAQSection;
