import React from 'react';
import ClassNames from 'classnames';

import {clone, ZERO_WIDTH_SPACE} from './utils/utils.mjs'
import checkWin from './utils/check-win.mjs'
import Board from './components/Board.mjs';
import Button from './components/Button.mjs';
import Scoreboard from './components/Scoreboard.mjs';
import InputStepper from './components/InputStepper.mjs';
import './App.css';

export default class App extends React.Component {

  constructor(props) {

    super(props);

    // get ref so we can lookup the scrollHeight to animate it
    this.settingsPanel = null;
    this.setSettingsPanel = element => {
      this.settingsPanel = element;
    };

    const defaultState = {
      settings: {
        numRows: 3,
        numCols: 3,
        numCellsInALineToWin: 3,
      },
      score: {
        X: 0,
        O: 0,
      },
      loaded: false,
      gui: {
        settingsPanelHeight: 0,
        gameOverTimerElapsed: 0,
      },
    };

    const defaultInputState = {
      inputs: {
        txtNumRows: defaultState.settings.numRows,
        txtNumCols: defaultState.settings.numCols,
        txtNumCells: defaultState.settings.numCellsInALineToWin,
      },
    }

    const defaultGameState = {
      history: [{
        squares: Array(defaultState.settings.numRows * defaultState.settings.numCols).fill(null),
      }],
      currentTurn: 0,
      xIsNext: true,
      winner: null,
      winningSquares: [],
      draw: false,
    };

    this.state = {...defaultState,
                  ...defaultInputState,
                  ...defaultGameState,
                  defaultGameState,
                };

    window.onload = () => {
      this.setState({loaded: true});
    };

  }

  handleClick_btnSaveSettings() {

    const settings = clone(this.state.settings);
    settings.numRows = parseInt(this.state.inputs.txtNumRows);
    settings.numCols = parseInt(this.state.inputs.txtNumCols);
    settings.numCellsInALineToWin = parseInt(this.state.inputs.txtNumCells);

    // initalise new default game state
    const defaultGameState = clone(this.state.defaultGameState);
    defaultGameState.history = [{
        squares: Array(settings.numRows * settings.numCols).fill(null),
    }];

    // hide settings panel
    const gui = clone(this.state.gui);
    gui.settingsPanelHeight = 0;

    this.setState(
      {settings, defaultGameState, gui},
      () => {
        this.resetBoard();
      }
    );

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

  handleClick_btnSettings() {
    if (this.settingsPanel === null) return;

    const gui = clone(this.state.gui);

    // toggle show panel
    if (gui.settingsPanelHeight === 0) {
      gui.settingsPanelHeight = this.settingsPanel.scrollHeight;
    } else {
      gui.settingsPanelHeight = 0;
    }

    this.setState({gui});
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
    this.setState( clone(this.state.defaultGameState) );
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

  handleClick_Square(i) {

    // get history from the beginning until currentTurn
    const currentHistory = this.state.history.slice(0, this.state.currentTurn + 1);

    const squares = clone(currentHistory[this.state.currentTurn].squares);
    const gui = clone(this.state.gui);

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

    const history = currentHistory.concat([{
      squares: squares,
    }])

    const currentTurn = this.state.currentTurn + 1;

    // start end game animation
    if (winner || draw) {

      gui.gameOverTimerElapsed = 0.200;

      this.gameOverTimer = setInterval( () => {

        if (this.state.gui.gameOverTimerElapsed >= 1000) {
          clearInterval(this.gameOverTimer);
          this.resetBoard();
        } else {
          const gui = clone(this.state.gui);
          gui.gameOverTimerElapsed += 200;
          this.setState({gui});
        }

      }, 200);
    }

    this.setState({
      gui: gui,
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

    const gameWrapperClassName = ClassNames('game-wrapper', 'theme-default', {
      'loaded': this.state.loaded,
    });

    const settingsPanelStyle = {
      height: this.state.gui.settingsPanelHeight,
    };

    return (
      <div className={gameWrapperClassName}>
        <div className='game'>

          <div className='header'>

            <h1>Tic Tac Toe</h1>

            <div className='wrapper'>
              <div></div>
              <Scoreboard
                score={this.state.score}
              />

              <Button
                className='btn-show-settings'
                onClick={this.handleClick_btnSettings.bind(this)}
                value={ZERO_WIDTH_SPACE}
              />

            </div>

            <div className='settings-panel' style={settingsPanelStyle} ref={this.setSettingsPanel}>
              <div className='inner-wrapper'>
                <label>Settings:</label>

                <div className='wrapper'>

                  <label>Rows:</label>
                  <InputStepper
                    className='txt-num-rows'
                    onClick={this.handleClick_txtNumRows.bind(this)}
                    maxValue={5}
                    minValue={3}
                    value={this.state.inputs.txtNumRows}
                  />

                  <label>Columns:</label>
                  <InputStepper
                    className='txt-num-cols'
                    onClick={this.handleClick_txtNumCols.bind(this)}
                    maxValue={5} // any more than 5 and the layout will break on small screens
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
            </div>

          </div>

          <Board
            onClickSquare={this.handleClick_Square.bind(this)}
            squares={this.state.history[this.state.currentTurn].squares}
            winningSquares={this.state.winningSquares}
            numRows={this.state.settings.numRows}
            numCols={this.state.settings.numCols}
          />

          <div className='status'>{status}</div>

          <Button
            className='btn-undo'
            onClick={this.undo.bind(this, 1)}
            hidden={this.state.currentTurn === 0 || (this.state.winner !== null || this.state.draw)}
            value='Undo'
          />

        </div>
      </div>
    );

  }

}
