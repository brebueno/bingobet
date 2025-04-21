import React, { useState, useEffect } from 'react';
import TournamentCard from '../ui/TournamentCard';

interface TournamentListProps {
  filter?: 'all' | 'active' | 'upcoming' | 'ended';
  category?: string;
  limit?: number;
  showFilters?: boolean;
}

const TournamentList: React.FC<TournamentListProps> = ({
  filter = 'all',
  category = 'all',
  limit = 0,
  showFilters = true
}) => {
  const [activeFilter, setActiveFilter] = useState(filter);
  const [activeCategory, setActiveCategory] = useState(category);
  const [tournaments, setTournaments] = useState<any[]>([]);
  
  // Simulated tournament data
  useEffect(() => {
    // In a real app, this would be fetched from an API
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const mockTournaments = [
      {
        id: 'tournament-1',
        title: 'Torneio Fortune Tiger',
        game: 'Fortune Tiger',
        gameImage: 'https://via.placeholder.com/400x200?text=Fortune+Tiger',
        prizePool: 10000,
        participants: 78,
        endTime: tomorrow,
        isJoined: true,
        category: 'slots'
      },
      {
        id: 'tournament-2',
        title: 'Campeonato Aviator',
        game: 'Aviator',
        gameImage: 'https://via.placeholder.com/400x200?text=Aviator',
        prizePool: 8000,
        participants: 124,
        endTime: nextWeek,
        isJoined: false,
        category: 'crash'
      },
      {
        id: 'tournament-3',
        title: 'Copa Sweet Bonanza',
        game: 'Sweet Bonanza',
        gameImage: 'https://via.placeholder.com/400x200?text=Sweet+Bonanza',
        prizePool: 5000,
        participants: 56,
        endTime: tomorrow,
        isJoined: false,
        category: 'slots'
      },
      {
        id: 'tournament-4',
        title: 'Torneio Fortune Rabbit',
        game: 'Fortune Rabbit',
        gameImage: 'https://via.placeholder.com/400x200?text=Fortune+Rabbit',
        prizePool: 7500,
        participants: 92,
        endTime: nextWeek,
        isJoined: false,
        category: 'slots'
      },
      {
        id: 'tournament-5',
        title: 'Campeonato de Bingo',
        game: 'Bingo',
        gameImage: 'https://via.placeholder.com/400x200?text=Bingo',
        prizePool: 12000,
        participants: 210,
        endTime: tomorrow,
        isJoined: true,
        category: 'bingo'
      },
      {
        id: 'tournament-6',
        title: 'Torneio de Truco',
        game: 'Truco',
        gameImage: 'https://via.placeholder.com/400x200?text=Truco',
        prizePool: 3000,
        participants: 64,
        endTime: yesterday,
        isJoined: false,
        category: 'cards'
      },
      {
        id: 'tournament-7',
        title: 'Copa Mines',
        game: 'Mines',
        gameImage: 'https://via.placeholder.com/400x200?text=Mines',
        prizePool: 6000,
        participants: 88,
        endTime: nextWeek,
        isJoined: false,
        category: 'crash'
      },
      {
        id: 'tournament-8',
        title: 'Torneio de Roleta',
        game: 'Roleta',
        gameImage: 'https://via.placeholder.com/400x200?text=Roleta',
        prizePool: 9000,
        participants: 45,
        endTime: yesterday,
        isJoined: true,
        category: 'table'
      }
    ];
    
    // Filter tournaments based on active filter
    let filteredTournaments = [...mockTournaments];
    
    if (activeFilter === 'active') {
      filteredTournaments = filteredTournaments.filter(t => 
        t.endTime > now && t.endTime <= tomorrow
      );
    } else if (activeFilter === 'upcoming') {
      filteredTournaments = filteredTournaments.filter(t => 
        t.endTime > tomorrow
      );
    } else if (activeFilter === 'ended') {
      filteredTournaments = filteredTournaments.filter(t => 
        t.endTime < now
      );
    }
    
    // Filter by category
    if (activeCategory !== 'all') {
      filteredTournaments = filteredTournaments.filter(t => 
        t.category === activeCategory
      );
    }
    
    // Apply limit if specified
    if (limit > 0) {
      filteredTournaments = filteredTournaments.slice(0, limit);
    }
    
    setTournaments(filteredTournaments);
  }, [activeFilter, activeCategory, limit]);
  
  // Handle tournament join
  const handleJoinTournament = (id: string) => {
    setTournaments(prev => 
      prev.map(t => 
        t.id === id ? { ...t, isJoined: true } : t
      )
    );
  };
  
  // Categories for filter
  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'slots', name: 'Slots' },
    { id: 'crash', name: 'Crash Games' },
    { id: 'bingo', name: 'Bingo' },
    { id: 'cards', name: 'Cartas' },
    { id: 'table', name: 'Mesa' }
  ];

  return (
    <div>
      {/* Filters */}
      {showFilters && (
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            {/* Status Filter */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              <button 
                className={`px-4 py-2 rounded-md whitespace-nowrap ${
                  activeFilter === 'all' 
                    ? 'bg-green-600 text-white font-bold' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
                onClick={() => setActiveFilter('all')}
              >
                Todos os Torneios
              </button>
              <button 
                className={`px-4 py-2 rounded-md whitespace-nowrap ${
                  activeFilter === 'active' 
                    ? 'bg-green-600 text-white font-bold' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
                onClick={() => setActiveFilter('active')}
              >
                Em Andamento
              </button>
              <button 
                className={`px-4 py-2 rounded-md whitespace-nowrap ${
                  activeFilter === 'upcoming' 
                    ? 'bg-green-600 text-white font-bold' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
                onClick={() => setActiveFilter('upcoming')}
              >
                Em Breve
              </button>
              <button 
                className={`px-4 py-2 rounded-md whitespace-nowrap ${
                  activeFilter === 'ended' 
                    ? 'bg-green-600 text-white font-bold' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
                onClick={() => setActiveFilter('ended')}
              >
                Encerrados
              </button>
            </div>
            
            {/* Category Filter */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  className={`px-4 py-2 rounded-md whitespace-nowrap ${
                    activeCategory === cat.id 
                      ? 'bg-yellow-600 text-black font-bold' 
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Tournament Grid */}
      {tournaments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tournaments.map(tournament => (
            <TournamentCard 
              key={tournament.id}
              id={tournament.id}
              title={tournament.title}
              game={tournament.game}
              gameImage={tournament.gameImage}
              prizePool={tournament.prizePool}
              participants={tournament.participants}
              endTime={tournament.endTime}
              isJoined={tournament.isJoined}
              onJoin={handleJoinTournament}
            />
          ))}
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-xl font-bold mb-2">Nenhum torneio encontrado</p>
          <p className="text-gray-400">Tente selecionar outro filtro ou voltar mais tarde</p>
          <button 
            className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md"
            onClick={() => {
              setActiveFilter('all');
              setActiveCategory('all');
            }}
          >
            Ver Todos os Torneios
          </button>
        </div>
      )}
    </div>
  );
};

export default TournamentList;
