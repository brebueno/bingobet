import React from 'react';

interface JackpotDisplayProps {
  amount: string;
  buttonText: string;
}

const JackpotDisplay: React.FC<JackpotDisplayProps> = ({
  amount,
  buttonText
}) => {
  return (
    <section className="py-16 bg-gradient-to-r from-yellow-900 to-yellow-800">
      <div className="container-main text-center">
        <h2 className="text-3xl font-bold mb-2">Jackpot Progressivo</h2>
        <p className="text-xl mb-8">O prêmio acumula até ser ganho!</p>
        <div className="bg-black bg-opacity-30 rounded-lg p-8 inline-block">
          <div className="text-5xl md:text-7xl font-bold text-yellow-500 mb-4">
            {amount}
          </div>
          <button className="btn-accent text-lg px-8 py-3">{buttonText}</button>
        </div>
      </div>
    </section>
  );
};

export default JackpotDisplay;
