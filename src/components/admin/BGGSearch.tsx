import React, { useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';

interface BGGGame {
  id: string;
  name: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  imageUrl: string;
  bggLink: string;
  type: string;
  categories: string[];
}

interface BGGSearchProps {
  onAddGame: (game: BGGGame) => void;
}

export default function BGGSearch({ onAddGame }: BGGSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BGGGame[]>([]);
  const [recommendations, setRecommendations] = useState<BGGGame[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gameType, setGameType] = useState('boardgame');
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = useCallback(async (query: string, type: string, page: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/bgg-search?query=${encodeURIComponent(query)}&type=${type}&page=${page}`);
      if (response.data.games) {
        setSearchResults(prevResults => page === 1 ? response.data.games : [...prevResults, ...response.data.games]);
        setRecommendations(response.data.recommendations || []);
        setTotalResults(response.data.totalResults);
        if (response.data.games.length === 0) {
          setError('No games found. Please try a different search term.');
        }
      } else {
        setError('Unexpected response format. Please try again.');
      }
    } catch (error) {
      console.error('Error searching BGG:', error);
      setError('An error occurred while searching. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedSearch = useCallback(
    debounce((query: string, type: string) => {
      setCurrentPage(1);
      handleSearch(query, type, 1);
    }, 300),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query, gameType);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setGameType(type);
    debouncedSearch(searchQuery, type);
  };

  const loadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    handleSearch(searchQuery, gameType, nextPage);
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Search BoardGameGeek</h3>
      <form onSubmit={(e) => handleSearch(e, 1)} className="mb-4">
        <div className="flex flex-col sm:flex-row">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search for a game..."
            className="flex-grow shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 sm:mb-0 sm:mr-2"
          />
          <select
            value={gameType}
            onChange={handleTypeChange}
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 sm:mb-0 sm:mr-2"
          >
            <option value="boardgame">Board Game</option>
            <option value="boardgameexpansion">Expansion</option>
            <option value="boardgameaccessory">Accessory</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchResults.map((game) => (
          <div key={game.id} className="border rounded-lg p-4">
            <img src={game.imageUrl} alt={game.name} className="w-full h-48 object-cover mb-2" />
            <h4 className="font-semibold">{game.name}</h4>
            <p className="text-sm text-gray-600 mb-2">{game.description.substring(0, 100)}...</p>
            <p className="text-sm">Players: {game.minPlayers} - {game.maxPlayers}</p>
            <p className="text-sm">Type: {game.type}</p>
            <button
              onClick={() => onAddGame(game)}
              className="mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-sm"
            >
              Add to Inventory
            </button>
          </div>
        ))}
      </div>
      {searchResults.length < totalResults && (
        <button
          onClick={loadMore}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          disabled={isLoading}
        >
          Load More
        </button>
      )}
      {recommendations.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4">Recommended Games</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((game) => (
              <div key={game.id} className="border rounded-lg p-4">
                <img src={game.imageUrl} alt={game.name} className="w-full h-48 object-cover mb-2" />
                <h4 className="font-semibold">{game.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{game.description.substring(0, 100)}...</p>
                <p className="text-sm">Players: {game.minPlayers} - {game.maxPlayers}</p>
                <p className="text-sm">Type: {game.type}</p>
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
      )}
    </div>
  );
}
