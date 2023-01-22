import { useEffect } from "react";
import { useState } from "react";

/**
 * @typedef {Object} TimeProgressOptions
 * @property {boolean} reverse Reverse the progress
 * @property {number} progressInterval Update interval for progress in milliseconds
 * @property {boolean} paused Pause the progress
 */

/**
 * Hook to track the progress of time
 * @param {number} totalTime Total time in seconds
 * @param {TimeProgressOptions} options Options
 */
export const useTimeProgress = (totalTime, {
  paused = false,
  reverse = false,
  progressInterval = 1000,
} = {}) => {
  const initialTime = reverse ? totalTime : 0;
  const initialProgress = reverse ? 100 : 0;

  const [currentTime, setCurrentTime] = useState(initialTime);
  const [currentProgress, setCurrentProgress] = useState(initialProgress);

  const reset = () => {
    setCurrentTime(initialTime);
    setCurrentProgress(initialProgress);
  };

  const hasFinished = reverse ? currentTime <= 0 : currentTime >= totalTime;

  useEffect(() => {
    const interval = setInterval(() => {
      if (paused) {
        return;
      }
      if (reverse) {
        if (currentTime > 0) {
          setCurrentTime(prevTime => prevTime - (progressInterval / 1000));
          setCurrentProgress(prevProgress => prevProgress - (progressInterval / 1000) * 100 / totalTime);

        }
      } else {
        if (currentTime < totalTime) {
          setCurrentTime(prevTime => prevTime + (progressInterval / 1000));
          setCurrentProgress(prevProgress => prevProgress + (progressInterval / 1000) * 100 / totalTime);
        }
      }
    }, progressInterval);

    return () => clearInterval(interval);
  }, [currentTime, paused, progressInterval, reverse, totalTime]);


  return {
    /** Time in seconds. */
    time: Math.ceil(currentTime),
    /** Progress in percentage. */
    progress: currentProgress,
    /** Round progress in percentage. */
    progressRounded: Math.round(currentProgress),
    /** Whether the timer has finished. */
    hasFinished,
    /** Reset the timer. */
    reset,
  };
}