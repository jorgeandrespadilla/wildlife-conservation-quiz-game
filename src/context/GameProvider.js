import { createContext } from "react";
import { useLife } from "hooks/useLife";
import { useBoolean } from "hooks/useBoolean";
import { useQuestions } from "hooks/useQuestions";
import { useTimeProgress } from "hooks/useTimeProgress";
import { APP_CONFIG } from "shared/config";
import { questions } from "shared/data";

/**
 * @typedef {Object} QuestionData
 * @property {string} statement Question statement.
 * @property {string} correctAnswer Correct answer.
 */

export const GameContext = createContext({
  /** Game questions. */
  questions: {
    /**
     * Question to answer. 
     * @type {QuestionData | null}
     */
    current: null,
    /** Current question number. */
    currentNumber: 0,
    /** Total questions. */
    total: 0,
    /** Gets the next question. */
    next: () => { },
  },
  /** Game lives. */
  life: {
    /** Remaining lives. */
    remaining: 0,
    /** Total lives. */
    total: 0,
    /** Life progress. */
    progress: 0,
  },
  /** Game timer. */
  time: {
    /** Remaining time. */
    remaining: 0,
    /** Total time. */
    total: 0,
    /** Time progress. */
    progress: 0,
    /** Plays the timer. */
    play: () => { },
    /** Pauses the timer. */
    pause: () => { },
  },
  player: {
    /** Indicates if the player has won. */
    hasWon: false,
    /** Damages the player. */
    damage: () => { },
  },
  /** Indicates if the game has started. */
  hasStarted: false,
  /** Indicates if the game has ended. */
  hasEnded: false,
  /** Starts the game. */
  start: () => { },
  /** Resets the game. */
  restart: () => { },
});

export const GameProvider = ({ children }) => {
  
  const {
    value: startedGame,
    setTrue: setStartedGame,
    setFalse: setNotStartedGame,
  } = useBoolean(false);

  const {
    value: pausedGame,
    setTrue: pauseTimer,
    setFalse: playTimer,
  } = useBoolean(false);

  const {
    question,
    currentQuestionNumber,
    nextQuestion,
    hasCompleted: hasCompletedAllQuestions,
    reset: resetQuestions,
  } = useQuestions(questions, APP_CONFIG.maxQuestions);

  const {
    time: remainingTime,
    progress: timeProgress,
    reset: resetTimer,
    hasFinished: hasTimeFinished,
  } = useTimeProgress(APP_CONFIG.maxTime, {
    paused: pausedGame,
    reverse: true,
    progressInterval: 50,
  });

  const {
    remainingLives,
    progress: lifeProgress,
    hasDied: hasPlayerDied,
    damage: damagePlayer,
    reset: resetLife,
  } = useLife(APP_CONFIG.maxLives, APP_CONFIG.lifeDamage);

  const restartGame = () => {
    setNotStartedGame();
    resetQuestions();
    resetLife();
    resetTimer();
  };

  const startGame = () => {
    setStartedGame();
    playTimer();
    nextQuestion();
  }

  const hasGameEnded = hasCompletedAllQuestions || hasPlayerDied || hasTimeFinished;
  const hasPlayerWon = hasCompletedAllQuestions && !hasPlayerDied && !hasTimeFinished;

  return (
    <GameContext.Provider value={{
      questions: {
        current: question,
        currentNumber: currentQuestionNumber,
        total: APP_CONFIG.maxQuestions,
        next: nextQuestion,
      },
      life: {
        remaining: remainingLives,
        total: APP_CONFIG.maxLives,
        progress: lifeProgress,
      },
      time: {
        remaining: remainingTime,
        total: APP_CONFIG.maxTime,
        progress: timeProgress,
        play: playTimer,
        pause: pauseTimer,
      },
      player: {
        hasWon: hasPlayerWon,
        damage: damagePlayer,
      },
      hasStarted: startedGame,
      hasEnded: hasGameEnded,
      start: startGame,
      restart: restartGame,
    }}>
      {children}
    </GameContext.Provider>
  );
}