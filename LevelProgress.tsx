import React, { useState, useEffect } from 'react';

interface LevelProgressProps {
  currentLevel: number;
  currentXP: number;
  xpForNextLevel: number;
  onLevelUp?: (newLevel: number) => void;
}

const LevelProgress: React.FC<LevelProgressProps> = ({
  currentLevel,
  currentXP,
  xpForNextLevel,
  onLevelUp
}) => {
  const [progress, setProgress] = useState(0);
  const [isLevelingUp, setIsLevelingUp] = useState(false);
  const [showLevelUpAnimation, setShowLevelUpAnimation] = useState(false);
  const [newLevel, setNewLevel] = useState(currentLevel);
  
  // Calculate progress percentage
  useEffect(() => {
    const percentage = Math.min(100, (currentXP / xpForNextLevel) * 100);
    setProgress(percentage);
    
    // Check for level up
    if (currentXP >= xpForNextLevel && !isLevelingUp) {
      setIsLevelingUp(true);
      setShowLevelUpAnimation(true);
      setNewLevel(currentLevel + 1);
      
      // Notify parent component
      if (onLevelUp) {
        onLevelUp(currentLevel + 1);
      }
      
      // Hide animation after a delay
      setTimeout(() => {
        setShowLevelUpAnimation(false);
        setIsLevelingUp(false);
      }, 3000);
    }
  }, [currentXP, xpForNextLevel, currentLevel, isLevelingUp, onLevelUp]);
  
  // Get level title based on level number
  const getLevelTitle = (level: number) => {
    if (level < 5) return 'Iniciante';
    if (level < 10) return 'Aventureiro';
    if (level < 15) return 'Explorador';
    if (level < 20) return 'Especialista';
    if (level < 25) return 'Mestre';
    if (level < 30) return 'Campeão';
    if (level < 40) return 'Lenda';
    return 'Divino';
  };
  
  // Get color based on level
  const getLevelColor = (level: number) => {
    if (level < 5) return 'from-green-500 to-green-600';
    if (level < 10) return 'from-blue-500 to-blue-600';
    if (level < 15) return 'from-purple-500 to-purple-600';
    if (level < 20) return 'from-pink-500 to-pink-600';
    if (level < 25) return 'from-yellow-500 to-yellow-600';
    if (level < 30) return 'from-orange-500 to-orange-600';
    if (level < 40) return 'from-red-500 to-red-600';
    return 'from-yellow-400 to-yellow-600';
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className={`bg-gradient-to-r ${getLevelColor(currentLevel)} p-4`}>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-white font-bold text-xl">Nível {currentLevel}</h3>
            <p className="text-white text-sm">{getLevelTitle(currentLevel)}</p>
          </div>
          
          <div className="bg-white bg-opacity-20 h-16 w-16 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">{currentLevel}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">XP: {currentXP} / {xpForNextLevel}</span>
          <span className="text-sm text-gray-400">Próximo nível: {currentLevel + 1}</span>
        </div>
        
        <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${getLevelColor(currentLevel)} transition-all duration-1000`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-gray-700 p-3 rounded-md">
            <p className="text-xs text-gray-400 mb-1">Recompensa atual</p>
            <p className="font-bold">Bônus de depósito +{Math.min(50, currentLevel * 2)}%</p>
          </div>
          
          <div className="bg-gray-700 p-3 rounded-md">
            <p className="text-xs text-gray-400 mb-1">Próxima recompensa</p>
            <p className="font-bold text-yellow-500">Bônus de depósito +{Math.min(50, (currentLevel + 1) * 2)}%</p>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="font-bold mb-2">Como ganhar XP</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li className="flex items-center">
              <span className="mr-2 text-green-500">•</span>
              Jogar qualquer jogo: +1 XP por rodada
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-green-500">•</span>
              Completar missões: +5-50 XP
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-green-500">•</span>
              Fazer depósitos: +10 XP por R$50
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-green-500">•</span>
              Participar de torneios: +20 XP
            </li>
          </ul>
        </div>
      </div>
      
      {/* Level Up Animation */}
      {showLevelUpAnimation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
          <div className="text-center animate-bounce-once">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500 rounded-full animate-ping opacity-30"></div>
              <div className="relative bg-yellow-600 text-white rounded-full h-32 w-32 flex items-center justify-center text-4xl font-bold">
                {newLevel}
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mt-6 mb-2">Nível Aumentado!</h2>
            <p className="text-xl text-yellow-500 mb-4">Você alcançou o nível {newLevel}</p>
            <p className="text-gray-300">Novo título: {getLevelTitle(newLevel)}</p>
            
            <div className="mt-6 bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-400">Nova recompensa desbloqueada</p>
              <p className="text-lg font-bold text-yellow-500">Bônus de depósito +{Math.min(50, newLevel * 2)}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelProgress;
