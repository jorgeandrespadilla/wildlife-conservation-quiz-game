import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Balancer from 'react-wrap-balancer';
import Button from 'components/Button';
import Card from 'components/Card';
import ProgressBar from 'components/ProgressBar';
import QuestionOverlay from '../QuestionOverlay';
import { useTimeProgress } from 'hooks/useTimeProgress';
import { questionOptions } from 'shared/data';
import { APP_CONFIG } from 'shared/config';
import './QuestionCard.css';

function QuestionCard({
  question,
  correctAnswer,
  isPaused,
  playTimer,
  pauseTimer,
  onAnswer = (isAnswerCorrect) => { },
  onTimeout = () => { },
  onContinue = () => { },
}) {
  const [isValid, setIsValid] = useState(null);

  const { time, progress, reset, hasFinished } = useTimeProgress(APP_CONFIG.maxTimePerQuestion, {
    paused: isPaused,
    reverse: true,
    progressInterval: 50,
  });

  function handleAnswer(value) {
    const isAnswerCorrect = value === correctAnswer;
    onAnswer(isAnswerCorrect);
    setIsValid(isAnswerCorrect);
    pauseTimer();
  }

  function handleContinue() {
    onContinue();
    reset();
    setIsValid(null);
    playTimer();
  }

  // Handle timeout.
  useEffect(() => {
    if (hasFinished && !isPaused) {
      setIsValid(false);
      pauseTimer();
      onTimeout();
    }
  }, [hasFinished, isPaused, onTimeout, pauseTimer]);

  const isOverlayVisible = isValid !== null;

  return (
    <motion.div
      key={question}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
    >
      <Card>
        <div className="question__container">
          <QuestionOverlay isVisible={isOverlayVisible} isValid={isValid} onContinue={handleContinue} />
          <div className="question__timer">
            <ProgressBar value={progress} animated="fast" />
            {time} seconds left
          </div>
          <h3><Balancer>{question}</Balancer></h3>
          <div className="question__options">
            {
              questionOptions.map((option) => (
                <Button
                  key={option.value}
                  style={{ backgroundColor: option.color }}
                  onClick={() => handleAnswer(option.value)}
                >
                  {option.label}
                </Button>
              ))
            }
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

QuestionCard.propTypes = {
  question: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  isPaused: PropTypes.bool.isRequired,
  playTimer: PropTypes.func.isRequired,
  pauseTimer: PropTypes.func.isRequired,
  onAnswer: PropTypes.func,
  onTimeout: PropTypes.func,
  onContinue: PropTypes.func,
};

export default QuestionCard;
