'use strict';

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
			this.props.selectTopic(SELECT_TOPIC, topic);
			this.props.updateLoader(UPDATE_LOADER, true);
		//
		}

	}

	render() {

		console.log('Render topics');
		console.log(this.props);
		// console.log(this.props.static.topics);

		return (
			<div>
				<button>Select topic</button>
				<div>
					<ul>
						{
							this.props.static.topics.map((topic, id) => {

								console.log(topic);

								return (
									<li key={id}>
										<Link to={topic.url} >
											<h2 onClick={() => this.changeTopic(topic.url)}>{topic.heading}</h2>
										</Link>
										<p>{topic.description}</p>
									</li>
								);

							})
						}
					</ul>
					<Link to="/all">View all questions</Link>
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

	const selectTopic = (operation, topic) => {
		dispatch({
			type: 'topics', // State.
			operation, // Action.
			topic // Params.
		});
	};

	const updateLoader = (operation, status) => {
		dispatch({
			type: 'api', // State.
			operation, // Action.
			status // Params.
		});
	};
	//
	// const toggleTopics = (operation, status) => {
	// 	dispatch({
	// 		type: 'topics', // State.
	// 		operation, // Action.
	// 		status // Params.
	// 	});
	// };

	// return {selectTopic, updateLoader, toggleTopics};
	return {selectTopic, updateLoader};

}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Topics);
