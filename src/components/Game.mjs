import React from 'react';

import {clone, isNumber} from './../utils/utils.mjs'
import Board from './Board.mjs';
import Button from './Button.mjs';
import Scoreboard from './Scoreboard.mjs';
import InputStepper from './InputStepper.mjs';
import './Game.css';

export default class Game extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      settings: {
        numRows: 3,
        numCols: 3,
        numCellsInALineToWin: 3,
      },
      score: {
        X: 0, 
        O: 0,
      }
    };

    this.defaultInputState = {
      inputs: {
        txtNumRows: this.state.settings.numRows,
        txtNumCols: this.state.settings.numCols,
        txtNumCells: this.state.settings.numCellsInALineToWin,
      }
    }

    this.defaultGameState = {
      history: [{
        squares: Array(this.state.settings.numRows * this.state.settings.numCols).fill(null),
      }],
      currentTurn: 0,
      xIsNext: true,
      winner: null,
      winningSquares: [],
      draw: false,
    };

    this.state = {...this.state, ...this.defaultInputState, ...this.defaultGameState};

  }

  handleClick_btnSaveSettings() {
    const settings = clone(this.state.settings);
    settings.numRows = parseInt(this.state.inputs.txtNumRows);
    settings.numCols = parseInt(this.state.inputs.txtNumCols);
    settings.numCellsInALineToWin = parseInt(this.state.inputs.txtNumCells);

    this.setState({settings}, ()=> {
      this.resetBoard();
    });
  }

  handleClick_txtNumRows(increment) {
    const inputs = clone(this.state.inputs);
    inputs.txtNumRows += increment;
    inputs.txtNumCells = Math.min(Math.max(inputs.txtNumRows, inputs.txtNumCols), inputs.txtNumCells); // ensure txtNumCells doesn't exceed number of rows/columns
    this.setState({inputs});
  }

  handleClick_txtNumCols(increment) {
    const inputs = clone(this.state.inputs);
    inputs.txtNumCols += increment;
    inputs.txtNumCells = Math.min(Math.max(inputs.txtNumRows, inputs.txtNumCols), inputs.txtNumCells); // ensure txtNumCells doesn't exceed number of rows/columns
    this.setState({inputs});
  }

  handleClick_txtNumCells(increment) {
    const inputs = clone(this.state.inputs);
    inputs.txtNumCells += increment;
    this.setState({inputs});
  }

  validateNumber(value) {
    if (!isNumber(value) || value < 3 || value > 10) return 'must be a number between 3 and 10'
    return null;
  }

  disable_btnSaveSettings() {
   
    const s = this.state

    // detect if state will change
    const changed = (s.inputs.txtNumRows !== s.settings.numRows ||
                     s.inputs.txtNumCols !== s.settings.numCols ||
                     s.inputs.txtNumCells !== s.settings.numCellsInALineToWin);
     
     // validate inputs
    const valid = true;

    return !(changed && valid);

  }

  resetBoard() {

    this.defaultGameState.history = [{
        squares: Array(this.state.settings.numRows * this.state.settings.numCols).fill(null),
    }];

    this.setState( clone(this.defaultGameState) );

  }

  undo(step) {

    const currentTurn = this.state.currentTurn - step;

    if (currentTurn < 0) return; // can't go back any further

    const score = clone(this.state.score);

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

  handleClick_btnSquare(i) {
    // get history from the beginning until currentTurn
    const currentHistory = this.state.history.slice(0, this.state.currentTurn + 1);
    const squares = clone(currentHistory[this.state.currentTurn].squares);

    // ignore a click if there is a winner or if this square has already been filled
    if (this.state.winner || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    // check for a winner
    let score = clone(this.state.score);
    let winner = null;
    let winningSquares;
    for (let i=0; i<(squares.length-1); i++) {

      winningSquares = this.checkWin(squares, this.state.settings.numRows, this.state.settings.numCols, i, this.state.settings.numCellsInALineToWin);
      
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

    const history = currentHistory.concat([{
        squares: squares,
      }])

    const currentTurn = this.state.currentTurn + 1;

    this.setState({
      history: history,
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
      status = 'This game is a draw!';
    } else if (this.state.winner){
      status = 'Player ' + this.state.winner + ' has won!';
    } else {
      status = 'Player ' + (this.state.xIsNext ? 'X' : 'O') + '\'s turn';
    }

    return (
      <div className='game-wrapper'>
        <div className='game'>

          <Scoreboard
            score={this.state.score}
          />

          <Board 
            onClick={this.handleClick_btnSquare.bind(this)}
            squares={this.state.history[this.state.currentTurn].squares}
            winningSquares={this.state.winningSquares}
            numRows={this.state.settings.numRows}
            numCols={this.state.settings.numCols}
          />

          <div className='status'>{status}</div>

          <Button 
            className='btn-undo'
            onClick={this.undo.bind(this, 1)}
            hidden={this.state.currentTurn === 0}
            value='Undo' 
          />

          <Button 
            className='btn-play-again'
            onClick={this.resetBoard.bind(this)}
            hidden={!(this.state.winner || this.state.draw)}
            value='Play Again'
          />

          <div className='settings-panel'>

            <label>Settings:</label>

            <div className='wrapper'>
              <label>Rows:</label>
              <InputStepper
                className='txt-num-rows'
                onClick={this.handleClick_txtNumRows.bind(this)}
                maxValue={10}
                minValue={3}
                value={this.state.inputs.txtNumRows}
              />

              <label>Columns:</label>
              <InputStepper
                className='txt-num-cols'
                onClick={this.handleClick_txtNumCols.bind(this)}
                maxValue={10}
                minValue={3}
                value={this.state.inputs.txtNumCols}
              />

              <label>Cells in a line to win:</label>
              <InputStepper
                className='txt-num-cells'
                onClick={this.handleClick_txtNumCells.bind(this)}
                maxValue={Math.max(this.state.inputs.txtNumRows, this.state.inputs.txtNumCols)}
                minValue={3}
                value={this.state.inputs.txtNumCells}
              />
            </div>

            <Button 
              className='btn-save-settings'
              onClick={this.handleClick_btnSaveSettings.bind(this)}
              disabled={this.disable_btnSaveSettings()}
              value='Save'
            />

          </div>

          <Button
            className='btn-play-again'
            onClick={() => {
              //console.log(this.state.winningSquares);
              console.log(this.state.settings);
              //console.log(this.state.history[0]);
              //console.log(this.defaultState.history[0]);
              console.log(this.state.inputs);
            }}
            hidden
            value='log' 
          />

        </div> 
      </div>
    );
    
  }

  checkWin(squares, numRows, numCols, cell, numCellsInALineToWin) {
    // look in all directions around this cell to see if the player has won

    if (squares[cell] === null) return [];

    // define x/y steps for each direction we need to search
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
    for (let i=0; i<directions.length; i++) {
      const xStep = directions[i][1];
      const yStep = directions[i][2];
      const winningSquares = this.check(squares, numRows, numCols, cell, xStep, yStep, numCellsInALineToWin);
      if (winningSquares.length === numCellsInALineToWin) return winningSquares; // match found
    }

    return []; // no matches found
    
  }

  check(squares, numRows, numCols, cell, xStep, yStep, numCellsInALineToWin) {
    // look in one direction, starting from cell, and staying within the bounds of the grid
    // checking if every value is equal to the value in cell
    // returns an array of the cells that match.
    // ASSUMPTION: cell is correct, and fits inside the number of rows and cols

    // check if only looking for one match lol
    if (numCellsInALineToWin === 1) return [cell];

    // check if we would extend beyond the grid on x-axis
    const thisCol = cell % numCols; // index
    const lookAheadCol = thisCol + (xStep * (numCellsInALineToWin - 1));
    if (lookAheadCol > (numCols-1) || lookAheadCol < 0) return [];
    
    // check if we would extend beyond the grid on y-axis
    const thisRow = Math.floor(cell / numRows); // index
    const lookAheadRow = thisRow + (yStep * (numCellsInALineToWin - 1));
    if (lookAheadRow > (numRows-1) || lookAheadRow < 0) return [];

    const found = [cell]; // array to store the matches
    let thisCell = cell;
    for (let i=0; i<(numCellsInALineToWin-1); i++) {

      // calc index of next cell we need to check
      thisCell += (xStep * 1) + (yStep * numCols);
      if (squares[thisCell] === squares[cell]) {
        found.push(thisCell);
      } else {
        return [];
      }
      
    }
    
    return found;

  }

}
