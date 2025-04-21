import React from 'react';

interface GameCardProps {
  title: string;
  description: string;
  emoji: string;
}

const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  emoji
}) => {
  return (
    <div className="card text-center hover:border hover:border-green-500 transition-transform hover:-translate-y-1">
      <div className="h-24 flex items-center justify-center mb-4">
        <span className="text-4xl">{emoji}</span>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-4">{description}</p>
      <button className="btn-primary w-full">Jogar</button>
    </div>
  );
};

export default GameCard;
