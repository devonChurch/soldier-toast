'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const {combineReducers, createStore} = require('redux');
const {Provider} = require('react-redux');
const {Router, Route, IndexRoute, Redirect, Link, IndexLink, browserHistory} = require('react-router');
const routes = require('./routes');
const reducers = require('./reducers');
const render = require('./render-client');
// let store;


// Renderer
// Router
// redux






/**
 *
 */
function rehydrate() {

	console.log('rehydrate');

	const raw = window.__REDUX_STATE__;
	console.log(raw);
	return raw; // ? JSON.parse(raw) : {};

	// return {foo: 1, bar: 2, baz: 3};

}




/**
 *
 */
// function render() {
//
// 	console.log(' * - - - - - - - - - - * ');
// 	console.log('render');
// 	console.log(store.getState());
// 	console.log(' * - - - - - - - - - - * ');
//
//
//
// 	ReactDOM.render(
// 		<Provider store={store}>
// 			<Router history={browserHistory} routes={routes} createElement={createElement}/>
// 		</Provider>,
// 		document.getElementById('app')
// 	);
//
// }

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
		rehydrate(), // State.
		devTools() // Redux development tools.
	);

	store.subscribe(() => render(store)); // Render on state change.

	render(store); // Prompt initial render on page load.

}

module.exports = initialise;
