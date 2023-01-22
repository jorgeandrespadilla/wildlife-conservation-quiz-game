import { useEffect } from "react";
import PropTypes from "prop-types";
import ReactCanvasConfetti from "react-canvas-confetti";
import Modal from "components/Modal";
import Button from "components/Button";
import { useConfetti } from "hooks/useConfetti";
import "./EndModal.css";

function EndModal({
  isOpen,
  hasWon,
  onClose,
  dismiss = false,
}) {
  const {
    getInstance,
    canvasStyles,
    fire,
  } = useConfetti();

  useEffect(() => {
    if (isOpen && hasWon) {
      fire(2);
    }
  }, [hasWon, fire, isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={dismiss ? onClose : undefined}>
        <div className="modal__content__wrapper">
          <h2 className="modal__title">
            {hasWon ? "Congratulations!" : "Game Over"}
          </h2>
          <p className="modal__text">
            {hasWon
              ? "You have won the game!"
              : "You have lost the game!"}
          </p>
          <Button onClick={onClose} className="green-btn">Restart</Button>
        </div>
      </Modal>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </>
  );
}

EndModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  hasWon: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  dismiss: PropTypes.bool,
};

export default EndModal;
