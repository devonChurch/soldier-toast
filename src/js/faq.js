'use strict';

const React = require('react');
const {Link} = require('react-router');
const Questions = require('./questions');

class Faq extends React.Component {

	constructor() {

		console.log('** Faq (constructor)');

		super();


	}

	render() {

		// console.log(this);
		// console.log(this.props);

		return (
			<div>
				<h1>FAQ</h1>
				<Questions />
			</div>
		);

	}

}

module.exports = Faq;
