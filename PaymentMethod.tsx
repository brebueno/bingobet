import React from 'react';

interface PaymentMethodProps {
  name: string;
  icon: string;
  isPopular?: boolean;
  isInstant?: boolean;
  processingTime: string;
  fee: string;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  name,
  icon,
  isPopular = false,
  isInstant = false,
  processingTime,
  fee
}) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-green-500 transition-all hover:-translate-y-1">
      <div className="relative">
        {isPopular && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
            Popular
          </div>
        )}
        {isInstant && (
          <div className="absolute top-2 right-2 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded-full">
            Instantâneo
          </div>
        )}
        <div className="h-24 bg-gray-900 flex items-center justify-center p-4">
          <div className="text-center text-3xl font-bold">{icon}</div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{name}</h3>
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>Tempo:</span>
          <span>{processingTime}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-400 mb-3">
          <span>Taxa:</span>
          <span>{fee}</span>
        </div>
        <button className="btn-primary w-full">Configurar</button>
      </div>
    </div>
  );
};

export default PaymentMethod;
