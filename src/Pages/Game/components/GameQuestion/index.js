import QuestionCard from 'components/QuestionCard';
import { useGameContext } from 'hooks/useGameContext';
import './GameQuestion.css';

function GameQuestion() {
  const game = useGameContext();
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
