'use strict';

const React = require('react');
const {Link} = require('react-router');
const Topics = require('./topics');
const Questions = require('./questions');

class Faq extends React.Component {

	constructor() {

		console.log('** Faq (constructor)');

		super();


	}

	render() {

		// console.log(this);
		console.log('render | faq');
		console.log(this.props);
		console.log(this.props.route.apple);

		return (
			<div>
				<h1>FAQ</h1>
				<nav>
					<Topics {...this.props} />
				</nav>
				<Questions {...this.props} />
			</div>
		);

	}

}

module.exports = Faq;
