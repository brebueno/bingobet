import React, { useState } from 'react';

interface AchievementCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  reward: string;
  isCompleted: boolean;
  isNew?: boolean;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  id,
  title,
  description,
  icon,
  progress,
  maxProgress,
  reward,
  isCompleted,
  isNew = false
}) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const progressPercentage = Math.min(100, (progress / maxProgress) * 100);
  
  return (
    <div 
      className={`bg-gray-800 rounded-lg overflow-hidden transition-all ${
        isCompleted ? 'ring-2 ring-yellow-500' : ''
      } ${isNew ? 'animate-pulse' : ''}`}
    >
      <div 
        className="p-4 cursor-pointer"
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="flex items-center space-x-3">
          <div className={`h-12 w-12 rounded-full flex items-center justify-center text-2xl ${
            isCompleted ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white'
          }`}>
            {icon}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="font-bold">{title}</h3>
              {isNew && (
                <span className="ml-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
                  Novo
                </span>
              )}
              {isCompleted && (
                <span className="ml-2 text-yellow-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </div>
            
            <div className="mt-1 w-full bg-gray-700 h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full ${isCompleted ? 'bg-yellow-500' : 'bg-green-500'}`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between mt-1 text-xs text-gray-400">
              <span>{progress} / {maxProgress}</span>
              <span>{isCompleted ? 'Concluído' : `${Math.floor(progressPercentage)}%`}</span>
            </div>
          </div>
          
          <div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 transition-transform ${showDetails ? 'transform rotate-180' : ''}`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      {showDetails && (
        <div className="px-4 pb-4 pt-0">
          <div className="border-t border-gray-700 pt-3">
            <p className="text-sm text-gray-300 mb-3">{description}</p>
            
            <div className="bg-gray-700 p-3 rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-400">Recompensa</p>
                  <p className="font-bold text-yellow-500">{reward}</p>
                </div>
                
                <button 
                  className={`px-4 py-1 rounded-md text-sm font-bold ${
                    isCompleted 
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-black' 
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!isCompleted}
                >
                  {isCompleted ? 'Resgatar' : 'Incompleto'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementCard;
