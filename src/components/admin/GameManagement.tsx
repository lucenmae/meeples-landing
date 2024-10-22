import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

import BGGSearch from './BGGSearch';
import EditGameDialog from './EditGameDialog';
import MeepleButton from '../ui/meeple-button';

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
  const [isAdding, setIsAdding] = useState(false);
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
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-semibold">Game Management</h2>
        <MeepleButton
          onClick={onAddGame}
          className="w-full sm:w-auto cursor-pointer z-0 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          icon={<FaPlus />}
        >
          New Game
        </MeepleButton>
      </div>

      <BGGSearch onAddGame={handleAddGameFromBGG} />

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Game
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date Added
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game._id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10">
                      <img className="w-full h-full rounded-full" src={game.imageUrl} alt={game.name} />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap font-semibold">{game.name}</p>
                      <p className="text-gray-600 whitespace-no-wrap">{game.description.substring(0, 50)}...</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {new Date(game.createdAt).toLocaleDateString()}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button onClick={() => handleEdit(game)} className="text-blue-600 hover:text-blue-900 mr-3">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(game._id)} className="text-red-600 hover:text-red-900">
                    <FaTrash />
                  </button>
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