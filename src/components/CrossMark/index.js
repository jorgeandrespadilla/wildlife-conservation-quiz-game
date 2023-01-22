import PropTypes from 'prop-types';

function CrossMark({
  color = '#F47174',
  width = 'auto',
  height = 'unset',
}) {
  return (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2" color={color} style={{
      width: width,
      height: height,
    }}>
      <circle className="path circle" fill="none" stroke="currentColor" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
      <line className="path line" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="93" />
      <line className="path line" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" x1="95.8" y1="38" x2="34.4" y2="93" />
    </svg>
  );
}

CrossMark.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default CrossMark;
