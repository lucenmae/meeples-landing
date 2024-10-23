import React from 'react';

import NextImage from '../NextImage';

interface CardsProps {
  src: string;
  alt: string;
  title: string;
  description: string;
  link: string;
}

// Helper function to truncate text
const truncateText = (text: string, limit: number) => {
  if (text.length <= limit) {
    return text;
  }
  return text.substring(0, limit) + '...';
};

const Cards: React.FC<CardsProps> = ({
  src,
  alt,
  title,
  description,
  link,
}) => {
  return (
    <div className='flip-card w-48 h-64 perspective-1000 font-sans m-10'>
      <div className='flip-card-inner card'>
        <div className='flip-card-front flex flex-col justify-center items-center'>
          <div className='card-img'>
            <div className='clip-container'>
              <NextImage
                useSkeleton
                src={src}
                alt={alt}
                width={230}
                height={300}
                className='object-cover w-full h-full'
              />
            </div>
          </div>
        </div>
        <div className='flip-card-back flex flex-col justify-between items-center transform rotate-y-180 p-4'>
          <div className='flex flex-col h-full'>
            <div className='block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900'>
              {title}
            </div>
            <div className='block font-sans text-sm antialiased font-light leading-relaxed text-inherit overflow-y-auto flex-grow'>
              {truncateText(description, 102)}
            </div>
          </div>
          <div className='mb-4'>
            <a
              href={link}
              className='cursor-none text-sm font-semibold leading-6 text-gray-900'
            >
              <button className='cursor-none inline-block px-6 py-2.5 text-md font-bold text-center text-black bg-white border-2 border-black rounded-md shadow-[5px_5px_0px_#000] transition-all ease-linear hover:bg-yellow-400 hover:-translate-y-1 active:shadow-none active:translate-y-1'>
                Read More
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
