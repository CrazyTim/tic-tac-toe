import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

import Button from './Button.mjs';
import './Board.css';

const Board = (props) => {

  const createSquare = (i) => {

    const className = ClassNames('square', {
      'winner': props.winningSquares.includes(i),
    });

    return (
      <Button
        key={i}
        className={className}
        onClick={props.onClick.bind(this, i)}
        disabled={props.winningSquares.length > 0 || props.squares[i] !== null}
        value={props.squares[i]}>
      </Button>
    );

  }

  const rows = [];

  // draw dynamic number of rows and columns
  for (let i=0; i<props.numRows; i++) {
    const row = [];
    const startIndex = (i * props.numCols);
    for (let j=0; j<props.numCols; j++) {
      row.push(createSquare(startIndex+j));
    }
    rows.push(<div key={i} className='board-row'>{row}</div>)
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
