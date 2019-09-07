import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

import {isNumber} from './../utils/utils.mjs'
import './Textbox.css';

export default class Textbox extends React.Component {
  
  render() {

    const className = ClassNames('textbox', this.props.className);

    let errMsg;
    if (this.props.validate) {
      errMsg = this.props.validate(this.props.value);
      if (errMsg) {
        errMsg = <div className='err'>{errMsg}</div>
      }
    }
    
    return (
      <div className={className}>
        <input
          type="text" 
          value={this.props.value} 
          onChange={this.props.onChange}
        />
        {errMsg}
      </div>
    );
  }

}

// apply typechecking for dev mode
Textbox.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  validate: PropTypes.func,
};
