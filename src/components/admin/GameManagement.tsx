import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

import MeepleButton from '../ui/meeple-button';

import BGGSearch from './BGGSearch';
import DeleteGameDialog from './DeleteGameDialog';
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

interface BGGGame {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  bggLink: string;
}

export default function GameManagement({ onAddGame }: GameManagementProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [gameToEdit, setGameToEdit] = useState<Game | null>(null);
  const [gameToDelete, setGameToDelete] = useState<Game | null>(null);

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

  const handleDelete = async (game: Game) => {
    setGameToDelete(game);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!gameToDelete) return;

    try {
      const response = await axios.delete(`/api/games/${gameToDelete._id}`);
      if (response.status === 200) {
        setGames(prevGames => prevGames.filter(g => g._id !== gameToDelete._id));
        toast.success('Game deleted successfully');
      } else {
        toast.error('Error deleting game');
      }
    } catch (error) {
      console.error('Error deleting game:', error);
      toast.error('Error deleting game');
    }
  };

  const handleAddGameFromBGG = async (bggGame: BGGGame) => {
    try {
      // Check if the game already exists in the inventory
      const existingGame = games.find(game => game.name.toLowerCase() === bggGame.name.toLowerCase());
      if (existingGame) {
        toast.custom(<div>{`"${bggGame.name}" is already in your inventory.`}</div>);
        return;
      }

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
      const response = await axios.put(`/api/games/${updatedGame._id}`, updatedGame);
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

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-16">
        <h2 className="text-3xl font-bold text-black">Inventory Management</h2>
        <MeepleButton
          onClick={onAddGame}
          className="w-full sm:w-auto cursor-pointer z-10 hover:bg-white"
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

      <div className="bg-meeple-secondary border-4 border-black rounded-lg shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] overflow-x-auto relative">
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
                      <Image className="h-full w-full object-cover" src={game.imageUrl} alt={game.name} width={64} height={64} />
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
                <td className="px-6 py-4 whitespace-nowrap border-b border-black relative z-10">
                  <div className="flex space-x-2">
                    <MeepleButton
                      onClick={() => handleEdit(game)}
                      variant="outline"
                      size="sm"
                      icon={<FaEdit />}
                    >
                      Edit
                    </MeepleButton>
                    <MeepleButton
                      onClick={() => handleDelete(game)}
                      variant="outline"
                      size="sm"
                      className="bg-red-500 hover:bg-white"
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

      {gameToEdit && (
        <EditGameDialog
          open={isEditModalOpen}
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
    </div>
  );
}
