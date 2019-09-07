import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

import './InputStepper.css';

export default class InputStepper extends React.Component {
  
  render() {

    const btnMinusDisabled = this.props.value <= this.props.minValue;
    const btnPlusDisabled = this.props.value >= this.props.maxValue;
    
    const className = ClassNames('input-stepper', this.props.className);

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
          onClick={!btnMinusDisabled ? this.props.onClick.bind(this, -1) : undefined}
        >-</button>
        <label>{this.props.value}</label>
        <button
          className={classNamePlus}
          onClick={!btnPlusDisabled ? this.props.onClick.bind(this, 1) : undefined}
        >+</button>
      </div>
    );

  }

}

// apply typechecking for dev mode
InputStepper.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
};
