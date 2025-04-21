import React from 'react';

interface ProviderIntegrationProps {
  provider: string;
  gameCount: number;
  logo: string;
  isPopular?: boolean;
}

const ProviderIntegration: React.FC<ProviderIntegrationProps> = ({
  provider,
  gameCount,
  logo,
  isPopular = false
}) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-green-500 transition-all hover:-translate-y-1">
      <div className="relative">
        {isPopular && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
            Popular
          </div>
        )}
        <div className="h-32 bg-gray-900 flex items-center justify-center p-4">
          <div className="text-center text-2xl font-bold text-white">{logo}</div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-1">{provider}</h3>
        <p className="text-sm text-gray-400 mb-3">{gameCount} jogos disponíveis</p>
        <button className="btn-primary w-full">Integrar</button>
      </div>
    </div>
  );
};

export default ProviderIntegration;
