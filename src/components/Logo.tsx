import Link from 'next/link';
import React from 'react';

import NextImage from '@/components/NextImage';

interface LogoProps {
  size: number; // Add this line to define the size prop
}

export default function Logo({ size }: LogoProps) {
  return (
    <Link href='/'  aria-label='Meeples' className='cursor-none'>
      <NextImage
        useSkeleton
        //TODO! Convert To SVG
        src='/images/meeples-wordmark.png'
        alt='meeples wordmark'
        width={300}
        height={115}
      />
    </Link>
  );
}
