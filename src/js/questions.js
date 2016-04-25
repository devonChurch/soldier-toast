'use strict';

const React = require('react');
const {Link} = require('react-router');
const {connect} = require('react-redux');
const {UPDATE_LOADER} = require('./actions');
const questionPath = require('./question-path');

class Questions extends React.Component {

	constructor() {

		super();

		// *** Change this to be part of the state as it will constantly change and will work well when using redux dev tools....
		this.questions = null;


	}

	componentDidMount() {

		this.fetch();

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

		console.log('fetch | questions');

		const request = new XMLHttpRequest();
		const url = this.generateUrl();
		console.log(url);

		request.open('GET', url, true);

		request.onload = () => {

			if (request.status >= 200 && request.status < 400) {
				// Success!
				console.log('success');

				this.questions = JSON.parse(request.responseText);
				console.log(this.questions);
				this.props.updateLoader(false);

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

		const {topic} = this.props.routeParams;

		return this.questions.map((question, id) => {

			const heading = question.heading;
			const path = questionPath(heading);

			return (
				<li key={id}>
					<Link to={`/${topic}/${path}`}>{heading}</Link>
					<div>
						<h3>{heading}</h3>
						<p>{question.description}</p>
					</div>
				</li>
			);

		});

	}

	render() {

		console.log('render | questions');
		console.log(this.props);

		const loading = this.props.api.loading;
		const questions = loading ? this.loader() : this.compile();


		return (
			<ul>
				{questions}
			</ul>
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
			type: 'api', // State.
			operation: UPDATE_LOADER, // Action.
			status // Params.
		});
	};

	return {updateLoader};

}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Questions);
