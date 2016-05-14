'use strict';

const _debug = require('debug')('Construct');
const {RouterContext} = require('react-router');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const {combineReducers, createStore} = require('redux');
const {Provider} = require('react-redux');
const curate = require('./curate');
const reducers = require('./reducers');

/**
 * Construct the initial (base) state that the app needs to render out its first view instance.
 * @param {object} obj - The object wrapper that we will access via destructuring.
 * @param {object} obj.json - The curated JSON data.
 * @param {number} open - References the current open question (null if not applicable)
 * @param {string} topic - The current topic associated with the user request and curated data.
 * @return {object} The state object.
 */
function constructState({json, open, topic}) {

	_debug('Constrcuting state');

    return {
        questions: {
            loading: false,
            open,
            data: json
        },
        topics: {
            current: topic,
            open: false
        }
    };

}

exports.constructState = constructState;

/**
 * This is a setup purely in which to pass our passive props down through the
 * router and into out React app wrapper. To do this we need to create a fictitious
 * element into the RouterContext. The setup expects something like this
 * createElement={createElement} so to be able to pass in our passive props we
 * initiate a wrapper function which then returns a function in the format that
 * the RouterContext expects. This way we can tag out props onto the end of the
 * Routers props object so that they are sent to the FAQ React element to be
 * passed down.
 * @param {object} passive - Our React app’s passive props.
 * @return {function} The true RouterContext createElement function in the
 * correct setup.
 */
function createElement(passive) {

	_debug('Creating element');

    return (Component, props) => {

        props = {...props, passive};

        // make sure to pass all the existing props in addition to the passive props!
        return <Component {...props}/>;

    };

}

/**
 * The render function that will generate our server side SEO friendly HTML markup
 * for our React app. Utilising the React renderer Redux Provider and React Router
 * functionality that we use client side with a slight server side twist.
 * @param {object} renderProps - The props generated from the react router “match”
 * setup in the server.js file.
 * @param {object} passive - Our React app’s passive props.
 * @param {object} store - The Redux store.
 * @return {string} The HTML representation of our app.
 */
function render(renderProps, passive, store) {

    _debug('Rendering');

    const content = ReactDOMServer.renderToString(
        <Provider store={store}>
            <RouterContext {...renderProps} createElement={createElement(passive)}/>
        </Provider>
    );

    return content;

}

/**
 * Initialise the render sequence by generating the Redux store and hooking in
 * our renderer and reducer functionality into it.
 * @param {object} renderProps - The props generated from the react router “match”
 * setup in the server.js file.
 * @param {object} passive - Our React app’s passive props.
 * @param {object} state - The initial app state.
 */
function initialise(renderProps, passive, state) {

    _debug('Initialising');

    let store = createStore(
        combineReducers(reducers), // Reducers.
        state // State
        // no need for Redux dev tools server side =)
    );

	// Update the React-router params to utilise the (potentially) adjusted
	// version based on the users request URL relevance.
	renderProps.params = passive.params;

	// Render on state change.
	store.subscribe(() => render(renderProps, passive, store));

	// Generate server side HTML.
    return render(renderProps, passive, store);

}

exports.initialise = initialise;
