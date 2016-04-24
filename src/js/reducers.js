'use strict';

const {UPDATE_LOADER} = require('./actions');

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

function foo() {

	return [];

}

function bar() {

	return [];

}

module.exports = {api, foo, bar};
