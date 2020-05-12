import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

import './Dropdown.css';

const Dropdown = (props) => {

  const className = ClassNames('dropdown', props.className, {
    'hidden': props.hidden,
    'disabled': props.disabled,
  });

  return (
    <select
      className={className}
      onChange={(!props.disabled) ? props.onChange : undefined}
      value={props.selectedValue}>

      {props.values.map((item) => (
        <option value={item.id} key={item.id}>{item.name}</option>
      ))}

    </select>
  );

}

// apply typechecking (dev mode only)
Dropdown.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  selectedValue: PropTypes.number,
  values: PropTypes.array,
  hidden: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Dropdown;
