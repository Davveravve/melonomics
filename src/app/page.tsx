"use client";

import React, { useEffect } from 'react';
import MelonField from '@/components/game/MelonField';
import UpgradeShop from '@/components/game/UpgradeShop';
import Stats from '@/components/game/Stats';
import useGameLoop from '@/hooks/useGameLoop';

export default function Home() {
  // Initialize the game loop with a stable reference
  const gameLoop = useGameLoop();
  
  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #1A002A 0%, #2C0A47 100%)',
      backgroundAttachment: 'fixed'
    }}>
      {/* Header with glowing gradient and rounded bottom corners */}
      <header style={{
        background: 'linear-gradient(135deg, rgba(121,40,202,0.95) 0%, rgba(162,89,255,0.9) 100%)',
        borderBottom: '1px solid rgba(162,89,255,0.5)',
        padding: '1rem 0',
        boxShadow: '0 0 20px rgba(162,89,255,0.4)',
        borderBottomLeftRadius: '24px',
        borderBottomRightRadius: '24px',
        marginBottom: '24px'
      }}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white" style={{
            textShadow: '0 0 15px rgba(255,255,255,0.5)'
          }}>
            Watermelon Empire
          </h1>
          <div className="hidden md:block">
            <span className="px-3 py-1 rounded-full bg-[#FF0080] text-white text-xs font-bold">
              Alpha Version
            </span>
          </div>
        </div>
      </header>
      
      {/* Main content area with better spacing */}
      <main className="container mx-auto px-4 py-4">
        {/* Melon Economy Status Bar */}
        <div style={{
          background: 'rgba(26, 0, 42, 0.9)',
          borderRadius: '16px',
          padding: '0.5rem 1rem',
          marginBottom: '16px',
          fontSize: '0.9rem'
        }}>
          <div className="flex items-center justify-between text-[#c4b5fd]">
            <span className="font-medium">Melonomics</span>
            <span className="text-[#00d4ff] text-sm">
              Market Status: Stable
            </span>
          </div>
        </div>
        
        {/* Three-column layout with responsive design and better spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Melon Field - Make it the primary focus */}
          <div className="lg:col-span-5 space-y-4">
            <MelonField />
          </div>
          
          {/* Stats panel */}
          <div className="lg:col-span-7">
            <Stats />
          </div>
          
          {/* Shop panel - full width */}
          <div className="lg:col-span-12">
            <UpgradeShop />
          </div>
        </div>
      </main>
      
      {/* Footer with gradient */}
      <footer style={{
        background: 'linear-gradient(135deg, rgba(26,0,42,0.95) 0%, rgba(44,10,71,0.9) 100%)',
        borderTop: '1px solid rgba(162,89,255,0.2)',
        padding: '1rem 0',
        marginTop: '1.5rem',
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px'
      }}>
        <div className="container mx-auto px-6 text-center">
          <p className="text-[#c4b5fd] text-sm">© {new Date().getFullYear()} David Rajala</p>
        </div>
      </footer>
    </div>
  );
}