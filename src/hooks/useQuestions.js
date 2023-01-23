import { useEffect, useState } from "react";
import { getRandomElement } from "shared/utils";

/**
 * This hook allows to get a random question from a list of questions N times.
 * It also allows to check if all the questions have been answered.
 * @param {Array} questions - List of questions.
 * @param {number} times - Number of questions to answer.
 */
export const useQuestions = (questions, times) => {
  const [question, setQuestion] = useState(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [remainingQuestions, setRemainingQuestions] = useState(questions);

  const hasCompleted = questionsAnswered > times;

  const nextQuestion = () => {
    if (questionsAnswered >= times || remainingQuestions.length === 0) {
      setQuestion(null);
    }
    else {
      setQuestion(getRandomElement(remainingQuestions));
    }
    setQuestionsAnswered((prevQuestionsAnswered) => prevQuestionsAnswered + 1);
  };

  const reset = () => {
    setQuestion(null);
    setQuestionsAnswered(0);
    setRemainingQuestions(questions);
  };

  useEffect(() => {
    if (question && remainingQuestions.length > 0) {
      setRemainingQuestions((prevRemainingQuestions) => {
        return prevRemainingQuestions.filter((q) => q.id !== question.id);
      });
    }
  }, [question, remainingQuestions.length]);

  return {
    /** Current question. */
    question,
    /** Current question number. */
    currentQuestionNumber: questionsAnswered,
    /** Gets the next question. */
    nextQuestion,
    /** Indicates if all the questions have been answered. */
    hasCompleted,
    /** Resets the questions. */
    reset,
  };
}