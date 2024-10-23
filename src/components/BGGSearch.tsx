import React from 'react';

interface BGGSearchProps {
  onGameSelect: (game: any) => void;
}

const BGGSearch: React.FC<BGGSearchProps> = ({ onGameSelect }) => {
  // Implement your BGG search component here
  return <div>{/* Your BGG search UI */}</div>;
};

export default BGGSearch;
