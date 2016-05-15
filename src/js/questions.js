'use strict';

/**
 * Questions component.
 * @module ./questions
 */

const _debug = require('debug')('Questions');
const React = require('react');
const {Link} = require('react-router');
const {connect} = require('react-redux');
const {TOGGLE_QUESTION} = require('./actions');
const questionPath = require('./question-path');

/** Class representing the Topics component. */
class Questions extends React.Component {

	/** Create a new component instance */
	constructor() {

		super();

	}

	/**
	 * Generates the loader element that is present when the app is fetching new
	 * data from a a client side request.
	 * @returns {jsx} The rendered loader content.
	 */
	loader() {

		_debug('Loading due to fetch request');

		return <div className="questions__loader">LOADING...</div>;

	}

	/**
	 * Generates the question items from the current set of curated feed data.
	 * @returns {jsx} The rendered questions item content.
	 */
	items() {

		const {topic} = this.props.routeParams;
		const {data, open} = this.props.questions;

		return data.map((question, id) => {

			const {heading, description} = question;
			const active = id === open;
			// When a question item is active then upon closing it we need to
			// change the URL to reference only the topic with no association to
			// the question any more.
			const url = active ? `/${topic}` : `/${topic}/${questionPath(heading)}`;
			const toggleClassName = active ? 'questions__toggle questions__toggle--open' : 'questions__toggle';
			const param = active ? null : id;

			return (
				<li className="questions__item" key={id}>
					<Link className={toggleClassName} to={url} onClick={() => this.props.toggleQuestion(param)}>{heading}</Link>
					<div className="questions__dropdown">
						<div className="questions__spacing">
							<div className="questions__content">
								<h3 className="questions__heading">{heading}</h3>
								<p className="questions__description">{description}</p>
							</div>
						</div>
					</div>
				</li>
			);

		});

	}

	/**
	 * Generate the component markup as part of the React render sequence.
	 * @return {jsx} The rendered component.
	 */
	render() {

		const loading = this.props.questions.loading;
		const questions = loading ? this.loader() : this.items();

		return (
			<div className="questions">
				<ul className="questions__list">
					{questions}
				</ul>
			</div>
		);

	}

}

/**
 * Connect this component to the Redux state for instance access to it properties
 * rather than obtaining then via a series for inheritance from parent components.
 * @return {object} The Redux state.
 */
function mapStateToProps(state) {

	return state;

}

/**
 * Connect this component to the Redux action dispatcher so that we can easily
 * update the global Redux state and promo the app to re-render to reflect the
 * updated state.
 * @return {object} The Redux dispatcher actions.
 */
function mapDispatchToProps(dispatch) {

	const toggleQuestion = (id) => {
		dispatch({
			type: 'questions', // State.
			operation: TOGGLE_QUESTION, // Action.
			id // Params.
		});
	};

	return {toggleQuestion};

}

/**
 * The Questions component connected to both the Redux state and action dispatcher.
 */
module.exports = connect(mapStateToProps, mapDispatchToProps)(Questions);
