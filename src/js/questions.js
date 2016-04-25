'use strict';

const React = require('react');
const {Link} = require('react-router');
const {connect} = require('react-redux');
const {UPDATE_LOADER} = require('./actions');
const questionPath = require('./question-path');

class Questions extends React.Component {

	constructor() {

		console.log('** Questions (constructor)');

		super();

		// *** Change this to be part of the state as it will constantly change and will work well when using redux dev tools....
		this.questions = null;


	}

	componentDidMount() {

		console.log('componentDidMount');

		this.fetch();

	}

	componentWillUnmount() {

		// FIX!
		this.request.abort();

	}

	fetch() {

		console.log('fetch | questions');

		const request = new XMLHttpRequest();
		const url = this.props.api.request;
		console.log(url);

		request.open('GET', `/api${url}`, true);

		request.onload = () => {

			if (request.status >= 200 && request.status < 400) {
				// Success!
				console.log('success');

				this.questions = JSON.parse(request.responseText);
				this.props.updateLoader(UPDATE_LOADER, false);

			} else {
				// We reached our target server, but it returned an error
				console.log('error');
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

		console.log('compile | questions');
		console.log(this.questions);

		return this.questions.map((question, id) => {

			const heading = question.heading;
			const path = questionPath(heading);

			return (
				<li key={id}>
					<Link to={path}>{heading}</Link>
					<div>
						<h3>{heading}</h3>
						<p>{question.description}</p>
					</div>
				</li>
			);

		});

	}

	render() {

		console.log('Render questions');
		console.log(this.props);

		const loading = this.props.api.loading;
		console.log('loading', loading);
		const questions = loading ? this.loader() : this.compile();


		return (
			<ul>
				{questions}
			</ul>
		);

	}

}

function mapStateToProps(state) {

	console.log('mapStateToProps | Questions');
	console.log(state);

	return state;

}

function mapDispatchToProps(dispatch) {

	// return bindActionCreators({UPDATE_LOADER}, dispatch);

	const updateLoader = (operation, status) => {
		dispatch({
			type: 'api', // State.
			operation, // Action.
			status // Params.
		});
	};

	return {updateLoader};

}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Questions);
