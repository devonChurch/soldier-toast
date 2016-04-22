'use strict';

// const feed = require('./feed');
const {Router, Route, IndexRoute, Redirect, Link, IndexLink, browserHistory} = require('react-router');
const React = require('react');
const ReactDOM = require('react-dom');
const Immutable = require('immutable');
const Redux = require('redux');
const deepFreeze = require('deep-freeze');

// console.log(React);
// console.log(Redux);
// console.log(expect);
// console.log(deepFreeze);
// console.log(Immutable);
// console.log(Router, Route, IndexRoute, Redirect, Link, IndexLink, browserHistory);

const reactions = {

	count(oldState, action) {

		deepFreeze(oldState);

		const posibilities = {
			'increase': (v) => v + 1,
			'decrease': (v) => v - 1
		};

		const newState = oldState.update(action.id, posibilities[action.direction]);

		return newState;

	},

	instance(oldState, action) {

		deepFreeze(oldState);

		const posibilities = {
			'add': () => oldState.push(0),
			'remove': () => oldState.pop()
		};

		const newState = posibilities[action.process]();

		return newState;

	}

};

const reducer = (state, action) => {

	const reaction = reactions[action.type];

	return reaction ? reaction(state, action) : state;

};

const baseState = Immutable.List.of(0);

// Activates The Redux dev tools Chrome extension.
// https://github.com/zalmoxisus/redux-devtools-extension
const devTools = window.devToolsExtension ? window.devToolsExtension() : undefined;

let store = Redux.createStore(reducer, baseState, devTools);

store.subscribe(() => render());

const Instances = React.createClass({

	modify(process) {

		store.dispatch({
			type: 'instance',
			process
		});

	},

	render() {

		return (
			<ul>
				<li>
					<button onClick={this.modify.bind(this, 'add')}>Add</button>
				</li>
				<li>
					<button onClick={this.modify.bind(this, 'remove')}>Remove</button>
				</li>
			</ul>
		);
	}

});

const Counter = React.createClass({

	count(direction, id) {

		store.dispatch({
			type: 'count',
			direction,
			id
		});

	},

	render() {

		const state = store.getState(); // this.props.state;

		console.log(this.props.children);

		return (
			<ul>
				<Link to="/banana">Banana</Link>
				{
					state.map((value, id) => {

						return (

							<li key={id}>
								<p>Counter: {value}</p>
								<button onClick={this.count.bind(this, 'decrease', id)}>-</button>
								<button onClick={this.count.bind(this, 'increase', id)}>+</button>
							</li>
						);
					})
				}
			</ul>
		);
	}

});

const Banana = React.createClass({

	render() {

		return (

			<div>
				<h2>Banana | {this.props.route.foo}</h2>
				<Link to="/">Home</Link>
			</div>

		);

	}

});

// Needs to be declared outside of render().
const routes = (
	<Route path="/">
		<IndexRoute component={Counter} />
		<Route path="/banana">
			<IndexRoute component={Banana} foo={'bar'}/>
		</Route>
	</Route>
);

const render = () => {

	ReactDOM.render(
		<Router history={browserHistory}>
			{routes}
		</Router>,
		document.getElementById('app')
	);

};

render();

// <div>
// 	<Counter state={state}/>
// 	<Instances />
// </div>




// const testFeed = () => {
//
// 	console.log('texting feed....');
//
// 	const request = new XMLHttpRequest();
// 	request.open('GET', './node/get-feed.js', true);
//
// 	request.onload = () => {
//
// 		if (request.status >= 200 && request.status < 400) {
// 			// Success!
// 			const resp = request.responseText;
// 			console.log('success', resp);
//
// 		} else {
// 			// We reached our target server, but it returned an error
// 			console.log('nothing returned =()');
//
// 		}
// 	};
//
// 	request.onerror = function() {
// 		// There was a connection error of some sort
// 		console.log('error');
// 	};
//
// 	request.send();
//
// };
//
// testFeed();
