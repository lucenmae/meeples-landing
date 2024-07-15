import React from 'react';
import NextImage from '../NextImage';

interface CardsProps {
  src: string;
  alt: string;
  title: string;
  description: string;
}

const Cards: React.FC<CardsProps> = ({ src, alt, title, description }) => {
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
        <div className='flip-card-back flex flex-col justify-center items-center transform rotate-y-180'>
          <div className=''>
            <div className='card-title text-lg font-medium text-gray-900 mb-3 capitalize'>
              {title}
            </div>
            <div className='card-subtitle text-sm font-normal text-gray-500'>
              {description}
            </div>
            <hr className='card-divider border-t my-3 border-gray-200' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
