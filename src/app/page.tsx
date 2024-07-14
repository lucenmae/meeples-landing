'use client';

import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';

import HeroSection from '@/components/home/HeroSection';
import Footer from '@/components/layout/Footer';
// import Header from '@/components/layout/Header';
import ScrollToTopButton from '@/components/ScrollToTop';

import Loading from '@/app/loading';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      await wait(100); // Adjust delay time as needed
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />; // Render loading indicator while waiting
  }

  return (
    <main>
      <Head>
        <title>Meeples - Tabletop Games Organization</title>
      </Head>

      <section>
        {/* <Header /> */}
        <HeroSection />
        <ScrollToTopButton />
        <Footer />
      </section>
    </main>
  );
}

export async function wait(ms: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(resolve, ms);
  });
}
