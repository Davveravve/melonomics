"use client";

import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

// Game phases
export enum GamePhase {
  MANUAL_PRODUCTION = 1,
  AUTOMATION = 2,
  MARKET_EXPANSION = 3,
  WORLD_DOMINATION = 4,
}

// Types for buildings and upgrades
export interface Building {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  baseProduction: number;
  count: number;
  unlockPhase: GamePhase;
  multiplier: number;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  purchased: boolean;
  unlockPhase: GamePhase;
  effect: (state: GameState) => void;
  requirement?: (state: GameState) => boolean;
}

export interface Research {
  id: string;
  name: string;
  description: string;
  cost: number;
  progress: number;
  completed: boolean;
  unlockPhase: GamePhase;
  effect: (state: GameState) => void;
}

// Main game state interface
export interface GameState {
  // Core resources
  melons: number;
  money: number;
  seeds: number;
  
  // Game progression
  phase: GamePhase;
  unlockNextPhase: number; // Amount of money needed to unlock next phase
  
  // Production metrics
  melonsPerClick: number;
  melonsPerSecond: number;
  
  // Economy 
  melonBasePrice: number;
  priceMultiplier: number;
  marketDemand: number; // 0-2 multiplier affecting melon prices
  
  // Buildings and upgrades
  buildings: Record<string, Building>;
  upgrades: Record<string, Upgrade>;
  research: Record<string, Research>;
  
  // Game stats
  totalMelonsProduced: number;
  totalMoneyEarned: number;
  totalClicks: number;
  
  // Timestamps
  lastTickTime: number;
  gameStartTime: number;
  
  // Offline progress
  offlineProgressEnabled: boolean;
  offlineProgressRate: number; // 0-1 multiplier of regular production
  
  // Methods
  initialize: () => void;
  click: () => void;
  sellMelons: (amount: number) => void;
  buyBuilding: (buildingId: string, amount?: number) => void;
  buyUpgrade: (upgradeId: string) => void;
  tick: (currentTime: number) => void;
  calculateMelonPrice: (amount: number) => number;
  checkPhaseProgression: () => void;
}

