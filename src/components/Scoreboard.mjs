import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

import './Scoreboard.css';

const Scoreboard = (props) => {

  const classNameX = ClassNames('player', {
    'winner': props.score.X > props.score.O,
  });

  const classNameY = ClassNames('player', {
    'winner': props.score.X < props.score.O,
  });

  return (
    <div className='score-board'>
      <div className={classNameX}>
        <div>X</div>
        <div>{props.score.X}</div>
      </div>
      <div className={classNameY}>
        <div>O</div>
        <div>{props.score.O}</div>
      </div>
    </div>
  );

}

// apply typechecking (dev mode only)
Scoreboard.propTypes = {
  score: PropTypes.object,
};

export default Scoreboard;
