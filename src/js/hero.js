'use strict';

/**
 * Hero component.
 * @module ./hero
 */

const React = require('react');

/** Class representing the Hero component. */
class Hero extends React.Component {

	/** Create a new component instance */
	constructor() {

		super();

	}

	/**
	 * Generate the component markup as part of the React render sequence.
	 * @return {jsx} The rendered component.
	 */
	render() {

		const {heading, description} = this.props.passive.hero;

		return (
			<div className="hero">
				<div className="hero__content">
					<h1 className="hero__heading">{heading}</h1>
					<p className="hero__description">{description}</p>
				</div>
			</div>
		);

	}

}

/** Hero component */
module.exports = Hero;
