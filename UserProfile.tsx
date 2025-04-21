import React, { useState, useEffect } from 'react';

interface UserProfileProps {
  username?: string;
  balance?: number;
  level?: number;
  avatarUrl?: string;
  onLogout?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  username = 'Jogador',
  balance = 0,
  level = 1,
  avatarUrl = 'https://via.placeholder.com/40',
  onLogout
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [xpPercentage, setXpPercentage] = useState(0);
  
  useEffect(() => {
    // Simulação de progresso de XP
    setXpPercentage(Math.floor(Math.random() * 100));
  }, [level]);
  
  return (
    <div className="relative">
      <button 
        className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 rounded-lg p-2"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="relative">
          <img 
            src={avatarUrl} 
            alt={username} 
            className="h-8 w-8 rounded-full object-cover"
          />
          <div className="absolute -bottom-1 -right-1 bg-green-500 h-3 w-3 rounded-full border-2 border-gray-800"></div>
        </div>
        
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium">{username}</p>
          <p className="text-xs text-gray-400">Nível {level}</p>
        </div>
        
        <div className="hidden md:block bg-gray-700 px-2 py-1 rounded-md">
          <p className="text-sm font-bold">R$ {balance.toFixed(2)}</p>
        </div>
        
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <img 
                src={avatarUrl} 
                alt={username} 
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="font-bold">{username}</p>
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-gray-400">Nível {level}</span>
                  <div className="bg-gray-700 h-4 w-16 rounded-full overflow-hidden">
                    <div 
                      className="bg-green-500 h-full" 
                      style={{ width: `${xpPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="bg-gray-700 p-2 rounded-md text-center">
                <p className="text-xs text-gray-400">Saldo</p>
                <p className="font-bold">R$ {balance.toFixed(2)}</p>
              </div>
              <div className="bg-gray-700 p-2 rounded-md text-center">
                <p className="text-xs text-gray-400">Bônus</p>
                <p className="font-bold text-yellow-500">R$ {(balance * 0.1).toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className="py-1">
            <a href="/profile" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span>Meu Perfil</span>
            </a>
            
            <a href="/transactions" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>Transações</span>
            </a>
            
            <a href="/deposit" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-green-500 font-bold">Depositar</span>
            </a>
            
            <a href="/withdrawal" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>Sacar</span>
            </a>
            
            <a href="/favorites" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>Favoritos</span>
            </a>
            
            <a href="/settings" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              <span>Configurações</span>
            </a>
            
            <div className="border-t border-gray-700 mt-1 pt-1">
              <button 
                className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700 w-full text-left text-red-500"
                onClick={onLogout}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 3a1 1 0 10-2 0v6.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L14 12.586V6z" clipRule="evenodd" />
                </svg>
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
