import Link from 'next/link';
import React from 'react';

import NextImage from '@/components/NextImage';

export default function Logo() {
  return (
    <Link href='/'  aria-label='Patriot' className='cursor-none'>
      <NextImage
        useSkeleton
        //TODO! Convert To SVG
        src='/images/logo-only.png'
        alt='patriot logo'
        width={134}
        height={108}
      />
    </Link>
  );
}
