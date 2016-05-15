'use strict';

/**
 * React-router Routes.
 * @module ./routes
 */

const React = require('react');
const ReactDOM = require('react-dom');
const {Router, Route, IndexRoute, Redirect, Link, IndexLink, browserHistory} = require('react-router');
const Faq = require('./faq');

// Note: The routes must be declared outside of React render() function and
// instead be referenced as a variable (other wise the instantiate every time
// the render function is executed).
const routes = (
	<Route path="/">
		<Route path="/:topic" component={Faq} />
		<Route path="/:topic/:question" component={Faq} />
	</Route>
);

/** React-router Routes. */
module.exports = routes;
