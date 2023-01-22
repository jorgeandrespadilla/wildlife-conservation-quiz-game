import PropTypes from "prop-types";
import ProgressBar from "components/ProgressBar";
import Heart from "icons/Heart";
import "./Life.css";

function Life({
  remainingLives,
  totalLives,
  lifeProgress,
}) {
  return (
    <div className="life__wrapper">
      <Heart className="life__icon" />
      <div className="life__progress">
        <ProgressBar value={lifeProgress} animated="slow" />
        {remainingLives}/{totalLives} lives
      </div>
    </div>
  );
}

Life.propTypes = {
  remainingLives: PropTypes.number.isRequired,
  totalLives: PropTypes.number.isRequired,
};

export default Life;
