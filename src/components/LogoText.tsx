import Link from 'next/link';
import React from 'react';

import NextImage from '@/components/NextImage';

export default function LogoText() {
  return (
    <Link href='/'  aria-label='Patriot' className='cursor-none'>
      <NextImage
        useSkeleton
        //TODO! Convert To SVG
        src='/images/patriot-logo.png'
        alt='patriot logo'
        width={200}
        height={115}
      />
    </Link>
  );
}
