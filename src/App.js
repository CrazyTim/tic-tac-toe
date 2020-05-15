import React from 'react';
import ClassNames from 'classnames';

import {clone, ZERO_WIDTH_SPACE, WebStorage} from './utils/utils.js'
import checkWin from './utils/check-win.js'
import Board from './components/Board.js';
import Button from './components/Button.js';
import Scoreboard from './components/Scoreboard.js';
import InputStepper from './components/InputStepper.js';
import Dropdown from './components/Dropdown.js';
import './App.css';
import './themes/themes.css';

export default class App extends React.Component {

  constructor(props) {

    super(props);

    this.webStorage = new WebStorage();

    // get ref so we can lookup the scrollHeight to animate it
    this.settingsPanel = null;
    this.setSettingsPanel = element => {
      this.settingsPanel = element;
    };

    const defaultThemeId = parseInt(this.webStorage.load('themeId')) || 0;
    const defaultNumRows = parseInt(this.webStorage.load('numRows')) || 3;
    const defaultNumCols = parseInt(this.webStorage.load('numCols')) || 3;
    const defaultNumCellsInALineToWin = parseInt(this.webStorage.load('numCellsInALineToWin')) || 3;

    // define the default state for a game separately so we can reset it when the game is over
    const defaultGameState = {
      history: [{
        squares: Array(defaultNumRows * defaultNumCols).fill(null),
      }],
      currentTurn: 0,
      xIsNext: true,
      winner: null,
      winningSquares: [],
      draw: false,
    };

    this.state = {
      ...defaultGameState,
      defaultGameState,
      settings: {
        numRows: defaultNumRows,
        numCols: defaultNumCols,
        numCellsInALineToWin: defaultNumCellsInALineToWin,
      },
      score: {
        X: 0,
        O: 0,
      },
      inputs: {
        dropdownThemeId: defaultThemeId,
        inputStepperRows: defaultNumRows,
        inputStepperCols: defaultNumCols,
        inputStepperCells: defaultNumCellsInALineToWin,
      },
      gui: {
        loaded: false, // set to true when window has loaded
        settingsPanelHeight: 0,
        gameOverTimerElapsed: 0,
      },
      themes: [
        {
          id: 0,
          name: 'Banana',
          className: 'theme-banana',
        },
        {
          id: 1,
          name: 'Eight Bit',
          className: 'theme-bit',
        },
        {
          id: 2,
          name: 'Unicorn',
          className: 'theme-unicorn',
        },
      ],
    };

    window.onload = () => {
      const gui = clone(this.state.gui);
      gui.loaded = true;
      this.setState({gui});
    };

  }

  handleClick_btnSaveSettings() {

    // hide settings panel
    const gui = clone(this.state.gui);
    gui.settingsPanelHeight = 0;

    // Save settings and reset game only if something has changed
    // Otherwise the current game will be reset
    if (this.haveSettingsChanged()) {

      const settings = clone(this.state.settings);
      settings.numRows = this.state.inputs.inputStepperRows;
      settings.numCols = this.state.inputs.inputStepperCols;
      settings.numCellsInALineToWin = this.state.inputs.inputStepperCells;

      this.webStorage.save('numRows', settings.numRows);
      this.webStorage.save('numCols', settings.numCols);
      this.webStorage.save('numCellsInALineToWin', settings.numCellsInALineToWin);

      // initalise new default game state
      const defaultGameState = clone(this.state.defaultGameState);
      defaultGameState.history = [{
          squares: Array(settings.numRows * settings.numCols).fill(null),
      }];

      this.setState({settings, defaultGameState, gui},
        () => { this.resetBoard(); }
      );

    } else {
      this.setState({gui});
    }

  }

  handleClick_inputStepperRows(increment) {
    const inputs = clone(this.state.inputs);
    inputs.inputStepperRows += increment;
    inputs.inputStepperCells = Math.min(Math.max(inputs.inputStepperRows, inputs.inputStepperCols), inputs.inputStepperCells); // ensure cells doesn't exceed number of rows/columns
    this.setState({inputs});
  }

  handleClick_inputStepperCols(increment) {
    const inputs = clone(this.state.inputs);
    inputs.inputStepperCols += increment;
    inputs.inputStepperCells = Math.min(Math.max(inputs.inputStepperRows, inputs.inputStepperCols), inputs.inputStepperCells); // ensure cells doesn't exceed number of rows/columns
    this.setState({inputs});
  }

  handleClick_inputStepperCells(increment) {
    const inputs = clone(this.state.inputs);
    inputs.inputStepperCells += increment;
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

  haveSettingsChanged() {

    const s = this.state

    // detect if state will change
    const changed = (s.inputs.inputStepperRows !== s.settings.numRows ||
                     s.inputs.inputStepperCols !== s.settings.numCols ||
                     s.inputs.inputStepperCells !== s.settings.numCellsInALineToWin);

     // validate inputs (WIP)
    const valid = true;

    return (changed && valid);

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

  getSelectedThemeClassName() {
    const found = this.state.themes.find( item => item.id === this.state.inputs.dropdownThemeId );
    if (found) {
      return found.className;
    } else {
      return 'theme-default'; // shouldn't happen == dodgy default state
    }
  }

  handleChange_dropdownTheme(event) {

    const newThemeId = parseInt(event.target.value);

    const inputs = clone(this.state.inputs);
    inputs.dropdownThemeId = newThemeId;

    this.webStorage.save('themeId', newThemeId);

    this.setState({inputs}, () => {
      // resize settings panel to fit the new theme
      const gui = clone(this.state.gui);
      gui.settingsPanelHeight = this.settingsPanel.scrollHeight;
      this.setState({gui});
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

    const gameWrapperClassName = ClassNames('game-wrapper', this.getSelectedThemeClassName(), {
      'loaded': this.state.gui.loaded,
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
                    className='input-stepper-rows'
                    onClick={this.handleClick_inputStepperRows.bind(this)}
                    maxValue={5}
                    minValue={3}
                    value={this.state.inputs.inputStepperRows}
                  />

                  <label>Columns:</label>
                  <InputStepper
                    className='input-stepper-columns'
                    onClick={this.handleClick_inputStepperCols.bind(this)}
                    maxValue={5} // any more than 5 and the layout will break on small screens
                    minValue={3}
                    value={this.state.inputs.inputStepperCols}
                  />

                  <label>Cells in a line to win:</label>
                  <InputStepper
                    className='input-stepper-cells'
                    onClick={this.handleClick_inputStepperCells.bind(this)}
                    maxValue={Math.max(this.state.inputs.inputStepperRows, this.state.inputs.inputStepperCols)}
                    minValue={3}
                    value={this.state.inputs.inputStepperCells}
                  />

                  <label>Theme:</label>
                  <Dropdown
                    className='dropdown-theme'
                    onChange={this.handleChange_dropdownTheme.bind(this)}
                    values={this.state.themes}
                    selectedValue={this.state.inputs.dropdownThemeId}
                  />

                </div>

                <Button
                  className='btn-save-settings'
                  onClick={this.handleClick_btnSaveSettings.bind(this)}
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
