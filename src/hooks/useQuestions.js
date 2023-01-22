import { useState } from "react";
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

  const nextQuestion = () => {
    setQuestion(getRandomElement(questions));
    setQuestionsAnswered((prevQuestionsAnswered) => prevQuestionsAnswered + 1);
  };

  const hasCompleted = questionsAnswered >= times;

  return {
    /** Current question. */
    question,
    /** Current question number. */
    currentQuestionNumber: questionsAnswered + 1,
    /** Gets the next question. */
    nextQuestion,
    /** Indicates if all the questions have been answered. */
    hasCompleted,
  };
}