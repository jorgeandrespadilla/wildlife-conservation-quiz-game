import QuestionCard from 'components/QuestionCard';
import { useBoolean } from 'hooks/useBoolean';
import { useGameContext } from 'hooks/useGameContext';
import { useEffect } from 'react';
import './GameQuestion.css';

function GameQuestion() {
  const game = useGameContext();

  const {
    value: isPaused,
    setTrue: pauseTimer,
    setFalse: playTimer,
  } = useBoolean(false);

  const question = game.questions.current;

  const handleAnswer = (isAnswerCorrect) => {
    game.time.pause();
    if (!isAnswerCorrect) {
      game.player.damage();
    }
  };

  const handleTimeout = () => {
    game.time.pause();
    game.player.damage();
  };

  const handleContinue = () => {
    game.questions.next();
    game.time.play();
  };

  useEffect(() => {
    if (game.hasStarted) {
      playTimer();
    }
  }, [game.hasStarted, playTimer]);

  useEffect(() => {
    if (game.hasEnded) {
      pauseTimer();
    }
  }, [game.hasEnded, pauseTimer]);

  return (
    <>
      {
        question && (
          <>
            <p className="question__indicator">
              Question {game.questions.currentNumber}/{game.questions.total}
            </p>
            <QuestionCard
              question={question.statement}
              correctAnswer={question.correctAnswer}
              isPaused={isPaused}
              playTimer={playTimer}
              pauseTimer={pauseTimer}
              onAnswer={handleAnswer}
              onTimeout={handleTimeout}
              onContinue={handleContinue}
            />
          </>
        )
      }
    </>
  );
}

export default GameQuestion;
