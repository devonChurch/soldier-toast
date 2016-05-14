'use strict';

const _debug = require('debug')('Topics');
const $ = require('jquery');
const React = require('react');
const {Link} = require('react-router');
const {connect} = require('react-redux');
const {UPDATE_LOADER, UPDATE_DATA, TOGGLE_QUESTION, SELECT_TOPIC, TOGGLE_TOPICS} = require('./actions');

class Topics extends React.Component {

	constructor() {

		super();

	}

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

	generateUrl() {

		const {topic, question = ''} = this.props.routeParams;

		return `/api/${topic}/${question}`;

	}

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

	status(request) {

		_debug('- Fetch = query status');

		if (request.status >= 200 && request.status < 400) this.success(request.responseText);
		else this.error();

	}

	success(response) {

		_debug('- Fetch = success');

		const data = JSON.parse(response);

		_debug('- Returned data', data);

		this.props.updateData(data);
		this.props.updateLoader(false);

	}

	error() {

		_debug('- Fetch = error');

	}

	compare(url) {

		const current = `/${this.props.routeParams.topic}`;

		return url === current;

	}

	modifier(query, base, modifier) {

		return query ? `${base} ${base}${modifier}` : base;

	}

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

function mapStateToProps(state) {

	return state;

}

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

module.exports = connect(mapStateToProps, mapDispatchToProps)(Topics);
