const React = require('react');
const ReactDOM = require('react-dom');
const {createStore} = require('redux');
const {Provider} = require('react-redux');
const {Router, Route, IndexRoute, Redirect, Link, IndexLink, browserHistory} = require('react-router');
const routes = require('./routes');

console.log(Provider);





const reducer = (state, action) => {

	// const reaction = reactions[action.type];
	//
	// return reaction ? reaction(state, action) : state;

	console.log('reducer');
	return state;

};

const fetchBaseState = () => {

	console.log('fetchBaseState');

	const raw = window.__REDUX_STATE__;
	console.log(raw);
	return raw; // ? JSON.parse(raw) : {};

	// return {foo: 1, bar: 2, baz: 3};

};

// Activates The Redux dev tools Chrome extension.
// https://github.com/zalmoxisus/redux-devtools-extension
const devTools = window.devToolsExtension ? window.devToolsExtension() : undefined;

let store = createStore(reducer, fetchBaseState(), devTools);

store.subscribe(() => render());



// CommentList = connect(
//   CommentListState
// )(CommentList)

const render = () => {

	console.log('render');

	// const state = store.getState(); // this.props.state;

	ReactDOM.render(
		<Provider store={store}>
			<Router history={browserHistory} routes={routes} />
		</Provider>,
		document.getElementById('app')
	);

};


module.exports = render;

// <Provider store={store}>
// 	<Router history={browserHistory} routes={routes} />
// </Provider>,

// <Router history={browserHistory}>
// 	{routes}
// </Router>,
