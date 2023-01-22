import PropTypes from "prop-types";
import Modal from "components/Modal";
import Button from "components/Button";
import { APP_CONFIG } from "shared/config";
import "./WelcomeModal.css";

function WelcomeModal({
  isOpen,
  onClose,
  dismiss = false,
}) {

  return (
    <Modal isOpen={isOpen} onClose={dismiss ? onClose : undefined}>
      <div className="modal__content__wrapper">
        <h2 className="modal__title">Wildlife Conservation Quiz</h2>
        <div className="modal__instructions">
          <p>This is a quiz game created with React to test your knowledge of wildlife conservation.</p>
          <h3 className="modal__instructions__subtitle">Rules</h3>
          <ul className="modal__instructions__list">
            <li>The player has {APP_CONFIG.maxLives} lives and {APP_CONFIG.maxTime} seconds to answer {APP_CONFIG.maxQuestions} questions.</li>
            <li>The player must keep as many lives as possible to save the wildlife and win the game.</li>
            <li>The game is over when the player loses all lives or the timer runs out.</li>
            <li>The player is presented multiple statements and asked to select if they are true or false for wildlife conservation. Each question will be presented in a random order and will have a maximum duration of {APP_CONFIG.maxTimePerQuestion} seconds.</li>
            <li>If the player selects the wrong answer or does not select an answer within the time limit, the player loses a life.</li>
          </ul>
        </div>
        <Button onClick={onClose} className="green-btn">Let's go!</Button>
      </div>
    </Modal>
  );
}

WelcomeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  dismiss: PropTypes.bool,
};

export default WelcomeModal;
