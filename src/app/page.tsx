'use client';
import Head from 'next/head';
import * as React from 'react';

import HeroSection from '@/components/home/HeroSection';

export default function HomePage() {

  return (
    <>
      <main>
        <Head>
          <title>Patriot</title>
        </Head>
          <>
            <section>
              <HeroSection />

            </section>
          </>
      </main>
    </>
  );
}
