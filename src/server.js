const _debug = require('debug')('Server');
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

// SERVER:
// Get the raw json file FS (async request with promice)
// Sort out the Topic / Question params (could change based on retrived data)
// Curate the RAW JSON
// Order the curated JSON
// Move applicable question to top of the stack
// Start construction


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

        _debug(`Location = ${path}`);

        if (error) {

            _debug('** error 500 **');

            res.status(500).send(error.message);

        } else if (path.indexOf('/api') >= 0) {

            _debug('** fetching api request **');

            const request = path.substr(4);
            const {json} = curate(request);

            res.status(200).json(json);

        } else if (renderProps && path !== '/favicon.ico') {

            _debug('** rendering page **');
            // _debug('renderProps', renderProps);

            const curated = curate(path);
            const passive = getPassive(curated);
            _debug('passive', passive);
            const state = constructState(curated);
            const content = initialise(renderProps, passive, state);
            const html = scaffold({content, state, passive});

            res.status(200).send(html);

        } else {

            _debug('** error 404 **');

            res.status(404).send('Not found');

        }
    });

});

app.listen(port, () => _debug(`listening on port ${port}`));
