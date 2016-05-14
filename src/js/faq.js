'use strict';

const React = require('react');
const {Link} = require('react-router');
const Hero = require('./hero');
const Topics = require('./topics');
const Questions = require('./questions');

class Faq extends React.Component {

	constructor() {

		super();

	}

	render() {

		return (
			<div>
				<Hero {...this.props}/>
				<nav>
					<Topics {...this.props} />
				</nav>
				<Questions {...this.props} />
			</div>
		);

	}

}

module.exports = Faq;
