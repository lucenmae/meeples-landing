'use client';
import Head from 'next/head';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { wait } from '@/lib/wait';

import HeroSection from '@/components/home/HomePage';
import { Boxes } from '@/components/ui/background-boxes';
import { FollowerPointerCard } from '@/components/ui/following-pointer';

import Loading from '@/app/loading';

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await wait(2000); 
      setLoading(false);
    };

    fetchData();
  }, []);

  // Determine screen size to conditionally render Loading component
  const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false); // Default to false during SSR

    useEffect(() => {
      const mediaQueryList = window.matchMedia(query);
      setMatches(mediaQueryList.matches);

      const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
      mediaQueryList.addListener(handler);

      return () => {
        mediaQueryList.removeListener(handler);
      };
    }, [query]);

    return matches;
  };

  const isSmallScreen = useMediaQuery('(max-width: 768px)'); 
  
  if (loading && !isSmallScreen) {
    return <Loading />;
  }

  return (
    <>
      {isSmallScreen ? (
        <main>
          <Head>
            <title>Meeples - Tabletop Games Organization</title>
          </Head>
          <section>
            <HeroSection />
          </section>
          <Boxes />
        </main>
      ) : (
        <FollowerPointerCard>
          <main>
            <Head>
              <title>Meeples - Tabletop Games Organization</title>
            </Head>
            <section>
              <HeroSection />
            </section>
            <Boxes />
          </main>
        </FollowerPointerCard>
      )}
    </>
  );
}
