'use strict';

const debug = require('debug')('curate');
const getFeed = require('./feed');
const questionPath = require('./question-path');

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

    debug('distillPath');

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
 * @param {array} keys - The category names that we will extract from questions.JSON
 * @return {array} The merged questions data into a single array.
 */
function mergeFeed(questions) {

    debug('mergeFeed');

    const keys = Object.keys(questions);
    const merged = [];

    for (let key of keys) merged.push(...questions[key]);

    return merged;

}

/**
 * If there was a successful question match from matchQuestion() then we extract
 * it and bump it up to the top question in the JSON array.
 * @param {array} JSON - The extracted questions content.
 * @param {number} id - The array id of the matched content.
 * @return {array} The reordered JSON data.
 */
function extractQuestion(json, id) {

    debug('extractQuestion');

    const match = json.splice(id, 1);

    return [...match, ...json];

}

/**
 * If the user has specified to surface a specific question in their URL request
 * then we extract that particular question reference and push it to the top of
 * the content stack.
 * @param {array} JSON - The extracted questions content.
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
 * @param {object} questions - The distilled question data.
 * @return {object} The formatted steps system.
 */
function extrapolatePath(steps, questions) {

    debug('extrapolatePath');

    if (steps.length === 1) {

        const category = steps[0];

        steps = questions[category] || category === 'all' ? steps : ['all', category];

    }

    return {
        category: steps[0],
        question: steps[1]
    };

}

/**
 * We extract the relevant JSON data from the questions.json file based on the
 * current step parameters.
 * @param {object} questions - The distilled question data.
 * @param {string} category - The first step into the JSON data.
 * @param {string} question - The second step into the JSON data.
 * @return {object} The extracted JSON data.
 */
function extractJson(questions, category, question) {

    debug('extractJson');

    let json;

    json = questions[category] ? questions[category] : mergeFeed(questions);
    json = matchQuestion(json, question);

    return json;

}

/**
 * Distills the entire feed.json file down to represent only the relevant question
 * data.
 * @param {object} feed - The JSON data from the server.
 * @return {object} The extracted JSON data.
 */
function distillFeed(feed) {

    debug('distillFeed');

    const keys = Object.keys(feed.topics);
    let questions = {};

    for (let key of keys) questions[key] = feed.topics[key].questions;

    return questions;

}

/**
 * Curates the feed.json data to reflect the users URL request. We first finesse
 * the request path into an applicable format, make concessions to surface data
 * rather than a nasty 404 if the query is not relevant then package up the relating
 * content for injection via our React system.
 * @param {string} path - The raw request URL sent through from our Express.js server.
 * @return {array} the curated JSON data.
 */
function curate(path) {

    debug('curate (questions)...');

    const feed = getFeed();
    const questions = distillFeed(feed);
    const steps = distillPath(path);
    const {category, question} = extrapolatePath(steps, questions);
    const json = extractJson(questions, category, question);

    return json;

}

module.exports = curate;
