import React from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  secondaryButtonText: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  primaryButtonText,
  secondaryButtonText
}) => {
  return (
    <section className="bg-gradient-to-r from-green-900 to-green-800 py-16">
      <div className="container-main grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {title.split(' ').map((word, index) => 
              index === title.split(' ').length - 2 ? 
                <span key={index} className="text-yellow-500">{word} </span> : 
                <span key={index}>{word} </span>
            )}
          </h1>
          <p className="text-xl mb-8">
            {subtitle}
          </p>
          <div className="flex space-x-4">
            <button className="btn-primary text-lg px-8 py-3">{primaryButtonText}</button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-900 font-bold text-lg px-8 py-3 rounded-md transition-colors">
              {secondaryButtonText}
            </button>
          </div>
        </div>
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-yellow-500 opacity-20 rounded-lg"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-bold text-white mb-2">BINGO</div>
              <div className="text-2xl text-yellow-400">Jogue e Ganhe!</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
