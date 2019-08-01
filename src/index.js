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