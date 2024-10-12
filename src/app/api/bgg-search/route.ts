import { NextResponse } from 'next/server';
import axios from 'axios';
import { parseString } from 'xml2js';

const MAX_ITEMS_PER_REQUEST = 20;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const type = searchParams.get('type') || 'boardgame';
  const page = parseInt(searchParams.get('page') || '1', 10);

  if (!query) {
    return NextResponse.json({ message: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const searchResponse = await axios.get(`https://boardgamegeek.com/xmlapi2/search?query=${encodeURIComponent(query)}&type=${type}`);
    
    return new Promise((resolve) => {
      parseString(searchResponse.data, async (err, result) => {
        if (err) {
          console.error('Error parsing XML:', err);
          resolve(NextResponse.json({ message: 'Error parsing XML' }, { status: 500 }));
          return;
        }

        if (!result.items || !result.items.item) {
          resolve(NextResponse.json({ games: [], recommendations: [], totalResults: 0 }));
          return;
        }

        const allGameIds = result.items.item.map((item: any) => item.$.id);
        const startIndex = (page - 1) * MAX_ITEMS_PER_REQUEST;
        const gameIds = allGameIds.slice(startIndex, startIndex + MAX_ITEMS_PER_REQUEST);

        try {
          const gameDetailsResponse = await axios.get(`https://boardgamegeek.com/xmlapi2/thing?id=${gameIds.join(',')}&stats=1`);
          
          parseString(gameDetailsResponse.data, (err, detailsResult) => {
            if (err) {
              console.error('Error parsing game details XML:', err);
              resolve(NextResponse.json({ message: 'Error parsing game details XML' }, { status: 500 }));
              return;
            }

            const games = detailsResult.items.item.map((item: any) => ({
              id: item.$.id,
              name: item.name?.[0]?.$.value || 'Unknown',
              description: item.description?.[0] || 'No description available.',
              minPlayers: item.minplayers?.[0]?.$.value ? parseInt(item.minplayers[0].$.value) : 1,
              maxPlayers: item.maxplayers?.[0]?.$.value ? parseInt(item.maxplayers[0].$.value) : 1,
              imageUrl: item.image?.[0] || '/placeholder-image.jpg',
              bggLink: `https://boardgamegeek.com/boardgame/${item.$.id}`,
              type: item.type?.[0] || 'Unknown',
              categories: item.link?.filter((link: any) => link.$.type === 'boardgamecategory').map((link: any) => link.$.value) || [],
            }));

            const recommendations = games.length > 0
              ? games.filter(game => game.id !== games[0].id && game.categories.some(cat => games[0].categories.includes(cat)))
              : [];

            resolve(NextResponse.json({ games, recommendations, totalResults: allGameIds.length }));
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
