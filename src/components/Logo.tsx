import Link from 'next/link';
import React from 'react';

import NextImage from '@/components/NextImage';

interface LogoProps {
  size: number; // Add this line to define the size prop
  className?: string; // Add this line to accept className
}

const Logo: React.FC<LogoProps> = ({ size, className }) => {
  return (
    <Link href='/' aria-label='Meeples'>
      <NextImage
        useSkeleton
        //TODO! Convert To SVG
        src='/images/meeples-wordmark.png'
        alt='meeples wordmark'
        width={300}
        height={115}
        className={className}
      />
    </Link>
  );
}

export default Logo;
