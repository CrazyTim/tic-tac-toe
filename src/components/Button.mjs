import React from 'react';

import './Button.css';

export default class Button extends React.Component {

  render() {

    let className = 'btn';
    if (!this.props.visible) {
      className += ' hidden';
    }

    return (
      <button 
        className={this.props.className + ' ' + className}
        onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );

  }
  
}
