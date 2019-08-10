import React from 'react';

import Square from './Square.mjs';
import './Board.css';

export default class Board extends React.Component {

  renderSquare(i) {

    return (
    	<Square
    		key={i}
  			value={this.props.squares[i]} 
  			onClick={() => this.props.onClick(i)}
  			winner={this.props.winningSquares.includes(i)}
  			gameOver={this.props.winningSquares.length>0}
  		/>
  	);
  	
  }

  render() {

  	const rows = Array(this.props.numRows);

  	// draw dynamic number of rows and columns
  	for (let i=0; i<this.props.numRows; i++) {
			const squares = Array(this.props.numCols);
			const startIndex = (i * this.props.numCols);
			for (let j=0; j<this.props.numCols; j++) {
				squares.push(this.renderSquare(startIndex+j));
			}
  		rows.push(<div key={i} className="board-row">{squares}</div>)
  	}

    return (
    	<div className="board"><div>{rows}</div></div>
    );

  }

}
