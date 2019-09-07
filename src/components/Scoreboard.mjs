import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

import './Scoreboard.css';

export default class Scoreboard extends React.Component {

  render() {
    
    const classNameX = ClassNames('player', {
      'winner': this.props.score.X > this.props.score.O,
    });

    const classNameY = ClassNames('player', {
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

// apply typechecking for dev mode
Scoreboard.propTypes = {
  score: PropTypes.object,
};
