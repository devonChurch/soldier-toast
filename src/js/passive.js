'use strict';

/**
 * Passive props.
 * @module ./passive
 */

const _debug = require('debug')('Passive');
const getFeed = require('./feed');

/**
 * Extract only the relevant passive topic data from the JSON. We also change
 * the data structure from an object into an array for easy looping with React.
 * @param {object} topics - Topic data from feed.json
 * @return {object} Extracted topic data.
 */
function curateTopics(topics) {

    _debug('Curating topics');

    const keys = Object.keys(topics);
    let json = {};

    for (let key of keys) {

        const topic = topics[key];
        const data = {...topic.overview, url: `/${key}`, total: topic.questions.length};

        json[key] = data;

    }

    return json;

}

/**
 * Consolidate only the data associated with passive props.
 * @param {object} feed - The raw feed data from feed.json
 * @param {object} feed.hero - The hero data extracted via destructuring.
 * @param {object} feed.topics - The topics data extracted via destructuring.
 * @returns {object} The distilled JSON.
 */
function distillFeed({hero, topics}) {

    _debug('Distilling');

    return {
        hero,
        topics: curateTopics(topics)
    };

}

/**
 * Extracts the passive props (will not change during the executions duration)
 * from feed.json
 * @param {object} curated - The curated feed data.
 * @param {object} curated.params - The params data nested inside the curated data.
 * @return {object} The extracted JSON.
 */
function extract({params}) {

    _debug('Extraction');

    const feed = getFeed();
    const json = distillFeed(feed);

    // The params are added into the passive props and will be used to update
    // the augment react-router params and augment the URL on client side
    // initialisation.
    return {...json, params};

}

/** Passive props. */
module.exports = extract;
