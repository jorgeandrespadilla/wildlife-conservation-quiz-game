import { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Balancer from 'react-wrap-balancer';
import Button from 'components/Button';
import Card from 'components/Card';
import ProgressBar from 'components/ProgressBar';
import QuestionOverlay from '../QuestionOverlay';
import { questionOptions } from 'shared/data';
import { APP_CONFIG } from 'shared/config';
import { useTimeProgress } from 'hooks/useTimeProgress';
import './QuestionCard.css';

function QuestionCard({
  question,
  correctAnswer,
  onContinue = () => { }
}) {
  const { time, progress, reset } = useTimeProgress(APP_CONFIG.maxTimePerQuestion, {
    paused: false,
    reverse: true,
    progressInterval: 50,
  });
  const [isValid, setIsValid] = useState(null);

  function handleAnswer(value) {
    const isAnswerValid = value === correctAnswer;
    setIsValid(isAnswerValid);
  }

  function handleContinue() {
    onContinue();
    setIsValid(null);
    reset();
  }

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
            <ProgressBar value={progress} />
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
  onAnswer: PropTypes.func,
};

export default QuestionCard;
