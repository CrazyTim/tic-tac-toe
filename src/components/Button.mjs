import React from 'react';

import './Button.css';

export default class Button extends React.Component {

  render() {

    let className = 'btn';

    if (this.props.className !== undefined) {
      className += ' ' + this.props.className;
    }

    if (this.props.visible !== undefined && !this.props.visible) {
      className += ' hidden';
    }

    if (this.props.disabled) {
      className += ' disabled';
    }

    return (
      <button 
        className={className}
        onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );

  }
  
}
