import PropTypes from 'prop-types';
import './ProgressBar.css';

function ProgressBar({ 
  value,
  fillColor = 'currentColor',
  animated = true,
}) {
  return (
    <div className="progress-bar">
      <div className={`progress-bar__fill ${animated ? 'progress-bar__fill--animated' : ''}`} style={{	
        width: `${value}%`,
        backgroundColor: fillColor,
      }} />
    </div>
  );
}

ProgressBar.propTypes = {
    value: PropTypes.number.isRequired,
    fillColor: PropTypes.string,
    animated: PropTypes.bool,
};

export default ProgressBar;
