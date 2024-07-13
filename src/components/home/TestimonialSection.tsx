import React from 'react';

import NextImage from '@/components/NextImage';

interface TestimonialCardProps {
  quote: string;
  name: string;
  occupation: string;
  imageSrc: string;
}

const TestimonialsSection: React.FC = () => {
  return (
    <section className='py-12 bg-gray-50 sm:py-16 lg:py-20'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center'>
          <div className='mb-14 text-center'>
            <span className='text-md font-medium text-black text-center'>
              Testimonials
            </span>
            <h2 className='text-4xl text-center font-bold text-gray-900 py-5'>
              What Our{' '}
              <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-red-400 to-orange-500'>
                Customer Says
              </span>
            </h2>
          </div>

          <div className='relative md:order-2'>
            <div className='absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6'>
              <div
                className='w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter'
                style={{
                  background:
                    'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)',
                }}
              ></div>
            </div>

            <div className='relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3'>
              <TestimonialCard
                quote="Cirquolus has transformed the way we manage our operations. It's an invaluable tool for our business."
                name='Jane Doe'
                occupation='Operations Manager'
                imageSrc='/images/testimonials-section/janedoe.jpg'
              />
              <TestimonialCard
                quote="From HR to inventory, Cirquolus handles it all. It's intuitive and powerful."
                name='John Smith'
                occupation='HR Manager'
                imageSrc='/images/testimonials-section/johnsmith.jpg'
              />
              <TestimonialCard
                quote='Cirquolus is a game-changer. Its seamless, all-in-one solution boosted our efficiency and is incredibly user-friendly.'
                name='Alex Morgan'
                occupation='Business Analyst'
                imageSrc='/images/testimonials-section/alexmorgan.jpg'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  name,
  occupation,
  imageSrc,
}) => {
  return (
    <div className='flex flex-col overflow-hidden shadow-xl rounded-md'>
      <div className='flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7'>
        <div className='flex-1'>
          <blockquote className='flex-1 mt-8'>
            <p className='text-lg leading-relaxed text-gray-900 font-pj'>
              {quote}
            </p>
          </blockquote>
        </div>
        <div className='flex items-center mt-8  '>
          <NextImage
            className='flex-shrink-0 object-cover rounded-full w-11 h-11 '
            src={imageSrc}
            alt={name}
            layout='fixed'
            width={44}
            height={44}
          />
          <div className='ml-4'>
            <p className='text-base font-bold text-gray-900 font-pj'>{name}</p>
            <p className='mt-0.5 text-sm font-pj text-gray-600'>{occupation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
