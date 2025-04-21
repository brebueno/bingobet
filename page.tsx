import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import BingoCard from '../components/bingo/BingoCard';
import JackpotDisplay from '../components/bingo/JackpotDisplay';
import HeroSection from '../components/ui/HeroSection';
import GameCard from '../components/games/GameCard';
import PromotionCard from '../components/ui/PromotionCard';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection 
        title="A melhor plataforma de Bingo Online do Brasil"
        subtitle="Jogue bingo e seus jogos brasileiros favoritos como Truco, Canastra, Dominó e Caxeta."
        primaryButtonText="Jogar Agora"
        secondaryButtonText="Saiba Mais"
      />

      {/* Bingo Rooms Section */}
      <section className="py-16 bg-gray-900">
        <div className="container-main">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Salas de Bingo em <span className="text-green-500">Tempo Real</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BingoCard 
              variant="traditional"
              title="Bingo Tradicional"
              description="90 bolas"
              countdown="02:45"
              players={124}
              prize="R$ 1.250"
            />
            
            <BingoCard 
              variant="american"
              title="Bingo Americano"
              description="75 bolas"
              countdown="05:12"
              players={87}
              prize="R$ 980"
            />
            
            <BingoCard 
              variant="blitz"
              title="Bingo Blitz"
              description="Jogos rápidos"
              countdown="00:58"
              players={215}
              prize="R$ 2.500"
            />
          </div>
        </div>
      </section>

      {/* Jackpot Section */}
      <JackpotDisplay 
        amount="R$ 45.780,00"
        buttonText="Jogar pelo Jackpot"
      />

      {/* Games Section */}
      <section className="py-16 bg-gray-900">
        <div className="container-main">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Jogos <span className="text-green-500">Brasileiros</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <GameCard 
              title="Truco"
              description="O clássico jogo de cartas brasileiro"
              emoji="🃏"
            />
            
            <GameCard 
              title="Canastra"
              description="Monte sequências e faça canastras"
              emoji="🎴"
            />
            
            <GameCard 
              title="Dominó"
              description="Estratégia e sorte em um só jogo"
              emoji="🀄"
            />
            
            <GameCard 
              title="Caxeta"
              description="O poker brasileiro tradicional"
              emoji="🃏"
            />
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section className="py-16 bg-gray-800">
        <div className="container-main">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Promoções <span className="text-yellow-500">Especiais</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PromotionCard 
              title="Bingo Grátis"
              description="Novos usuários ganham 5 cartelas sem depósito!"
              buttonText="Cadastre-se Agora"
              variant="primary"
            />
            
            <PromotionCard 
              title="Indique um Amigo"
              description="Ganhe R$20 para cada amigo que se cadastrar!"
              buttonText="Saiba Mais"
              variant="secondary"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
