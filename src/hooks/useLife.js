import { useState } from "react";

/**
 * This hook is used to manage the life of the player.
 * @param {number} maxLives Maximum number of lives.
 * @param {number} lifeDamage Damage to apply to the player.
 */
export const useLife = (maxLives, lifeDamage) => {
  const [remainingLives, setRemainingLives] = useState(maxLives);

  const damage = () => {
    if (remainingLives > 0) {
      const newRemainingLives = remainingLives - lifeDamage;
      if (newRemainingLives < 0) {
        setRemainingLives(0);
      } else {
        setRemainingLives(newRemainingLives);
      }
    }
  };

  const reset = () => setRemainingLives(maxLives);

  const progress = remainingLives / maxLives * 100;
  const hasDied = remainingLives <= 0;

  return {
    /** Remaining lives. */
    remainingLives,
    /** Life progress. */
    progress,
    /** Whether the player has died. */
    hasDied,
    /** Damages the player. */
    damage,
    /** Resets the player life. */
    reset,
  };
}