'use client';

import { useState } from 'react';
import Head from 'next/head';

import HeroSection from '@/components/home/HeroSection';
import ScrollToTopButton from '@/components/ScrollToTop';
import { FollowerPointerCard } from '@/components/ui/following-pointer';
import { Game } from '@/models/Game';

interface ClientHomeProps {
  initialGames: Game[];
}

export default function ClientHome({ initialGames }: ClientHomeProps) {
  const [isBoxesLoaded, setIsBoxesLoaded] = useState(false);

  return (
    <FollowerPointerCard>
      <main>
        <Head>
          <title>Meeples - Tabletop Games Organization</title>
        </Head>
        <HeroSection initialGames={initialGames} />
        <ScrollToTopButton />
      </main>
    </FollowerPointerCard>
  );
}
