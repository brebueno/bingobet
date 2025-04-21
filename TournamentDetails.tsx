import React, { useState, useEffect } from 'react';

interface TournamentDetailsProps {
  id: string;
  title: string;
  game: string;
  gameImage: string;
  prizePool: number;
  entryFee?: number;
  startTime: Date;
  endTime: Date;
  participants: {
    id: string;
    username: string;
    avatar: string;
    score: number;
    position: number;
  }[];
  rules: string[];
  prizes: {
    position: string;
    reward: string;
  }[];
  isJoined?: boolean;
  onJoin?: (id: string) => void;
  onLeave?: (id: string) => void;
}

const TournamentDetails: React.FC<TournamentDetailsProps> = ({
  id,
  title,
  game,
  gameImage,
  prizePool,
  entryFee = 0,
  startTime,
  endTime,
  participants,
  rules,
  prizes,
  isJoined = false,
  onJoin,
  onLeave
}) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [status, setStatus] = useState<'upcoming' | 'active' | 'ended'>('upcoming');
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'rules' | 'prizes'>('leaderboard');
  const [userPosition, setUserPosition] = useState<number | null>(null);
  
  // Calculate time left and status
  useEffect(() => {
    const calculateTimeAndStatus = () => {
      const now = new Date();
      
      if (now < startTime) {
        // Tournament hasn't started yet
        setStatus('upcoming');
        const difference = startTime.getTime() - now.getTime();
        
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeLeft(`Começa em: ${days > 0 ? `${days}d ` : ''}${hours}h ${minutes}m`);
      } else if (now > endTime) {
        // Tournament has ended
        setStatus('ended');
        setTimeLeft('Encerrado');
      } else {
        // Tournament is active
        setStatus('active');
        const difference = endTime.getTime() - now.getTime();
        
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeLeft(`Termina em: ${days > 0 ? `${days}d ` : ''}${hours}h ${minutes}m`);
      }
    };
    
    calculateTimeAndStatus();
    const interval = setInterval(calculateTimeAndStatus, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [startTime, endTime]);
  
  // Find user position if joined
  useEffect(() => {
    if (isJoined) {
      // In a real app, this would use the actual user ID
      const userParticipant = participants.find(p => p.id === 'current-user');
      if (userParticipant) {
        setUserPosition(userParticipant.position);
      }
    } else {
      setUserPosition(null);
    }
  }, [isJoined, participants]);
  
  // Handle join/leave tournament
  const handleJoinToggle = () => {
    if (isJoined && onLeave) {
      onLeave(id);
    } else if (!isJoined && onJoin) {
      onJoin(id);
    }
  };
  
  // Get status color
  const getStatusColor = () => {
    switch (status) {
      case 'upcoming': return 'bg-blue-600';
      case 'active': return 'bg-green-600';
      case 'ended': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };
  
  // Get status text
  const getStatusText = () => {
    switch (status) {
      case 'upcoming': return 'Em breve';
      case 'active': return 'Em andamento';
      case 'ended': return 'Encerrado';
      default: return '';
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Tournament Header */}
      <div 
        className="relative h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${gameImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
            <div>
              <div className={`${getStatusColor()} text-white text-xs font-bold px-2 py-1 rounded-full mb-2 inline-block`}>
                {getStatusText()}
              </div>
              <h1 className="text-3xl font-bold text-white mb-1">{title}</h1>
              <p className="text-gray-300">{game}</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col items-end">
              <div className="bg-yellow-600 text-black text-sm font-bold px-3 py-1 rounded-full mb-2">
                Prêmio: R$ {prizePool.toLocaleString()}
              </div>
              <p className="text-white font-bold">{timeLeft}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tournament Info */}
      <div className="container-main py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Tournament Details */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-gray-800 rounded-t-lg overflow-hidden">
              <div className="flex border-b border-gray-700">
                <button 
                  className={`flex-1 py-3 text-center font-bold ${activeTab === 'leaderboard' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                  onClick={() => setActiveTab('leaderboard')}
                >
                  Classificação
                </button>
                <button 
                  className={`flex-1 py-3 text-center font-bold ${activeTab === 'rules' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                  onClick={() => setActiveTab('rules')}
                >
                  Regras
                </button>
                <button 
                  className={`flex-1 py-3 text-center font-bold ${activeTab === 'prizes' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                  onClick={() => setActiveTab('prizes')}
                >
                  Prêmios
                </button>
              </div>
              
              <div className="p-4">
                {/* Leaderboard Tab */}
                {activeTab === 'leaderboard' && (
                  <div>
                    <div className="bg-gray-700 rounded-lg p-3 mb-4 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-400">Total de participantes</p>
                        <p className="font-bold text-xl">{participants.length}</p>
                      </div>
                      
                      {userPosition && (
                        <div>
                          <p className="text-sm text-gray-400">Sua posição</p>
                          <p className="font-bold text-xl text-yellow-500">{userPosition}º</p>
                        </div>
                      )}
                      
                      {status === 'active' && (
                        <div>
                          <p className="text-sm text-gray-400">Atualizado há</p>
                          <p className="font-bold">2 minutos</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      {participants.slice(0, 10).map((participant, index) => (
                        <div 
                          key={participant.id}
                          className={`flex items-center p-3 rounded-lg ${
                            participant.id === 'current-user' 
                              ? 'bg-yellow-900 bg-opacity-30 border border-yellow-600' 
                              : index < 3 
                                ? 'bg-gray-700' 
                                : 'bg-gray-800'
                          }`}
                        >
                          <div className="w-8 h-8 flex items-center justify-center font-bold">
                            {index === 0 && <span className="text-yellow-500 text-xl">🥇</span>}
                            {index === 1 && <span className="text-gray-400 text-xl">🥈</span>}
                            {index === 2 && <span className="text-yellow-700 text-xl">🥉</span>}
                            {index > 2 && <span>{participant.position}</span>}
                          </div>
                          
                          <div className="flex-1 flex items-center ml-3">
                            <img 
                              src={participant.avatar} 
                              alt={participant.username} 
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <span className="ml-2 font-bold">
                              {participant.username}
                              {participant.id === 'current-user' && <span className="ml-2 text-xs text-yellow-500">(Você)</span>}
                            </span>
                          </div>
                          
                          <div className="font-bold">
                            {participant.score.toLocaleString()} pts
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {participants.length > 10 && (
                      <button className="w-full mt-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm">
                        Ver todos os {participants.length} participantes
                      </button>
                    )}
                  </div>
                )}
                
                {/* Rules Tab */}
                {activeTab === 'rules' && (
                  <div>
                    <h3 className="font-bold text-lg mb-3">Como funciona</h3>
                    <p className="text-gray-300 mb-4">
                      Participe deste torneio de {game} e concorra a prêmios incríveis! Acumule pontos e suba no ranking para ganhar.
                    </p>
                    
                    <h3 className="font-bold text-lg mb-2">Regras do torneio</h3>
                    <ul className="space-y-2 mb-4">
                      {rules.map((rule, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-yellow-500 mr-2">•</span>
                          <span className="text-gray-300">{rule}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h3 className="font-bold mb-2">Informações importantes</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-400">Início</p>
                          <p className="font-bold">{startTime.toLocaleDateString()} às {startTime.toLocaleTimeString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Término</p>
                          <p className="font-bold">{endTime.toLocaleDateString()} às {endTime.toLocaleTimeString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Taxa de entrada</p>
                          <p className="font-bold">{entryFee > 0 ? `R$ ${entryFee.toFixed(2)}` : 'Grátis'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Premiação total</p>
                          <p className="font-bold text-yellow-500">R$ {prizePool.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Prizes Tab */}
                {activeTab === 'prizes' && (
                  <div>
                    <h3 className="font-bold text-lg mb-3">Premiação</h3>
                    <p className="text-gray-300 mb-4">
                      Confira os prêmios para os melhores colocados neste torneio!
                    </p>
                    
                    <div className="space-y-3">
                      {prizes.map((prize, index) => (
                        <div 
                          key={index}
                          className={`flex items-center justify-between p-4 rounded-lg ${
                            index === 0 
                              ? 'bg-yellow-900 bg-opacity-30 border border-yellow-600' 
                              : index === 1 
                                ? 'bg-gray-700 bg-opacity-80' 
                                : index === 2 
                                  ? 'bg-yellow-800 bg-opacity-20' 
                                  : 'bg-gray-700'
                          }`}
                        >
                          <div className="flex items-center">
                            {index === 0 && <span className="text-yellow-500 text-2xl mr-3">🏆</span>}
                            {index === 1 && <span className="text-gray-300 text-2xl mr-3">🥈</span>}
                            {index === 2 && <span className="text-yellow-700 text-2xl mr-3">🥉</span>}
                            <div>
                              <p className="font-bold">{prize.position}</p>
                              {index === 0 && <p className="text-xs text-gray-400">Campeão</p>}
                            </div>
                          </div>
                          
                          <div className="font-bold text-yellow-500">
                            {prize.reward}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Column - Join and Game Info */}
          <div className="space-y-6">
            {/* Join Tournament Card */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="p-4">
                <h3 className="font-bold text-lg mb-3">Participar do Torneio</h3>
                
                {status === 'upcoming' && (
                  <div className="mb-4">
                    <p className="text-gray-300 mb-2">
                      Este torneio ainda não começou. Inscreva-se agora para participar!
                    </p>
                    <div className="bg-gray-700 p-3 rounded-lg mb-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-400">Taxa de entrada</p>
                          <p className="font-bold">{entryFee > 0 ? `R$ ${entryFee.toFixed(2)}` : 'Grátis'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Seu saldo</p>
                          <p className="font-bold">R$ 1.250,75</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {status === 'active' && (
                  <div className="mb-4">
                    {isJoined ? (
                      <p className="text-gray-300 mb-2">
                        Você está participando deste torneio! Jogue agora para subir no ranking.
                      </p>
                    ) : (
                      <p className="text-gray-300 mb-2">
                        Este torneio já começou, mas você ainda pode participar!
                      </p>
           
(Content truncated due to size limit. Use line ranges to read in chunks)