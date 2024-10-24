import { Metadata } from 'next';

import ClientHome from '@/components/ClientHome';
import connectMongoDB from '@/lib/mongodb';
import { Game } from '@/models/Game';

export const metadata: Metadata = {
  title: 'LSU Meeples',
  description:
    'LSU Meeples - An Interest-Based Organization at La Salle University Ozamiz City Promoting Tabletop Games',
};

async function getGames() {
  await connectMongoDB();
  const games = await Game.find({}).lean();
  return JSON.parse(JSON.stringify(games));
}

export default async function Home() {
  const initialGames = await getGames();

  return <ClientHome initialGames={initialGames} />;
}
