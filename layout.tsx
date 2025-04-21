import React from 'react';
import CacheManager from '../components/utils/CacheManager';
import ApiClient from '../components/utils/ApiClient';
import ErrorBoundary from '../components/utils/ErrorBoundary';
import PerformanceMonitor from '../components/utils/PerformanceMonitor';
import '../globals.css';

export const metadata = {
  title: 'BingoBet - A melhor plataforma de bingo e jogos brasileiros',
  description: 'Jogue bingo online, Fortune Tiger, Aviator e jogos brasileiros como Truco, Canastra e Dominó na BingoBet.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" data-theme="default">
      <body className="bg-gray-900 text-white min-h-screen">
        <ErrorBoundary>
          <PerformanceMonitor>
            <CacheManager>
              <ApiClient>
                {children}
              </ApiClient>
            </CacheManager>
          </PerformanceMonitor>
        </ErrorBoundary>
      </body>
    </html>
  );
}
