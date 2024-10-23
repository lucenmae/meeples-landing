import axios from 'axios';
import debounce from 'lodash/debounce';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import MeepleButton from '../ui/meeple-button';

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

  const handleSearch = useCallback(async (query: string, page: number, isRetry: boolean = false) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/bgg-search?query=${encodeURIComponent(query)}&page=${page}`);
      if (response.data.games) {
        setSearchResults(prevResults => page === 1 ? response.data.games : [...prevResults, ...response.data.games]);
        setTotalResults(response.data.totalResults);
        if (response.data.games.length === 0) {
          if (!isRetry) {
            // If no results and it's not a retry, append "original" to the query and search again
            handleSearch(`${query} original`, 1, true);
          } else {
            setError('No games found. Please try a different search term.');
          }
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
    <div className="bg-meeple-tertiary border-4 border-black rounded-lg p-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-grow relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search BoardGameGeek..."
            className="w-full pl-10 pr-4 py-2 border-2 border-black rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-meeple-shadow"
          />
        </div>
      </div>

      {isLoading && <p className="mt-4 text-center font-bold">Searching...</p>}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}

      {searchResults.length > 0 && (
        <div className="mt-4 space-y-4">
          <h3 className="text-xl font-bold">Search Results:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {searchResults.map((game: BGGGame) => (
              <div key={game.id} className="bg-white border-2 border-black rounded-lg p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 transition-transform duration-200">
                <Image 
                  src={game.imageUrl} 
                  alt={game.name} 
                  width={160}
                  height={160}
                  className="w-full h-40 object-cover mb-2 rounded border-2 border-black" 
                />
                <h4 className="font-bold text-lg mb-1">{game.name}</h4>
                <p className="text-sm mb-2">Year: {game.yearPublished}</p>
                <p className="text-sm mb-2">{game.description?.substring(0, 100)}...</p>
                <p className="text-sm mb-2">Rating: {game.averageRating} ({game.numVoters} voters)</p>
                <p className="text-sm mb-2">Rank: {game.rank}</p>
                <MeepleButton
                  onClick={() => onAddGame(game)}
                  variant="outline"
                  size="sm"
                  className="w-full"
                  icon={<FaPlus />}
                >
                  Add Game
                </MeepleButton>
              </div>
            ))}
          </div>
          {searchResults.length < totalResults && (
            <div className="text-center mt-4">
              <MeepleButton onClick={loadMore} variant="primary">
                Load More
              </MeepleButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
