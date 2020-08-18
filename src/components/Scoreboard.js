import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

import './Scoreboard.css';

const Scoreboard = (props) => {

  const classNameX = ClassNames('player', 'player-x', {
    'winner': props.score.X > props.score.O,
  });

  const classNameY = ClassNames('player', 'player-o', {
    'winner': props.score.X < props.score.O,
  });

  const scoreX = props.score.X > 0 ? props.score.X : '-'; // blank space so div doesn't shrink
  const scoreO = props.score.O > 0 ? props.score.O : '-'; // blank space so div doesn't shrink

  return (
    <div className='score-board'>
      <div className={classNameX}>
        <div className='title'></div>
        <div className='score'>{scoreX}</div>
      </div>
      <div className={classNameY}>
        <div className='title'></div>
        <div className='score'>{scoreO}</div>
      </div>
    </div>
  );

}

// apply typechecking (dev mode only)
Scoreboard.propTypes = {
  score: PropTypes.object,
};

export default Scoreboard;
