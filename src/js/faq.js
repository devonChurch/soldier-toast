'use strict';

/**
 * FAQ component.
 * @module ./faq
 */

const React = require('react');
const Hero = require('./hero');
const Topics = require('./topics');
const Questions = require('./questions');

/** Class representing the FAQ component. */
class Faq extends React.Component {

	/** Create a new component instance */
	constructor() {

		super();

	}

	/**
	 * Generate the component markup as part of the React render sequence.
	 * @return {jsx} The rendered component.
	 */
	render() {

		return (
			<div>
				<Hero {...this.props}/>
				<Topics {...this.props} />
				<Questions {...this.props} />
			</div>
		);

	}

}

/** FAQ component */
module.exports = Faq;
