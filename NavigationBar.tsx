import React, { useState, useEffect } from 'react';
import ThemeSwitcher from './ThemeSwitcher';

interface NavigationBarProps {
  transparent?: boolean;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ transparent = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('default');
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    // Aqui seria implementada a lógica para aplicar o tema globalmente
    document.documentElement.setAttribute('data-theme', theme);
  };
  
  const navItems = [
    { name: 'Início', href: '/' },
    { name: 'Bingo', href: '/bingo' },
    { name: 'Jogos', href: '/games' },
    { name: 'Cassino ao Vivo', href: '/live-casino' },
    { name: 'Promoções', href: '/promotions' },
    { name: 'Torneios', href: '/tournaments', isNew: true },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent && !isScrolled 
          ? 'bg-transparent' 
          : 'bg-gray-900 shadow-lg'
      }`}
    >
      <div className="container-main">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold">
              <span className="text-green-500">Bingo</span>Bet
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.href}
                className="relative text-gray-300 hover:text-white transition-colors"
              >
                {item.name}
                {item.isNew && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1 rounded-full">
                    Novo
                  </span>
                )}
              </a>
            ))}
          </div>
          
          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <ThemeSwitcher currentTheme={currentTheme} onThemeChange={handleThemeChange} />
            
            <a href="/auth" className="hidden md:block btn-secondary">
              Entrar
            </a>
            
            <a href="/auth?register=true" className="hidden md:block btn-primary">
              Cadastrar
            </a>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 py-4">
          <div className="container-main">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a 
                  key={item.name}
                  href={item.href}
                  className="relative text-gray-300 hover:text-white transition-colors py-2"
                >
                  {item.name}
                  {item.isNew && (
                    <span className="ml-2 bg-green-500 text-white text-xs px-1 rounded-full">
                      Novo
                    </span>
                  )}
                </a>
              ))}
              
              <div className="flex space-x-4 pt-4 border-t border-gray-700">
                <a href="/auth" className="btn-secondary flex-1 text-center">
                  Entrar
                </a>
                
                <a href="/auth?register=true" className="btn-primary flex-1 text-center">
                  Cadastrar
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
