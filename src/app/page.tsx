'use client';

import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';

import BlogSection from '@/components/home/BlogSection';
import DemoSection from '@/components/home/DemoSection';
import FAQSection from '@/components/home/FAQSection';
import FeatureSection from '@/components/home/FeatureSection';
import HeroSection from '@/components/home/HeroSection';
import Newsletter from '@/components/home/Newsletter';
import PriceSection from '@/components/home/PriceSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import TrustedSection from '@/components/home/TrustedSection';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import ScrollToTopButton from '@/components/ScrollToTop';

import testHead from '@/components/layout/testHead';

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
  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-white'>
        <Header />
        <testHead />
        <HeroSection />
        <TrustedSection />
        <FeatureSection />
        <TestimonialSection />
        <DemoSection />
        <PriceSection />
        <BlogSection />
        <FAQSection />
        <Newsletter />

        {/** Create following sections
         * BlogSection
         * Newletter
         *
         */}
        <ScrollToTopButton />

        <Footer />
      </section>
    </main>
  );
}
