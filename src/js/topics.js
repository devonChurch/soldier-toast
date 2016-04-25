'use strict';

const React = require('react');
const {Link} = require('react-router');
const {connect} = require('react-redux');
const {SELECT_TOPIC, TOGGLE_TOPICS} = require('./actions');

class Topics extends React.Component {

	componentDidMount() {

		console.log('componentDidMount');

	}

	render() {

		console.log('Render topics');
		console.log(this.props);



		return (
			<div>
				<button>Select topic</button>
				<ul>

					<li>Topic one</li>
					<li>Topic one</li>
				</ul>
			</div>
		);

	}

}

function mapStateToProps(state) {

	console.log('mapStateToProps | topics');
	console.log(state);

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

		// multipe dispatches here to ping the API too?
	};

	const toggleTopics = (operation, status) => {
		dispatch({
			type: 'topics', // State.
			operation, // Action.
			status // Params.
		});
	};

	return {selectTopic, toggleTopics};

}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Topics);
