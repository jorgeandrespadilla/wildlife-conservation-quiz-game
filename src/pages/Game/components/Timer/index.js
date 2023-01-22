import PropTypes from "prop-types";
import ProgressBar from "components/ProgressBar";
import Clock from "icons/Clock";
import "./Timer.css";

function Timer({
  timeProgress,
  remainingTime,
}) {
  return (
    <div className="timer__wrapper">
      <Clock className="timer__icon" />
      <div className="timer__progress">
        <ProgressBar value={timeProgress} animated="fast" />
        {remainingTime} seconds left
      </div>
    </div>
  );
}

Timer.propTypes = {
  timeProgress: PropTypes.number.isRequired,
  remainingTime: PropTypes.number.isRequired,
};

export default Timer;
