import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

import './InputStepper.css';

const InputStepper = (props) => {

  const btnMinusDisabled = props.value <= props.minValue;
  const btnPlusDisabled = props.value >= props.maxValue;

  const className = ClassNames('input-stepper', props.className);

  const classNamePlus = ClassNames('btn plus', {
    'disabled': btnPlusDisabled,
  });

  const classNameMinus = ClassNames('btn minus', {
    'disabled': btnMinusDisabled,
  });

  return (
    <div className={className}>
      <button
        className={classNameMinus}
        onClick={!btnMinusDisabled ? props.onClick.bind(this, -1) : undefined}
      >-</button>
      <label>{props.value}</label>
      <button
        className={classNamePlus}
        onClick={!btnPlusDisabled ? props.onClick.bind(this, 1) : undefined}
      >+</button>
    </div>
  );

}

// apply typechecking (dev mode only)
InputStepper.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
};

export default InputStepper;
