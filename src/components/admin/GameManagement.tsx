import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

import MeepleButton from '../ui/meeple-button';

import BGGSearch from './BGGSearch';
import EditGameDialog from './EditGameDialog';

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
}

export default function GameManagement({ onAddGame }: GameManagementProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [gameToEdit, setGameToEdit] = useState<Game | null>(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get('/api/games');
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      try {
        await axios.delete(`/api/games/${id}`);
        fetchGames();
      } catch (error) {
        console.error('Error deleting game:', error);
      }
    }
  };

  const handleAddGameFromBGG = async (bggGame: any) => {
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
    } catch (error) {
      console.error('Error adding game from BGG:', error);
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
      const response = await axios.put(`/api/games/${updatedGame._id}`, updatedGame);
      if (response.status === 200) {
        fetchGames();
        setIsEditModalOpen(false);
      } else {
        console.error('Error updating game:', response.data);
      }
    } catch (error) {
      console.error('Error updating game:', error);
    }
  };

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-16">
        <h2 className="text-3xl font-bold text-black">Inventory Management</h2>
        <MeepleButton
          onClick={onAddGame}
          className="w-full sm:w-auto cursor-pointer z-10"
          icon={<FaPlus />}
          variant="primary"
        >
          New Game
        </MeepleButton>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-black mb-2">Search Games</h3>
        <p className="text-sm text-gray-600 mb-4">
          Search for games to add to your inventory. If a game is not found, please add it manually using the "New Game" button above.
        </p>
        <BGGSearch onAddGame={handleAddGameFromBGG} />
      </div>

      <div className="bg-meeple-secondary border-4 border-black rounded-lg shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-meeple-primary">
              <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b-2 border-black">
                Game
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b-2 border-black">
                Date Added
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b-2 border-black">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {games.map((game, index) => (
              <tr key={game._id} className={index % 2 === 0 ? 'bg-white' : 'bg-meeple-tertiary'}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-black">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-16 w-16 border-2 border-black rounded-md overflow-hidden">
                      <img className="h-full w-full object-cover" src={game.imageUrl} alt={game.name} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-bold text-black">{game.name}</div>
                      <div className="text-sm text-gray-700">{game.description.substring(0, 50)}...</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-black">
                  <div className="text-sm text-black">{new Date(game.createdAt).toLocaleDateString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-black">
                  <MeepleButton
                    onClick={() => handleEdit(game)}
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    icon={<FaEdit />}
                  >
                    Edit
                  </MeepleButton>
                  <MeepleButton
                    onClick={() => handleDelete(game._id)}
                    variant="outline"
                    size="sm"
                    className="bg-red-500 hover:bg-red-700"
                    icon={<FaTrash />}
                  >
                    Delete
                  </MeepleButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {gameToEdit && (
        <EditGameDialog
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          game={gameToEdit}
          onUpdateGame={handleUpdateGame}
        />
      )}
    </div>
  );
}
