import React from 'react';

interface PaymentFormProps {
  method: 'pix' | 'credit_card' | 'bank_transfer' | 'crypto';
  amount: string;
  onAmountChange: (amount: string) => void;
  onSubmit: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  method,
  amount,
  onAmountChange,
  onSubmit
}) => {
  const renderMethodSpecificFields = () => {
    switch (method) {
      case 'pix':
        return (
          <div className="mb-4">
            <p className="text-gray-400 text-sm mb-2">
              O PIX é instantâneo e não possui taxas. Após confirmar, você receberá um QR Code para pagamento.
            </p>
          </div>
        );
      case 'credit_card':
        return (
          <>
            <div className="mb-4">
              <label htmlFor="card_number" className="block text-gray-300 mb-2">Número do Cartão</label>
              <input 
                type="text" 
                id="card_number" 
                className="w-full bg-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="0000 0000 0000 0000"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="expiry" className="block text-gray-300 mb-2">Validade</label>
                <input 
                  type="text" 
                  id="expiry" 
                  className="w-full bg-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="MM/AA"
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-gray-300 mb-2">CVV</label>
                <input 
                  type="text" 
                  id="cvv" 
                  className="w-full bg-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="123"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-300 mb-2">Nome no Cartão</label>
              <input 
                type="text" 
                id="name" 
                className="w-full bg-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="NOME COMO ESTÁ NO CARTÃO"
              />
            </div>
            <div className="mb-4">
              <p className="text-gray-400 text-sm">
                Taxa de processamento: 2.5% (R$ {(parseFloat(amount || '0') * 0.025).toFixed(2)})
              </p>
            </div>
          </>
        );
      case 'bank_transfer':
        return (
          <div className="mb-4">
            <label htmlFor="bank" className="block text-gray-300 mb-2">Banco</label>
            <select 
              id="bank" 
              className="w-full bg-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Selecione seu banco</option>
              <option value="itau">Itaú</option>
              <option value="bradesco">Bradesco</option>
              <option value="santander">Santander</option>
              <option value="bb">Banco do Brasil</option>
              <option value="caixa">Caixa Econômica</option>
              <option value="nubank">Nubank</option>
            </select>
            <p className="text-gray-400 text-sm mt-2">
              Transferências bancárias podem levar de 1 a 2 dias úteis para serem processadas.
            </p>
          </div>
        );
      case 'crypto':
        return (
          <>
            <div className="mb-4">
              <label htmlFor="crypto" className="block text-gray-300 mb-2">Criptomoeda</label>
              <select 
                id="crypto" 
                className="w-full bg-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="btc">Bitcoin (BTC)</option>
                <option value="eth">Ethereum (ETH)</option>
                <option value="usdt">Tether (USDT)</option>
                <option value="ltc">Litecoin (LTC)</option>
              </select>
            </div>
            <div className="mb-4">
              <p className="text-gray-400 text-sm">
                Pagamentos em criptomoedas são processados em 10-30 minutos. Taxa de rede pode ser aplicada.
              </p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">
        {method === 'pix' && 'Depósito via PIX'}
        {method === 'credit_card' && 'Depósito via Cartão de Crédito'}
        {method === 'bank_transfer' && 'Depósito via Transferência Bancária'}
        {method === 'crypto' && 'Depósito via Criptomoeda'}
      </h3>
      
      <div className="mb-6">
        <label htmlFor="amount" className="block text-gray-300 mb-2">Valor do Depósito (R$)</label>
        <div className="relative">
          <span className="absolute left-3 top-2 text-gray-400">R$</span>
          <input 
            type="text" 
            id="amount" 
            className="w-full bg-gray-700 rounded-md pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="0,00"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
          />
        </div>
      </div>
      
      {renderMethodSpecificFields()}
      
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-300">Total:</p>
          <p className="text-2xl font-bold text-white">
            R$ {method === 'credit_card' 
              ? (parseFloat(amount || '0') * 1.025).toFixed(2) 
              : amount || '0,00'}
          </p>
        </div>
        <button 
          className="btn-primary px-8 py-3"
          onClick={onSubmit}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
