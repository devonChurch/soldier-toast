'use strict';

/**
 * Server.
 * @module ./server
 */

const _debug = require('debug')('Server');
const express = require('express');
const port = 8000;
const {match} = require('react-router');
const routes = require('./js/routes');
const getFeed = require('./js/get-feed');
const curate = require('./js/curate');
const getPassive = require('./js/passive');
const scaffold = require('./js/scaffold');
const {constructState, initialise} = require('./js/construct');
const app = express();

// Express middleware that dictates where you static assets reside with in the
// folder structure. With this approach instead if static/foo.jpg you can simply
// reference foo.jpg
app.use(express.static('static'));

// Catch all requests to the server and use React-router rather than Express to
// clarify the correct response.
app.get('*', (req, res) => {

    match({routes, location: req.url}, (error, redirectLocation, renderProps) => {

        const path = req.url;

        _debug(`Location = ${path}`);

        if (error) {

            _debug('Error: 500');

            res.status(500).send(error.message);

        } else if (path.indexOf('/api') >= 0) {

            _debug('Fetching data from API request');

            const fetch = getFeed();

            fetch.then((feed) => {

                _debug('Got feed');

                const request = path.substr(4);
                const {json} = curate(feed, request);

                res.status(200).json(json);

            });

        // Ignore the annoying favicon request in this POC
        } else if (renderProps && path !== '/favicon.ico') {

            _debug('Rendering React application');

            const fetch = getFeed();

            fetch.then((feed) => {

                _debug('Got feed');

                const curated = curate(feed, path);
                const passive = getPassive(feed, curated);
                const state = constructState(curated);
                const content = initialise(renderProps, passive, state);
                const html = scaffold({content, state, passive});

                res.status(200).send(html);

            });

        } else {

            _debug('Error: 404');

            res.status(404).send('Not found');

        }

    });

});

app.listen(port, () => _debug(`listening on port ${port}`));
