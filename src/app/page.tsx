'use client';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import * as React from 'react';
import { useEffect, useState } from 'react';

import HeroSection from '@/components/home/HeroSection';
import ScrollToTopButton from '@/components/ScrollToTop';
import { FollowerPointerCard } from '@/components/ui/following-pointer';

import Loading from '@/app/loading';

const DynamicBoxes = dynamic(() => import('@/components/ui/background-boxes').then(mod => mod.Boxes), {
  ssr: false,
  loading: () => <div className="fixed left-0 top-0 w-full h-full bg-[#F3F3F3]" />
});

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate any necessary data loading or initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Reduced loading time to 500ms

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FollowerPointerCard>
      <main>
        <Head>
          <title>Meeples - Tabletop Games Organization</title>
        </Head>
        <DynamicBoxes />
        <section>
          <HeroSection />
        </section>
        <ScrollToTopButton />
      </main>
    </FollowerPointerCard>
  );
}
