import Link from 'next/link';

import NextImage from '@/components/NextImage';

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link href='/' aria-label='Meeples'>
      <NextImage
        useSkeleton
        src='/images/meeples-wordmark.png'
        alt='meeples wordmark'
        width={300}
        height={115}
        className={className}
      />
    </Link>
  );
};

export default Logo;
