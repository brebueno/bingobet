import React from 'react';

interface BingoCardProps {
  variant: 'traditional' | 'american' | 'blitz';
  title: string;
  description: string;
  countdown: string;
  players: number;
  prize: string;
}

const BingoCard: React.FC<BingoCardProps> = ({
  variant,
  title,
  description,
  countdown,
  players,
  prize
}) => {
  return (
    <div className="card border border-gray-700 hover:border-green-500 transition-colors">
      <div className="bg-green-900 rounded-t-lg p-3">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-400">Próximo sorteio</p>
            <p className="text-xl font-bold text-yellow-500">{countdown}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Jogadores</p>
            <p className="text-xl font-bold text-white">{players}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Prêmio</p>
            <p className="text-xl font-bold text-green-500">{prize}</p>
          </div>
        </div>
        <button className="btn-primary w-full">Entrar na Sala</button>
      </div>
    </div>
  );
};

export default BingoCard;
