'use strict';

/**
 * Initialise app (client side).
 * @module ./initialiser
 */

const _debug = require('debug')('Initialise');
const React = require('react');
const ReactDOM = require('react-dom');
const {combineReducers, createStore} = require('redux');
const {Provider} = require('react-redux');
const {Router, browserHistory} = require('react-router');
const routes = require('./routes');
const reducers = require('./reducers');

/**
 * Before we initialise React, Redux or React-router we replace the current URL
 * with a rendition that matches the curated data i.e. ‘/‘ becomes ‘/all’ and
 * ‘/topic/broken-question’ becomes ‘/topic’.
 */
function replaceUrl() {

	const {topic, question} = rehydrate.props().params;
	_debug('Replacing URL:');
	_debug(`- Topic = ${topic}`);
	_debug(`- Question = ${question}`);
	const path = question ? `/${topic}/${question}` : `/${topic}`;

	history.replaceState( {} , '', path);

}

/**
 * Pull either the server side generated Redux state or React props out of the
 * window object.
 */
const rehydrate = {

	state: () => window.__REDUX_STATE__,
	props: () => window.__PASSIVE_PROPS__

};

/**
 * This follows the same methodology as mentioned in the ./construct.js documentation.
 * @see {@link ./construct createElement}
 * @param {class} Component - The react-router component class
 * @param {object} props - The react-router props
 */
function createElement(Component, props) {

	props = {...props, passive: rehydrate.props()};

	// make sure you pass all the props in!
	return <Component {...props}/>;

}

/**
 * Renders the entire app and leverages the Redux Provider and React-router
 * functionality.
 * @param {object} store - The Redux store.
 */
function render(store) {

	_debug(store.getState());

	ReactDOM.render(
		<Provider store={store}>
			<Router history={browserHistory} routes={routes} createElement={createElement}/>
		</Provider>,
		document.getElementById('app')
	);

}

/**
 * Activates The Redux dev tools Chrome extension.
 * https://github.com/zalmoxisus/redux-devtools-extension
 */
function devTools() {

	return window.devToolsExtension ? window.devToolsExtension() : undefined;

}

/**
 * Starts the entire client side sequence that picks up where the server side
 * rendition off the app left off.
 */
function initialise() {

	replaceUrl();

	let store = createStore(
		combineReducers(reducers), // Reducers.
		rehydrate.state(), // State.
		devTools() // Redux development tools.
	);

	store.subscribe(() => render(store)); // Render on state change.

	render(store); // Prompt initial render on page load.

}

/** Initialise app (client side). */
// Note: That the initialiser function in executing itself when exporting.
module.exports = initialise();
