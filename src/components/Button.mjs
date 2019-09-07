import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

import './Button.css';

export default class Button extends React.Component {

  render() {

    const className = ClassNames('btn', this.props.className, {
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

// apply typechecking for dev mode
Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.string,
  hidden: PropTypes.bool,
  disabled: PropTypes.bool,
};
