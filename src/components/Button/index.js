import PropTypes from 'prop-types';
import './Button.css';

function Button({
    children,
    onClick,
    style,
    className,
}) {
  return (
    <button 
      style={style}
      className={`button ${className}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
};

export default Button;
