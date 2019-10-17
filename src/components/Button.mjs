import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

import './Button.css';

const Button = (props) => {

  const className = ClassNames('btn', props.className, {
    'hidden': props.hidden,
    'disabled': props.disabled,
  });

  return (
    <button
      className={className}
      onClick={(!props.disabled) ? props.onClick : undefined}>
      {props.value}
    </button>
  );

}

// apply typechecking (dev mode only)
Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.string,
  hidden: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
