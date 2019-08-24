import React from 'react';
import classNames from 'classnames';

import './Button.css';

export default class Button extends React.Component {

  render() {

    const className = classNames('btn', this.props.className, {
      'hidden': this.props.hidden,
      'disabled': this.props.disabled,
    });

    return (
      <button 
        className={className}
        onClick={(!this.props.disabled) ? this.props.onClick : undefined}>
        {this.props.value}
      </button>
    );

  }
  
}
