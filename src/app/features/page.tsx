'use client';

import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';

import Header from '@/components/layout/Header';

import FeatureHeroSection from '@/app/features/[feature_name]/FeatureHeroSection'

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

export default function FeaturePage() {
  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-white'>
        <Header />
        <FeatureHeroSection />
      </section>
    </main>
  );
}
