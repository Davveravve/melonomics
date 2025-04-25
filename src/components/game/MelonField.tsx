"use client";

import React, { useState, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import Button from '@/components/ui/Button';
import Panel from '@/components/ui/Panel';

interface ClickEffect {
  id: number;
  x: number;
  y: number;
  value: number;
}

const MelonField: React.FC = () => {
  // Game state
  const melons = useGameStore(state => state.melons);
  const melonsPerClick = useGameStore(state => state.melonsPerClick);
  const click = useGameStore(state => state.click);
  const sellMelons = useGameStore(state => state.sellMelons);
  
  // State for click effects
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);
  const [nextId, setNextId] = useState(0);
  
  // Format number for display
  const formatNumber = (num: number): string => {
    return Math.floor(num).toLocaleString();
  };
  
  // Handle click animation
  const handleClick = () => {
    // Create center of panel click effect
    const newEffect = {
      id: nextId,
      x: 50, // center percentage
      y: 50, // center percentage
      value: melonsPerClick,
    };
    
    setClickEffects(prev => [...prev, newEffect]);
    setNextId(prev => prev + 1);
    
    // Remove the effect after animation completes
    setTimeout(() => {
      setClickEffects(prev => prev.filter(effect => effect.id !== newEffect.id));
    }, 1000);
    
    // Update game state
    click();
  };

  // Handle sell button click
  const handleSellMelons = () => {
    if (melons > 0) {
      sellMelons(melons);
    }
  };

  // Handle sell half button click
  const handleSellHalf = () => {
    if (melons > 0) {
      sellMelons(Math.floor(melons / 2));
    }
  };

  return (
    <div className="modern-panel animate-fade-in" style={{
      borderRadius: '32px',
      overflow: 'hidden',
      boxShadow: '0 15px 30px rgba(0,0,0,0.4), 0 0 15px rgba(162,89,255,0.3)'
    }}>
      {/* Panel Header */}
      <div className="modern-panel-header" style={{
        background: 'linear-gradient(135deg, rgba(121,40,202,0.9) 0%, rgba(162,89,255,0.8) 100%)',
        padding: '1.5rem 2rem',
        borderBottom: '1px solid rgba(162,89,255,0.3)'
      }}>
        <h3 className="text-xl font-bold text-white" style={{
          textShadow: '0 0 10px rgba(255,255,255,0.5)'
        }}>Melon Factory</h3>
      </div>
      
      {/* Panel Content with better spacing */}
      <div className="p-8 bg-[#2C0A47] relative spacious-y">
        {/* Click effects (floating numbers) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {clickEffects.map(effect => (
            <div
              key={effect.id}
              className="absolute text-[#FF0080] font-bold text-xl"
              style={{
                left: `${effect.x}%`,
                top: `${effect.y}%`,
                transform: 'translate(-50%, -50%)',
                animation: 'moveUp 1s forwards',
                textShadow: '0 0 8px rgba(255,0,128,0.7)'
              }}
            >
              +{effect.value}
            </div>
          ))}
        </div>
        
        {/* Big melon counter with floating animation */}
        <div className="text-center mb-10 animate-float">
          <p className="text-[#c4b5fd] mb-3">Current Melons</p>
          <div className="text-5xl font-bold neon-pink-text" style={{
            textShadow: '0 0 15px rgba(255,0,128,0.7)',
            letterSpacing: '0.05em'
          }}>
            {formatNumber(melons)}
          </div>
        </div>
        
        {/* Big Create Melon button at the top */}
        <div className="flex justify-center mb-10">
          <button
            onClick={handleClick}
            className="modern-button primary-button animate-pulse-slow"
            style={{
              padding: '1.25rem 2.5rem',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, rgba(121,40,202,0.9), rgba(162,89,255,0.8))',
              boxShadow: '0 0 20px rgba(162,89,255,0.7), 0 10px 20px -10px rgba(0,0,0,0.5)',
              border: '2px solid rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease'
            }}
          >
            Create Melon (+{melonsPerClick})
          </button>
        </div>
        
        {/* Sell buttons with ample spacing and extra rounded */}
        <div className="grid grid-cols-2 gap-6 mt-8">
          <button
            onClick={handleSellMelons}
            disabled={melons <= 0}
            className="modern-button secondary-button"
            style={{
              opacity: melons <= 0 ? 0.5 : 1,
              cursor: melons <= 0 ? 'not-allowed' : 'pointer',
              borderRadius: '9999px',
              padding: '0.875rem',
              background: 'rgba(255,0,128,0.8)',
              boxShadow: melons > 0 ? '0 0 15px rgba(255,0,128,0.5)' : 'none'
            }}
          >
            Sell All Melons
          </button>
          <button
            onClick={handleSellHalf}
            disabled={melons <= 0}
            className="modern-button outline-button"
            style={{
              opacity: melons <= 0 ? 0.5 : 1,
              cursor: melons <= 0 ? 'not-allowed' : 'pointer',
              borderRadius: '9999px',
              padding: '0.875rem',
              background: 'transparent',
              border: '2px solid rgba(162,89,255,0.7)',
              color: 'rgb(162,89,255)',
              boxShadow: melons > 0 ? '0 0 10px rgba(162,89,255,0.3)' : 'none'
            }}
          >
            Sell Half
          </button>
        </div>
        
        {/* Additional information in a floating card */}
        <div className="mt-8 p-5 bg-[#1A002A] rounded-2xl border border-[#a259ff20]" style={{
          borderRadius: '20px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
        }}>
          <p className="text-[#c4b5fd] text-center">
            Click the button above to create watermelons. Each click produces {melonsPerClick} melons.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MelonField;