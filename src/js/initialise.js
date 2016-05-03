'use strict';

const debug = require('debug')('initialise');
const React = require('react');
const ReactDOM = require('react-dom');
const {combineReducers, createStore} = require('redux');
const {Provider} = require('react-redux');
const {Router, Route, IndexRoute, Redirect, Link, IndexLink, browserHistory} = require('react-router');
const routes = require('./routes');
const reducers = require('./reducers');
// let store;


// Renderer
// Router
// redux






/**
 *
 */
const rehydrate = {

	state() {

		console.log('rehydrate (state)');

		return window.__REDUX_STATE__;

	},

	props() {

		console.log('rehydrate (props)');

		return window.__PASSIVE_PROPS__;

	}

};

/**
 *
 */
function createElement(Component, props) {

	// const hero = {
	// 	heading: 'Hero!',
	// 	description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
	// };
	//
	// const topics = [
	// 	{
	// 		heading: 'Topic one',
	// 		description: 'Description one',
	// 		url: '/apple',
	// 		total: 7
	// 	},
	// 	{
	// 		heading: 'Topic two',
	// 		description: 'Description two',
	// 		url: '/banana',
	// 		total: 7
	// 	},
	// 	{
	// 		heading: 'Topic three',
	// 		description: 'Description three',
	// 		url: '/orange',
	// 		total: 7
	// 	}
	// ];

	props = {...props, passive: rehydrate.props()};

	// make sure you pass all the props in!
	return <Component {...props}/>;

}

/**
 *
 */
function render(store) {

	console.log(' * - - - - - - - - - - * ');
	console.log('render');
	console.log(store.getState());
	console.log(' * - - - - - - - - - - * ');

	debug(store.getState());

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
 *
 */
function initialise() {

	let store = createStore(
		combineReducers(reducers), // Reducers.
		rehydrate.state(), // State.
		devTools() // Redux development tools.
	);

	store.subscribe(() => render(store)); // Render on state change.

	render(store); // Prompt initial render on page load.

}

module.exports = initialise;
