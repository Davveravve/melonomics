"use client";

import { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';

/**
 * A hook that implements the main game loop, updating game state at regular intervals
 * @param fps The frames per second to run the game loop at (default: 30)
 */
export function useGameLoop(fps: number = 30) {
  // Get the tick function from the game store
  const tick = useGameStore(state => state.tick);
  
  // Use a ref to keep track of the previous time
  const frameRef = useRef<number | null>(null);
  
  // Use a ref to keep track of whether the component is mounted
  const isMountedRef = useRef<boolean>(true);
  
  // Calculate the time between frames in milliseconds
  const frameDuration = 1000 / fps;
  
  useEffect(() => {
    // Set mounted status
    isMountedRef.current = true;
    
    // Game loop function using requestAnimationFrame
    const gameLoop = (timestamp: number) => {
      // Skip first frame to establish a time reference
      if (frameRef.current === null) {
        frameRef.current = timestamp;
        if (isMountedRef.current) {
          requestAnimationFrame(gameLoop);
        }
        return;
      }
      
      // Calculate time elapsed since last frame
      const elapsed = timestamp - frameRef.current;
      
      // Only update if enough time has passed for a frame
      if (elapsed >= frameDuration) {
        // Update the game state
        tick(timestamp);
        
        // Update the previous frame timestamp
        // Instead of using timestamp directly, increment by frameDuration
        // This helps keep the game running at a consistent rate
        frameRef.current = timestamp - (elapsed % frameDuration);
      }
      
      // Continue the loop if component is still mounted
      if (isMountedRef.current) {
        requestAnimationFrame(gameLoop);
      }
    };
    
    // Start the game loop
    const animationId = requestAnimationFrame(gameLoop);
    
    // Cleanup function to stop the game loop when component unmounts
    return () => {
      isMountedRef.current = false;
      cancelAnimationFrame(animationId);
    };
  }, [tick, frameDuration]); // Only re-run if tick function or frameDuration changes
}

export default useGameLoop;