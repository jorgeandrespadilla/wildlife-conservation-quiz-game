import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import Button from "components/Button";
import CheckMark from "components/CheckMark";
import CrossMark from "components/CrossMark";
import ArrowRight from "icons/ArrowRight";
import "./QuestionOverlay.css";

function QuestionOverlay({
  isVisible = false,
  isValid,
  onContinue
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="question__overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="question__overlay__content">
            <div className="question__overlay__icon">
              {isValid ? <CheckMark /> : <CrossMark />}
            </div>
            <h3>{isValid ? "Correct!" : "Wrong!"}</h3>
            <Button onClick={onContinue}>Continue<ArrowRight />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

QuestionOverlay.propTypes = {
  isVisible: PropTypes.bool,
  isValid: PropTypes.bool,
  onContinue: PropTypes.func.isRequired,
};

export default QuestionOverlay;
