import React, { useState } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';

interface BGGGame {
  id: string;
  name: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  imageUrl: string;
  bggLink: string;
}

interface BGGSearchProps {
  onAddGame: (game: BGGGame) => void;
}

export default function BGGSearch({ onAddGame }: BGGSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BGGGame[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.get(`https://boardgamegeek.com/xmlapi2/search?query=${searchQuery}&type=boardgame`);
      parseString(response.data, async (err, result) => {
        if (err) {
          console.error('Error parsing XML:', err);
          return;
        }

        const gameIds = result.items.item.map((item: any) => item.$.id);
        const gameDetailsResponse = await axios.get(`https://boardgamegeek.com/xmlapi2/thing?id=${gameIds.join(',')}&stats=1`);

        parseString(gameDetailsResponse.data, (err, detailsResult) => {
          if (err) {
            console.error('Error parsing game details XML:', err);
            return;
          }

          const games: BGGGame[] = detailsResult.items.item.map((item: any) => ({
            id: item.$.id,
            name: item.name[0].$.value,
            description: item.description[0],
            minPlayers: parseInt(item.minplayers[0].$.value),
            maxPlayers: parseInt(item.maxplayers[0].$.value),
            imageUrl: item.image[0],
            bggLink: `https://boardgamegeek.com/boardgame/${item.$.id}`,
          }));

          setSearchResults(games);
        });
      });
    } catch (error) {
      console.error('Error searching BGG:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Search BoardGameGeek</h3>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a game..."
            className="flex-grow shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchResults.map((game) => (
          <div key={game.id} className="border rounded-lg p-4">
            <img src={game.imageUrl} alt={game.name} className="w-full h-48 object-cover mb-2" />
            <h4 className="font-semibold">{game.name}</h4>
            <p className="text-sm text-gray-600 mb-2">{game.description.substring(0, 100)}...</p>
            <p className="text-sm">Players: {game.minPlayers} - {game.maxPlayers}</p>
            <button
              onClick={() => onAddGame(game)}
              className="mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-sm"
            >
              Add to Inventory
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
