import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
	let className = "square";
	if (props.winner) {
		className += ' winner';
	}
	return (
	  <button 
	  	className={className} 
	  	onClick={props.onClick}>
	    {props.value}
	  </button>
	);
}

function PlayAgainButton(props) {
  let className = "play-again-button";
	if (!props.visible) {
		className += ' hidden';
	}

	return (
	  <button 
	  	className={className}
	  	onClick={props.onClick}>
	    {props.value}
	  </button>
	);
}

class Board extends React.Component {

  renderSquare(i) {
    return (
    	<Square 
  			value={this.props.squares[i]} 
  			onClick={() => this.props.onClick(i)}
  			winner={this.props.winningSquares.includes(i)}
  		/>
  	);
  }

  renderRows(count,i) {

  }

  render() {
  	const rows = Array(this.props.rows);
  	for (let i=0; i<this.props.rows; i++) {
			const squares = Array(this.props.cols);
			const startIndex = (i * this.props.cols);
			for (let j=0; j<this.props.cols; j++) {
				squares.push(this.renderSquare(startIndex+j));
			}
  		rows.push(<div className="board-row">{squares}</div>)
  	}
    return rows;
  }
}

class Game extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			squares: Array(9).fill(null),
			xIsNext: true,
			winner: null,
			draw: false,
			winningSquares: Array(),
			rows: 3,
			cols: 3,
		};
	}

	handleClick(i) {

		const squares = this.state.squares.slice();

		// ignore a click if there is a winner or if this square has already been filled
		if (this.state.winner || squares[i]) {
      return;
    }

		squares[i] = this.state.xIsNext ? 'X' : 'O';

		// check for a winner
		const [winner, winningSquares] = calculateWinner(squares);

		// check for draw
		let draw = false;
		if (!winner) {
			draw = squares.every((i) => {return i != null});
		}

		this.setState({
			squares: squares,
			xIsNext: !this.state.xIsNext,
			winner: winner,
			winningSquares: winningSquares,
			draw: draw,
		});

	}

	resetBoard() {
		this.setState({
			squares: Array(9).fill(null),
			xIsNext: true,
			winner: null,
			winningSquares: Array(),
			draw: false,
		});
	}

  render() {

  	let status;
  	if (this.state.draw) {
  		status = "This game is a draw!";
  	} else if (this.state.winner){
  		status = 'Player ' + this.state.winner + ' has won!';
  	} else {
  		status = 'Player ' + (this.state.xIsNext ? 'X' : 'O') + '\'s turn';
  	}

    return (
      <div className="game">
      	<div className="game-board">
	        <Board 
	        	squares={this.state.squares}
	        	onClick={(i) => this.handleClick(i)}
	        	winningSquares={this.state.winningSquares}
	        	rows={this.state.rows}
	        	cols={this.state.cols}
	        />
	      </div>
        <div className="game-info">
          <div className="status">{status}</div>
					<PlayAgainButton 
						value="play again" 
						onClick={() => this.resetBoard()}
						visible={(this.state.winner || this.state.draw)}
					/>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i]];
    }
  }
  return [null, Array()];
}

function checkWin(squares, rows, cols, cell, numCellsInARow) {

	// look in all directions around this cell to see if the player has won

	const directions = [
		[ 0,-1], // north
		[ 1,-1], // ne
		[ 1, 0], // east
		[ 1, 1], // se
		[ 0, 1], // south
		[-1, 1], // sw
		[-1, 0], // west
		[-1,-1], // nw
	];

	for (let i = 0; i < directions.length; i++) {
		const x = directions[i][0];
		const y = directions[i][1];
		const winningSquares = check(squares, rows, cols, cell, x, y, numCellsInARow);
		if (winningSquares.length == numCellsInARow) return winningSquares; // player has won
	}

	return []; // no matches found
	
}

function check(squares, rows, cols, cell, x, y, numCellsInARow) {
	// look in one direction, starting from cell, and staying within the bounds of the grid
	// checking if every value is equal to the value in cell

	const v = squares[cell]; // the value we are trying to match

	let found = [cell];	// array to store the matches

	const xPos = cell % cols;
	const xPosLast = xPos + (x * (numCellsInARow - 1));
	if ( xPosLast > rows || xPosLast < 0 ) return []; // search would extend beyond the grid x bounds
	
	// todo... 
	//const yPos = nextCell / 

	let thisCell = cell;
	for (let i = 0; i < numCellsInARow -1; i++) {

		// calc index of next cell we need to check
		thisCell = (x * 1) + (y * cols);

		if (squares[thisCell] == v) {
			found.push(thisCell);
		} else {
			return [];
		}
		
	}

	return [found];

}