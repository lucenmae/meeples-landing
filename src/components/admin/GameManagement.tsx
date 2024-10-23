import axios from 'axios';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaPlus,
  FaSearch,
  FaTrash,
} from 'react-icons/fa';

import { Input } from '@/components/ui/input';

import MeepleButton from '../ui/meeple-button';

import AddGameDialog from './dialogs/AddGameDialog';
import DeleteGameDialog from './dialogs/DeleteGameDialog';
import { EditGameDialog } from './dialogs/EditGameDialog';
import WarningDialog from './dialogs/WarningDialog';
import BGGSearch from './BGGSearch';

interface Game {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  bggLink: string;
  createdAt: string;
  updatedAt: string;
}

interface GameManagementProps {
  onAddGame: () => void;
  handleAddGame: (newGame: Omit<Game, '_id' | 'createdAt' | 'updatedAt'>) => Promise<Game | undefined>;
}

interface BGGGame {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  bggLink: string;
}

const GAMES_PER_PAGE = 5;

export default function GameManagement({ onAddGame, handleAddGame }: GameManagementProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [gameToEdit, setGameToEdit] = useState<Game | null>(null);
  const [gameToDelete, setGameToDelete] = useState<Game | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [gameToAdd, setGameToAdd] = useState<BGGGame | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddGameModalOpen, setIsAddGameModalOpen] = useState(false);

  const fetchGames = useCallback(async () => {
    try {
      const response = await axios.get('/api/games');
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
      toast.error('Failed to fetch games');
    }
  }, []);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  useEffect(() => {
    const filtered = games.filter(
      (game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredGames(filtered);
    setCurrentPage(1);
  }, [games, searchTerm]);

  const handleDelete = async (game: Game) => {
    setGameToDelete(game);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!gameToDelete) return;

    try {
      const response = await axios.delete(`/api/games/${gameToDelete._id}`);
      if (response.status === 200) {
        const updatedGames = games.filter((g) => g._id !== gameToDelete._id);
        setGames(updatedGames);
        toast.success('Game deleted successfully');

        // Adjust current page if necessary
        const totalPages = Math.ceil(updatedGames.length / GAMES_PER_PAGE);
        if (currentPage > totalPages) {
          setCurrentPage(Math.max(totalPages, 1));
        }
      } else {
        toast.error('Error deleting game');
      }
    } catch (error) {
      console.error('Error deleting game:', error);
      toast.error('Error deleting game');
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleAddGameFromBGG = async (bggGame: BGGGame) => {
    // Check if the game already exists in the inventory
    const existingGame = games.find(
      (game) => game.name.toLowerCase() === bggGame.name.toLowerCase(),
    );
    if (existingGame) {
      setGameToAdd(bggGame);
      setIsWarningModalOpen(true);
    } else {
      addGame(bggGame);
    }
  };

  const addGame = async (bggGame: BGGGame) => {
    try {
      const newGame = {
        name: bggGame.name,
        description: bggGame.description,
        imageUrl: bggGame.imageUrl,
        bggLink: bggGame.bggLink,
      };
      const response = await axios.post('/api/games', newGame);
      console.log('Server response:', response.data);
      fetchGames();
      toast.success(`"${bggGame.name}" added to your inventory.`);
    } catch (error) {
      console.error('Error adding game from BGG:', error);
      toast.error('Error adding game from BGG');
      if (axios.isAxiosError(error)) {
        console.error('Error response:', error.response?.data);
      }
    }
  };

  const handleEdit = (game: Game) => {
    setGameToEdit(game);
    setIsEditModalOpen(true);
  };

  const handleUpdateGame = async (updatedGame: Game) => {
    try {
      const response = await axios.put(
        `/api/games/${updatedGame._id}`,
        updatedGame,
      );
      if (response.status === 200) {
        fetchGames();
        setIsEditModalOpen(false);
        toast.success('Game updated successfully');
      } else {
        toast.error('Error updating game');
      }
    } catch (error) {
      console.error('Error updating game:', error);
      toast.error('Error updating game');
    }
  };

  const addNewGame = async (newGame: Omit<Game, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const addedGame = await handleAddGame(newGame);
      if (addedGame) {
        setGames(prevGames => [...prevGames, addedGame]);
        setFilteredGames(prevFilteredGames => [...prevFilteredGames, addedGame]);
        toast.success(`"${addedGame.name}" added to your inventory.`);
        fetchGames(); // Refresh the entire game list
      }
    } catch (error) {
      console.error('Error adding new game:', error);
      toast.error('Failed to add new game');
    }
  };

  const totalPages = Math.ceil(filteredGames.length / GAMES_PER_PAGE);
  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * GAMES_PER_PAGE,
    currentPage * GAMES_PER_PAGE,
  );

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  return (
    <div className='space-y-8 p-4 lg:p-6'>
      <h2 className='text-4xl font-bold text-black mb-6'>
        Inventory Management
      </h2>

      <div className='bg-white border-4 border-black rounded-lg p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]'>
        <h3 className='text-2xl font-bold text-black'>Search and Add Games</h3>
        <p className='text-sm text-gray-700 pt-2 pb-4'>
          Search for games to add to your inventory. If a game is not found, use
          the "New Game" button to add it manually.
        </p>
        <div className='flex flex-col md:flex-row gap-4 mb-6'>
          <div className='flex-grow'>
            <BGGSearch onAddGame={handleAddGameFromBGG} />
          </div>
          <div className='md:self-start'>
            <MeepleButton
              onClick={onAddGame}
              className='w-full md:w-auto cursor-pointer z-10 whitespace-nowrap'
              icon={<FaPlus />}
              variant='primary'
            >
              New Game
            </MeepleButton>
          </div>
        </div>
      </div>

      <div className='bg-meeple-secondary border-4 border-black rounded-lg p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]'>
        <h3 className='text-2xl font-bold text-black mb-4'>Game Inventory</h3>
        <div className='relative mb-4'>
          <Input
            type='text'
            placeholder='Search inventory...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10 pr-4 py-2 w-full border-2 border-black rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-meeple-shadow'
          />
          <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
        </div>
        <div className='overflow-x-auto relative'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-meeple-tertiary'>
                <th className='px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b-2 border-black'>
                  Game
                </th>
                <th className='px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b-2 border-black'>
                  Date Added
                </th>
                <th className='px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b-2 border-black'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedGames.map((game, index) => (
                <tr
                  key={game._id}
                  className={
                    index % 2 === 0 ? 'bg-white' : 'bg-meeple-tertiary'
                  }
                >
                  <td className='px-6 py-4 whitespace-nowrap border-b border-black'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0 h-16 w-16 border-2 border-black rounded-md overflow-hidden'>
                        <Image
                          className='h-full w-full object-cover'
                          src={game.imageUrl}
                          alt={game.name}
                          width={64}
                          height={64}
                        />
                      </div>
                      <div className='ml-4'>
                        <div className='text-sm font-bold text-black'>
                          {game.name}
                        </div>
                        <div className='text-sm text-gray-700'>
                          {game.description.substring(0, 50)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap border-b border-black'>
                    <div className='text-sm text-black'>
                      {new Date(game.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap border-b border-black relative z-10'>
                    <div className='flex space-x-2'>
                      <MeepleButton
                        onClick={() => handleEdit(game)}
                        variant='outline'
                        size='sm'
                        icon={<FaEdit />}
                      >
                        Edit
                      </MeepleButton>
                      <MeepleButton
                        onClick={() => handleDelete(game)}
                        variant='outline'
                        size='sm'
                        className='bg-red-500 hover:bg-white'
                        icon={<FaTrash />}
                      >
                        Delete
                      </MeepleButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredGames.length > 0 ? (
          totalPages > 1 && (
            <div className='mt-4 flex justify-between items-center'>
              <div className='text-sm text-gray-700'>
                Page {currentPage} of {totalPages}
              </div>
              <div className='flex space-x-2'>
                <MeepleButton
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  variant='outline'
                  size='sm'
                  className='bg-white hover:bg-meeple-tertiary'
                  icon={<FaChevronLeft />}
                >
                  Previous
                </MeepleButton>
                <MeepleButton
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  variant='outline'
                  size='sm'
                  className='bg-white hover:bg-meeple-tertiary'
                  icon={<FaChevronRight />}
                >
                  Next
                </MeepleButton>
              </div>
            </div>
          )
        ) : (
          <p className='text-center mt-4'>No games found.</p>
        )}
      </div>

      {gameToEdit && (
        <EditGameDialog
          isOpen={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          game={gameToEdit}
          onUpdateGame={handleUpdateGame}
        />
      )}

      {gameToDelete && (
        <DeleteGameDialog
          open={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          onConfirmDelete={confirmDelete}
          gameName={gameToDelete.name}
        />
      )}

      {gameToAdd && (
        <WarningDialog
          open={isWarningModalOpen}
          onOpenChange={setIsWarningModalOpen}
          onConfirm={() => addGame(gameToAdd)}
          gameName={gameToAdd.name}
        />
      )}

      <button onClick={() => setIsAddGameModalOpen(true)}>Add New Game</button>
      <AddGameDialog
        open={isAddGameModalOpen}
        onOpenChange={setIsAddGameModalOpen}
        onAddGame={addNewGame}
      />
    </div>
  );
}
