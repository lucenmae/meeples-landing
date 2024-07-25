'use client';
import Head from 'next/head';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { wait } from '@/lib/wait';

import HeroSection from '@/components/home/HeroSection';
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

  return (
    <FollowerPointerCard>
      <main>
        <Head>
          <title>Meeples - Tabletop Games Organization</title>
        </Head>
        {loading ? (
          <Loading />
        ) : (
          <>
            <section>
              <HeroSection />

            </section>
            <Boxes />
          </>
        )}
      </main>
    </FollowerPointerCard>
  );
}
