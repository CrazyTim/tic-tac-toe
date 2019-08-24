import React from 'react';
import classNames from 'classnames';

import {isNumber} from './../util/util.mjs'
import './Textbox.css';

export default class Textbox extends React.Component {
  
  render() {

    let errMsg;
    if (this.props.validate) {
      errMsg = this.props.validate(this.props.value);
      if (errMsg) {
        errMsg = <div className='err'>{errMsg}</div>
      }
    }
    
    return (
      <div className='textbox'>
        <label>{this.props.label}</label>
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