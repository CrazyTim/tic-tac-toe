import React from 'react';
import classNames from 'classnames';

import './Scoreboard.css';

export default class Scoreboard extends React.Component {

  render() {
    
    const classNameX = classNames('player', {
      'winner': this.props.score.X > this.props.score.O,
    });

    const classNameY = classNames('player', {
      'winner': this.props.score.X < this.props.score.O,
    });

    return (
      <div className='score-board'>
        <div className={classNameX}>
          <div>X</div>
          <div>{this.props.score.X}</div>
        </div>
        <div className={classNameY}>
          <div>O</div>
          <div>{this.props.score.O}</div>
        </div>
      </div>
    );

  }

}
