'use strict';

const _debug = require('debug')('Questions');
const React = require('react');
const {Link} = require('react-router');
const {connect} = require('react-redux');
const {UPDATE_LOADER, UPDATE_DATA, TOGGLE_QUESTION} = require('./actions');
const questionPath = require('./question-path');

class Questions extends React.Component {

	constructor() {

		super();

	}

	componentDidMount() {

		// this.fetch();

	}

	componentWillUnmount() {

		// FIX!
		this.request.abort();

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

		request.onload = () => {

			if (request.status >= 200 && request.status < 400) {

				_debug('- Fetch = success');

				const data = JSON.parse(request.responseText);

				_debug('- Returned data', data);

				this.props.updateData(data);
				this.props.updateLoader(false);


			} else {

				_debug('- Fetch = error');

			}

		};

		request.onerror = () => {
		// There was a connection error of some sort
		};

		request.send();

	}

	loader() {

		this.fetch();

		return <div>LOADING...</div>;

	}

	compile() {

		const {topic} = this.props.routeParams;
		const {data, open} = this.props.questions;

		return data.map((question, id) => {

			const {heading, description} = question;
			const path = questionPath(heading);
			const toggleClassName = id === open ? 'questions__toggle questions__toggle--open' : 'questions__toggle';

			return (
				<li className="questions__item" key={id}>
					<Link className={toggleClassName} to={`/${topic}/${path}`} onClick={() => this.props.toggleQuestion(id)}>{heading}</Link>
					<div className="questions__dropdown">
						<h3 className="questions__heading">{heading}</h3>
						<p className="questions__description">{description}</p>
					</div>
				</li>
			);

		});

	}

	render() {

		const loading = this.props.questions.loading;
		const questions = loading ? this.loader() : this.compile();

		return (
			<div className="questions">
				<ul className="questions__list">
					{questions}
				</ul>
			</div>
		);

	}

}

function mapStateToProps(state) {

	return state;

}

function mapDispatchToProps(dispatch) {

	// return bindActionCreators({UPDATE_LOADER}, dispatch);

	const updateLoader = (status) => {
		dispatch({
			type: 'questions', // State.
			operation: UPDATE_LOADER, // Action.
			status // Params.
		});
	};

	const updateData = (data) => {
		dispatch({
			type: 'questions', // State.
			operation: UPDATE_DATA, // Action.
			data // Params.
		});
	};

	const toggleQuestion = (id) => {
		dispatch({
			type: 'questions', // State.
			operation: TOGGLE_QUESTION, // Action.
			id // Params.
		});
	};

	return {updateLoader, updateData, toggleQuestion};

}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Questions);
