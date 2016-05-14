'use strict';

const _debug = require('debug')('Hero');
const React = require('react');

class Hero extends React.Component {

	constructor() {

		super();

	}

	render() {

		_debug(this.props);

		const {heading, description} = this.props.passive.hero;

		return (
			<div className="hero">
				<div>
					<h1>{heading}</h1>
					<p>{description}</p>
				</div>
			</div>
		);

	}

}

module.exports = Hero;
