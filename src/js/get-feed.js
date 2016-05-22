'use strict';

const _debug = require('debug')('Feed');
const fs = require('fs');

/**
 * Fetches in the static feed.json file from the server. We are creating an async
 * request to retrieve the feed data. Rather that populate server.js with nested
 * callback we are using a promise setup to resolve the fetch request.
 * @return {object} Parsed JSON data.
 */
function getFeed() {

    const promise = new Promise((resolve, reject) => {

        _debug('Creating promise');

        fs.readFile('./feed.json', (err, data) => {

            _debug('Retrieved feed');

            if (err) reject();
            else resolve(JSON.parse(data));

        });

    });

    return promise;

}

module.exports = getFeed;
