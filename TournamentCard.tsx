import React, { useState, useEffect } from 'react';

interface TournamentCardProps {
  id: string;
  title: string;
  game: string;
  gameImage: string;
  prizePool: number;
  participants: number;
  endTime: Date;
  isJoined?: boolean;
  onJoin?: (id: string) => void;
}

const TournamentCard: React.FC<TournamentCardProps> = ({
  id,
  title,
  game,
  gameImage,
  prizePool,
  participants,
  endTime,
  isJoined = false,
  onJoin
}) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endTime.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setTimeLeft('Encerrado');
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [endTime]);
  
  const handleJoin = () => {
    if (onJoin) {
      onJoin(id);
    }
  };

  return (
    <div 
      className="bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-yellow-500 transition-all hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img 
          src={gameImage} 
          alt={game} 
          className="w-full h-40 object-cover transition-transform duration-500"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black to-transparent p-3">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm text-gray-300">{game}</p>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
          <div className="flex justify-between items-center">
            <div className="bg-yellow-600 text-black text-xs font-bold px-2 py-1 rounded-full">
              R$ {prizePool.toLocaleString()}
            </div>
            <div className="bg-gray-700 text-white text-xs px-2 py-1 rounded-full">
              {participants} jogadores
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-xs text-gray-400">Termina em</p>
            <p className="font-bold text-yellow-500">{timeLeft}</p>
          </div>
          
          <div>
            <p className="text-xs text-gray-400">Sua posição</p>
            <p className="font-bold text-center">{isJoined ? '32º' : '-'}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-full"
              style={{ width: `${Math.min(100, (participants / 100) * 100)}%` }}
            ></div>
          </div>
          
          <button 
            className={`w-full py-2 px-4 rounded-md font-bold transition-colors ${
              isJoined 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-yellow-500 hover:bg-yellow-600 text-black'
            }`}
            onClick={handleJoin}
          >
            {isJoined ? 'Ver Torneio' : 'Participar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;
