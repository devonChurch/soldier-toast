'use strict';

const _debug = require('debug')('Topics');
const $ = require('jquery');
const React = require('react');
const {Link} = require('react-router');
const {connect} = require('react-redux');
const {UPDATE_LOADER, TOGGLE_QUESTION, SELECT_TOPIC, TOGGLE_TOPICS} = require('./actions');

class Topics extends React.Component {

	constructor() {

		super();

	}

	changeTopic(topic) {

		_debug('Changing topic');

		const current = `/${this.props.routeParams.topic}`;

		if (topic !== current) {

			_debug(`- ${topic} !== ${current} | make the topic change`);

			this.props.selectTopic(topic);
			this.props.updateLoader();
			this.props.toggleQuestion();

		}

	}

	render() {

		const toggleClassName = this.props.topics.open ? 'topics__toggle topics__toggle--open' : 'topics__toggle';

		return (
			<div className="topics">
				<button className={toggleClassName} onClick={() => this.props.toggleTopics()}>Select topic</button>
				<div className="topics__dropdown">
					<ul className="topics__list">
						{
							this.props.passive.topics.map((topic, id) => {

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

	const updateLoader = () => {
		dispatch({
			type: 'questions',
			operation: UPDATE_LOADER,
			status: true
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

	return {selectTopic, updateLoader, toggleTopics, toggleQuestion};

}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Topics);
