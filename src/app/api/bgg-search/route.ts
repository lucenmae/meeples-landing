/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { NextResponse } from 'next/server';
import { parseString } from 'xml2js';

const MAX_RESULTS = 10;

interface GameItem {
  $: { id: string };
  name: Array<{ $: { type: string; value: string } }>;
  description?: string[];
  thumbnail?: string[];
  yearpublished?: Array<{ $: { value: string } }>;
  statistics?: Array<{
    ratings: Array<{
      average: Array<{ $: { value: string } }>;
      usersrated: Array<{ $: { value: string } }>;
      ranks: Array<{
        rank: Array<{ $: { name: string; value: string } }>;
      }>;
    }>;
  }>;
}

interface Game {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  bggLink: string;
  averageRating: string;
  numVoters: number;
  rank: string;
  yearPublished: string;
}

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ message: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const searchResponse = await axios.get(`https://boardgamegeek.com/xmlapi2/search?query=${encodeURIComponent(query)}&type=boardgame&exact=0`);
    
    return new Promise<NextResponse>((resolve) => {
      parseString(searchResponse.data, async (err: Error | null, result: { items?: { item?: GameItem[] } }) => {
        if (err) {
          console.error('Error parsing XML:', err);
          return resolve(NextResponse.json({ message: 'Error parsing XML' }, { status: 500 }));
        }

        if (!result.items?.item) {
          return resolve(NextResponse.json({ games: [] }));
        }

        const gameIds = result.items.item.map((item) => item.$.id).slice(0, MAX_RESULTS);

        try {
          const gameDetailsResponse = await axios.get(`https://boardgamegeek.com/xmlapi2/thing?id=${gameIds.join(',')}&stats=1`);
          
          parseString(gameDetailsResponse.data, (err: Error | null, detailsResult: { items?: { item?: GameItem[] } }) => {
            if (err) {
              console.error('Error parsing game details XML:', err);
              return resolve(NextResponse.json({ message: 'Error parsing game details XML' }, { status: 500 }));
            }

            const games: Game[] = detailsResult.items?.item?.map((item) => {
              const ratings = item.statistics?.[0]?.ratings?.[0];
              const averageRating = parseFloat(ratings?.average?.[0]?.$.value || '0');
              const numVoters = parseInt(ratings?.usersrated?.[0]?.$.value || '0', 10);
              const rank = ratings?.ranks?.[0]?.rank?.find((r) => r.$.name === 'boardgame')?.$.value || 'N/A';

              return {
                id: item.$.id,
                name: item.name.find((n) => n.$.type === 'primary')?.$.value || 'Unknown',
                description: item.description?.[0] || 'No description available.',
                imageUrl: item.thumbnail?.[0] || '/placeholder-image.jpg',
                bggLink: `https://boardgamegeek.com/boardgame/${item.$.id}`,
                averageRating: averageRating.toFixed(2),
                numVoters,
                rank,
                yearPublished: item.yearpublished?.[0]?.$.value || 'N/A',
              };
            }) || [];

            const filteredGames = games
              .filter((game) => game.numVoters >= 1000)
              .sort((a, b) => {
                if (a.rank === 'N/A' && b.rank === 'N/A') return 0;
                if (a.rank === 'N/A') return 1;
                if (b.rank === 'N/A') return -1;
                return parseInt(a.rank, 10) - parseInt(b.rank, 10);
              });

            resolve(NextResponse.json({ games: filteredGames }));
          });
        } catch (error) {
          console.error('Error fetching game details:', error);
          resolve(NextResponse.json({ message: 'Error fetching game details' }, { status: 500 }));
        }
      });
    });
  } catch (error) {
    console.error('Error searching BGG:', error);
    return NextResponse.json({ message: 'Error searching BoardGameGeek' }, { status: 500 });
  }
}
