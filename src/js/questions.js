'use strict';

const React = require('react');
const {Link} = require('react-router');
const {connect} = require('react-redux');
const {UPDATE_LOADER} = require('./actions');

class Questions extends React.Component {

	constructor() {

		console.log('** Questions (constructor)');

		super();
		this.questions = null;


	}

	componentDidMount() {

		console.log('componentDidMount | fetch data');

		const request = new XMLHttpRequest();
		const url = this.props.api.request;
		console.log(url);

		request.open('GET', `/api${url}`, true);

		request.onload = () => {

			if (request.status >= 200 && request.status < 400) {
				// Success!
				console.log('success');
				console.log(request.responseText);
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

	componentWillUnmount() {

		// FIX!
		this.request.abort();

	}

	compile() {

		console.log('compile | questions');
		console.log(this.questions);

		// let list;

		return this.questions.map((question) => {

			console.log(question);

			return (
				<li>
					<button>{question.heading}</button>
					<div>
						<h3>{question.heading}</h3>
						<p>{question.description}</p>
					</div>
				</li>
			);

		});

		// return list;



		// return (
		// 	<li>
		// 		<button>heading</button>
		// 		<div>
		// 			<h3>heading</h3>
		// 			<p>description</p>
		// 		</div>
		// 	</li>
		// );

	}

	render() {

		console.log('Render questions');
		console.log(this.props);

		const loading = this.props.api.loading;
		console.log('loading', loading);
		const questions = loading ? <div>LOADING...</div> : this.compile();


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
