import React, { useState } from 'react';

interface ThemeSwitcherProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const themes = [
    { id: 'default', name: 'Padrão', color: '#10B981' },
    { id: 'dark', name: 'Escuro', color: '#1F2937' },
    { id: 'gold', name: 'Dourado', color: '#F59E0B' },
    { id: 'red', name: 'Vermelho', color: '#EF4444' },
    { id: 'blue', name: 'Azul', color: '#3B82F6' },
    { id: 'purple', name: 'Roxo', color: '#8B5CF6' }
  ];
  
  return (
    <div className="relative">
      <button 
        className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: themes.find(t => t.id === currentTheme)?.color || '#10B981' }}></span>
        <span>Tema</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50">
          <div className="py-1">
            {themes.map(theme => (
              <button
                key={theme.id}
                className={`flex items-center space-x-2 px-4 py-2 text-sm w-full text-left hover:bg-gray-700 ${currentTheme === theme.id ? 'bg-gray-700' : ''}`}
                onClick={() => {
                  onThemeChange(theme.id);
                  setIsOpen(false);
                }}
              >
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: theme.color }}></span>
                <span>{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
