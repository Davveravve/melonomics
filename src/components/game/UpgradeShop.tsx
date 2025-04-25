"use client";

import React, { useState } from 'react';
import { useGameStore } from '@/store/gameStore';

// Format numbers to make them more readable
const formatNumber = (num: number): string => {
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(2)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(2)}K`;
  return num.toFixed(2);
};

const UpgradeShop: React.FC = () => {
  // Shop tabs
  const [activeTab, setActiveTab] = useState<'buildings' | 'upgrades' | 'research'>('buildings');
  
  // Get game state
  const buildings = useGameStore(state => state.buildings);
  const buyBuilding = useGameStore(state => state.buyBuilding);
  const money = useGameStore(state => state.money);
  const phase = useGameStore(state => state.phase);
  const upgrades = useGameStore(state => state.upgrades);
  const buyUpgrade = useGameStore(state => state.buyUpgrade);

  // Render a building purchase option
  const renderBuilding = (buildingId: string) => {
    const building = buildings[buildingId];
    if (!building || building.unlockPhase > phase) return null;
    
    const cost = building.baseCost * Math.pow(1.15, building.count);
    const canAfford = money >= cost;
    
    return (
      <div 
        key={buildingId}
        style={{
          background: 'rgba(26, 0, 42, 0.7)',
          borderRadius: '16px',
          marginBottom: '12px',
          padding: '16px',
          border: '1px solid rgba(162, 89, 255, 0.2)'
        }}
      >
        <div className="flex flex-col">
          <div className="mb-3">
            <h4 className="font-semibold text-white text-lg">{building.name}</h4>
            <p className="text-[#c4b5fd] text-sm mt-1">{building.description}</p>
          </div>
          
          <div className="flex justify-between items-end mt-2">
            <div className="flex items-center">
              <span className="text-[#00d4ff] font-medium text-sm mr-3">
                +{formatNumber(building.baseProduction)} melons/sec
              </span>
              <span className="text-[#c4b5fd] bg-[#381c5b] px-2 py-1 rounded-md text-xs">
                Owned: {building.count}
              </span>
            </div>
            
            <div className="flex items-center">
              <p className={`font-semibold ${canAfford ? 'text-[#00d4ff]' : 'text-[#FF0080]'} mr-3`}>
                ${formatNumber(cost)}
              </p>
              <button
                onClick={() => buyBuilding(buildingId)}
                disabled={!canAfford}
                style={{
                  background: canAfford ? 'rgba(121, 40, 202, 0.8)' : 'rgba(26, 0, 42, 0.5)',
                  border: canAfford ? '1px solid rgba(162, 89, 255, 0.7)' : '1px solid rgba(162, 89, 255, 0.3)',
                  color: canAfford ? 'white' : '#c4b5fd',
                  borderRadius: '12px',
                  padding: '6px 16px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: canAfford ? 'pointer' : 'not-allowed',
                  opacity: canAfford ? 1 : 0.7
                }}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render an upgrade purchase option
  const renderUpgrade = (upgradeId: string) => {
    const upgrade = upgrades[upgradeId];
    if (!upgrade || upgrade.purchased || upgrade.unlockPhase > phase) return null;
    
    // Check if requirements are met (if any)
    const requirementMet = !upgrade.requirement || upgrade.requirement(useGameStore.getState());
    if (!requirementMet) return null;
    
    const canAfford = money >= upgrade.cost;
    
    return (
      <div 
        key={upgradeId}
        style={{
          background: 'rgba(26, 0, 42, 0.7)',
          borderRadius: '16px',
          marginBottom: '12px',
          padding: '16px',
          border: '1px solid rgba(162, 89, 255, 0.2)'
        }}
      >
        <div className="flex flex-col">
          <div className="mb-3">
            <h4 className="font-semibold text-white text-lg">{upgrade.name}</h4>
            <p className="text-[#c4b5fd] text-sm mt-1">{upgrade.description}</p>
          </div>
          
          <div className="flex justify-end items-center mt-2">
            <p className={`font-semibold ${canAfford ? 'text-[#a259ff]' : 'text-[#FF0080]'} mr-3`}>
              ${formatNumber(upgrade.cost)}
            </p>
            <button
              onClick={() => buyUpgrade(upgradeId)}
              disabled={!canAfford}
              style={{
                background: canAfford ? 'rgba(255, 0, 128, 0.8)' : 'rgba(26, 0, 42, 0.5)',
                border: canAfford ? '1px solid rgba(255, 0, 128, 0.7)' : '1px solid rgba(162, 89, 255, 0.3)',
                color: canAfford ? 'white' : '#c4b5fd',
                borderRadius: '12px',
                padding: '6px 16px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: canAfford ? 'pointer' : 'not-allowed',
                opacity: canAfford ? 1 : 0.7
              }}
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render the research placeholder
  const renderResearchPlaceholder = () => {
    return (
      <div 
        style={{
          background: 'rgba(26, 0, 42, 0.7)',
          borderRadius: '16px',
          padding: '24px',
          textAlign: 'center',
          border: '1px solid rgba(162, 89, 255, 0.2)'
        }}
      >
        <h3 className="text-xl font-bold text-[#a259ff] mb-2">
          Coming Soon!
        </h3>
        <p className="text-[#c4b5fd]">
          Research options will be available in the next phase!
        </p>
      </div>
    );
  };

  // Render the active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'buildings':
        return (
          <div className="p-4">
            {Object.keys(buildings).map(buildingId => renderBuilding(buildingId))}
          </div>
        );
      case 'upgrades':
        return (
          <div className="p-4">
            {Object.keys(upgrades).map(upgradeId => renderUpgrade(upgradeId))}
          </div>
        );
      case 'research':
        return (
          <div className="p-4">
            {renderResearchPlaceholder()}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{
      borderRadius: '24px',
      overflow: 'hidden',
      backgroundColor: '#2C0A47',
      border: '1px solid rgba(162, 89, 255, 0.2)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
    }}>
      {/* Panel Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(121,40,202,0.9) 0%, rgba(162,89,255,0.8) 100%)',
        padding: '1.25rem 1.5rem',
        borderBottom: '1px solid rgba(162,89,255,0.3)'
      }}>
        <h3 className="text-xl font-bold text-white">Shop</h3>
      </div>
      
      {/* Tab navigation with better spacing */}
      <div style={{
        background: 'rgba(26, 0, 42, 0.8)',
        padding: '12px 16px',
        borderBottom: '1px solid rgba(162, 89, 255, 0.2)'
      }}>
        <div className="flex space-x-3">
          <button
            onClick={() => setActiveTab('buildings')}
            style={{
              background: activeTab === 'buildings' ? 'rgba(121, 40, 202, 0.3)' : 'transparent',
              color: activeTab === 'buildings' ? 'white' : '#c4b5fd',
              padding: '8px 16px',
              borderRadius: '12px',
              fontWeight: activeTab === 'buildings' ? 'bold' : 'normal',
              border: activeTab === 'buildings' ? '1px solid rgba(162, 89, 255, 0.5)' : '1px solid transparent'
            }}
          >
            Buildings
          </button>
          
          <button
            onClick={() => setActiveTab('upgrades')}
            style={{
              background: activeTab === 'upgrades' ? 'rgba(121, 40, 202, 0.3)' : 'transparent',
              color: activeTab === 'upgrades' ? 'white' : '#c4b5fd',
              padding: '8px 16px',
              borderRadius: '12px',
              fontWeight: activeTab === 'upgrades' ? 'bold' : 'normal',
              border: activeTab === 'upgrades' ? '1px solid rgba(162, 89, 255, 0.5)' : '1px solid transparent'
            }}
          >
            Upgrades
          </button>
          
          <button
            onClick={() => setActiveTab('research')}
            style={{
              background: activeTab === 'research' ? 'rgba(121, 40, 202, 0.3)' : 'transparent',
              color: activeTab === 'research' ? 'white' : '#c4b5fd',
              padding: '8px 16px',
              borderRadius: '12px',
              fontWeight: activeTab === 'research' ? 'bold' : 'normal',
              border: activeTab === 'research' ? '1px solid rgba(162, 89, 255, 0.5)' : '1px solid transparent'
            }}
          >
            Research
          </button>
        </div>
      </div>
      
      {/* Tab content */}
      <div style={{background: 'rgba(44, 10, 71, 0.8)'}}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default UpgradeShop;