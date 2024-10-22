import axios from 'axios';
import debounce from 'lodash/debounce';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';

interface BGGGame {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  bggLink: string;
  averageRating: string;
  numVoters: number;
  rank: string | number;
  yearPublished: string;
}

interface BGGSearchProps {
  onAddGame: (game: BGGGame) => void;
}

export default function BGGSearch({ onAddGame }: BGGSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BGGGame[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = useCallback(async (query: string, page: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/bgg-search?query=${encodeURIComponent(query)}&page=${page}`);
      if (response.data.games) {
        setSearchResults(prevResults => page === 1 ? response.data.games : [...prevResults, ...response.data.games]);
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
    debounce((query: string) => {
      setCurrentPage(1);
      handleSearch(query, 1);
    }, 300),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length >= 3) {
      debouncedSearch(query);
    } else {
      setSearchResults([]);
      setTotalResults(0);
    }
  };

  const loadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    handleSearch(searchQuery, nextPage);
  };

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-xl font-semibold mb-4">Search Board Game</h3>
      <p className="text-sm text-gray-600 mb-4">If not game not found, please add manually using the "New Game" button</p>
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search for a game by title..."
          className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <div className="space-y-4">
        {searchResults.map((game) => (
          <div key={game.id} className="flex flex-col sm:flex-row border-b pb-4">
            <Image 
              src={game.imageUrl} 
              alt={game.name} 
              width={80} 
              height={80} 
              className="object-cover mb-2 sm:mb-0 sm:mr-4" 
            />
            <div className="flex-grow">
              <h4 className="font-semibold">{game.name} ({game.yearPublished})</h4>
              <p className="text-sm text-gray-600 mb-2">{game.description.substring(0, 100)}...</p>
              <p className="text-sm">Rating: {game.averageRating} ({game.numVoters} voters)</p>
              <p className="text-sm">Rank: {game.rank}</p>
            </div>
            <button
              onClick={() => onAddGame(game)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-sm h-10 mt-2 sm:mt-0"
            >
              Add to Inventory
            </button>
          </div>
        ))}
      </div>
      {searchResults.length < totalResults && (
        <button
          onClick={loadMore}
          className="mt-4 w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          disabled={isLoading}
        >
          Load More
        </button>
      )}
    </div>
  );
}
