const React = require('react');
const ReactDOM = require('react-dom');
const {Router, Route, IndexRoute, Redirect, Link, IndexLink, browserHistory} = require('react-router');
const Faq = require('./faq');



const routes = (
	<Route>
		<Route path="/:topic" component={Faq} />
		<Route path="/:topic/:question" component={Faq} />
	</Route>
);

module.exports = routes;

// <Route path="/">
// 	<IndexRoute component={HomePage} />
// 	<Route path="/:food" component={ShowPage} />
// 	<Route path="/:food/:variety" component={EpisodePage} />
// </Route>

// <Route path="/">
// 	<IndexRoute component={HomePage} />
// 	<Route path="fruit">
// 		<IndexRoute component={ShowPage} foo={'bar'}/>
// 		<Route path="banana">
// 			<IndexRoute component={EpisodePage} foo={'bar'}/>
// 		</Route>
// 	</Route>
// </Route>
