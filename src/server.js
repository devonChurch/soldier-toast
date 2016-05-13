const debug = require('debug')('server');
const express = require('express');
const port = 8000;
const {match, RouterContext} = require('react-router');
const routes = require('./js/routes');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const {combineReducers, createStore} = require('redux');
const {Provider} = require('react-redux');
const curate = require('./js/curate');
const getPassive = require('./js/passive');
const scaffold = require('./js/scaffold');
const {constructState, initialise} = require('./js/construct');


// A URL is pinged

// We have the following as categories...
// /all (replaces / )
// /apple
// /banana
// /orange

// If there is no URL match to our JSON file...
// Redirect the user back to /all and give them a message

// TODO:
// Order
// Load more + slice ?from=0
// Redirect
// - The section "foo" does not exist - redirecting you to show "all" section questions
// - The question "bar" does not exist - now showing question inside the "baz" section

const app = express();

// Express middleware.
app.use(express.static('static'));

app.get('*', (req, res) => {

    match({routes, location: req.url}, (error, redirectLocation, renderProps) => {

        const path = req.url;

        debug(`location = ${path}`);

        if (error) {

            debug('** error 500 **');

            res.status(500).send(error.message);

        } else if (path.indexOf('/api') >= 0) {

            debug('** fetching api request **');

            const request = path.substr(4);
            const {json} = curate(request);

            res.status(200).json(json);

        } else if (renderProps && path !== '/favicon.ico') {

            debug('** rendering page **');
            // debug('renderProps', renderProps);

            const curated = curate(path); // = const {json, open, topic, params} = curate(path);
            const passive = getPassive(curated);
            debug('passive', passive);
            const state = constructState(curated);
            const content = initialise(renderProps, passive, state);
            const html = scaffold({content, state, passive});

            res.status(200).send(html);

        } else {

            debug('** error 404 **');

            res.status(404).send('Not found');

        }
    });

});

app.listen(port, () => debug(`listening on port ${port}`));
