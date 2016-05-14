const React = require('react');
const ReactDOM = require('react-dom');
const {Router, Route, IndexRoute, Redirect, Link, IndexLink, browserHistory} = require('react-router');
const Faq = require('./faq');

const routes = (
	<Route path="/">
		<Route path="/:topic" component={Faq} />
		<Route path="/:topic/:question" component={Faq} />
	</Route>
);

module.exports = routes;
