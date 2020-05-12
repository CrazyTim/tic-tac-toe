import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

import Button from './Button.js';
import './Board.css';

const Board = (props) => {

  const createSquare = function(i) {

    let val = '';
    if (props.squares[i] === 'X') {
      val = 'value-x';
    } else if (props.squares[i] === 'O') {
      val = 'value-o';
    }

    const className = ClassNames('square', val, {
      'winner': props.winningSquares.includes(i),
    });

    return (
      <Button
        key={i}
        className={className}
        onClick={props.onClickSquare.bind(this, i)}
        disabled={props.winningSquares.length > 0 || props.squares[i] !== null}
        value=''>
      </Button>
    );

  }

  const rows = [];

  // draw dynamic number of rows and columns
  for (let i=0; i<props.numRows; i++) {

    const row = [];
    const columnMultiplier = (i * props.numCols);

    for (let j=0; j<props.numCols; j++) {
      row.push(createSquare(columnMultiplier + j));
    }

    rows.push(
      <div key={i} className='board-row'>{row}</div>
    );

  }

  return (
    <div className='board'><div>{rows}</div></div>
  );

}

// apply typechecking (dev mode only)
Board.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  numRows: PropTypes.number,
  numCols: PropTypes.number,
  winningSquares: PropTypes.array,
  squares: PropTypes.array,
};

export default Board;
