import PropTypes from 'prop-types';
import './ProgressBar.css';

const validAnimationValues = ['', 'slow', 'fast'];

function ProgressBar({ 
  value,
  fillColor = 'currentColor',
  animated = '',
}) {
  const animatedClass = animated && validAnimationValues.includes(animated) ? `progress-bar__fill--animated-${animated}` : '';
  return (
    <div className="progress-bar">
      <div className={`progress-bar__fill ${animatedClass}`} style={{	
        width: `${value}%`,
        backgroundColor: fillColor,
      }} />
    </div>
  );
}

ProgressBar.propTypes = {
    value: PropTypes.number.isRequired,
    fillColor: PropTypes.string,
    animated: PropTypes.oneOf(validAnimationValues),
};

export default ProgressBar;
