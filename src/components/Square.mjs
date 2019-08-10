import React from 'react';
import ReactDOM from 'react-dom';

import './Square.css';

export default class Square extends React.Component {

	render() {

		let className = "square";
		if (this.props.winner) {
			className += ' winner';
		}

		if (this.props.gameOver || this.props.value) {
			className += ' disabled';
		}

		return (
		  <button 
		  	className={className} 
		  	onClick={this.props.onClick}>
		    {this.props.value}
		  </button>
		);

	}

}
