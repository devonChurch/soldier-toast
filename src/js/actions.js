'use strict';

/**
 * Redix actions.
 * @module ./actions
 */

// A housing the describe all possible action that can affect the Redux state.
// This extra level of abstraction makes it easier for new developers to easily
// ascertain an executions functionality on a per module basis.
const actions = {
	UPDATE_LOADER: 'UPDATE_LOADER',
	UPDATE_DATA: 'UPDATE_DATA',
	TOGGLE_QUESTION: 'TOGGLE_QUESTION',
	SELECT_TOPIC: 'SELECT_TOPIC',
	TOGGLE_TOPICS: 'TOGGLE_TOPICS'
};

/** Redux actions. */
module.exports = actions;