// Create the store
export const useGameStore = create<GameState>()(
  immer((set, get) => ({
    // Initialize with default values
    melons: 0,
    money: 0,
    seeds: 10,
    
    phase: GamePhase.MANUAL_PRODUCTION,
    unlockNextPhase: 100, // $100 to unlock Phase 2
    
    melonsPerClick: 1,
    melonsPerSecond: 0,
    
    melonBasePrice: 1.0,
    priceMultiplier: 1.0,
    marketDemand: 1.0,
    
    buildings: {},
    upgrades: {},
    research: {},
    
    totalMelonsProduced: 0,
    totalMoneyEarned: 0,
    totalClicks: 0,
    
    lastTickTime: Date.now(),
    gameStartTime: Date.now(),
    
    offlineProgressEnabled: false,
    offlineProgressRate: 0.5,
    
    // Initialize the game
    initialize: () => {
      set((state) => {
        // Reset game state
        state.melons = 0;
        state.money = 0;
        state.seeds = 10;
        state.phase = GamePhase.MANUAL_PRODUCTION;
        state.melonsPerClick = 1;
        state.melonsPerSecond = 0;
        
        // Initialize buildings
        state.buildings = {
          melonPatch: {
            id: 'melonPatch',
            name: 'Melon Patch',
            description: 'A small patch to grow watermelons.',
            baseCost: 10,
            baseProduction: 0.1, // 0.1 melons per second
            count: 0,
            unlockPhase: GamePhase.MANUAL_PRODUCTION,
            multiplier: 1.0
          },
          melonPress: {
            id: 'melonPress',
            name: 'Melon Press',
            description: 'Automates harvesting of melons.',
            baseCost: 50,
            baseProduction: 0.5,
            count: 0,
            unlockPhase: GamePhase.MANUAL_PRODUCTION,
            multiplier: 1.0
          },
          // Add more buildings as the game progresses
        };
        
        // Initialize basic upgrades
        state.upgrades = {
          betterSeeds: {
            id: 'betterSeeds',
            name: 'Better Seeds',
            description: 'Doubles melon production per click.',
            cost: 50,
            purchased: false,
            unlockPhase: GamePhase.MANUAL_PRODUCTION,
            effect: (state) => {
              state.melonsPerClick *= 2;
            }
          },
          // Add more upgrades
        };
        
        state.lastTickTime = Date.now();
        state.gameStartTime = Date.now();
      });
    },
    
    // Click to produce melons
    click: () => {
      set((state) => {
        const melonsToAdd = state.melonsPerClick;
        state.melons += melonsToAdd;
        state.totalMelonsProduced += melonsToAdd;
        state.totalClicks += 1;
      });
    },
    
    // Sell melons for money
    sellMelons: (amount) => {
      set((state) => {
        // Can't sell more than you have
        const actualAmount = Math.min(amount, state.melons);
        if (actualAmount <= 0) return;
        
        const price = state.calculateMelonPrice(actualAmount);
        state.melons -= actualAmount;
        state.money += price;
        state.totalMoneyEarned += price;
        
        // Adjust market demand (price fluctuation)
        state.marketDemand = Math.max(0.5, Math.min(1.5, state.marketDemand - (actualAmount / 1000)));
      });
    },
    
    // Buy a building
    buyBuilding: (buildingId, amount = 1) => {
      set((state) => {
        const building = state.buildings[buildingId];
        if (!building) return;
        
        // Calculate cost with scaling
        let totalCost = 0;
        for (let i = 0; i < amount; i++) {
          totalCost += building.baseCost * Math.pow(1.15, building.count + i);
        }
        
        // Check if player can afford it
        if (state.money < totalCost) return;
        
        // Purchase the building
        state.money -= totalCost;
        building.count += amount;
        
        // Recalculate production per second
        state.melonsPerSecond = Object.values(state.buildings).reduce(
          (sum, b) => sum + (b.baseProduction * b.count * b.multiplier), 
          0
        );
      });
    },
    
    // Buy an upgrade 
    buyUpgrade: (upgradeId) => {
      set((state) => {
        const upgrade = state.upgrades[upgradeId];
        if (!upgrade || upgrade.purchased || state.money < upgrade.cost) return;
        
        // Purchase the upgrade
        state.money -= upgrade.cost;
        upgrade.purchased = true;
        
        // Apply upgrade effect
        upgrade.effect(state);
      });
    },
    
    // Calculate current melon price
    calculateMelonPrice: (amount) => {
      const state = get();
      // Price affected by market demand
      const pricePerMelon = state.melonBasePrice * state.priceMultiplier * state.marketDemand;
      return Math.round((pricePerMelon * amount) * 100) / 100; // Round to 2 decimal places
    },
    
    // Progress game state one tick
    tick: (currentTime) => {
      set((state) => {
        const deltaTime = (currentTime - state.lastTickTime) / 1000; // in seconds
        state.lastTickTime = currentTime;
        
        // Production from buildings
        const melonProduction = state.melonsPerSecond * deltaTime;
        state.melons += melonProduction;
        state.totalMelonsProduced += melonProduction;
        
        // Market demand slowly returns to equilibrium
        if (state.marketDemand < 1.0) {
          state.marketDemand = Math.min(1.0, state.marketDemand + (0.01 * deltaTime));
        } else if (state.marketDemand > 1.0) {
          state.marketDemand = Math.max(1.0, state.marketDemand - (0.01 * deltaTime));
        }
        
        // Check for game progression
        state.checkPhaseProgression();
      });
    },
    
    // Check and handle phase progression
    checkPhaseProgression: () => {
      set((state) => {
        if (state.phase < GamePhase.WORLD_DOMINATION && state.totalMoneyEarned >= state.unlockNextPhase) {
          state.phase += 1;
          
          // Set new unlock threshold based on current phase
          switch (state.phase) {
            case GamePhase.AUTOMATION:
              state.unlockNextPhase = 1000; // $1,000 for phase 3
              break;
            case GamePhase.MARKET_EXPANSION:
              state.unlockNextPhase = 10000; // $10,000 for phase 4
              break;
            case GamePhase.WORLD_DOMINATION:
              state.unlockNextPhase = Infinity; // No more phases
              break;
          }
          
          // Unlock new buildings and upgrades for this phase
          // This would be implemented with more detail in the final game
        }
      });
    }
  }))
)

// Initialize the game when first imported
// This ensures the store has initial data
const initializeOnLoad = () => {
  const { initialize } = useGameStore.getState();
  initialize();
};

// Call initialization (will run once when this module is imported)
initializeOnLoad();