'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const {Router, Route, IndexRoute, Redirect, Link, IndexLink, browserHistory} = require('react-router');
const routes = require('./routes');


// Renderer
// Router
// redux


/**
 *
 */
function createElement(Component, props) {

	const hero = {
		heading: 'Hero!',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
	};

	const topics = [
		{
			heading: 'Topic one',
			description: 'Description one',
			url: '/apple',
			total: 7
		},
		{
			heading: 'Topic two',
			description: 'Description two',
			url: '/banana',
			total: 7
		},
		{
			heading: 'Topic three',
			description: 'Description three',
			url: '/orange',
			total: 7
		}
	];

	props = {...props, static: {hero, topics}};

	// make sure you pass all the props in!
	return <Component {...props}/>;

}




/**
 *
 */
function render(store) {

	console.log(' * - - - - - - - - - - * ');
	console.log('render | client');
	console.log(store.getState());
	console.log(' * - - - - - - - - - - * ');



	ReactDOM.render(
		<Provider store={store}>
			<Router history={browserHistory} routes={routes} createElement={createElement}/>
		</Provider>,
		document.getElementById('app')
	);

}

module.exports = render;
