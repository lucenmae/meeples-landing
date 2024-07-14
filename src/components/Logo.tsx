import Link from 'next/link';
import React from 'react';

import NextImage from '@/components/NextImage';

export default function Logo() {
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
