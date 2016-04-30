'use strict';

const {RouterContext} = require('react-router');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const {Provider} = require('react-redux');




/**
 *
 */
function render(renderProps, store) {

	console.log('render | server');

	// {...renderProps, apple}
	const apple = {
		color: 'red',
		shape: 'round'
	};

	const content = ReactDOMServer.renderToString(
		<Provider store={store}>
			<RouterContext {...renderProps} />
		</Provider>
	);

	return content;

}

module.exports = render;
