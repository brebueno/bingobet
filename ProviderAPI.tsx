import React from 'react';

interface ProviderAPIProps {
  provider: string;
  apiEndpoint: string;
  apiKey: string;
  status: 'connected' | 'disconnected' | 'pending';
}

const ProviderAPI: React.FC<ProviderAPIProps> = ({
  provider,
  apiEndpoint,
  apiKey,
  status
}) => {
  const statusColor = 
    status === 'connected' ? 'bg-green-500' : 
    status === 'pending' ? 'bg-yellow-500' : 
    'bg-red-500';

  const statusText = 
    status === 'connected' ? 'Conectado' : 
    status === 'pending' ? 'Pendente' : 
    'Desconectado';

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">{provider}</h3>
        <div className={`${statusColor} text-white text-xs font-bold px-2 py-1 rounded-full`}>
          {statusText}
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-400 mb-1">API Endpoint</p>
          <div className="bg-gray-700 rounded p-2 text-sm overflow-x-auto">
            {apiEndpoint}
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-400 mb-1">API Key</p>
          <div className="bg-gray-700 rounded p-2 text-sm flex justify-between items-center">
            <span>{apiKey.substring(0, 8)}...{apiKey.substring(apiKey.length - 8)}</span>
            <button className="text-green-500 hover:text-green-400 text-xs">Mostrar</button>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex space-x-2">
        <button className="btn-primary text-sm py-1 px-3 flex-1">
          {status === 'connected' ? 'Reconectar' : 'Conectar'}
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 text-white text-sm py-1 px-3 rounded-md">
          Testar
        </button>
      </div>
    </div>
  );
};

export default ProviderAPI;
