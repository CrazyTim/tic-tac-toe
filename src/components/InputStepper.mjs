import React from 'react';
import classNames from 'classnames';

import './InputStepper.css';

export default class InputStepper extends React.Component {
  
  render() {

    const btnMinusDisabled = this.props.value <= this.props.minValue;
    const btnPlusDisabled = this.props.value >= this.props.maxValue;
    
    const classNamePlus = classNames('btn plus', {
      'disabled': btnPlusDisabled,
    });

    const classNameMinus = classNames('btn minus', {
      'disabled': btnMinusDisabled,
    });

    return (
      <div className='input-stepper'>
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
