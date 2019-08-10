import React from 'react';
import ReactDOM from 'react-dom';

import './Scoreboard.css';

export default class Scoreboard extends React.Component {

	render() {
		
		let className1 = '';
		let className2 = '';
		if (this.props.score.X > this.props.score.O) {
			className1 = ' winner';
		} else if (this.props.score.X < this.props.score.O) {
			className2 = ' winner';
		} 

		return (
			<div className="score-board">
		  	<div className={className1}><span>Player X:</span><span>{this.props.score.X}</span></div>
		  	<div className={className2}><span>Player O:</span><span>{this.props.score.O}</span></div>
		  </div>
		);

	}

}
