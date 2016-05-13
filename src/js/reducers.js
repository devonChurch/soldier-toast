'use strict';

const {UPDATE_LOADER, UPDATE_DATA, TOGGLE_QUESTION, SELECT_TOPIC, TOGGLE_TOPICS} = require('./actions');

function questions(state = {
	loading: true,
	open: null,
	data: []
}, action) {

	console.log('reducer | questions');
	console.log(action);

	switch(action.operation) {

		case UPDATE_LOADER:
			return {...state, loading: action.status};

		case UPDATE_DATA:
			return {...state, data: action.data};

		case TOGGLE_QUESTION:
			return {...state, open: action.id};

		default:
			return state;

	}

}

function topics(state = {
	current: 'all',
	open: false
}, action) {

	console.log('reducer | topics');
	console.log(action);

	switch(action.operation) {

		case SELECT_TOPIC:
			return {...state, current: action.topic};

		case TOGGLE_TOPICS:
			return {...state, open: !state.open};

		default:
			return state;

	}

}

module.exports = {questions, topics};
