import React, { useState, useEffect } from 'react';

interface DailyRewardProps {
  onClaim?: (reward: any) => void;
  isLoggedIn?: boolean;
}

const DailyReward: React.FC<DailyRewardProps> = ({
  onClaim,
  isLoggedIn = true
}) => {
  const [dayStreak, setDayStreak] = useState(0);
  const [lastClaimDate, setLastClaimDate] = useState<Date | null>(null);
  const [canClaim, setCanClaim] = useState(false);
  const [timeUntilNextClaim, setTimeUntilNextClaim] = useState('');
  const [showReward, setShowReward] = useState(false);
  const [currentReward, setCurrentReward] = useState<any>(null);
  
  // Rewards for each day of the streak
  const rewards = [
    { day: 1, type: 'bonus', value: 5, label: 'R$ 5,00 em bônus' },
    { day: 2, type: 'spins', value: 10, label: '10 giros grátis' },
    { day: 3, type: 'bonus', value: 10, label: 'R$ 10,00 em bônus' },
    { day: 4, type: 'ticket', value: 1, label: '1 cartela de bingo grátis' },
    { day: 5, type: 'spins', value: 20, label: '20 giros grátis' },
    { day: 6, type: 'bonus', value: 15, label: 'R$ 15,00 em bônus' },
    { day: 7, type: 'jackpot', value: 1, label: '1 ticket para sorteio de jackpot' }
  ];
  
  // Simulate loading user data
  useEffect(() => {
    if (isLoggedIn) {
      // In a real app, this would come from an API
      const mockUserData = {
        dayStreak: 3,
        lastClaimDate: new Date(Date.now() - 25 * 60 * 60 * 1000) // 25 hours ago
      };
      
      setDayStreak(mockUserData.dayStreak);
      setLastClaimDate(mockUserData.lastClaimDate);
    }
  }, [isLoggedIn]);
  
  // Check if user can claim reward
  useEffect(() => {
    if (!lastClaimDate || !isLoggedIn) return;
    
    const checkClaimStatus = () => {
      const now = new Date();
      const lastClaim = new Date(lastClaimDate);
      
      // Reset time to midnight for comparison
      const lastClaimDay = new Date(lastClaim.getFullYear(), lastClaim.getMonth(), lastClaim.getDate());
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      // Calculate time difference in days
      const diffTime = today.getTime() - lastClaimDay.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        // User can claim today's reward
        setCanClaim(true);
      } else if (diffDays > 1) {
        // Streak broken, reset to day 1
        setDayStreak(0);
        setCanClaim(true);
      } else {
        // Already claimed today
        setCanClaim(false);
        
        // Calculate time until next claim
        const nextClaimDate = new Date(lastClaimDay);
        nextClaimDate.setDate(nextClaimDate.getDate() + 1);
        
        const timeUntil = nextClaimDate.getTime() - now.getTime();
        const hoursUntil = Math.floor(timeUntil / (1000 * 60 * 60));
        const minutesUntil = Math.floor((timeUntil % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeUntilNextClaim(`${hoursUntil}h ${minutesUntil}m`);
      }
    };
    
    checkClaimStatus();
    const interval = setInterval(checkClaimStatus, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [lastClaimDate, isLoggedIn]);
  
  // Handle claim button click
  const handleClaim = () => {
    if (!canClaim || !isLoggedIn) return;
    
    // Calculate next day in streak (loop back to 1 after day 7)
    const nextDay = (dayStreak % 7) + 1;
    
    // Get reward for the day
    const reward = rewards.find(r => r.day === nextDay);
    
    if (reward) {
      setCurrentReward(reward);
      setShowReward(true);
      
      // Update streak and last claim date
      setDayStreak(nextDay);
      setLastClaimDate(new Date());
      setCanClaim(false);
      
      // Call onClaim callback if provided
      if (onClaim) {
        onClaim(reward);
      }
    }
  };
  
  // Close reward popup
  const closeReward = () => {
    setShowReward(false);
    setCurrentReward(null);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 p-4">
        <h3 className="text-black font-bold text-xl">Recompensa Diária</h3>
        <p className="text-black text-sm">Faça login todos os dias para ganhar recompensas!</p>
      </div>
      
      <div className="p-4">
        {isLoggedIn ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-400">Sequência atual</p>
                <p className="font-bold text-xl">{dayStreak} {dayStreak === 1 ? 'dia' : 'dias'}</p>
              </div>
              
              {!canClaim && (
                <div>
                  <p className="text-sm text-gray-400">Próxima recompensa em</p>
                  <p className="font-bold text-xl">{timeUntilNextClaim}</p>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-4">
              {rewards.map((reward, index) => (
                <div 
                  key={reward.day}
                  className={`relative flex flex-col items-center justify-center p-2 rounded-md ${
                    reward.day <= dayStreak ? 'bg-yellow-600' : 'bg-gray-700'
                  } ${reward.day === dayStreak + 1 && canClaim ? 'ring-2 ring-green-500 animate-pulse' : ''}`}
                >
                  <span className="text-xs font-bold mb-1">Dia {reward.day}</span>
                  
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full mb-1">
                    {reward.type === 'bonus' && (
                      <span className="text-yellow-500 text-lg">R$</span>
                    )}
                    {reward.type === 'spins' && (
                      <span className="text-green-500 text-lg">🎰</span>
                    )}
                    {reward.type === 'ticket' && (
                      <span className="text-blue-500 text-lg">🎫</span>
                    )}
                    {reward.type === 'jackpot' && (
                      <span className="text-purple-500 text-lg">💰</span>
                    )}
                  </div>
                  
                  <span className="text-xs text-center">{reward.value}</span>
                  
                  {reward.day <= dayStreak && (
                    <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <button 
              className={`w-full py-3 rounded-md font-bold ${
                canClaim 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
              onClick={handleClaim}
              disabled={!canClaim}
            >
              {canClaim ? 'Receber Recompensa' : 'Já Recebido Hoje'}
            </button>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-400 mb-3">Faça login para receber sua recompensa diária</p>
            <a href="/auth" className="inline-block bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-2 px-6 rounded-md">
              Entrar
            </a>
          </div>
        )}
      </div>
      
      {/* Reward popup */}
      {showReward && currentReward && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
          <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4 animate-bounce-once">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-yellow-600 rounded-full flex items-center justify-center mb-4">
                {currentReward.type === 'bonus' && (
                  <span className="text-black text-3xl font-bold">R$</span>
                )}
                {currentReward.type === 'spins' && (
                  <span className="text-black text-3xl">🎰</span>
                )}
                {currentReward.type === 'ticket' && (
                  <span className="text-black text-3xl">🎫</span>
                )}
                {currentReward.type === 'jackpot' && (
                  <span className="text-black text-3xl">💰</span>
                )}
              </div>
              
              <h3 className="text-2xl font-bold mb-2">Parabéns!</h3>
              <p className="text-gray-300 mb-4">Você recebeu sua recompensa do dia {currentReward.day}:</p>
              
              <div className="bg-gray-700 p-4 rounded-lg mb-6">
                <p className="text-xl font-bold text-yellow-500">{currentReward.label}</p>
              </div>
              
              <button 
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md w-full"
                onClick={closeReward}
              >
                Receber
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyReward;
