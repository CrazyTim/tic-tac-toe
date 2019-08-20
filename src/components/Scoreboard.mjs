import React from 'react';

import './Scoreboard.css';

export default class Scoreboard extends React.Component {

  render() {
    
    let className1 = 'player';
    let className2 = 'player';
    if (this.props.score.X > this.props.score.O) {
      className1 += ' winner';
    } else if (this.props.score.X < this.props.score.O) {
      className2 += ' winner';
    } 

    return (
      <div className="score-board">
        <div className={className1}>
          <div>X</div>
          <div>{this.props.score.X}</div>
        </div>
        <div className={className2}>
          <div>O</div>
          <div>{this.props.score.O}</div>
        </div>
      </div>
    );

  }

}
