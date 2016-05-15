'use strict';

/**
 * Redux reducers.
 * @module ./routes
 */

const _debug = require('debug')('Reducers');
const {UPDATE_LOADER, UPDATE_DATA, TOGGLE_QUESTION, SELECT_TOPIC, TOGGLE_TOPICS} = require('./actions');
const deepFreeze = require('deep-freeze');

// We are using Deep Freeze to ensue that the modifications to our state are done
// via immutable methods. This way we can utilise Redux in its most performant
// fashion as well as utilise it’s dev tools to step through our apps ‘action’ timeline.

/**
 * The Redux actions attributed to the questions component.
 * @param {object} state - The current state of the app (with base fallback).
 * @param {object} action - The redux action object.
 * @return {object} The updated state.
 */
function questions(state = {
	loading: true,
	open: null,
	data: []
}, action) {

	deepFreeze(state);

	_debug('Questions:', 'action', action);

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

/**
 * The Redux actions attributed to the topics component.
 * @param {object} state - The current state of the app (with base fallback).
 * @param {object} action - The redux action object.
 * @return {object} The updated state.
 */
function topics(state = {
	current: 'all',
	open: false
}, action) {

	deepFreeze(state);

	_debug('Topics:', 'action', action);

	switch(action.operation) {

		case SELECT_TOPIC:
			return {...state, current: action.topic};

		case TOGGLE_TOPICS:
			return {...state, open: !state.open};

		default:
			return state;

	}

}

/** Redux reducers. */
module.exports = {questions, topics};
