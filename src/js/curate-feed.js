'use strict';

const fs = require('fs');
const debug = require('debug')('curate');
const questionPath = require('./question-path');

/**
 * Pulls in the static feed.json file from the server.
 * @return {object} Parsed JSON data.
 */
function getFeed() {

    const raw = fs.readFileSync('./feed.json');

    return JSON.parse(raw);

}

/**
 * Distills down the request URL into an array that we can utilise to access the
 * correct set of JSON data.
 * @example
 * // returns [‘foo’, ‘bar’];
 * distillPath(‘/foo/bar/’);
 * @param {string} path - The request URL pulled in from Express.js
 * @returns {array} An array referencing our nested JSON structure.
 */
function distillPath(path) {

    // Remove any query string references.
    const index = path.indexOf('?');
    path = path.indexOf('?') > 0 ? path = path.slice(0, index) : path;

    // Remove the trailing slash.
    path = path.slice(-1) === '/' ? path.slice(0, path.length - 1) : path;

    // Removing the leading slash and then construct and array out of the
    // remaining string.
    return path.slice(1).split('/');

}

/**
 * If no applicable category is provided then we merge all categories into a
 * single array to represent the /all status.
 * @param {array} keys - The category names that we will extract from feed.JSON
 * @return {array} The merged feed data into a single array.
 */
function mergeFeed(feed) {

    debug('mergeFeed');

    const keys = Object.keys(feed);
    const merged = [];

    for (let key of keys) merged.push(...feed[key].questions);

    return merged;

}

/**
 * If there was a successful question match from matchQuestion() then we extract
 * it and bump it up to the top question in the JSON array.
 * @param {array} JSON - The extracted feed content.
 * @param {number} id - The array id of the matched content.
 * @return {array} The reordered JSON data.
 */
function extractQuestion(json, id) {

    const match = json.splice(id, 1);

    return [...match, ...json];

}

/**
 * If the user has specified to surface a specific question in their URL request
 * then we extract that particular question reference and push it to the top of
 * the content stack.
 * @param {array} JSON - The extracted feed content.
 * @param {string} path - The question path in which to match the JSON content
 * against.
 * @return {array} The potentially reformatted son structure depending on
 * successfully match.
 */
function matchQuestion(json, question) {

    debug('matchQuestion');

    let id = null;

    for (let i = 0; i < json.length; i += 1) {

        const heading = json[i].heading;

        // We generate the URL dynamically from the current questions heading.
        const compare = questionPath(heading);

        if (compare === question) {

            id = i;
            break;

        }

    }

    return id === null ? json : extractQuestion(json, id);

}

/**
 * We try and make the Url more verbose by having “/” actually reference “/all”.
 * In that regard we test the request URL and reformat the steps system i.e.
 * [category, question] to cater to this formatting choice.
 * @param {array} steps - The path to JSON correlation generated from distillPath().
 * @param {object} feed - The JSON data from the server.
 * @return {object} The formatted steps system.
 */
function extrapolatePath(steps, feed) {

    if (steps.length === 1) {

        const category = steps[0];

        steps = feed[category] || category === 'all' ? steps : ['all', category];

    }

    return {
        category: steps[0],
        question: steps[1]
    };

}

/**
 * We extract the relevant JSON data from the feed.json file based on the current step parameters.
 * @param {object} feed - The JSON data from the server.
 * @param {string} category - The first step into the JSON data.
 * @param {string} question - The second step into the JSON data.
 * @return {object} The extracted JSON data.
 */
function extractJson(feed, category, question) {

    debug('extractJson');

    let json;

    debug(`feed[${category}] = ${feed[category] ? 'true' : 'false'}`);
    json = feed[category] ? feed[category].questions : mergeFeed(feed);
    debug('relevant JSON', json);
    json = matchQuestion(json, question);

    return json;

}

/**
 * Curates the feed.json data to reflect the users URL request. We first finesse the request path into an applicable format, make concessions to surface data rather than a nasty 404 if the query is not relevant then package up the relating content for injection via our React system.
 * @param {string} path - The raw request URL sent through from our Express.js server.
 * @return {array} the curated JSON data.
 */
function curate(path) {

    debug('curating feed....');

    const feed = getFeed();
    debug('feed', feed);
    const steps = distillPath(path);
    const {category, question} = extrapolatePath(steps, feed);
    debug(`category = ${category} | question = ${question}`);
    const json = extractJson(feed, category, question);
    debug(json);

    return json;

}

module.exports = curate;
