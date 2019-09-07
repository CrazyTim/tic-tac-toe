import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

import Button from './Button.mjs';
import './Board.css';

export default class Board extends React.Component {

  createSquare(i) {

    const className = ClassNames('square', {
      'winner': this.props.winningSquares.includes(i),
    });

    return (
      <Button 
        key={i}
        className={className}
        onClick={this.props.onClick.bind(this, i)}
        disabled={this.props.winningSquares.length > 0 || this.props.squares[i]}
        value={this.props.squares[i]}>
      </Button>
    );
    
  }

  render() {

    const rows = [];

    // draw dynamic number of rows and columns
    for (let i=0; i<this.props.numRows; i++) {
      const row = [];
      const startIndex = (i * this.props.numCols);
      for (let j=0; j<this.props.numCols; j++) {
        row.push(this.createSquare(startIndex+j));
      }
      rows.push(<div key={i} className='board-row'>{row}</div>)
    }

    return (
      <div className='board'><div>{rows}</div></div>
    );

  }

}

// apply typechecking for dev mode
Board.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  numRows: PropTypes.number,
  numCols: PropTypes.number,
  winningSquares: PropTypes.array,
  squares: PropTypes.array,
};
