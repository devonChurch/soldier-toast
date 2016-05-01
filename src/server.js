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
            const json = JSON.stringify(curate(request));

            res.status(200).send(json);

        } else if (renderProps && path !== '/favicon.ico') {

            debug('** rendering page **');

            const passive = getPassive();
            const state = constructState(path);
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
