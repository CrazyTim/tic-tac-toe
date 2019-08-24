import React from 'react';
import classNames from 'classnames';

import Button from './Button.mjs';
import './Board.css';

export default class Board extends React.Component {

  createSquare(i) {

    let className = classNames('square', {
      'winner': this.props.winningSquares.includes(i),
    });

    return (
      <Button 
        key={i}
        className={className}
        onClick={() => this.props.onClick(i)}
        disabled={this.props.winningSquares.length > 0 || this.props.squares[i]}
        value={this.props.squares[i]}>
      </Button>
    );
    
  }

  render() {

    const rows = Array(this.props.numRows);

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
