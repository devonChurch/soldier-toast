'use strict';

const {UPDATE_LOADER, UPDATE_DATA, FETCH_QUESTIONS, SELECT_TOPIC, TOGGLE_TOPICS} = require('./actions');

function questions(state = {
	loading: true,
	data: []
}, action) {

	console.log('reducer | questions');
	console.log(action);

	switch(action.operation) {

		case UPDATE_LOADER:
			return {...state, loading: action.status};

		case UPDATE_DATA:
			return {...state, data: action.data};

	}

	return state;

}

function topics(state = {
	current: 'all',
	open: false
}, action) {

	console.log(' ** ** ** ** **');
	console.log('reducer | topics');
	console.log(action);
	console.log(state);
	console.log(' ** ** ** ** **');

	switch(action.operation) {

		case SELECT_TOPIC:
			return {...state, current: action.topic};

		case TOGGLE_TOPICS:
			return {...state, open: !state.open};

	}

	return state;

}

function bar() {

	return [];

}

module.exports = {questions, topics, bar};
