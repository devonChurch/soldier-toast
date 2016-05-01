'use strict';

const fs = require('fs');

/**
 * Pulls in the static feed.json file from the server.
 * @return {object} Parsed JSON data.
 */
function feed() {

    const raw = fs.readFileSync('./feed.json');

    return JSON.parse(raw);

}

module.exports = feed;
