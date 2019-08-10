import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
	let className = "square";
	if (props.winner) {
		className += ' winner';
	}

	if (props.gameOver || props.value) {
		className += ' disabled';
	}

	return (
	  <button 
	  	className={className} 
	  	onClick={props.onClick}>
	    {props.value}
	  </button>
	);
}

function Button(props) {
  let className = '';
	if (!props.visible) {
		className = ' hidden';
	}

	return (
		<div className={props.className + className}>
		  <button 
		  	onClick={props.onClick}>
		    {props.value}
		  </button>
	  </div>
	);
}

function ScoreBoard(props) {

	let className1 = '';
	let className2 = '';
	if (props.score.X > props.score.O) {
		className1 = ' winner';
	} else if (props.score.X < props.score.O) {
		className2 = ' winner';
	} 

	return (
		<div className="score-board">
	  	<div className={"x" + className1}><span>Player X:</span><span>{props.score.X}</span></div>
	  	<div className={"y" + className2}><span>Player O:</span><span>{props.score.O}</span></div>
	  </div>
	);
}

class Board extends React.Component {

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

    return <div>{rows}</div>;

  }

}

class Game extends React.Component {

	constructor(props) {

		super(props);

		const numRows = 4;
		const numCols = 4;

		this.state = {
			settings: {
				numRows: numRows,
				numCols: numCols,
				numCellsInALineToWin: 3,
			},
			turns: [{
				squares: Array(numRows * numCols).fill(null),
			}],
			score: {
				'X':0, 
				'O':0,
			},
			currentTurn: 0,
			xIsNext: true,
			winner: null,
			winningSquares: [],
			draw: false,
		};

	}

	resetBoard() {

		console.log('reset_board');
		this.setState({
			turns: [{
				squares: Array(this.state.settings.numRows * this.state.settings.numCols).fill(null),
			}],
			currentTurn: 0,
			xIsNext: true,
			winner: null,
			winningSquares: [],
			draw: false,
		});
		
	}

	getTurns() {
		return this.state.turns.slice(0, this.state.currentTurn + 1);
	}

	undo(step) {

		const currentTurn = this.state.currentTurn - step;
		const score = Object.assign({}, this.state.score); // clone object

		if (currentTurn < 0) return; // can't go back any further

		if (this.state.winner) {
			score[this.state.winner] -= 1;
		}

		this.setState({
			score: score,
      currentTurn: currentTurn,
      xIsNext: (currentTurn % 2) === 0,
      winner: null,
      winningSquares: [],
      draw: false,
    });

	}

	handleClick(i) {

		const prevTurns = this.getTurns()
		const squares = prevTurns[this.state.currentTurn].squares.slice();

		// ignore a click if there is a winner or if this square has already been filled
		if (this.state.winner || squares[i]) {
      return;
    }

		squares[i] = this.state.xIsNext ? 'X' : 'O';

		// check for a winner
		let score = Object.assign({}, this.state.score);
		let winner = null;
		let winningSquares;
		for (let i = 0; i < squares.length - 1; i++) {
			winningSquares = checkWin(squares, this.state.settings.numRows, this.state.settings.numCols, i, this.state.settings.numCellsInALineToWin);
			if (winningSquares.length === this.state.settings.numCellsInALineToWin) {
				winner = squares[i];
				score[winner] +=1;
				break;
			}
		}

		// check for draw
		let draw = false;
		if (!winner) {
			draw = squares.every((i) => {return i != null});
		}

		const turns = prevTurns.concat([{
				squares: squares,
			}])

		const currentTurn = this.state.currentTurn + 1;

		this.setState({
			turns: turns,
			currentTurn: currentTurn,
			xIsNext: !this.state.xIsNext,
			winner: winner,
			winningSquares: winningSquares,
			draw: draw,
			score: score,
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

	    		<ScoreBoard
						score={this.state.score}
					/>

					<Board 
	        	squares={this.getTurns()[this.state.currentTurn].squares}
	        	onClick={(i) => this.handleClick(i)}
	        	winningSquares={this.state.winningSquares}
	        	numRows={this.state.settings.numRows}
	        	numCols={this.state.settings.numCols}
	        	score={this.state.score}
	        />

	    		<div className="status">{status}</div>

	    		<Button 
						value="Undo" 
						className="btn btn-undo"
						onClick={() => this.undo(1)}
						visible={this.state.currentTurn !== 0}
					/>

	    		<Button 
						value="Play Again" 
						className="btn btn-play-again"
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

function checkWin(squares, numRows, numCols, cell, numCellsInALineToWin) {
	// look in all directions around this cell to see if the player has won

	if (squares[cell] === null) return [];

	// define each x/y direction to search in
	const directions = [
		['n ', 0,-1],
		['ne', 1,-1],
		['e ', 1, 0],
		['se', 1, 1],
		['s ', 0, 1],
		['sw',-1, 1],
		['w ',-1, 0],
		['nw',-1,-1],
	];

	// check in each direction for a match
	for (let i = 0; i < directions.length; i++) {
		const x = directions[i][1];
		const y = directions[i][2];

		//console.log('direction check: ' + directions[i][0] + " (x: " + directions[i][1] + ", y: " + directions[i][2] + ")");
		
		const winningSquares = check(squares, numRows, numCols, cell, x, y, numCellsInALineToWin);
		if (winningSquares.length === numCellsInALineToWin) return winningSquares; // match found
	}

	return []; // no matches found
	
}

function check(squares, numRows, numCols, cell, x, y, numCellsInALineToWin) {
	// look in one direction, starting from cell, and staying within the bounds of the grid
	// checking if every value is equal to the value in cell
	// returns an array of the cells that match.
	// ASSUMPTION: cell is correct, and fits inside the number of rows and cols

	const v = squares[cell]; // the value we are trying to match

	let found = [cell];	// array to store the matches

	// only looking for one match lol
	if (numCellsInALineToWin === 1) return [cell];

	// check if we would extend beyond the grid on x-axis
	const thisCol = cell % numCols; // index
	const lookAheadCol = thisCol + (x * (numCellsInALineToWin - 1));
	if (lookAheadCol > (numCols-1) || lookAheadCol < 0) return [];
	

	// check if we would extend beyond the grid on y-axis
	const thisRow = Math.floor(cell / numRows); // index
	const lookAheadRow = thisRow + (y * (numCellsInALineToWin - 1));
	if (lookAheadRow > (numRows-1) || lookAheadRow < 0) return [];

	//console.log('lookAheadCol: ' + lookAheadCol + ', lookAheadRow: ' + lookAheadRow);

	let thisCell = cell;
	for (let i = 0; i < (numCellsInALineToWin - 1); i++) {

		// calc index of next cell we need to check
		thisCell += (x * 1) + (y * numCols);
		//console.log('check cell: ' + thisCell);
		if (squares[thisCell] === v) {
			found.push(thisCell);
		} else {
			return [];
		}
		
	}
	
	return found;

}