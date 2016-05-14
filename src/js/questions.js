'use strict';

const _debug = require('debug')('Questions');
const React = require('react');
const {Link} = require('react-router');
const {connect} = require('react-redux');
const {UPDATE_DATA, TOGGLE_QUESTION} = require('./actions');
const questionPath = require('./question-path');

class Questions extends React.Component {

	constructor() {

		super();

	}

	loader() {

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

	const toggleQuestion = (id) => {
		dispatch({
			type: 'questions', // State.
			operation: TOGGLE_QUESTION, // Action.
			id // Params.
		});
	};

	return {toggleQuestion};

}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Questions);
