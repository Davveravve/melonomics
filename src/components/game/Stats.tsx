"use client";

import React from 'react';
import { useGameStore } from '@/store/gameStore';
import { GamePhase } from '@/store/gameStore';

// Format numbers to make them more readable
const formatNumber = (num: number): string => {
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(2)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(2)}K`;
  return num.toFixed(2);
};

// Get phase name from enum
const getGamePhaseName = (phase: GamePhase): string => {
  switch (phase) {
    case GamePhase.MANUAL_PRODUCTION:
      return 'Manual Production';
    case GamePhase.AUTOMATION:
      return 'Automation';
    case GamePhase.MARKET_EXPANSION:
      return 'Market Expansion';
    case GamePhase.WORLD_DOMINATION:
      return 'World Domination';
    default:
      return 'Unknown Phase';
  }
};

const Stats: React.FC = () => {
  // Get stats from game store
  const melons = useGameStore(state => state.melons);
  const money = useGameStore(state => state.money);
  const melonsPerClick = useGameStore(state => state.melonsPerClick);
  const melonsPerSecond = useGameStore(state => state.melonsPerSecond);
  const phase = useGameStore(state => state.phase);
  const totalMelonsProduced = useGameStore(state => state.totalMelonsProduced);
  const totalMoneyEarned = useGameStore(state => state.totalMoneyEarned);
  const totalClicks = useGameStore(state => state.totalClicks);
  const marketDemand = useGameStore(state => state.marketDemand);
  const melonBasePrice = useGameStore(state => state.melonBasePrice);
  const priceMultiplier = useGameStore(state => state.priceMultiplier);
  const seeds = useGameStore(state => state.seeds);

  // Calculate current melon price
  const currentMelonPrice = melonBasePrice * priceMultiplier * marketDemand;

  // Market demand status
  const getMarketStatus = () => {
    if (marketDemand >= 1.2) return 'High Demand';
    if (marketDemand >= 0.8) return 'Normal';
    return 'Low Demand';
  };

  return (
    <div style={{
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1px solid rgba(162, 89, 255, 0.2)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
    }}>
      {/* Panel Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(121,40,202,0.9) 0%, rgba(162,89,255,0.8) 100%)',
        padding: '0.75rem 1rem',
        borderBottom: '1px solid rgba(162,89,255,0.3)'
      }}>
        <h3 className="text-lg font-bold text-white">Statistics</h3>
      </div>
      
      {/* Stats Grid with more minimal layout */}
      <div style={{
        background: '#1A002A',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        borderBottom: '1px solid rgba(162, 89, 255, 0.1)'
      }}>
        <StatItem label="Melons" value={formatNumber(melons)} color="#FF0080" />
        <StatItem label="Money" value={`$${formatNumber(money)}`} color="#00d4ff" />
      </div>
      
      <div style={{
        background: '#1A002A',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        borderBottom: '1px solid rgba(162, 89, 255, 0.1)'
      }}>
        <StatItem label="Seeds" value={formatNumber(seeds)} color="#a259ff" />
        <StatItem label="Game Phase" value={getGamePhaseName(phase)} color="#a259ff" />
      </div>
      
      <div style={{
        background: '#1A002A',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        borderBottom: '1px solid rgba(162, 89, 255, 0.1)'
      }}>
        <StatItem label="Per Click" value={formatNumber(melonsPerClick)} color="#FF0080" />
        <StatItem label="Per Second" value={formatNumber(melonsPerSecond)} color="#FF0080" />
      </div>
      
      <div style={{
        background: '#1A002A',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        borderBottom: '1px solid rgba(162, 89, 255, 0.1)'
      }}>
        <StatItem 
          label="Melon Price" 
          value={`$${formatNumber(currentMelonPrice)}`} 
          subtext={getMarketStatus()} 
          color="#00d4ff" 
        />
        <StatItem label="Total Clicks" value={formatNumber(totalClicks)} color="#a259ff" />
      </div>
      
      <div style={{
        background: '#1A002A',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        borderBottom: '1px solid rgba(162, 89, 255, 0.1)'
      }}>
        <StatItem 
          label="Total Produced" 
          value={formatNumber(totalMelonsProduced)}
          color="#FF0080" 
        />
        <StatItem 
          label="Total Earned" 
          value={`$${formatNumber(totalMoneyEarned)}`}
          color="#00d4ff" 
        />
      </div>
    </div>
  );
};

// Simple, clean stat item
interface StatItemProps {
  label: string;
  value: string;
  subtext?: string;
  color?: string;
}

const StatItem: React.FC<StatItemProps> = ({ 
  label, 
  value, 
  subtext, 
  color = '#a259ff'
}) => {
  return (
    <div style={{
      padding: '0.75rem 1rem',
      borderRight: '1px solid rgba(162, 89, 255, 0.1)'
    }}>
      <div className="text-xs text-[#c4b5fd]">{label}</div>
      <div className="text-lg font-medium" style={{ color }}>{value}</div>
      {subtext && <div className="text-xs text-[#c4b5fd] mt-1">{subtext}</div>}
    </div>
  );
};

export default Stats;