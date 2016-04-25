'use strict';

const {UPDATE_LOADER, FETCH_QUESTIONS, SELECT_TOPIC, TOGGLE_TOPICS} = require('./actions');

function api(state = {
	request: '/',
	loading: true
}, action) {

	console.log('reducer | api');
	console.log(action);

	switch(action.operation) {

		case UPDATE_LOADER:
			return {...state, loading: action.status};

	}

	return state;

}

function topics(state = {
	current: null,
	open: false
}, action) {

	console.log('reducer | topics');
	console.log(action);

	switch(action.operation) {

		case SELECT_TOPIC:
			console.log('SELECT_TOPIC');
			break;

		case TOGGLE_TOPICS:
			console.log('TOGGLE_TOPICS');
			break;

	}

	return state;

}

function bar() {

	return [];

}

module.exports = {api, topics, bar};
