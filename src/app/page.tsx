'use client';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useState } from 'react';

import Loading from '@/app/loading';
import HeroSection from '@/components/home/HeroSection';
import ScrollToTopButton from '@/components/ScrollToTop';
import { FollowerPointerCard } from '@/components/ui/following-pointer';

const DynamicBoxes = dynamic(
  () => import('@/components/ui/background-boxes').then((mod) => mod.Boxes),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

export default function HomePage() {
  const [isBoxesLoaded, setIsBoxesLoaded] = useState(false);

  return (
    <FollowerPointerCard>
      {!isBoxesLoaded && <Loading />}
      <main>
        <Head>
          <title>Meeples - Tabletop Games Organization</title>
        </Head>
        <DynamicBoxes onLoad={() => setIsBoxesLoaded(true)} />
        <section>
          <HeroSection />
        </section>
        <ScrollToTopButton />
      </main>
    </FollowerPointerCard>
  );
}
