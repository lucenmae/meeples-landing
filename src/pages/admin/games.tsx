import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import GameManagement from '../../components/admin/GameManagement';

export default function AdminGamesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 overflow-x-hidden">
        <GameManagement onAddGame={() => {/* Handle add game */}} />
      </div>
    </div>
  );
}
