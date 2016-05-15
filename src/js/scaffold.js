'use strict';

/**
 * Site scaffold.
 * @module ./scaffold
 */

/**
 * Generates the sites base Dom structure and injects the critical app data
 * structure that the client side will rehydrate with to continue the user
 * experience seamlessly.
 * @param {string} title - The app title.
 * @param {string} desc - The app description.
 * @param {string} content - The complete rendered React app.
 * @param {object} state - The final server side Redux state.
 * @param {object} passive - The final server side React passive props.
 */
const scaffold = ({
	title = 'FAQ section',
	desc = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	content = 'Sorry, there has been an error',
	state = {},
	passive = {}
}) => {

	return (
		`<!DOCTYPE html>
	    <html>
	        <head>
	            <meta charset="utf-8">
	            <meta http-equiv="x-ua-compatible" content="ie=edge">
	            <title>${title}</title>
	            <meta name="description" content="${desc}">
	            <meta name="viewport" content="width=device-width, initial-scale=1">
	            <link rel="apple-touch-icon" href="apple-touch-icon.png">
				<link rel="stylesheet" href="/style.css">
				<script>
					window.__REDUX_STATE__ = ${JSON.stringify(state)};
					window.__PASSIVE_PROPS__ = ${JSON.stringify(passive)};
				</script>
	        </head>
	        <body>
	            <div id="app" class="app">${content}</div>
	            <script src="/client.js"></script>
	        </body>
	    </html>`
	);

};

/** Site scaffold. */
module.exports = scaffold;
