'use client';

import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';

import { wait } from '@/lib/wait';

import HeroSection from '@/components/home/HeroSection';
import ScrollToTopButton from '@/components/ScrollToTop';
import { Boxes } from '@/components/ui/background-boxes';
import { FollowerPointerCard } from '@/components/ui/following-pointer';

import Loading from '@/app/loading';

export default function HomePage() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      await wait(2000);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />; // Render loading indicator while waiting
  }

  return (
    <FollowerPointerCard className='40'>
              <Boxes  />
      <main>
        <Head>
          <title>Meeples - Tabletop Games Organization</title>
        </Head>

        <section>
          <HeroSection />
          <ScrollToTopButton />
        </section>
      </main>
    </FollowerPointerCard>
  );
}
