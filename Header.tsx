import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="container-main py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="text-3xl font-bold text-white mr-2">
              <span className="text-green-500">Bingo</span>Bet
            </div>
            <div className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
              BETA
            </div>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
            <a href="/" className="nav-link">Início</a>
            <a href="/bingo" className="nav-link">Bingo</a>
            <a href="/games" className="nav-link">Jogos</a>
            <a href="/promotions" className="nav-link">Promoções</a>
            <a href="/deposit" className="nav-link">Depositar</a>
          </nav>
          
          <div className="flex items-center mt-4 md:mt-0">
            <button className="btn-secondary mr-2">Entrar</button>
            <button className="btn-primary">Cadastrar</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
