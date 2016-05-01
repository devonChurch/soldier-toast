'use strict';

const $ = require('jquery');
const React = require('react');
const {Link} = require('react-router');
const {connect} = require('react-redux');
const {UPDATE_LOADER, SELECT_TOPIC, TOGGLE_TOPICS} = require('./actions');

class Topics extends React.Component {

	constructor() {

		super();


	}

	changeTopic(topic) {

		console.log('changeTopic');

		if (topic !== this.props.routeParams.topic) {
		//
			console.log('  --> topics DONT match = [update]', topic);
			console.log(this.props);
		//
			this.props.selectTopic(topic);
			this.props.updateLoader(true);
		//
		}

	}

	render() {

		console.log('Render topics');
		console.log(this.props);
		// console.log(this.props.passive.topics);

		const toggleClassName = this.props.topics.open ? 'topics__toggle topics__toggle--open' : 'topics__toggle';

		return (
			<div className="topics">
				<button className={toggleClassName} onClick={() => this.props.toggleTopics()}>Select topic</button>
				<div className="topics__dropdown">
					<ul className="topics__list">
						{
							this.props.passive.topics.map((topic, id) => {

								console.log(topic);

								return (
									<li className="topics__item" key={id}>
										<Link className="topics__link" to={topic.url} onClick={() => this.changeTopic(topic.url)}>
											<h2 className="topics__heading">{topic.heading}</h2>
										</Link>
										<p className="topics__description">{topic.description}</p>
									</li>
								);

							})
						}
					</ul>
					<Link className="topics__all" to="/all" onClick={() => this.changeTopic('all')}>View all questions</Link>
				</div>
			</div>
		);

	}

}

function mapStateToProps(state) {

	return state;

}

function mapDispatchToProps(dispatch) {

	// return bindActionCreators({UPDATE_LOADER}, dispatch);

	const selectTopic = (topic) => {
		dispatch({
			type: 'topics', // State.
			operation: SELECT_TOPIC, // Action.
			topic // Params.
		});
	};

	const updateLoader = (status) => {
		dispatch({
			type: 'questions', // State.
			operation: UPDATE_LOADER, // Action.
			status // Params.
		});
	};

	const toggleTopics = () => {
		dispatch({
			type: 'topics', // State.
			operation: TOGGLE_TOPICS // Action.
		});
	};

	return {selectTopic, updateLoader, toggleTopics};

}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Topics);
