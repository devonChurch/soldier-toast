'use strict';

/**
 * Topics component.
 * @module ./topics
 */

const _debug = require('debug')('Topics');
const React = require('react');
const {Link} = require('react-router');
const {connect} = require('react-redux');
const {UPDATE_LOADER, UPDATE_DATA, TOGGLE_QUESTION, SELECT_TOPIC, TOGGLE_TOPICS} = require('./actions');

/** Class representing the Topics component. */
class Topics extends React.Component {

	/** Create a new component instance */
	constructor() {

		super();

	}

	/**
	 * When a new topic is selected we first query is it differs to the current
	 * topic displayed in the app and if so we run through a series of Redux
	 * actions that are sent to the dispatcher and finally fetch the relevant
	 * data attributed to the new topic choice.
	 */
	changeTopic(url) {

		if (!this.compare(url)) {

			_debug('Changing topic');

			this.props.selectTopic(url);
			this.props.updateLoader(true);
			this.props.toggleQuestion();
			this.props.toggleTopics();

			// Wait for react-router to update its params.
			setTimeout(() => this.fetch(), 100);

		}

	}

	/**
	 * Generate the URL that will be sent to our API on the Node server. We are
	 * only interested in the topic not question when making client side requests
	 * to the curation script on the server.
	 * @return {string} The generated URL.
	 */
	generateUrl() {

		const {topic} = this.props.routeParams;

		return `/api/${topic}`;

	}

	/**
	 * Makes the call to the Node API to obtain the new topic data. The request
	 * then handles the success / error status accordingly.
	 */
	fetch() {

		_debug('Fetching questions');

		const request = new XMLHttpRequest();
		const url = this.generateUrl();

		_debug(`- URL = ${url}`);

		request.open('GET', url, true);
		request.onload = () => this.status(request);
		request.onerror = () => this.error();
		request.send();

	}

	/**
	 * Checks the request status on the returned data and runs the appropriate
	 * handler.
	 * @param {object} request - The request object from the fetch request.
	 */
	status(request) {

		_debug('- Fetch = query status');

		if (request.status >= 200 && request.status < 400) this.success(request.responseText);
		else this.error();

	}

	/**
	 * Runs the success handler once the data has been successfully returned
	 * from the fetch request.
	 * @param {string} response - The fetched data.
	 */
	success(response) {

		_debug('- Fetch = success');

		const data = JSON.parse(response);

		_debug('- Returned data', data);

		this.props.updateData(data);
		this.props.updateLoader(false);

	}

	/**
	 * Runs the error handler if there was a complication with fetching the data.
	 */
	error() {

		_debug('- Fetch = error');

	}

	/**
	 * Compares the current topic URL attributed to the present data on display
	 * to another URL option.
	 * @param {string} url - The URL in which to compare.
	 * @return {boolean} The status of the match.
	 */
	compare(url) {

		const current = `/${this.props.routeParams.topic}`;

		return url === current;

	}

	/**
	 * This function decides if a given element needs it modifier to be added in
	 * i.e. if a dropdown is open then we need to append —open to the class.
	 * @param {boolean} query - The result of a query to ascertain the modifiers
	 * relevance.
	 * @param {string} base - The base class name of the element.
	 * @param {string} modifier - The modifier to append onto the base class name.
	 * @return {string} The complete class name sequence for the element.
	 */
	modifier(query, base, modifier) {

		return query ? `${base} ${base}${modifier}` : base;

	}

	/**
	 * Loops through the passive topic prop data and generates the nave items.
	 * @returns {jsx} The rendered topic items content.
	 */
	items() {

		const topics = this.props.passive.topics;
		const keys = Object.keys(topics);

		return keys.map((key, id) => {

			const topic = topics[key];
			const url = topic.url;
			const linkClass = this.modifier(this.compare(url), 'topics__link', '--active');

			return (
				<li className="topics__item" key={id}>
					<Link className={linkClass} to={url} onClick={() => this.changeTopic(url)}>
						<h2 className="topics__heading">{topic.heading}</h2>
					</Link>
					<p className="topics__total">{topic.total} questions</p>
					<p className="topics__description">{topic.description}</p>
				</li>
			);

		});

	}

	/**
	 * Adds in a extra module relating to the chosen topic. Note - that this will
	 * no all ear if the current topic option is ‘all’.
	 * @returns {jsx} The rendered active topic content.
	 */
	active() {

		const key = this.props.routeParams.topic;
		const {heading, description} = this.props.passive.topics[key];

		return (
			<div className="topics__active">
				<div className="topics__content">
					<h2 className="topics__heading">{heading}</h2>
					<p className="topics__description">{description}</p>
				</div>
			</div>
		);

	}

	/**
	 * Generate the component markup as part of the React render sequence.
	 * @return {jsx} The rendered component.
	 */
	render() {

		const toggleClass = this.modifier(this.props.topics.open, 'topics__toggle', '--open');
		const allClass = this.modifier(this.compare('/all'), 'topics__all', '--active');
		const active = this.compare('/all') ? '' : this.active();

		return (
			<div className="topics">
				<nav className="topics__nav">
					<div className="topics__content">
						<button className={toggleClass} onClick={() => this.props.toggleTopics()}>Select topic</button>
						<div className="topics__dropdown">
							<div className="topics__options">
								<ul className="topics__list">
									{this.items()}
								</ul>
								<Link className={allClass} to="/all" onClick={() => this.changeTopic('all')}>View all questions</Link>
							</div>
						</div>
					</div>
				</nav>
				{active}
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

	const selectTopic = (topic) => {
		dispatch({
			type: 'topics', // State.
			operation: SELECT_TOPIC, // Action.
			topic // Params.
		});
	};

	const updateLoader = (status) => {
		dispatch({
			type: 'questions',
			operation: UPDATE_LOADER,
			status
		});
	};

	const updateData = (data) => {
		dispatch({
			type: 'questions',
			operation: UPDATE_DATA,
			data
		});
	};

	const toggleTopics = () => {
		dispatch({
			type: 'topics',
			operation: TOGGLE_TOPICS
		});
	};

	const toggleQuestion = () => {
		dispatch({
			type: 'questions',
			operation: TOGGLE_QUESTION,
			id: null
		});
	};

	return {selectTopic, updateLoader, updateData, toggleTopics, toggleQuestion};

}

/**
 * The Topics component connected to both the Redux state and action dispatcher.
 */
module.exports = connect(mapStateToProps, mapDispatchToProps)(Topics);
