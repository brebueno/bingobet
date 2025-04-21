import React from 'react';

interface GameIntegrationProps {
  gameId: string;
  title: string;
  provider: string;
  category: string;
  thumbnail: string;
  isPopular?: boolean;
  isNew?: boolean;
}

const GameIntegration: React.FC<GameIntegrationProps> = ({
  gameId,
  title,
  provider,
  category,
  thumbnail,
  isPopular = false,
  isNew = false
}) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-green-500 transition-all hover:-translate-y-1">
      <div className="relative">
        {isPopular && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
            Popular
          </div>
        )}
        {isNew && (
          <div className="absolute top-2 right-2 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded-full">
            Novo
          </div>
        )}
        <div className="h-40 bg-gray-900 flex items-center justify-center p-4">
          <div className="text-center text-xl font-bold text-white">{thumbnail}</div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <div className="flex justify-between text-sm text-gray-400 mb-3">
          <span>{provider}</span>
          <span>{category}</span>
        </div>
        <button className="btn-primary w-full">Integrar</button>
      </div>
    </div>
  );
};

export default GameIntegration;
